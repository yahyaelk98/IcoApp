import React, {useEffect, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {
    Dimensions,
    StyleSheet,
    View,
    SectionList,
    Text,
    TouchableOpacity,
    Modal,
    ActivityIndicator, Image,
    Alert
} from "react-native";
import {Card} from "react-native-shadow-cards";
import TitleComponent from "../components/TitleComponent";
import {Button, Input} from 'react-native-elements';
import I18n from '../idiomas/idioma';

export default function ScreenBlog({navigation, route}) {
    const {titleName} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [value, onChangeText] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);



    useEffect(() => {
        fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/preguntas')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error))
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
                {isLoading? <ActivityIndicator/> :
                    <View style={{flex: 1}}>
                        <SectionList style={styles.list}
                                     sections={[
                                         {
                                             data: data
                                         }
                                     ]}
                                     renderItem={({item}) =>
                                         <TouchableOpacity onPress={() => navigation.navigate("BLOGRESPUESTA", {titleName: titleName, id: item.id, nombre: item.nombre, apellido: item.apellido, fecha: item.fecha.date, pregunta: item.pregunta})}>
                                             <Card style={styles.cardComentario}>
                                                 <View>
                                                     <Text style={{flexDirection: 'row', flex: 1}}>
                                                         <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.nombre} {item.apellido.charAt(0)}.</Text>
                                                         <View style={{width: 8, height: 1}}/>
                                                         <Text >{
                                                             I18n.t("ICO_BLOG_HACE_DIAS", {dias: diasDesde(new Date(item.fecha.date.split(' ')[0]))})
                                                         }</Text>
                                                     </Text>
                                                     <Text style={{marginLeft: 16, fontSize: 16}}>
                                                         {item.pregunta}
                                                     </Text>
                                                 </View>
                                             </Card>
                                         </TouchableOpacity>
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
                                fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/pregunta',{
                                    method: 'POST',
                                    body: JSON.stringify({
                                        "pregunta": value
                                    })
                                }).then(function(){
                                    onChangeText('');
                                    Alert.alert("Pregunta enviada");
                                }).catch(() => Alert.alert("Error al enviar pregunta"))
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
    },
    cardComentario: {
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
