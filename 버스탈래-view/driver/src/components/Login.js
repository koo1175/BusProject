import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

function Login({navigation}) {
  const [phoneNum, setPhoneNum] = useState('');
  const [busUid, setBusUid] = useState('');

  const login = async () => {
    try {
        await axios.post("http://10.20.106.98:8080/driver/login",null, {
          params: {
            phone_num: phoneNum,
            bus_uid: busUid,
          }
        }).then(response => {
          // 성공적으로 요청을 보낸 경우의 처리
          console.log('요청 성공:', response.data);
          navigation.navigate('Main', {
            phoneNum: phoneNum,
            busUid: busUid,
          });
          // 서버에서 보낸 응답 데이터는 response.data에서 접근할 수 있음
        })
        .catch(error => {
          // 요청이 실패한 경우의 처리
          console.error('휴대전화번호 또는 버스 번호판이 일치하지 않습니다.', error);
        });
    } 
    catch (error) {
        console.error('Error registering user:', error);
    }
  };


  return (
  
    <View backgroundColor='#FFFFFF'>
      <View style={styles.container}>
        <Text style={styles.text_title}>로그인</Text>
          <Text style={styles.text}>휴대전화</Text>
          <TextInput
            style={styles.textInput}
            placeholder="휴대전화 번호를 입력해주세요"
            value={phoneNum}
            onChangeText={text => setPhoneNum(text)}
          />
          <Text style={styles.text}>버스 번호판</Text>
          <TextInput
            style={styles.textInput}
            placeholder="버스 차 번호판을 입력해주세요"
            value={busUid}
            onChangeText={text => setBusUid(text)}
          />
          
          <TouchableOpacity
                    style={styles.button}
                    onPress={() => login()}
                >
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    
    container : {
     alignItems : 'center',
     height : '100%',
     backgroundColor : '#FFFFFF'
    },
    text_title : {
      marginTop : 40,
      marginBottom : 120,
      fontSize : 50,
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

  export default Login