import React from 'react';
import { StyleSheet, View, Text, Dimensions , Image} from "react-native";
import { Card } from "react-native-shadow-cards";



class MedicationComponent extends React.Component {
    tituloMedicamento;
    numeroDeVecesDia;
    periodoDeHoras;
    cantidadDeMedicacion;

    render() {
        this.tituloMedicamento = this.props.tituloMedicamento;
        this.numeroDeVecesDia = this.props.numeroDeVecesDia;
        this.periodoDeHoras = this.props.periodoDeHoras;
        this.cantidadDeMedicacion = this.props.cantidadDeMedicacion;
        return (
            <Card style={styles.cardMedicacion}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image
                        source={require("../assets/imgMedicacion/pills4.png")}
                        style={styles.image}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center',flex:12 }}>
                        {/* Texto o nombre vulgar del medicamento */}
                        <Text style={styles.textNormal}>{this.tituloMedicamento}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {/* Numero de veces al día y cada cuantas horas  */}
                            <Text style={styles.textGrey}>{this.numeroDeVecesDia} x {this.periodoDeHoras} horas </Text>
                            {/* Cantidad de medicamento */}
                            <Text style={styles.textGrey}>{this.cantidadDeMedicacion}</Text>
                        </View>
                    </View>
                </View>
            </Card>

        );
    }

}
export default MedicationComponent;

//Constantes de tamano responsive
const { width, height } = Dimensions.get('window');

const MINIMUN_MARGIN = '1%';
const NORMAL_MARGIN = '5%';

const MAIN_CARD_WIDTH = width * 0.9;
const MAIN_CARD_HEIGHT = height * 0.12;

const TEXT_GREY_WIDTH = width * 0.06;
const TEXT_BLACK_WIDTH = width * 0.1;

const ICON_FONT_SIZE_NORMAL = width * 0.1;


const styles = StyleSheet.create({
    cardMedicacion: {
        width: MAIN_CARD_WIDTH,
        height: MAIN_CARD_HEIGHT,
        padding: MINIMUN_MARGIN,
        margin: MINIMUN_MARGIN,

    },
    textNormal: {
        fontSize: TEXT_BLACK_WIDTH,
    },
    textGrey: {
        fontSize: TEXT_GREY_WIDTH,
        color: '#8F8F8F'
    },
    image:{
       width: ICON_FONT_SIZE_NORMAL,
       height: ICON_FONT_SIZE_NORMAL,
        margin:NORMAL_MARGIN,
        marginRight:0
       }

});

