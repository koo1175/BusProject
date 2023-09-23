import React from "react";
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const LogIn = () => {
    const navigation = useNavigation();
   
    return (
    
      <View backgroundColor='#FFFFFF'>
        <View style={styles.container}>
           <Text style={styles.text_title}>로그인</Text>
           <Text style={styles.text}>전화번호</Text>
           <TextInput style={styles.textInput} type='text' placeholder=' 전화번호'/>
           <Text style={styles.text}>버스 번호판</Text>
           <TextInput  style={styles.textInput} type='text' placeholder=' 버스 번호판'/>
           <Button style={styles.button} title='로그인' onPress={() => navigation.navigate('Main')} /> 
        </View>
      </View>
    
   
    )
}

const styles = StyleSheet.create({
    
    container : {
     padding : 30,
     alignItems : 'center'
    },
    text_title : {
      marginTop : 20,
      marginBottom : 150,
      fontSize : 50,
      alignSelf : 'flex-start'
    },
    text : {
      fontSize : 25
    },
    textInput : {
      borderColor:"#000000",
      borderWidth:1,
      width:'70%',
      height : '8%',
      marginTop : 8,
      marginBottom : 50,
      fontSize : 25,
      borderRadius : 5
    },
    button: {
      backgroundColor: 'blue',
      width: '50%',
      padding: 10,
      justifyContent : 'center',
      fontSize : 20
    }
  
  });

  export default LogIn