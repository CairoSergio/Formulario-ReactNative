import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({navigation,login}):JSX.Element{

  const [useremail, setEmail] = useState<string>('')
  const [userpassword, setPassword] = useState<string>('')
  const [loading, setisloading] = useState<boolean>(false)
  const handleLogin = async (e:any) => {
    // AsyncStorage.removeItem('MeusLinks').then(()=>{
    //   console.log('dado deletado')
    // })
    setisloading(true)
    e.preventDefault();
    if (!useremail || !userpassword) {
      setisloading(false)
      return alert('Preeche todos os campos');
    } else {
      try{
        const response =  await axios.post('http://192.168.253.216:8800/verify', {
          email: useremail,
          senha: userpassword
        })
        //coloque o seu ip aqui|-------------| manteha o resto
        setEmail('');
        setPassword('');
        const identidade = await axios.post('http://192.168.253.216:8800/getid',{
          email: useremail,
          senha: userpassword,
        })
        const id = identidade.data[0].id
        await AsyncStorage.setItem('MeusLinks', id.toString())
        // AsyncStorage.getItem('MeusLinks').then((dados)=>{
          //   const value = JSON.parse(dados)
          //   console.log('O id seu é:', value)
          // })
          // alert('User verified')
          login()
        }catch(err){
          setisloading(false)
          alert(err)
      }
        
    }
  };
  
  
 return (
    <View style={styles.container}>
      <View style={styles.containertitle}>
        <Animatable.Image animation="flipInY" source={require('../images/logo.png')}/>
        <Animatable.Text  animation="fadeInRight" delay={800} style={styles.title}>Bem Vindo(a)</Animatable.Text>
      </View>
      <Animatable.View delay={800} style={styles.containerform} animation="fadeInUp">
        <Text style={styles.formtitle}>Email</Text>
        <TextInput 
          style={styles.input} placeholder='Digite o seu email......'
          value={useremail}
          onChangeText={setEmail}
        />
        <Text style={styles.formtitle}>Senha</Text>
        <TextInput 
          style={styles.input} placeholder='Digite a sua senha.....' secureTextEntry={true}
          value={userpassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.Login} onPress={handleLogin}>
          {
            loading ? (
              <ActivityIndicator
                color='#fff'
                size={24}
              />
            ) : (
            <Text style={styles.logintxt}>
              LOGIN
            </Text>
            )
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.cadastrar} onPress={()=> navigation.navigate('Cadastro')}>
          <Text style={{color:'#a1a1a1'}}>Nao possui uma conta?</Text>
            <Text style={{color:'#25ff', marginLeft:5}}>Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
      <StatusBar style='light'/>
    </View>  
  );
}