import React from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, StyleSheet, View, SectionList, Text} from "react-native";
import {Card} from "react-native-shadow-cards";
import TitleComponent from "../components/TitleComponent";
import {Button} from 'react-native-elements';

export default function ScreenBlog({navigation, route}) {

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
                <SectionList style={styles.list}
                    sections={[
                        {
                            data: [
                                {
                                    id: 1,
                                    nombreUsuario: "Manel R.",
                                    fechaPubl: "fa 16 hores",
                                    comentario: "Oye si me duele la cabeza significa que voy a morir?"
                                },
                                {
                                    id: 2,
                                    nombreUsuario: "Jose M.",
                                    fechaPubl: "fa 2 dies",
                                    comentario: "Que significa si he tosido dos veces en un día?"
                                },
                                {
                                    id: 3,
                                    nombreUsuario: "Manel R.",
                                    fechaPubl: "fa 16 hores",
                                    comentario: "Oye si me duele la cabeza significa que voy a morir?"
                                }
                            ]
                        }
                    ]}
                    renderItem={({item}) =>
                        <Card style={styles.cardComentario}>
                            <View>
                                <Text style={{flexDirection: 'row', flex: 1}}>
                                    <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.nombreUsuario}</Text>
                                    <View style={{width: 8, height: 1}}/>
                                    <Text >{item.fechaPubl}</Text>
                                </Text>
                                <Text style={{marginLeft: 16, fontSize: 16}}>
                                    {item.comentario}
                                </Text>
                            </View>
                        </Card>
                    }
                />
                <View style={{padding: NORMAL_MARGIN}}>
                    <Button
                        buttonStyle={{
                            paddingLeft: 24,
                            paddingRight: 24
                        }}
                        titleStyle={{
                            fontSize: 20
                        }}
                        title="COMENTAR"
                        onPress={() => console.log("aqui")}
                    />
                </View>
            </View>
        </LinearGradient>
    );

}

const { width, height } = Dimensions.get('window');
const MAIN_CARD_HEIGHT = height * 0.70;

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
    list: {
        margin: MINIMUN_MARGIN,
        //height: MAIN_CARD_HEIGHT,
    },
    cardComentario: {
        padding: NORMAL_MARGIN,
        margin: MINIMUN_MARGIN,
        borderWidth: 1
    }
});
