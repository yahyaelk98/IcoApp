import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './MainV1';

function MainScreen({ navigation }) {
    return (
        <Main />
    );
}

function DetailsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
        </View>
    );
}


const Stack = createStackNavigator();

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
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