import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
//Import de modulos descargados
import { Card } from 'react-native-shadow-cards';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Import de componentes locales
import HomeHeader from '../components/HomeHeader';
import IconComponent from '../components/IconComponent';



// Función principal para controlar la navegación
const Stack = createStackNavigator();
// Función principal de navegación para ir entre pantallas es el Controlador
function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: 'Main',
                        headerShown: false 
                    }}
                />
                <Stack.Screen name="Details" component={DetailsScreen}  options={{ title: 'Details' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Navigator;

// Función de prueba para probar la navegación entre pantallas
function DetailsScreen({ navigation ,route}) {
    //Buscar el parametro que hemos pasado dentro de "route"
    const { title } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* Obtener el parametro que hemos extraido de route en este caso "title" */}
            <Text>{JSON.stringify(title)}</Text>
        </View>
    );
}

/* Función principal que actua como controlador de los diferentes componentes que forman la app
 este se compone por :
    -> Cabecera principal con icono y menu rapido
    -> Carta que une las 6 acciones principales de la app
    Calendario, Medicación, Contacto, Ubicación, Blog del ICO, Perfil  */
function Home({ navigation }) {
    return (
        // Imagen de fondo en principio es un degradado de naranjas
        <ImageBackground source={require('../assets/background.jpg')} style={{ width: '100%', height: '100%' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {/* Cabezera de la pantalla inicial */}
                <HomeHeader />
                {/* Crear conjunto de componentes con su icono y texto  */}
                <Card style={{ padding: ('5%'), margin: ('5%') }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <IconComponent navigation={navigation} text="Calendario" iconPath={require("../assets/imgHome/calendarioICO.png")} />
                            <IconComponent navigation={navigation} text="Medicación" iconPath={require("../assets/imgHome/medicacionICO.png")} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <IconComponent navigation={navigation}  text="Contactar" iconPath={require("../assets/imgHome/telefonoICO.png")} />
                            <IconComponent navigation={navigation}  text="Ubicación" iconPath={require("../assets/imgHome/ubicacionICO.png")} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <IconComponent navigation={navigation}  text="ICOBlog" iconPath={require("../assets/imgHome/ICOBlog.png")} />
                            <IconComponent navigation={navigation}  text=" Ver perfil" iconPath={require("../assets/imgHome/logoHome.png")} />
                        </View>
                    </View>
                </Card>
            </View>
        </ImageBackground>
    );
}


