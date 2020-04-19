import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
//Import de modulos descargados
import { Card } from 'react-native-shadow-cards';
//Import de componentes locales
import HomeHeader from '../components/HomeHeader';
import IconComponent from '../components/IconComponent';



class Main extends Component {


    render() {

        return (

            <ImageBackground source={require('../assets/background.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* Cabezera de la pantalla inicial */}
                    <HomeHeader />
                    {/* Crear conjunto de componentes con su icono y texto dentro de una Card */}
                    <Card style={{ padding: ('5%'), margin: ('5%') }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <IconComponent text="Calendario" iconPath={require("../assets/imgHome/calendarioICO.png" )}/>
                                <IconComponent text="Medicación" iconPath={require("../assets/imgHome/medicacionICO.png")} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <IconComponent text="Contactar" iconPath={require("../assets/imgHome/telefonoICO.png")} />
                                <IconComponent text="Ubicación" iconPath={require("../assets/imgHome/ubicacionICO.png")} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <IconComponent text="ICOBlog" iconPath={require("../assets/imgHome/ICOBlog.png")} />
                                <IconComponent text=" Ver perfil" iconPath={require("../assets/imgHome/logoHome.png")} />
                            </View>
                        </View>
                    </Card>
                </View>
            </ImageBackground>


        );
    }



}



export default Main;