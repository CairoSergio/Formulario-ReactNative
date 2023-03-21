import React,{useEffect, useState} from 'react';
import { Text, TouchableOpacity, View, Modal, Alert , TextInput} from 'react-native';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Clipboard } from 'react-native';

function handleCopyLink(link: string) {
  Clipboard.setString(link);
  alert('Link copiado para a área de transferência!');
}

export default function Links({logout}) {
    const [ links, setLinks] = useState<string[]>([])
    const [ validate, setvalidate] = useState<boolean>(false)
    const [ nome, setNome] = useState<string>('')
    const [ linkname, setlinkname] = useState<string>('')
    const [ novoLink, setNovoLink] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [editar, setEditar] = useState<boolean>(false)
    const [ currentid, setCurrentId] = useState<string>('')
    const [ userid, setUserId] = useState<string>('')

    const getlinks = async ()=>{
        try{
            AsyncStorage.getItem('MeusLinks').then((dados)=>{
                setCurrentId(dados)
                setLoading(false)
                axios.get('http://192.168.253.216:8800/links/' + dados).then((dados)=>{
                    setLinks(dados.data)
                    setLoading(false)
                })
            
            })
        }catch{
            setLoading(true)
        }
    }
    const logOut = ():void => {
        Alert.alert('Log Out', 'Deseja sair da sua conta?',[
            {
                text:'Sim', onPress:async ()=>{
                    await AsyncStorage.removeItem('MeusLinks')
                    logout()
                }
            },
            {
                text:'Não', onPress:()=>{return;}
            }
        ])
    }
    const NewLinksOpen = () =>{
        setNovoLink(true)
        console.log(links)
    }
    function Delete() {
        Alert.alert('Apagar link', 'Tem a certeza de que quer eliminar essa tarefa?',[
            {
                text:'sim', onPress: async ()=>{
                    try{
                        const response = await axios.post('http://192.168.253.216:8800/delete/' + userid)
                        getlinks()
                    }catch(erro:any){
                        console.log('Erro ao deletar:', erro)
                    }

                }
            },
            {
                text:'Não', onPress: () => {return;}
            }
        ])
    }
    const NewLinksClose = () =>{
        Alert.alert('Fechar Link','Deseja fecha a criaçao deste link?',
        [
            {
                text:'Não', onPress:()=>{return}
            },
            {
                text:'Sim', onPress: ()=>{
                    setNome('')
                    setlinkname('')
                    setNovoLink(false)
                    setEditar(false)
                }
            }
        ]
        )
    }
    async function saveLink(){
        if(editar){
            try{
                const response = await axios.post('http://192.168.253.216:8800/atualizar',{
                    nome: nome,
                    url: linkname,
                    id: userid
                })
                getlinks()
                setNome('')
                setlinkname('')
                setNovoLink(false)
                setEditar(false)
            }catch{
                Alert.alert('Erro', 'Erro ao adicionar o link')
            }
        }else{
            try{
                const response = await axios.post('http://192.168.253.216:8800/newlink',{
                    id: currentid,
                    nome: nome,
                    url: linkname
                })
                Alert.alert('Sucesso', 'Link Salvo com sucesso',[
                    {
                        text:'OK'
                    }
                ])
                setNome('')
                setlinkname('')
                getlinks()
                setNovoLink(false)
            }catch{
                Alert.alert('Erro', 'Erro ao adicionar o link')
            }
        }
    }
    useEffect(()=>{
        if(links.length >= 1){
            console.log('ha links')
        }else{
            console.log('NAo ha links')
        }
        getlinks()
    },[])

    if(loading){
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={NewLinksOpen} 
            style={{
                position:'absolute', justifyContent:'center',alignItems:'center',height:45,bottom: 10, width:'90%', backgroundColor:'#007fff', borderRadius:7}}>
                    <Text style={{fontWeight:'900', color:'#fff', fontSize:15}}>Adicionar</Text>
            </TouchableOpacity>
            <View style={{width:'90%', marginTop:35, justifyContent:'space-between',marginBottom:20, flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'bold', fontSize:25}}>
                    Meus Links                   
                </Text>
                <TouchableOpacity onPress={logOut}>
                    <Ionicons name='log-out' color='#ff0000' size={25}/>
                </TouchableOpacity>
            </View>
            <Modal visible={novoLink} transparent>
                <TouchableOpacity onPress={NewLinksClose} activeOpacity={1} style={{justifyContent:'center', alignItems:'center',backgroundColor:'#2b2b2ba2', width:'100%', height:'100%'}}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{return;}} style={{width:'90%', padding:15, backgroundColor:'#fff', borderRadius:7}}>
                        <View style={{width:"100%", justifyContent:'space-between', alignItems:'center',flexDirection:'row'}}>
                            {
                                editar ? (
                                    <Text style={{fontSize:17, fontWeight:"bold"}}>Atualizar Link</Text>
                                    ):(
                                        <Text style={{fontSize:17, fontWeight:"bold"}}>Novo Link</Text>
                                )
                            }
                            <TouchableOpacity onPress={NewLinksClose}>
                                <Ionicons name='close' size={23}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:30,flexDirection:'column', width:'100%'}}>
                            <Text style={{fontWeight:'700'}}>Nome do link</Text>
                            <TextInput
                            value={nome}
                            onChangeText={(e)=>setNome(e)} 
                            style={{width:"100%", padding:10,height:45, borderWidth:2,borderRadius:5, marginTop:5}}/>
                        </View>
                        <View style={{marginTop:8,flexDirection:'column', width:'100%'}}>
                            <Text style={{fontWeight:'700'}}>URL do link</Text>
                            <TextInput
                            value={linkname}
                            onChangeText={(e)=>setlinkname(e)}  
                            style={{width:"100%", height:45,padding:10, borderWidth:2,borderRadius:5, marginTop:5}}/>
                        </View>
                        <TouchableOpacity onPress={saveLink} style={{justifyContent:'center',marginTop:20,alignItems:'center',height:45, width:'100%', backgroundColor:'#007fff', borderRadius:7}}>
                            {
                                editar ? (

                                    <Text style={{fontWeight:'bold', color:'#fff', fontSize:15}}>Atualizar</Text>
                                ):(

                                    <Text style={{fontWeight:'bold', color:'#fff', fontSize:15}}>Salvar</Text>
                                )
                            }
                            
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
            <View style={{width:'95%', justifyContent:'center'}}>
                {
                    links.length >= 1 ? (
                        links.map((link: any, i)=>(
                            <View key={i} style={{width:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <View style={{marginTop:20, backgroundColor:'#007fff', width:'92%',overflow:'hidden', paddingTop:10, borderRadius:5}}>
                                    <Text style={{color:'#fff', fontWeight:'700',marginLeft:10, fontSize:16}}>{link.nome}</Text>
                                    <View style={{width:'100%',backgroundColor:'#002ba1' ,padding:10, borderRadius:5}}>
                                        <Text style={{color:'#fff'}}>{link.link}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'column',width:'8%', alignItems:'center', justifyContent:'center'}}>
                                    <TouchableOpacity onPress={()=>{
                                        setNome(link.nome)
                                        setlinkname(link.link)
                                        setUserId(link.id)
                                        setEditar(true)
                                        setNovoLink(true)
                                    }} style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
                                        <Ionicons name='create' color='#000' size={24} style={{marginTop:10}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    onPress={()=>{
                                        setUserId(link.id)
                                        Delete()
                                    }}
                                    style={{justifyContent:'center', alignItems:'center',marginTop:10}}>
                                        <Ionicons name='trash' color='red' size={24}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={{marginTop:200,justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>
                                Vazío
                            </Text>
                        </View>
                    )
                }
            </View>
            <StatusBar/>
        </View>
    );
}