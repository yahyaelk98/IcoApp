import React, {useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Image, StyleSheet, View, Text} from "react-native";
import ThreeDotsMenu from "../components/ThreeDotsMenu";
import {Card} from "react-native-shadow-cards";
import ButtonBack from "./ButtonBack";
import {RadioButton} from "react-native-paper";

export default function ScreenIdioma({navigation}) {

    const [idioma, setIdioma] = useState("es");

    return (
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
                        style={styles.linearGradient}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {/* HEADER */}
                <Card style={styles.cardHeader}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <ButtonBack navigation={navigation}/>
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 8}}>
                            <Text style={styles.textHeader}>Cambio de Idioma</Text>
                        </View>
                        <ThreeDotsMenu navigation={navigation}/>
                    </View>
                </Card>
                <Card style={styles.cardIdiomas}>
                    <View style={{flexDirection: 'row'}}>
                            <RadioButton
                                value="es"
                                status={idioma === "es" ? "checked" : "unchecked"}
                                onPress={() => {
                                    setIdioma("es")
                                }}
                            />
                        <View style={{flex: 1,justifyContent: 'center', marginLeft: 24}}>
                            <Image style={{width: 32, height: 21,}}
                                   source={require('../assets/imgIdioma/bandera-espana.png')}/>
                        </View>
                        <Text style={{flex: 3,fontSize: 24}}>Español</Text>
                    </View>
                </Card>
                <Card style={styles.cardIdiomas}>
                    <View style={{flexDirection: 'row'}}>
                        <RadioButton
                            value="es"
                            status={idioma === "cat" ? "checked" : "unchecked"}
                            onPress={() => {
                                setIdioma("cat")
                            }}
                        />
                        <View style={{flex: 1,justifyContent: 'center', marginLeft: 24}}>
                            <Image style={{width: 32, height: 21,}}
                                   source={require('../assets/imgIdioma/bandera-catalunya.png')}/>
                        </View>
                        <Text style={{flex: 3,fontSize: 24}}>Català</Text>
                    </View>
                </Card>
                <Card style={styles.cardIdiomas}>
                    <View style={{flexDirection: 'row'}}>
                        <RadioButton
                            value="es"
                            status={idioma === "en" ? "checked" : "unchecked"}
                            onPress={() => {
                                setIdioma("en")
                            }}
                        />
                        <View style={{flex: 1,justifyContent: 'center', marginLeft: 24}}>
                            <Image style={{width: 32, height: 21,}}
                                   source={require('../assets/imgIdioma/bandera-inglaterra.png')}/>
                        </View>
                        <Text style={{flex: 3,fontSize: 24}}>English</Text>
                    </View>
                </Card>
                {/* END HEADER */}
            </View>
        </LinearGradient>
    );
}

//Constantes de tamano responsive
const MAX_SIZE = '100%';
const NORMAL_MARGIN = '5%';
const BIG_MARGIN = '10%';
const MINIMUN_MARGIN = '1%';
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
    textHeader: {
        textAlign: 'center',
        fontSize: 24
    },
    linearGradient: {
        width: MAX_SIZE,
        height: MAX_SIZE
    },
    cardIdiomas: {
        padding: NORMAL_MARGIN, margin: NORMAL_MARGIN,
        marginBottom: MINIMUN_MARGIN
    }
});