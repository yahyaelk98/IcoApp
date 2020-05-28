import React, {useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Dimensions, StyleSheet, View, SectionList, Text, Modal, Alert} from "react-native";
import {Card} from "react-native-shadow-cards";
import TitleComponent from "../components/TitleComponent";
import {Button, Input} from 'react-native-elements';

export default function ScreenBlogRespuestas({navigation, route}) {
    const {titleName} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [value, onChangeText] = useState('');

    return (
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
                        style={styles.linearGradient}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                {/* HEADER */}
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation}/>
                </Card>
                {/* END HEADER */}
                <Card style={styles.cardComentario}>
                    <View>
                        <Text style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>Manel R.</Text>
                            <View style={{width: 8, height: 1}}/>
                            <Text >fa 3 díes</Text>
                        </Text>
                        <Text style={{marginLeft: 16, fontSize: 16}}>
                            Oye si me duele la cabeza significa que voy a morir?
                        </Text>
                    </View>
                </Card>
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
                                 <Card style={styles.cardRespuesta}>
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
                        title="RESPONDER"
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            </View>
            <Modal
            visible={modalVisible}
            transparent={true}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row'}}>
                        <Input
                            placeholder='Escribe una respuesta'
                            value={value}
                            onChangeText={text => onChangeText(text)}
                        />
                    </View>
                    <Button
                        buttonStyle={{
                            paddingLeft: 24,
                            paddingRight: 24
                        }}
                        titleStyle={{
                            fontSize: 20
                        }}
                        title="Enviar"
                        onPress={function(){
                            //Alert.alert("jajaja");
                            console.log(value);
                            setModalVisible(false);
                        }
                        }
                    />
                </View>
            </View>

        </Modal>
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
        paddingLeft: NORMAL_MARGIN
    },
    cardComentario: {
        padding: NORMAL_MARGIN,
        margin: MINIMUN_MARGIN,
        borderWidth: 1
    },
    cardRespuesta: {
        padding: NORMAL_MARGIN,
        margin: MINIMUN_MARGIN,
        borderWidth: 1
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});
