import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, SectionList, View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { Card } from "react-native-shadow-cards";
import TitleComponent from '../components/TitleComponent';
import MedicationComponent from '../components/MedicationComponent';

export default function ScreenPerfil({ navigation, route }) {

    const { titleName } = route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    // Render the list
    return (
        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
            style={styles.linearGradient}>
            <View style={{ alignItems: 'center' }}>
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation} />
                </Card>
                <SectionList style={styles.cardPerfil}
                    sections={[
                        {
                            data: [
                                {
                                    titulo: "Paracetamol",
                                    nVeces: 3,
                                    pHoras: 8,
                                    cMedicacion: "500Mg"
                                },
                                {
                                    titulo: "Paracetamol",
                                    nVeces: 3,
                                    pHoras: 8,
                                    cMedicacion: "500Mg"
                                },
                                {
                                    titulo: "Paracetamol",
                                    nVeces: 3,
                                    pHoras: 8,
                                    cMedicacion: "500Mg"
                                }, {
                                    titulo: "Paracetamol",
                                    nVeces: 3,
                                    pHoras: 8,
                                    cMedicacion: "500Mg"
                                }, {
                                    titulo: "Paracetamol",
                                    nVeces: 3,
                                    pHoras: 8,
                                    cMedicacion: "500Mg"
                                }, {
                                    titulo: "Paracetamol",
                                    nVeces: 3,
                                    pHoras: 8,
                                    cMedicacion: "500Mg"
                                },
                                {
                                    titulo: "Paracetamol",
                                    nVeces: 3,
                                    pHoras: 8,
                                    cMedicacion: "500Mg"
                                },
                                {
                                    titulo: "Paracetamol",
                                    nVeces: 3,
                                    pHoras: 8,
                                    cMedicacion: "500Mg"
                                },
                                {
                                    titulo: "Paracetamol",
                                    nVeces: 3,
                                    pHoras: 8,
                                    cMedicacion: "500Mg"
                                }]
                        },
                    ]}
                    renderItem={({ item }) =>
                        // <Text style={styles.item}>{item}</Text>
                        <MedicationComponent
                            tituloMedicamento={item.titulo}
                            numeroDeVecesDia={item.nVeces}
                            periodoDeHoras={item.pHoras}
                            cantidadDeMedicacion={item.cMedicacion}
                        />
                    }
                    renderSectionHeader={({ section }) =>
                        //Componente de la medicación
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    }
                    keyExtractor={(item, index) => index}
                />
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
        height: MAIN_CARD_HEIGHT,
        margin: MINIMUN_MARGIN,

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