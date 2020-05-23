import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, TextInput, Modal, TouchableHighlight, Vibration, Alert } from "react-native";
import { Card } from "react-native-shadow-cards";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import TimePicker from "react-native-24h-timepicker";
import I18n from "../idiomas/idioma";


class MedicationComponent extends React.Component {


    tituloMedicamento;
    numeroDeVecesDia;
    periodoDeHoras;
    cantidadDeMedicacion;
    alarmaActiva;


    //Setear variables de estado para controlar el modal
    state = {
        modalDetalleVisible: false,
        modalAlarmaVisible: false,
        alarmTime: new Date(),
        alarmHour: new Date().getHours(),
        alarmMinutes: new Date().getMinutes()
    };

    // Función asincrona que comprueba que el dispositivo tenga los permisos para mostrar notificaciones
    async componentDidMount() {

        // Mira si es un dispositivo virtual
        if (Constants.isDevice) {
            //Comrpobar los permisos del dispositivo
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                // Si no tiene lo permisos volver a preguntar
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;

            }
            // Si no tiene permisos avisar al usuario
            if (finalStatus !== 'granted') {
                alert(I18n.t("ALERT_NOT_ACCESS_NOTIFICATION"));
                return;
            }
            //Agregar el listenner de a las notificaciones
            Notifications.addListener(this.handleNotification);

        } else {
            alert(I18n.t("ALERT_IS_A_VIRTUAL_DEVICE"));
        }

    }

    //Listenner para cuando se recive una notificación
    handleNotification() {
        //Si se recive una notificación vibrar
        Vibration.vibrate();
    }

    //Control del modal
    setModalDetalleVisible(visible) {
        this.setState({ modalDetalleVisible: visible });
    }

    //Control del modal de ALARMA
    setModalAlarmaVisible(visible) {
        this.controlTime();
        this.setState({ modalAlarmaVisible: visible });
    }

    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        // Cerrar el selector de horas y minutos
        this.TimePicker.close();
        //Ocultar modal de alarma
        this.setModalAlarmaVisible(false);
        //Lanzar la notificación
        this.sendLocalNotification(hour,minute);
        // Crear y abrir alert de aviso de alarma
        //Alert de aviso que se ha programado la alarma 
        Alert.alert(
            I18n.t("ALERT_ALARM_HEADER"),
            I18n.t("ALERT_ALARM_BODY") + hour + ":" + minute,
            [
                {
                    text: I18n.t("ALERT_CLOSE_TEXT"),
                    style: "cancel"
                },
                {
                    text: I18n.t("ALERT_OK_TEXT"),
                    style: "default"
                }
            ],
            { cancelable: false });
    }

    //Función que controla que la hora siempre esté actualizada
    controlTime() {
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        this.setState({ alarmHour: hour });
        this.setState({ alarmMinutes: minute });

    }

    sendLocalNotification(hour,minute) {
        // Recoger la hora y minutos
        // const { alarmHour } = this.state;
        // const { alarmMinutes } = this.state;

        // milis = new Date().;
        let milis = (hour * 3600 + minute * 60);
        milis = milis * 1000;
        /* Body de la notificación para poder lanzarla */
        const localNotification = {
            sound: 'default',
            title: I18n.t("NOTIFICATION_HEADER"),
            body: this.props.cantidadDeMedicacion + I18n.t("DETERMINAT_TEXT") + this.props.tituloMedicamento,
        };

        /* Esquema de la notificación (Cada cuanto se forma ) */
        const schedulingOptions = {
            time: new Date(milis), // Se coloca un dia 0 con los milis marcando la hora que ha puesto el usuario
            repeat: 'day', // Repetimos esta alarma todos los dias a esa hora
            // Realmente lo que está pasando es repetir una alarma programada a un dia que no existe, pero la hora si, y la repite cada dia
            // No se hacen así pero para poder crear algo parecido a una alarma esto es lo que he conseguido
        }

        //La verdad que no tengo ni idea de como quitar estas notificaciones que se repiten 
        // Creo que se debe usar los canales de notificaciones de Android pero ni idea, he invertido ya 3 dias probando
        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );
    }

    render() {


        //Control del modal
        const { modalDetalleVisible } = this.state;
        const { modalAlarmaVisible } = this.state;
        const { alarmHour } = this.state;
        const { alarmMinutes } = this.state;


        this.tituloMedicamento = this.props.tituloMedicamento;
        this.numeroDeVecesDia = this.props.numeroDeVecesDia;
        this.periodoDeHoras = this.props.periodoDeHoras;
        this.cantidadDeMedicacion = this.props.cantidadDeMedicacion;
        //Control del color de la alarma
        this.alarmaActiva = true;
        return (

            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                this.setModalDetalleVisible(true);
            }}>

                <Card style={styles.cardMedicacion}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image
                            source={require("../assets/imgMedicacion/pill.png")}
                            style={styles.image}
                        />

                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 12 }}>
                            {/* Texto o nombre vulgar del medicamento */}
                            <Text style={styles.textNormal}>{this.tituloMedicamento}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                {/* Numero de veces al día y cada cuantas horas  */}
                                <Text style={styles.textGrey}>{this.numeroDeVecesDia} {I18n.t("INTERVAL_TEXT")} {this.periodoDeHoras} h </Text>
                                {/* Cantidad de medicamento */}
                                {/* <Text style={styles.textGrey}>{this.cantidadDeMedicacion}</Text> */}
                            </View>
                        </View>

                        {/* Imagen de la alarma desde fuera del modal */}
                        <TouchableOpacity onPress={() => {
                            this.setModalAlarmaVisible(true);
                        }} >
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
                    visible={modalAlarmaVisible}>
                    <View style={styles.centeredView}>
                        <Card style={styles.cardMedicationAlarm}>
                            <View style={styles.modalView}>
                                <Text style={styles.alarmTitle}>{ I18n.t("ALARM_TEXT")}</Text>
                                <TouchableOpacity
                                    onPress={() => this.TimePicker.open()}
                                >
                                    {/* Valorar que en caso de comprobar si la alarma está activa mostrar la alarma antigua */}
                                    {/* {
                                        this.alarmaActiva ? 
                                            <Text>{this.alarmHour}:{this.alarmMinutes}</Text> 
                                            :
                                            <Text>{alarmTime.getHours()}:{alarmTime.getMinutes()}</Text>
                                    } */}
                                    {/* <Text style={{margin:NORMAL_MARGIN, fontSize:BIG_FONT_SIZE}}>Alarma</Text> */}
                                    <View style={styles.alarmViwer}>
                                        <Text style={styles.alarmPicker}>{alarmHour}:{alarmMinutes}</Text>

                                    </View>

                                </TouchableOpacity>
                                <TimePicker
                                    ref={ref => {
                                        this.TimePicker = ref;
                                    }}
                                    textConfirm={I18n.t("ALERT_OK_TEXT")}
                                    textCancel={I18n.t("ALERT_CANCEL_TEXT")}
                                    selectedHour={alarmHour + ""}
                                    selectedMinute={alarmMinutes + ""}
                                    onCancel={() => this.onCancel()}
                                    onConfirm={(hour, minute) => this.onConfirm(hour, minute)
                                    }
                                />

                                <TouchableOpacity
                                    onPress={() => this.setModalAlarmaVisible(false)}
                                >
                                    <Text style={styles.cancelButton}>{I18n.t("ALERT_CLOSE_TEXT")}</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>

                    </View>

                </Modal>

                {/* Modal de los medicamentos */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalDetalleVisible}
                >
                    <View style={styles.centeredView}>
                        <Card style={styles.cardModal}>
                            <View style={styles.modalView}>
                                <Card style={styles.cardMedicationTitle}>
                                    <Image
                                        source={require("../assets/imgMedicacion/pill.png")}
                                        style={styles.image}
                                    />
                                    <Text style={styles.medicationModalTextHeader}>Paracetamol STADA</Text>
                                </Card>
                                <Card style={styles.cardMedicationBody}>
                                    <Text style={styles.medicationModalTextHeader}>Comrpimidos EFG</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.medicationModalText}>40 {I18n.t("COMPRESSED_TEXT")}</Text>
                                        <Text style={styles.medicationModalText}>1G</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.medicationModalText}>3 {I18n.t("INTERVAL_TEXT")} 8h</Text>
                                        <Text style={styles.medicationModalText}>1 {I18n.t("COMPRESSED_TEXT")}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.medicationModalText}>20 {I18n.t("DAYS_TEXT")}</Text>
                                        {/* Imagen de la alarma para poder programar una alarma para recordar la medicación */}
                                        <TouchableOpacity  onPress={() => this.setModalAlarmaVisible(true)} >
                                            <Image
                                                source={this.alarmaActiva ? require("../assets/imgMedicacion/alarm.png") : require("../assets/imgMedicacion/disable-alarm.png")}
                                                style={styles.alarmActive}
                                                tintColor={this.alarmaActiva ? SUCCESS_COLOR : DANGER_COLOR}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.medicationModalText}> {I18n.t("OBSERVATION_TEXT")}:</Text>
                                    <TextInput style={styles.observation} multiline={true} numberOfLines={4} />
                                    <View style={{ alignItems: "center" }}>
                                        {/** Deberia permirtir descargar un PDF pero se va de madre */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setModalDetalleVisible(!modalDetalleVisible);
                                            }}
                                        >
                                            <Text style={styles.downloadButton}>{I18n.t("DOWNLOAD_RECIPE")}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setModalDetalleVisible(!modalDetalleVisible);
                                            }}
                                        >
                                            <Text style={styles.cancelButton}>{I18n.t("ALERT_CLOSE_TEXT")}</Text>
                                        </TouchableOpacity>
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
        textAlign: "center"

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
        textAlign: "center"
    },
    cardMedicationAlarm: {
        width: SECONDAY_CARD_MODAL_WIDTH,
        margin: NORMAL_MARGIN,
        marginBottom: 0,
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 3
    },
    alarmViwer: {
        borderColor: PRIMARY_COLOR,
        borderRadius: 10,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        margin: BUTTON_MARGIN
    },
    alarmPicker: {
        fontSize: BIG_FONT_SIZE,

    },
    alarmTitle: {
        justifyContent: "center",
        alignItems: "center",
        margin: BUTTON_MARGIN,
        fontSize: BIG_FONT_SIZE,

    }

});

