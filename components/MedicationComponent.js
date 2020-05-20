import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, TextInput, Alert, Modal, TouchableHighlight } from "react-native";
import { Card } from "react-native-shadow-cards";


class MedicationComponent extends React.Component {
    tituloMedicamento;
    numeroDeVecesDia;
    periodoDeHoras;
    cantidadDeMedicacion;
    alarmaActiva;

    state = {
        modalVisible: false
    };
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });

    }

    render() {
        const { modalVisible } = this.state;

        this.tituloMedicamento = this.props.tituloMedicamento;
        this.numeroDeVecesDia = this.props.numeroDeVecesDia;
        this.periodoDeHoras = this.props.periodoDeHoras;
        this.cantidadDeMedicacion = this.props.cantidadDeMedicacion;
        //Control de alarma
        this.alarmaActiva = true;
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                this.setModalVisible(true);
            }}>

                <Card style={styles.cardMedicacion}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image
                            source={require("../assets/imgMedicacion/pills4.png")}
                            style={styles.image}
                        />

                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 12 }}>
                            {/* Texto o nombre vulgar del medicamento */}
                            <Text style={styles.textNormal}>{this.tituloMedicamento}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                {/* Numero de veces al día y cada cuantas horas  */}
                                <Text style={styles.textGrey}>{this.numeroDeVecesDia} x {this.periodoDeHoras} horas </Text>
                                {/* Cantidad de medicamento */}
                                <Text style={styles.textGrey}>{this.cantidadDeMedicacion}</Text>
                            </View>
                        </View>

                        <TouchableOpacity >
                            <Image
                                source={this.alarmaActiva ? require("../assets/imgMedicacion/alarm.png") : require("../assets/imgMedicacion/disable-alarm.png")}
                                style={styles.alarmActive}
                                tintColor={this.alarmaActiva ? SUCCESS_COLOR : DANGER_COLOR}
                            />
                        </TouchableOpacity>

                    </View>
                </Card>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <Card style={styles.cardModal}>
                            <View style={styles.modalView}>
                                <Card style={styles.cardMedicationTitle}>
                                    <Image
                                        source={require("../assets/imgMedicacion/pills4.png")}
                                        style={styles.image}
                                    />
                                    <Text style={styles.medicationModalTextHeader}>Paracetamol STADA</Text>
                                </Card>
                                <Card style={styles.cardMedicationBody}>
                                    <Text style={styles.medicationModalTextHeader}>Comrpimidos EFG</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.medicationModalText}>40 comrpimidos</Text>
                                        <Text style={styles.medicationModalText}>1G</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.medicationModalText}>3 veces cada 8h</Text>
                                        <Text style={styles.medicationModalText}>1 Comrpimido</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.medicationModalText}>20 Días</Text>
                                        <TouchableOpacity >
                                            <Image
                                                source={this.alarmaActiva ? require("../assets/imgMedicacion/alarm.png") : require("../assets/imgMedicacion/disable-alarm.png")}
                                                style={styles.alarmActive}
                                                tintColor={this.alarmaActiva ? SUCCESS_COLOR : DANGER_COLOR}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.medicationModalText}>Observaciones:</Text>
                                    <TextInput style={styles.observation} multiline={true} numberOfLines={4} />
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(!modalVisible);
                                            }}
                                        >

                                            <Text style={styles.downloadButton}>Descargar receta</Text>

                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(!modalVisible);
                                            }}
                                        >
                                            <Text style={styles.cancelButton}>Cerrar</Text>
                                        </TouchableHighlight>
                                    </View>

                                </Card>

                            </View>
                        </Card>

                    </View>
                </Modal>
            </TouchableOpacity>



        );
    }

}
export default MedicationComponent;

//Constantes de tamano responsive
const { width, height } = Dimensions.get('window');

const MINIMUN_MARGIN = '1%';
const NORMAL_MARGIN = '5%';
const BIG_MARGIN = '20%';


const MAIN_CARD_WIDTH = width * 0.9;
const MAIN_CARD_HEIGHT = height * 0.12;
const MAIN_CARD_MODAL_HEIGHT = height * 0.8;
const MAIN_CARD_MODAL_WIDTH = width * 0.9;
const SECONDAY_CARD_MODAL_WIDTH = width * 0.8;
const SECONDAY_CARD_MODAL_HEIGHT = height * 0.6;

const STANDAR_FONT_SIZE = width * 0.04;
const BIG_FONT_SIZE = width * 0.06;

const ICON_SIZE_NORMAL = width * 0.1;
const ICON_SIZE_SMALL = width * 0.08;

const BUTTON_CONTROL_HEIGHT = width * 0.1;
const BUTTON_CONTROL_WIDTH = width * 0.4;
const BUTTON_MARGIN = '3%';

const SUCCESS_COLOR = "#007E33";
const PRIMARY_COLOR = "#4285F4";
const DANGER_COLOR = "#CC0000";
const GREY_COLOR = "#8F8F8F";

const styles = StyleSheet.create({
    cardMedicacion: {
        width: MAIN_CARD_WIDTH,
        height: MAIN_CARD_HEIGHT,
        padding: MINIMUN_MARGIN,
        margin: MINIMUN_MARGIN,

    },
    textNormal: {
        fontSize: BIG_FONT_SIZE,
    },
    textGrey: {
        fontSize: STANDAR_FONT_SIZE,
        color: GREY_COLOR
    },
    image: {
        width: ICON_SIZE_NORMAL,
        height: ICON_SIZE_NORMAL,
        margin: NORMAL_MARGIN,
        marginRight: 0
    },
    alarmActive: {
        width: ICON_SIZE_SMALL,
        height: ICON_SIZE_SMALL,
        marginRight: NORMAL_MARGIN,
        marginTop: BIG_MARGIN,
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    medicationModalText: {
        fontSize: STANDAR_FONT_SIZE,
        margin: MINIMUN_MARGIN,
        width: "50%"
    },
    medicationModalTextHeader: {
        fontSize: BIG_FONT_SIZE,
        margin: MINIMUN_MARGIN,

    },
    cardModal: {
        backgroundColor: PRIMARY_COLOR,
        height: MAIN_CARD_MODAL_HEIGHT,
        width: MAIN_CARD_MODAL_WIDTH,
        borderWidth: 3
    },
    cardMedicationTitle: {
        width: SECONDAY_CARD_MODAL_WIDTH,
        margin: NORMAL_MARGIN,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 3

    },
    cardMedicationBody: {
        width: SECONDAY_CARD_MODAL_WIDTH,
        margin: NORMAL_MARGIN,
        borderWidth: 3,
        height: SECONDAY_CARD_MODAL_HEIGHT

    },
    observation: {
        borderWidth: 3,
        margin: NORMAL_MARGIN,
        borderRadius: 10,

    },
    downloadButton: {
        fontSize: STANDAR_FONT_SIZE,
        backgroundColor: PRIMARY_COLOR,
        padding: BUTTON_MARGIN,
        borderRadius: 10,
        width: BUTTON_CONTROL_WIDTH,
        height: BUTTON_CONTROL_HEIGHT,
        textAlignVertical: "center",
        color: "#FFF",
        borderWidth: 3,
        textAlign:"center"

    },
    cancelButton: {
        marginTop: BUTTON_MARGIN,
        fontSize: STANDAR_FONT_SIZE,
        backgroundColor: DANGER_COLOR,
        padding: BUTTON_MARGIN,
        borderRadius: 10,
        width: BUTTON_CONTROL_WIDTH,
        height: BUTTON_CONTROL_HEIGHT,
        textAlignVertical: "center",
        color: "#FFF",
        borderWidth: 3,
        textAlign:"center"
    }

});

