// Login.js
import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, FlatList } from 'react-native';
import axios from 'axios';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // 이름을 추가합니다.
  const [phoneNum, setPhoneNum] = useState('');
  const [rideORgetOff, setRideORgetOff] = useState(false);

  const registerUser = async () => {
    const userData = {
      userId, name, password, phoneNum, rideORgetOff,
    }
    // JavaScript 객체를 JSON 문자열로 변환
    const jsonData = JSON.stringify(userData);
    try {
        await axios.post("http://bus-project.kro.kr/user/create", jsonData)
        .then(response => {
          // 성공적으로 요청을 보낸 경우의 처리
          console.log('요청 성공:', response.data);
          navigation.navigate('Main');
          // 서버에서 보낸 응답 데이터는 response.data에서 접근할 수 있음
        })
        .catch(error => {
          // 요청이 실패한 경우의 처리
          console.error('요청 실패:', error);
        });
        
    } 
    catch (error) {
        console.error('Error registering user:', error);
    }
  };

  return (
      <View>
          <Text>Id:</Text>
          <TextInput
              placeholder="Enter Id"
              value={userId}
              onChangeText={text => setUserId(text)}
          />
          <Text>Password:</Text>
          <TextInput
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
          />
          <Text>Name:</Text>
          <TextInput
              placeholder="Enter name"
              value={name}
              onChangeText={text => setName(text)} // 이름을 상태로 업데이트합니다.
          />
          <Text>Phone Number:</Text>
          <TextInput
                placeholder="Enter phoneNum"
                secureTextEntry={true}
                value={phoneNum}
                onChangeText={text => setPhoneNum(text)}
            />
            
          <Button title="Submit" onPress={registerUser} />
      </View>
  );
};

export default Login;
