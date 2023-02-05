import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import axios from "axios"


export default function Cadastro() {
    const navigation = useNavigation();
    const [usernome, setName] = useState('')
    const [useremail, setEmail] = useState('')
    const [userphone, setPhone] = useState('')
    const [userpassword, setPassword] = useState('')
    const handleRegist = async (e)=>{
        e.preventDefault()
        if(!usernome || !useremail|| !userphone|| !userpassword){
        return(
            alert('Preeche todos os campos')
        )
        }else{
            await axios
    // use o seu ip aqui  |--------------| mantenha a porta 8800
            .post('http://192.168.135.216:8800', {
                nome: usernome,
                email: useremail,
                telefone: userphone,
                senha: userpassword,
            })
            .then(({data}) => 
                alert(data),
                setEmail(''),
                setName(''),
                setPassword(''),
                setPhone('')
            )
            .catch(({data}) => console.log('erro'))
        }
    }
    return (
        <View style={styles.container}> 
        <View style={styles.containertitle}>
        <Animatable.Text  animation="fadeInDown" delay={800} style={styles.title}>CADASTRO</Animatable.Text>
        </View>
        <Animatable.View delay={800} style={styles.containerform} animation="fadeInUp">
            <Text style={styles.formtitle}>Nome</Text>
            <TextInput 
                style={styles.input} placeholder='Digite o seu nome......'
                value={usernome}
                onChangeText={setName}
            />
            <Text style={styles.formtitle}>Email</Text>
            <TextInput 
                style={styles.input} placeholder='Digite o seu Email.....'
                value={useremail}
                onChangeText={setEmail}
            />
            <Text style={styles.formtitle}>Numero de telefone</Text>
            <TextInput 
                style={styles.input} placeholder='Digite o seu Numero de telefone......'
                value={userphone}
                onChangeText={setPhone}
            />
            <Text style={styles.formtitle}>Senha</Text>
            <TextInput 
                style={styles.input} placeholder='Digite a sua Senha.....'
                secureTextEntry={true}
                value={userpassword}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.Login} onPress={handleRegist}>
            <Text style={styles.logintxt}>
                CADASTRAR
            </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cadastrar} onPress={()=> navigation.navigate('Login')}>
            <Text style={{color:'#a1a1a1'}}>Possui uma conta?</Text>
            <Text style={{color:'#25ff', marginLeft:5}}> Faça Login</Text>
            </TouchableOpacity>
        </Animatable.View>
        </View>
    );
}