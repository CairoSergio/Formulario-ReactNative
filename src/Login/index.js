import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

export default function Login() {

  const navigation = useNavigation();
  const [useremail, setEmail] = useState('')
  const [userpassword, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!useremail || !userpassword) {
      return alert('Preeche todos os campos');
    } else {
      await axios
//coloque o seu ip aqui|-------------| manteha o resto
        .post('http://192.168.135.216:8800/verify', {
          email: useremail,
          senha: userpassword
        })
        .then(({ data }) => {
          if (data === 'verificado') {
            alert('Usuário verificado');
            setEmail('');
            setPassword('');
          } else {
            alert('Usuário não encontrado');
          }
        })
        .catch(()=>alert('Usuário não encontrado'));
        
    }
  };
  
  
 return (
    <View style={styles.container}>
      <View style={styles.containertitle}>
        <Animatable.Image animation="flipInY" source={require('../images/logo.png')}/>
        <Animatable.Text  animation="fadeInRight" delay={800} style={styles.title}>Bem Vindo(a)</Animatable.Text>
      </View>
      <Animatable.View delay={800} style={styles.containerform} animation="fadeInUp">
        <Text style={styles.formtitle}>EMAIL</Text>
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
          <Text style={styles.logintxt}>
            LOGIN
          </Text>
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