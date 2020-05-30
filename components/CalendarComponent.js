import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import I18n from "../idiomas/idioma";

export default class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            selectedEndDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date, type) {
        //function to handle the date change 
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }


    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(2018, 0, 1); 
        const maxDate = new Date(2050, 11, 1); 
        const startDate = selectedStartDate ? selectedStartDate.toString() : ''; 
        const endDate = selectedEndDate ? selectedEndDate.toString() : ''; 
        return (
            <View style={styles.container}>
                <CalendarPicker style={styles.calendar}
                    startFromMonday={true}
                    allowRangeSelection={false}
                    minDate={minDate}
                    maxDate={maxDate}
                    weekdays={I18n.t("WEEKDAYS")}
                    months={I18n.t("MONTHS")}
                    previousTitle={"   "+I18n.t("PREVIOUS")}
                    nextTitle={I18n.t("NEXT")+"   "}
                    todayBackgroundColor={PRIMARY_COLOR}
                    selectedDayColor={GREY_COLOR}
                    selectedDayTextColor={WHITE_COLOR}
                    scaleFactor={430}
                    textStyle={{
                        //fontFamily: 'Cochin',
                        fontSize:15,
                        color: '#000000',
                    }}
                   onDateChange={this.onDateChange}
                />
            </View>
        );
    }
}


const PRIMARY_COLOR = "#4285F4";
const WHITE_COLOR = "#FFF";
const GREY_COLOR = "#8F8F8F";

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE_COLOR,
        width :300
    },
   
});