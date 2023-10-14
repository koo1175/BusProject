import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

function Main({navigation, route}) {

    const { phoneNum, busUid } = route.params;

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>메인화면</Text>
                    <TouchableOpacity style = {styles.pan} 
                        onPress={() => navigation.navigate('Catch', {busUid:busUid})}> 
                    <Text style = {styles.text}>탑승 현황</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style = {styles.pan} onPress={() => navigation.navigate('Catch')}> 
                    <Text style = {styles.text}>알림 설정</Text> 
                    </TouchableOpacity> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        backgroundColor : '#FFFFFF',
        height : '100%'
       },
    pan :{
        width: 200,
        height : 100, 
        backgroundColor :'gray',
        marginTop : 100
    },
    text : {
        color :'white',
        textAlign : 'center',
        marginTop : 30,
        fontSize : 25,
    },
    title : {
        fontSize : 60,
        marginTop : 20
    }
    
  
  });


export default Main