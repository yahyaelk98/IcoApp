import React from 'react';

import { View, Image, TouchableOpacity ,Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class HomeMenu extends React.PureComponent {
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
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               
                <TouchableOpacity  onPress={() => this.showMenu()}>
                    <Image  style={{ width: 30, height: 30 }}
                    source={require('../assets/imgHome/menu.png')} />
                </TouchableOpacity >
                <Menu ref={this.setMenuRef} >
                    <MenuItem  onPress={this.hideMenu}> 
                        <Text style={{ fontSize: 20 }}>
                                Idioma
                        </Text>
                    </MenuItem>
                    <MenuItem onPress={this.hideMenu}> 
                        <Text style={{ fontSize: 20 }}>
                                Modo simple
                        </Text></MenuItem>
                  
                </Menu>
            </View>
        );
    }
}

export default HomeMenu;