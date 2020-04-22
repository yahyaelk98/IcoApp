import React, { Component } from 'react';
import { View, Image, Text,TouchableOpacity } from 'react-native';




class IconComponent extends Component {
    goTo(){
        this.props.navigation.navigate('Details',{title:this.props.text});
    }

    render() {
        return (
            
            <View style={{ flexDirection: 'column', margin: ('5%'), alignItems: 'center',justifyContent: 'center'}}>
               <TouchableOpacity onPress={()=>this.goTo()}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={this.props.iconPath}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>
                    {this.props.text}
                </Text>
            </View>

        );
    }



}


export default IconComponent;