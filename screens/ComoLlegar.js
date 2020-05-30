import React, {useEffect, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet, View, Text, SectionList, TouchableOpacity, Picker, ActivityIndicator} from "react-native";
import {Card} from "react-native-shadow-cards";
import TitleComponent from "../components/TitleComponent";
import I18n from "../idiomas/idioma";
import MapView, {Marker} from "react-native-maps";
import OpenMap from "react-native-open-map";


export default function ScreenComoLlegar({navigation, route}) {

    let provincias = [
        {
            id: 0,
            ciudad: I18n.t("COMO_LLEGAR_SELECCION_PROV")
        },
        {
            id: 1,
            ciudad: "Barcelona"
        }
        ,
        {
            id: 2,
            ciudad: "Valencia"
        }
        ];

    let selectProvincias = [];

    for(let i=0;i<provincias.length; i++){
        selectProvincias.push(<Picker.Item label={provincias[i].ciudad} value={provincias[i].id}/>)
    }

    const {titleName} = route.params;
    const [selectedValue, setSelectedValue] = useState(0);

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [hospReferencia, setHospReferencia] = useState(I18n.t("COMO_LLEGAR_HOSP_REF")+": ");

    useEffect(() => {
        fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/hospital')
            .then((response) => response.json())
            .then((json) => setData([json]))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return(
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
                        style={styles.linearGradient}>
            <View style={{alignItems: 'center', flex: 1}}>
                {/* HEADER */}
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation}/>
                </Card>
                {/* END HEADER */}
                {isLoading? <ActivityIndicator/>:
                    <View style={{flex: 1}}>
                        <SectionList style={styles.cardList}
                                     sections={[
                                         {
                                             data: data
                                         }
                                     ]}
                                     renderItem={({item}) =>
                                         <Card style={styles.cardComoLlegar}>
                                             <Text style={{fontSize: 24}}>{hospReferencia}{item.nombre}</Text>
                                             <View style={{flexDirection: 'row', flex: 1}}>
                                                 <TouchableOpacity style={{flex: 1}} onPress={() =>  OpenMap.show({
                                                     latitude: item.ubicacion.lat[0],
                                                     longitude: item.ubicacion.lng[0]
                                                 })}>
                                                     <MapView
                                                         style={{flex: 1, marginBottom: NORMAL_MARGIN, height: 90, width: 150}}
                                                         initialRegion={{
                                                             latitude: item.ubicacion.lat[0],
                                                             longitude: item.ubicacion.lng[0],
                                                             latitudeDelta: 0.0922,
                                                             longitudeDelta: 0.0421
                                                         }}
                                                     >
                                                         <Marker coordinate={{latitude: item.ubicacion.lat[0],
                                                             longitude: item.ubicacion.lng[0]}}
                                                         />
                                                     </MapView>
                                                 </TouchableOpacity>
                                                 <View style={{flex: 1, paddingLeft: 10}}>
                                                     <Text style={{marginBottom: 10}}>{I18n.t("COMO_LLEGAR_BUS_LINEAS")}: {item.lineaBus}</Text>
                                                     <Text>{I18n.t("COMO_LLEGAR_METRO")}: {item.lineasMetro}</Text>
                                                 </View>
                                             </View>
                                         </Card>
                                     }
                        />
                        <Card style={styles.cardComoLlegar}>
                            <Text style={{fontSize: 16}}>{I18n.t("COMO_LLEGAR_OTRO_INSTR")}</Text>
                            <Picker
                                style={{width: "75%"}}
                                selectedValue={selectedValue}
                                onValueChange={function (itemValue) {
                                    setSelectedValue(itemValue);
                                    setLoading(true);
                                    if(itemValue != 0){
                                        console.log(provincias[itemValue].ciudad);
                                        fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/hospital/'+provincias[itemValue].ciudad)
                                            .then((response) => response.json())
                                            .then(function(json){
                                                setData(json);
                                                setHospReferencia('');
                                            })
                                            .catch((error) => console.log(error))
                                            .finally(() => setLoading(false));
                                    }else{
                                        fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/hospital')
                                            .then((response) => response.json())
                                            .then(function(json){
                                                setData([json]);
                                                setHospReferencia(I18n.t("COMO_LLEGAR_HOSP_REF")+": ");
                                            })
                                            .catch((error) => console.log(error))
                                            .finally(() => setLoading(false));
                                    }
                                }}
                                >
                                {selectProvincias}
                            </Picker>
                        </Card>
                    </View>
                }

            </View>
        </LinearGradient>
    );
}

const NORMAL_MARGIN = '5%';
const BIG_MARGIN = '10%';
const MINIMUN_MARGIN = '1%';

const MAX_SIZE = '100%';

//Colors gradient constant
const GRADIENT_COLOR_A = '#e12406';
const GRADIENT_COLOR_B = '#f65511';
const GRADIENT_COLOR_C = '#ff8311';

const styles = StyleSheet.create({
    cardHeader: {
        padding: NORMAL_MARGIN, margin: BIG_MARGIN,
        marginBottom: MINIMUN_MARGIN, borderWidth: 6,
        borderColor: '#FFB36B'
    },
    linearGradient: {
        width: MAX_SIZE,
        height: MAX_SIZE
    },
    cardList: {
        margin: MINIMUN_MARGIN
    },
    cardComoLlegar: {
        padding: NORMAL_MARGIN,
        margin: MINIMUN_MARGIN,
        borderWidth: 1,
        alignItems: 'flex-start'
    }
});