import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, TouchableOpacity, Modal, TextInput } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Card } from "react-native-shadow-cards";

import I18n from "../idiomas/idioma";

export default class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.datesStyles = [];
        this.datesId = [];
        this.dateInfo = {};
        this.onDateChange = this.onDateChange.bind(this);

    }

    state = {
        modalDetalleVisible: false,
        data: [],
        isLoading: true
    };

    loadDateDetail(id) {
        this.setModalDetalleVisible(true);
        fetch('http://labs.iam.cat/~a18manfermar/API-ICO/public/api/cita/' + id)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }


    componentDidMount() {
        let customDatesStyles = this.props.customDatesStyles;
        for (let i = 0; i < customDatesStyles.length; i++) {
            this.datesId.push(
                {
                    id: customDatesStyles[i].id,
                    date: customDatesStyles[i].date,
                }
            );
            this.datesStyles.push(customDatesStyles[i].objectDatesStyle);
        }
    }

    setModalDetalleVisible(visible) {
        this.setState({ modalDetalleVisible: visible });
    }

    onDateChange(date, type) {
        for (let i = 0; i < this.datesId.length; i++) {
            if (new Date(date).getDay() == new Date(this.datesId[i].date).getDay() &&
                new Date(date).getMonth() == new Date(this.datesId[i].date).getMonth() &&
                new Date(date).getFullYear() == new Date(this.datesId[i].date).getFullYear()) {
                this.loadDateDetail(this.datesId[i].id);

            }

        }

    }

    render() {
        const minDate = new Date(2018, 0, 1);
        const maxDate = new Date(2050, 11, 1);
        const { modalDetalleVisible } = this.state;
        const { selectedStartDate } = this.state;
        const { data, isLoading } = this.state;

        const startDate = selectedStartDate ? selectedStartDate.toString() : '';


        return (
            <View style={styles.container}>
                <CalendarPicker style={styles.calendar}
                    startFromMonday={true}
                    allowRangeSelection={false}
                    minDate={minDate}
                    maxDate={maxDate}
                    weekdays={I18n.t("WEEKDAYS")}
                    months={I18n.t("MONTHS")}
                    previousTitle={"   " + I18n.t("PREVIOUS")}
                    nextTitle={I18n.t("NEXT") + "   "}
                    todayBackgroundColor={GRADIENT_COLOR_C}
                    selectedDayColor={GREY_COLOR}
                    selectedDayTextColor={WHITE_COLOR}
                    scaleFactor={430}
                    customDatesStyles={this.props.datesStyle}
                    textStyle={{
                        fontSize: 15,
                        color: '#000000',
                    }}
                    onDateChange={this.onDateChange}
                />
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
                                        <Text style={styles.dateModalTextHeader}> {data.nombre}</Text>
                                    </Card>
                                    <View style={{ marginLeft: NORMAL_MARGIN }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
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
                                            <Text style={styles.labelText}>{data.fecha.date.substr(0, 10)}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.label} >{I18n.t("SCHEDULE")}</Text>
                                            <Text style={styles.labelText}>{data.hora.date.substr(10, 6)}</Text>
                                        </View>
                                        <Text style={styles.dateModalTextHeader}> {I18n.t("INDICATIONS")}:</Text>
                                        <View style={{ alignItems: "center" }}>
                                            <TextInput style={styles.observation} editable={false} multiline={true} value={" " + data.indicaciones} />
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
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');

const WHITE_COLOR = "#FFF";
const GREY_COLOR = "#8F8F8F";
const GRADIENT_COLOR_C = '#ff8311';
const PRIMARY_COLOR = "#4285F4";
const DANGER_COLOR = "#CC0000";

const MINIMUN_MARGIN = '1%';
const NORMAL_MARGIN = '5%';
const BIG_MARGIN = '10%';

const BIG_FONT_SIZE = height * 0.03;
const STANDAR_FONT_SIZE = height * 0.02;

const MAIN_CARD_MODAL_HEIGHT = height * 0.7;
const MAIN_CARD_MODAL_WIDTH = width * 0.9;

const SECONDAY_CARD_MODAL_WIDTH = width * 0.8;

const BUTTON_CONTROL_HEIGHT = width * 0.1;
const BUTTON_CONTROL_WIDTH = width * 0.4;

const LABEL_HEIGHT = width * 0.06;
const LABEL_WIDTH = width * 0.2;
const LABEL_TEXT_WIDTH = width * 0.5;

const BUTTON_MARGIN = '3%';

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE_COLOR,
        width: 300
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardDateTitle: {
        width: SECONDAY_CARD_MODAL_WIDTH,
        margin: NORMAL_MARGIN,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        marginBottom: NORMAL_MARGIN
    },

    observation: {
        borderWidth: 1,
        margin: NORMAL_MARGIN,
        marginRight: BIG_MARGIN,
        borderRadius: 10,
        width: '100%'
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
        color: WHITE_COLOR,
        borderWidth: 1,
        textAlign: "center",
        marginRight: BIG_MARGIN,

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
        margin: MINIMUN_MARGIN,

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
        margin: MINIMUN_MARGIN,

    }

});