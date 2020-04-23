import React from 'react';

import { View, Image, TouchableOpacity ,Text, Dimensions  } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class ThreeDotsMenu extends React.PureComponent {
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    render() {
        const MENU_SIZE = 30;
        const ICON_FONT_SIZE_NORMAL= width*0.05;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               
                <TouchableOpacity  onPress={() => this.showMenu()}>
                    <Image  style={{ width: MENU_SIZE, height: MENU_SIZE }}
                    source={require('../assets/imgHome/menu.png')} />
                </TouchableOpacity >
                <Menu ref={this.setMenuRef} >
                    <MenuItem  onPress={this.hideMenu}> 
                        <Text style={{ fontSize: ICON_FONT_SIZE_NORMAL }}>
                                Idioma
                        </Text>
                    </MenuItem>
                    <MenuItem onPress={this.hideMenu}> 
                        <Text style={{ fontSize: ICON_FONT_SIZE_NORMAL }}>
                                Modo simple
                        </Text></MenuItem>
                  
                </Menu>
            </View>
        );
    }
}

export default ThreeDotsMenu;