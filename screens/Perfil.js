import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";


import { Card } from "react-native-shadow-cards";


import TitleComponent from '../components/TitleComponent';

export default function ScreenPerfil({ navigation, route }) {

    const [idioma, setIdioma] = useState("es");
    const { titleName } = route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    //Usamos una API pública para testear usuarios
    useEffect(() => {
        fetch('https://randomuser.me/api/')
            .then((response) => response.json())
            .then((json) => setData(json.results))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
            style={styles.linearGradient}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {/* HEADER */}
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation} />
                </Card>
                {/* END HEADER */}
                {/* Cuando sea false la variable isLoading signifa que ya se ha recibido respuesta
                /* y se puede mostrar el contenido
                */}
                {isLoading ? <ActivityIndicator /> :
                    <Card style={styles.cardPerfil}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                source={{ uri: 'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png', }}
                                style={styles.imagePerfil}
                            />
                            {/* Recogemos los datos de manera para hacer pruebas directamente de la respuesta de la API */}
                            <Text style={{ fontSize: ICON_FONT_SIZE_HEADER }}>{data[0].name.first + " " + data[0].name.last}</Text>
                            <Text style={{ fontSize: ICON_FONT_SIZE_NORMAL, color: '#8F8F8F' }}>Hospital Maria Teresa</Text>
                            <Text style={styles.profileElement}>{data[0].email}</Text>
                            <Text style={styles.profileElement}>{data[0].phone}</Text>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={styles.profileElement}>{data[0].registered.age} años</Text>
                                <Text style={{ marginLeft: NORMAL_MARGIN, fontSize: ICON_FONT_SIZE_NORMAL }}>{data[0].gender=="male"?"Hombre":"Mujer"}</Text>
                            </View>
                            <Separator />

                            <TouchableOpacity>
                                <Text style={styles.profileButton} >Editar perfil</Text>
                            </TouchableOpacity>
                            <Separator />

                            <TouchableOpacity ><Text style={styles.profileButton} >Generar QR</Text></TouchableOpacity>
                        </View>
                    </Card>}
            </View>
        </LinearGradient>
    );
}


function Separator() {
    return <View style={styles.separator} />;
}

//Constantes de tamano responsive
const { width, height } = Dimensions.get('window');
const MAIN_CARD_WIDTH = width * 0.9;
const MAIN_CARD_HEIGHT = height * 0.75;

const PROFILE_IMAGE_WIDTH = width * 0.3;

const BUTTON_PROFILE_HEIGHT = width * 0.12;
const BUTTON_PROFILE_WIDTH = width * 0.3;

const ICON_FONT_SIZE_HEADER = width * 0.08;
const ICON_FONT_SIZE_NORMAL = width * 0.05;

const NORMAL_MARGIN = '5%';
const BIG_MARGIN = '10%';
const BUTTON_MARGIN = '3%';
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
    textHeader: {
        textAlign: 'center',
        fontSize: 24
    },
    linearGradient: {
        width: MAX_SIZE,
        height: MAX_SIZE
    },
    cardPerfil: {
        width: MAIN_CARD_WIDTH,
        height: MAIN_CARD_HEIGHT,
        padding: NORMAL_MARGIN,
        margin: NORMAL_MARGIN,
    },
    imagePerfil: {
        width: PROFILE_IMAGE_WIDTH,
        height: PROFILE_IMAGE_WIDTH,
        borderRadius: (200 / 2),
        padding: NORMAL_MARGIN,
        margin: NORMAL_MARGIN
    },
    profileElement: {
        fontSize: ICON_FONT_SIZE_NORMAL,
        marginTop: MINIMUN_MARGIN
    },
    profileButton: {
        fontSize: ICON_FONT_SIZE_NORMAL,
        backgroundColor: "#007bff",
        padding: BUTTON_MARGIN,
        borderRadius: 10,
        width: BUTTON_PROFILE_WIDTH,
        height: BUTTON_PROFILE_HEIGHT,
        textAlignVertical: "center",
        color: "#FFF"
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});