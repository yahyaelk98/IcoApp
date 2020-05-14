import React, {useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Image, StyleSheet, View, Text} from "react-native";
import {Card} from "react-native-shadow-cards";
import {RadioButton} from "react-native-paper";
import TitleComponent from '../components/TitleComponent';
import I18n from '../idiomas/idioma';

export default function ScreenIdioma({navigation,route}) {

    const [idioma, setIdioma] = useState(I18n.locale);
    const { titleName } = route.params;

    return (
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
                        style={styles.linearGradient}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {/* HEADER */}
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation}/>
                </Card>
                {/* END HEADER */}
                <Card style={styles.cardIdiomas}>
                    <View style={{flexDirection: 'row'}}>
                            <RadioButton
                                value="es"
                                status={idioma === "es" ? "checked" : "unchecked"}
                                onPress={() => {
                                    I18n.locale = "es";
                                    setIdioma("es");
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
                            value="cat"
                            status={idioma === "cat" ? "checked" : "unchecked"}
                            onPress={() => {
                                I18n.locale = "cat";
                                setIdioma("cat");
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
                            value="en"
                            status={idioma === "en" ? "checked" : "unchecked"}
                            onPress={() => {
                                I18n.locale = "en";
                                setIdioma("en");
                            }}
                        />
                        <View style={{flex: 1,justifyContent: 'center', marginLeft: 24}}>
                            <Image style={{width: 32, height: 21,}}
                                   source={require('../assets/imgIdioma/bandera-inglaterra.png')}/>
                        </View>
                        <Text style={{flex: 3,fontSize: 24}}>English</Text>
                    </View>
                </Card>
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