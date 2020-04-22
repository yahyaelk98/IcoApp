import React, { Component } from 'react';
import {  View, Image } from 'react-native';
import ThreeDotsMenu from './ThreeDotsMenu';
import { Card } from 'react-native-shadow-cards';



class HomeHeader extends Component {
    render() {
        return (
            <Card style={{ padding: ('5%'), margin: ('10%'), marginBottom: ('1%') }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ marginLeft: 10, width: 300, height: 80 }}
                        source={require('../assets/imgHome/logo.png')}
                    />
                    <ThreeDotsMenu />
                </View>
            </Card>
        );
    }
}
export default HomeHeader;