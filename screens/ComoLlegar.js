import React, {useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet, View, Text,SectionList, TouchableOpacity, Picker} from "react-native";
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
    const [selectedValue, setSelectedValue] = useState(1);

    return(
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
                        style={styles.linearGradient}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {/* HEADER */}
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation}/>
                </Card>
                {/* END HEADER */}
                <SectionList style={styles.cardList}
                             sections={[
                                 {
                                     data: [
                                         {
                                             nombre: "ICO Hospitalet",
                                             lineasBus: "1, 2, 10, 70, 72, 80, 81, 86, 87, 94, 95, 46, 65",
                                             metro: "Línea 1 (Hospital de Bellvitge)",
                                             latitude: 41.375267,
                                             longitude: 2.149080
                                         },
                                         {
                                             nombre: "ICO Hospitalet",
                                             lineasBus: "1, 2, 10, 70, 72, 80, 81, 86, 87, 94, 95, 46, 65",
                                             metro: "Línea 1 (Hospital de Bellvitge)",
                                             latitude: 41.375267,
                                             longitude: 2.149080
                                         }
                                     ]
                                 }
                             ]}
                             renderItem={({item}) =>
                                <Card style={styles.cardComoLlegar}>
                                    <Text style={{fontSize: 24}}>{I18n.t("COMO_LLEGAR_HOSP_REF")}: {item.nombre}</Text>
                                    <View style={{flexDirection: 'row', flex: 1}}>
                                        <TouchableOpacity style={{flex: 1}} onPress={() =>  OpenMap.show({
                                            latitude: item.latitude,
                                            longitude: item.longitude
                                            })}>
                                            <MapView
                                                style={{flex: 1, marginBottom: NORMAL_MARGIN}}
                                                initialRegion={{
                                                    latitude: item.latitude,
                                                    longitude: item.longitude,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421
                                                }}
                                            >
                                                <Marker coordinate={{latitude: item.latitude,
                                                    longitude: item.longitude}}
                                                />
                                            </MapView>
                                        </TouchableOpacity>
                                        <View style={{flex: 1, paddingLeft: 10}}>
                                            <Text style={{marginBottom: 10}}>{I18n.t("COMO_LLEGAR_BUS_LINEAS")}: {item.lineasBus}</Text>
                                            <Text>{I18n.t("COMO_LLEGAR_METRO")}: {item.metro}</Text>
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
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                        {selectProvincias}
                    </Picker>
                </Card>
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
        alignItems: 'center'
    }
});