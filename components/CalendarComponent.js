//This is an example of Calendar// 
import React, { Component } from 'react';
//import react in our code. 

import { StyleSheet, Text, View, Dimensions } from 'react-native';
//import all the components we are going to use.

import CalendarPicker from 'react-native-calendar-picker';
//import CalendarPicker from the package we installed

export default class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //set value in state for start and end date
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
        const minDate = new Date(2018, 1, 1); // Min date
        const maxDate = new Date(2050, 6, 3); // Max date
        const startDate = selectedStartDate ? selectedStartDate.toString() : ''; //Start date
        const endDate = selectedEndDate ? selectedEndDate.toString() : ''; //End date
        return (
            <View style={styles.container}>
                <CalendarPicker style={styles.calendar}
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                    months={[
                        'January',
                        'Febraury',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ]}
                    previousTitle="   ANTERIOR"
                    nextTitle="SIGUIENTE   "
                    todayBackgroundColor="#e6ffe6"
                    selectedDayColor="#66ff33"
                    selectedDayTextColor="#000000"
                    scaleFactor={400}
                    textStyle={{
                        //fontFamily: 'Cochin',
                        fontSize:15,
                        color: '#000000',
                    }}
                    onDateChange={this.onDateChange}
                />
                {/* <View style={{padding:16}}>
          <Text style={{padding:16}}>SELECTED START DATE :</Text>
          <Text style={{padding:16}}>{startDate}</Text>
          <Text style={{padding:16}}>SELECTED END DATE : </Text>
          <Text style={{padding:16}}>{endDate}</Text>
        </View> */}
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');
const MAIN_CARD_WIDTH = width * 0.7;
const MAIN_CARD_HEIGHT = height * 0.75;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',

    },
   
});