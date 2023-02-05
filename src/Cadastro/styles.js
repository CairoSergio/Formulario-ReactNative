import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25ff',
    },
    containertitle:{
        flex:1,
        backgroundColor:'#25ff',
        alignItems:'center',
        justifyContent:'center',
    },
    containerform:{
        flex:5,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'#fff',
        paddingEnd:'5%',
        paddingStart:'5%',
    },
    title:{
        color:'#fff',
        fontFamily:'sans-serif',
        fontWeight:'bold',
        fontSize:35,
    },
    formtitle:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:20,
    },
    input:{
        width:'100%',
        height:40,
        fontSize:15,
        borderBottomColor:'#25ff',
        borderBottomWidth:2,
    },
    Login:{
        marginTop:40,
        width:'100%',
        height:45,
        backgroundColor:'#25ff',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    logintxt:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold'
    },
    cadastrar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:30,
        height:30
    }

})