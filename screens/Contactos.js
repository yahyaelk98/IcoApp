import React, {useEffect, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet, View, SectionList, Text, ActivityIndicator, Dimensions} from "react-native";
import TitleComponent from "../components/TitleComponent";
import {Card} from "react-native-shadow-cards";

export default function ScreenContactos({navigation, route}) {
    const {titleName} = route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/hospitales')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
                        style={styles.linearGradient}>
            <View style={{alignItems: 'center' , flex: 1}}>
                {/* HEADER */}
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation}/>
                </Card>
                {/* END HEADER */}
                {isLoading ? <ActivityIndicator/> :
                    <SectionList style={styles.cardContactos}
                                 sections={[
                                     {
                                         data: data
                                     }
                                 ]}
                                 renderItem={({item}) =>
                                     <Card style={styles.cardHospital}>
                                         <Text style={{fontSize: 24}}>{item.nombre}</Text>
                                         <View style={{flexDirection: 'row'}}>
                                             <Text style={{marginTop: 4}}>{'\u2B24'}</Text>
                                             <View style={{marginLeft: 12}}>
                                                 <Text style={{fontSize: 20}}>Información:</Text>
                                                 <Text style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                                     <Text>Teléfono: </Text>
                                                     <Text style={{fontSize: 15, color: 'blue'}}>{item.telefonos.telefono[0]} </Text>
                                                     <Text></Text>
                                                 </Text>
                                                 <Text style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                                     <Text>Correo electrónico: </Text>
                                                     <Text style={{fontSize: 15, color: 'blue'}}>{item.correos.correo[0]} </Text>
                                                 </Text>
                                             </View>
                                         </View>
                                         <View style={{flexDirection: 'row'}}>
                                             <Text style={{marginTop: 4}}>{'\u2B24'}</Text>
                                             <View style={{marginLeft: 12}}>
                                                 <Text style={{fontSize: 20}}>Unidad de atención a la ciutadanía:</Text>
                                                 <Text style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                                     <Text>Teléfono: </Text>
                                                     <Text style={{fontSize: 15, color: 'blue'}}>{item.telefonos.telefono[1]} </Text>
                                                     <Text>{item.diasAbiertos}</Text>
                                                 </Text>
                                             </View>
                                         </View>
                                         <View style={{flexDirection: 'row'}}>
                                             <Text style={{marginTop: 4}}>{'\u2B24'}</Text>
                                             <View style={{marginLeft: 12}}>
                                                 <Text style={{fontSize: 20}}>Atención de urgencias 24h:</Text>
                                                 <Text style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                                     <Text>Teléfono: </Text>
                                                     <Text style={{fontSize: 15, color: 'blue'}}>{item.telefonos.telefono[2]} </Text>
                                                 </Text>
                                             </View>
                                         </View>
                                     </Card>
                                 }
                    />
                }


            </View>
        </LinearGradient>
    );

};

//Constantes de tamano responsive
const { width, height } = Dimensions.get('window');
const MAIN_CARD_WIDTH = width * 0.9;
const MAIN_CARD_HEIGHT = height * 0.8;

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
    cardContactos: {
        margin: MINIMUN_MARGIN,
        //height: MAIN_CARD_HEIGHT
    },
    cardHospital: {
        padding: NORMAL_MARGIN,
        margin: NORMAL_MARGIN,
        borderWidth: 1
    }
});