import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';




class IconComponent extends Component {
    
   
    render() {
        return (
            
            <View style={{ flexDirection: 'column', margin: ('5%'), alignItems: 'center',justifyContent: 'center'}}>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={this.props.iconPath}
                />
                <Text style={{ fontSize: 20 }}>
                    {this.props.text}
                </Text>
            </View>

        );
    }



}


export default IconComponent;