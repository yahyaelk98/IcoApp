import React from 'react';
import {Image, TouchableOpacity, View} from "react-native";

export default class ButtonBack extends React.PureComponent {

    _navigation;

    goBack() {
        this._navigation.goBack();
    }

    render() {
        this._navigation = this.props.navigation;

        return (
            <View style={{flex: 1,justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => this.goBack()}>
                    <Image style={{width: 30, height: 30}}
                           source={require('../assets/global/arrow_back.png')}/>
                </TouchableOpacity>
            </View>
        )
    };
}