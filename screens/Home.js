import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
// import MenuBar from './MenuBar';
import HomeMenu from './HomeMenu';
//import our Custom Icon menu component

class Home extends Component {
    

    render() {
        return (
            <View style={{marginTop:10, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{flexDirection: 'row',marginBottom:10,marginTop:10 }}>
                    <Image
                        style={{ marginLeft: 10 }}
                        source={require('../assets/imgHome/logo.png')}
                    />
                    <HomeMenu />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', margin: 15, marginLeft: 18 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../assets/imgHome/calendarioICO.png')}
                        />
                        <Text style={{ fontSize: 20 }}>
                            Calenadario
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 15, marginLeft: 18 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../assets/imgHome/medicacionICO.png')}
                        />
                        <Text style={{ fontSize: 20 }}>
                            Medicación
                        </Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', margin: 15, marginLeft: 18 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../assets/imgHome/telefonoICO.png')}
                        />
                        <Text style={{ fontSize: 20 }}>
                            Contactar
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 15, marginLeft: 18 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../assets/imgHome/ubicacionICO.png')}
                        />
                        <Text style={{ fontSize: 20 }}>
                            Ubicación
                        </Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', margin: 15, marginLeft: 18 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../assets/imgHome/ICOBlog.png')}
                        />
                        <Text style={{ fontSize: 20 }}>
                            ICOBlog
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 15, marginLeft: 18 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../assets/imgHome/logoHome.png')}
                        />
                        <Text style={{ fontSize: 20 }}>
                            Ver perfil
                        </Text>
                    </View>

                </View>

            </View>
        );
    }



}

export default Home;