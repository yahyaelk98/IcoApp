import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Dimensions, ActivityIndicator, SectionList, Text } from "react-native";
import { Card } from "react-native-shadow-cards";
import TitleComponent from '../components/TitleComponent';
import CalendarComponent from '../components/CalendarComponent';
import DateComponent from '../components/DateComponent';
export default function ScreenPerfil({ navigation, route }) {

    const { titleName } = route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    useEffect(() => {
        fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/citas')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // Render the list
    return (

        <LinearGradient colors={[GRADIENT_COLOR_A, GRADIENT_COLOR_B, GRADIENT_COLOR_C]}
            style={styles.linearGradient}>
            <View style={{ alignItems: 'center' }}>
                <Card style={styles.cardHeader}>
                    <TitleComponent titleName={titleName} navigation={navigation} />
                </Card>
                <Card style={styles.cardPerfil}>
                    <View style={{ alignItems: 'center' }}>
                        <CalendarComponent />
                        <Text style={{fontSize:FONT_SIZE_NORMAL, marginBottom:-45}}>Citas pendientes:</Text>
                        {isLoading ? <ActivityIndicator /> :
                            <SectionList style={styles.cardPerfil}
                                sections={[
                                    {
                                        data: data
                                    },
                                ]}
                                renderItem={({ item }) =>

                                    <DateComponent
                                        tituloCita={item.nombre}
                                        id={item.id}
                                        fecha={item.fecha.date}
                                        hora={item.hora.date}
                                    />
                                }
                                renderSectionHeader={({ section }) =>
                                    //Componente de la medicación
                                    <Text style={styles.sectionHeader}>{section.title}</Text>
                                }
                                keyExtractor={(item, index) => index}
                            />}
                    </View>
                </Card>

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



const FONT_SIZE_NORMAL = width * 0.07;

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

    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});