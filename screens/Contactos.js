import React from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, StyleSheet, View, SectionList, Text} from "react-native";
import TitleComponent from "../components/TitleComponent";
import {Card} from "react-native-shadow-cards";

export default function ScreenContactos({navigation, route}) {

    const {titleName} = route.params;

    return (
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
                        style={styles.linearGradient}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                {/* HEADER */}
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation}/>
                </Card>
                {/* END HEADER */}
                <SectionList style={styles.cardContactos}
                             sections={[
                                 {
                                     data: [
                                         {
                                             titulo: "ICO Hospitalet",
                                             informacion: {
                                                 telefono: "932 607 733",
                                                 telefonoFecha: "de 8:00 a 22:00",
                                                 correo: "ico@iconlogia.net"
                                             },
                                             unidadAtencion: {
                                                 telefono: "932 607 780",
                                                 telefonoFecha: "Lunes, miercoles i jueves 9-14 Martes y Jueves 9-14 y 15-16:30 no festivos"
                                             },
                                             telUrgencias: "93 401 41 05"
                                         },
                                         {
                                             titulo: "ICO Hospitalet",
                                             informacion: {
                                                 telefono: "932 607 733",
                                                 telefonoFecha: "de 8:00 a 22:00",
                                                 correo: "ico@iconlogia.net"
                                             },
                                             unidadAtencion: {
                                                 telefono: "932 607 780",
                                                 telefonoFecha: "Lunes, miercoles i jueves 9-14 Martes y Jueves 9-14 y 15-16:30 no festivos"
                                             },
                                             telUrgencias: "93 401 41 05"
                                         }
                                     ]
                                 }
                             ]}
                             renderItem={({item}) =>
                                 <Card style={styles.cardHospital}>
                                     <Text style={{fontSize: 24}}>{item.titulo}</Text>
                                     <View style={{flexDirection: 'row'}}>
                                         <Text style={{marginTop: 4}}>{'\u2B24'}</Text>
                                         <View style={{marginLeft: 12}}>
                                             <Text style={{fontSize: 20}}>Información:</Text>
                                             <Text style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                                 <Text>Teléfono: </Text>
                                                 <Text style={{fontSize: 15, color: 'blue'}}>{item.informacion.telefono} </Text>
                                                 <Text>({item.informacion.telefonoFecha})</Text>
                                             </Text>
                                             <Text style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                                 <Text>Correo electrónico: </Text>
                                                 <Text style={{fontSize: 15, color: 'blue'}}>{item.informacion.correo} </Text>
                                             </Text>
                                         </View>
                                     </View>
                                     <View style={{flexDirection: 'row'}}>
                                         <Text style={{marginTop: 4}}>{'\u2B24'}</Text>
                                         <View style={{marginLeft: 12}}>
                                             <Text style={{fontSize: 20}}>Unidad de atención a la ciutadanía:</Text>
                                             <Text style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                                 <Text>Teléfono: </Text>
                                                 <Text style={{fontSize: 15, color: 'blue'}}>{item.unidadAtencion.telefono} </Text>
                                                 <Text>({item.unidadAtencion.telefonoFecha})</Text>
                                             </Text>
                                         </View>
                                     </View>
                                     <View style={{flexDirection: 'row'}}>
                                         <Text style={{marginTop: 4}}>{'\u2B24'}</Text>
                                         <View style={{marginLeft: 12}}>
                                             <Text style={{fontSize: 20}}>Atención de urgencias 24h:</Text>
                                             <Text style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                                 <Text>Teléfono: </Text>
                                                 <Text style={{fontSize: 15, color: 'blue'}}>{item.telUrgencias} </Text>
                                             </Text>
                                         </View>
                                     </View>
                                 </Card>
                             }
                />

            </View>
        </LinearGradient>
    );

};

//Constantes de tamano responsive
const {width, height} = Dimensions.get('window');
const MAIN_CARD_WIDTH = width * 0.9;
const MAIN_CARD_HEIGHT = height * 0.75;

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
        height: 'auto'
    },
    cardHospital: {
        padding: NORMAL_MARGIN,
        margin: NORMAL_MARGIN,
        borderWidth: 1
    }
});