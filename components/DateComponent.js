import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet ,Modal,ActivityIndicator,TextInput} from 'react-native';
import { Card } from "react-native-shadow-cards";
import I18n from "../idiomas/idioma";


class DateComponent extends Component {
    tituloCita;
    fechaPreview;
    horaPreview;

    state = {
        modalDetalleVisible: false,
        data: [],
        isLoading: true
    };

    loadDate() {
        this.setModalDetalleVisible(true);

        fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/cita/' + this.props.id)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({ data: json });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    //Control del modal
    setModalDetalleVisible(visible) {
        this.setState({ modalDetalleVisible: visible });
    }

    render() {
        this.tituloCita = this.props.tituloCita;
        this.fechaPreview = this.props.fecha.substr(0, 9);
        this.horaPreview = this.props.hora.substr(10, 6);
        const { data, isLoading } = this.state;
        const { modalDetalleVisible } = this.state;



        return (

            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                this.loadDate();
            }}>

                <Card style={styles.cardDate}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View style={{ justifyContent: 'space-between', marginTop: BUTTON_MARGIN }}>
                            <Text style={styles.dateData}>{this.fechaPreview}</Text>
                            <Text style={styles.dateData}>{this.horaPreview}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', marginTop: BUTTON_MARGIN, flex: 12 }}>
                            <Text style={styles.textNormal}>{this.tituloCita}</Text>
                        </View>


                    </View>
                </Card>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalDetalleVisible}
                >
                    <View style={styles.centeredView}>
                        {isLoading ? <ActivityIndicator size="large" /> : (
                        <Card style={styles.cardModal}>
                            <View >
                                <Card style={styles.cardDateTitle}>
                                    <Text  style={styles.dateModalTextHeader}> {data.nombre}</Text>
                                </Card>
                                    <View style={{ marginLeft:NORMAL_MARGIN }}>
                                    <View style={{ flexDirection: 'row',alignItems:'flex-start' }}>
                                            <Text style={styles.label}>{I18n.t("HOSPITAL")}</Text>
                                            <Text style={styles.labelText}>{data.hospital}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.label}>{I18n.t("BUILDING")}</Text>
                                            <Text style={styles.labelText}>{data.edificio}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.label}>{I18n.t("BOX")}</Text>
                                            <Text style={styles.labelText}>{data.box}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.label}>{I18n.t("DAY")}</Text>
                                            <Text style={styles.labelText}>{data.fecha.date.substr(0, 9)}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.label} >{I18n.t("SCHEDULE")}</Text>
                                            <Text style={styles.labelText}>{data.hora.date.substr(10, 6)}</Text>
                                        </View>
                                        <Text style={styles.dateModalTextHeader}> {I18n.t("INDICATIONS")}:</Text>
                                        <View style={{alignItems:"center"}}>
                                        <TextInput style={styles.observation} editable={false} multiline={true} value={" " + data.indicaciones}  />
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setModalDetalleVisible(!modalDetalleVisible);
                                            }}
                                        >
                                            <Text style={styles.cancelButton}>{I18n.t("ALERT_CLOSE_TEXT")}</Text>
                                        </TouchableOpacity>
                                        </View>
                                       
                                    </View>
                            </View>
                        </Card>)}

                    </View>
                </Modal>
            </TouchableOpacity>


        );
    }



}


export default DateComponent;

//Constantes de tamano responsive
const { width, height } = Dimensions.get('window');
const BIG_FONT_SIZE = height * 0.03;
const STANDAR_FONT_SIZE = height * 0.02;

const MINIMUN_MARGIN = '1%';
const NORMAL_MARGIN = '5%';
const BIG_MARGIN = '10%';

const MAIN_CARD_WIDTH = width * 0.8;
const MAIN_CARD_HEIGHT = height * 0.10;
const MAIN_CARD_MODAL_HEIGHT = height * 0.7;
const MAIN_CARD_MODAL_WIDTH = width * 0.9;

const SECONDAY_CARD_MODAL_WIDTH = width * 0.8;
const SECONDAY_CARD_MODAL_HEIGHT = height * 0.6;



const BUTTON_CONTROL_HEIGHT = width * 0.1;
const BUTTON_CONTROL_WIDTH = width * 0.4;

const LABEL_HEIGHT = width * 0.06;
const LABEL_WIDTH = width * 0.2;
const LABEL_TEXT_WIDTH = width * 0.5;

const BUTTON_MARGIN = '3%';

const SUCCESS_COLOR = "#007E33";
const PRIMARY_COLOR = "#4285F4";
const DANGER_COLOR = "#CC0000";
const GREY_COLOR = "#8F8F8F";
const WHITE_COLOR = "#FFF";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardDate: {
        width: MAIN_CARD_WIDTH,
        height: MAIN_CARD_HEIGHT,
        padding: MINIMUN_MARGIN,
        margin: MINIMUN_MARGIN,
        fontSize: BIG_FONT_SIZE,
        borderWidth: 1

    },
    textNormal: {
        fontSize: BIG_FONT_SIZE,

    },
    dateData: {
        fontSize: STANDAR_FONT_SIZE,
        marginLeft: BUTTON_MARGIN
    },
    cardDateTitle: {
        width: SECONDAY_CARD_MODAL_WIDTH,
        margin: NORMAL_MARGIN,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        marginBottom:NORMAL_MARGIN
    },
  
    observation: {
        borderWidth: 1,
        margin: NORMAL_MARGIN,
        marginRight:BIG_MARGIN,
        borderRadius: 10,
        width:'100%'
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
        color:WHITE_COLOR,
        borderWidth: 1,
        textAlign: "center",
        marginRight:BIG_MARGIN,

    },
    dateModalTextHeader: {
        fontSize: BIG_FONT_SIZE,
        padding: MINIMUN_MARGIN,

    },
    cardModal: {
        height: MAIN_CARD_MODAL_HEIGHT,
        width: MAIN_CARD_MODAL_WIDTH,
        borderWidth: 1,
    },
    label: {
        fontSize: STANDAR_FONT_SIZE,
        backgroundColor: PRIMARY_COLOR,
        padding: MINIMUN_MARGIN,
        borderRadius: 10,
        width: LABEL_WIDTH,
        height: LABEL_HEIGHT,
        textAlignVertical: "center",
        color: WHITE_COLOR,
        borderWidth: 1,
        textAlign: "center",
        margin:MINIMUN_MARGIN,

    },
    labelText: {
        fontSize: STANDAR_FONT_SIZE,
        padding: MINIMUN_MARGIN,
        borderRadius: 10,
        width: LABEL_TEXT_WIDTH,
        height: LABEL_HEIGHT,
        textAlignVertical: "center",
        borderWidth: 1,
        textAlign: "center",
        margin:MINIMUN_MARGIN,

    }
});