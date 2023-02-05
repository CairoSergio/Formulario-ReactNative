import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator();
import Login from './src/Login'
import Cadastro from './src/Cadastro'

export default function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator  >
                <Stack.Screen
                    options={{headerShown:false}}
                    name='Login'
                    component={Login}
                />
                <Stack.Screen
                    options={{headerShown:false}}
                    name='Cadastro'
                    component={Cadastro}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}