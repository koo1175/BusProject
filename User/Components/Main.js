import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import { useNavigation } from "@react-navigation/native";

const Main = () => {
    const navigation = useNavigation();
    
    return (
        <View backgroundColor="#FFFFFF">
            <View style={styles.container}>
                <Text style={styles.title}>메인화면</Text>
                    <TouchableOpacity style = {styles.pan} onPress={() => navigation.navigate('Catch')}> 
                    <Text style = {styles.text}>탑승 확인</Text> 
                    </TouchableOpacity> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        padding : 30,
        alignItems : 'center',
        backgroundColor : '#FFFFFF'
       },
    pan :{
        width: '80%',
        height : '40%', 
        backgroundColor :'gray',
        marginTop : '30%'
    },
    text : {
        color :'white',
        textAlign : 'center',
        paddingTop : '15%',
        fontSize : 25,
    },
    title : {
        fontSize : 60,
    }
    
  
  });


export default Main