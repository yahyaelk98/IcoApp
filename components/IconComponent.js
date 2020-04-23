import React, { Component } from 'react';
import { View, Image, Text,TouchableOpacity, Dimensions} from 'react-native';




class IconComponent extends Component {
    goTo(){
        this.props.navigation.navigate('Details',{title:this.props.text});
    }

    render() {
        //Constantes de tamano responsive
        const { width} = Dimensions.get('window');
        const ICON_SIZE = width*0.23;
        const ICON_FONT_SIZE_NORMAL= width*0.05;
        const NORMAL_MARGIN = '5%';

        return (
            
            <View style={{ flexDirection: 'column', margin: NORMAL_MARGIN, alignItems: 'center',justifyContent: 'center'}}>
               <TouchableOpacity onPress={()=>this.goTo()}>
                    <Image
                        style={{width: ICON_SIZE , height: ICON_SIZE }}
                        source={this.props.iconPath}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize:ICON_FONT_SIZE_NORMAL }}>
                    {this.props.text}
                </Text>
            </View>

        );
    }



}


export default IconComponent;