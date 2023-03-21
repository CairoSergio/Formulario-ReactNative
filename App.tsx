import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BackHandler, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/Login';
import Cadastro from './src/Cadastro';
import Links from './src/Links';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element{
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    // const handleBackButton = () => {
    //     Alert.alert(
    //       'Confirmação',
    //       'Tem certeza que deseja sair do aplicativo?',
    //       [
    //         {text: 'Cancelar', style: 'cancel'},
    //         {text: 'Sair', onPress: () => BackHandler.exitApp()}
    //       ]
    //     );
    //     return true;
    // }
      
    useEffect (()=>{
        AsyncStorage.getItem('MeusLinks').then((valor)=>{
            if(valor){
                setIsLoggedIn(true);
            }
            setLoading(false);
        })
    },[]);
    // useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    //     return () => {
    //         BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    //     }
    // }, []);

    function login(){
        setIsLoggedIn(true);
        console.log('Entrar!');
    }

    function logout(){
        setIsLoggedIn(false);
        console.log('Sair!');
    }

    if (loading) {
        return null; // ou uma tela de carregamento
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <>
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name='Links'
                        >
                            {(props)=><Links {...props} logout={logout} />}
                        </Stack.Screen>
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name='Cadastro'
                            component={Cadastro}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name='Login'
                        >
                            {(props)=> <Login {...props} login={login} />}
                        </Stack.Screen>
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name='Cadastro'
                            component={Cadastro}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

