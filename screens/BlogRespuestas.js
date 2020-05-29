import React, {useEffect, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {
    Dimensions,
    StyleSheet,
    View,
    SectionList,
    Text,
    Modal,
    Alert,
    ActivityIndicator,
    TouchableOpacity, Image
} from "react-native";
import {Card} from "react-native-shadow-cards";
import TitleComponent from "../components/TitleComponent";
import {Button, Input} from 'react-native-elements';
import I18n from "../idiomas/idioma";

export default function ScreenBlogRespuestas({navigation, route}) {
    const {titleName, id, nombre, apellido, fecha, pregunta} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [value, onChangeText] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/respuesta/'+id)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch(function(error){
                console.log(error);
                setData({id: id,nombre: nombre, apellido: apellido, fecha: {date: fecha}, pregunta: pregunta, respuesta: []});
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
                        style={styles.linearGradient}>
            <View style={{alignItems: 'center', flex: 1}}>
                {/* HEADER */}
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation}/>
                </Card>
                {/* END HEADER */}
                {isLoading ? <ActivityIndicator/> :
                    <View style={{flex: 1}}>
                        <Card style={styles.cardComentario}>
                            <View>
                                <Text style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: 18, fontWeight: "bold"}}>{data.nombre} {data.apellido.charAt(0)}.</Text>
                                    <View style={{width: 8, height: 1}}/>
                                    <Text >{I18n.t("ICO_BLOG_HACE_DIAS", {dias: diasDesde(new Date(data.fecha.date.split(' ')[0]))})}</Text>
                                </Text>
                                <Text style={{marginLeft: 16, fontSize: 16}}>
                                    {data.pregunta}
                                </Text>
                            </View>
                        </Card>
                        <SectionList style={styles.list}
                                     sections={[
                                         {
                                             data: data.respuesta
                                         }
                                     ]}
                                     renderItem={({item}) =>
                                         <Card style={styles.cardRespuesta}>
                                             <View>
                                                 <Text style={{flexDirection: 'row', flex: 1}}>
                                                     <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.nombre} {item.apellido.charAt(0)}.</Text>
                                                     <View style={{width: 8, height: 1}}/>
                                                     <Text >{I18n.t("ICO_BLOG_HACE_DIAS", {dias: diasDesde(new Date(item.fecha.date.split(' ')[0]))})}</Text>
                                                 </Text>
                                                 <Text style={{marginLeft: 16, fontSize: 16}}>
                                                     {item.respuesta}
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
                }
            </View>
            <Modal
            visible={modalVisible}
            transparent={true}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.modalView}>
                    <View style={{flexDirection:'row', marginBottom: 16}}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style={{width: 30, height: 30}} onPress={() => setModalVisible(false)}>
                                <Image
                                    style={{ width: 30 , height: 30 }}
                                    source={require('../assets/global/close.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
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
                            fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/respuesta/'+data.id,{
                                method: 'POST',
                                body: JSON.stringify({
                                    "respuesta": value
                                })
                            }).then(function(){
                                onChangeText('');
                                Alert.alert("Respuesta enviada");
                            }).catch(() => Alert.alert("Error al enviar respuesta"))
                                .finally(() => setModalVisible(false));
                        }
                        }
                    />
                </View>
            </View>

        </Modal>
        </LinearGradient>
    );

}

function diasDesde(fecha) {
    return Math.round((new Date()-fecha)/(1000*60*60*24));
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
        marginLeft: NORMAL_MARGIN,
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
