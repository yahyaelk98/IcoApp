import React, { Component } from 'react';
import {  View, Image, Dimensions } from 'react-native';
import ThreeDotsMenu from './ThreeDotsMenu';
import { Card } from 'react-native-shadow-cards';



class HomeHeader extends Component {

    render() {
        const {navigation} = this.props;
        //Constantes de tamano responsive
        const { width, height } = Dimensions.get('window');
        const ICO_IMAGE_HEADER_WIDTH = width*0.7;
        const ICO_IMAGE_HEADER_HEIGHT = height*0.11;
        const NORMAL_MARGIN = '5%';
        const BIG_MARGIN = '10%';
        const MINIMUN_MARGIN = '1%';

        return (
            <Card style={{ padding: NORMAL_MARGIN, margin: BIG_MARGIN, marginBottom: MINIMUN_MARGIN }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ marginLeft: MINIMUN_MARGIN, width: ICO_IMAGE_HEADER_WIDTH , height: ICO_IMAGE_HEADER_HEIGHT }}
                        source={require('../assets/imgHome/logo.png')}
                    />
                    <ThreeDotsMenu navigation={navigation} />
                </View>
            </Card>
        );
    }
}
export default HomeHeader;