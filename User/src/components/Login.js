// Login.js
import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, FlatList } from 'react-native';
import axios from 'axios';

function Login({navigation}) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    try {
        await axios.post("http://bus-project.kro.kr/user/login",null, {
          params: {
            user_id: userId,
            password: password,
          }
        }).then(response => {
          // 성공적으로 요청을 보낸 경우의 처리
          console.log('요청 성공:', response.data);
          navigation.navigate('Main');
          // 서버에서 보낸 응답 데이터는 response.data에서 접근할 수 있음
        })
        .catch(error => {
          // 요청이 실패한 경우의 처리
          console.error('아이디 또는 비밀번호가 일치하지 않습니다.', error);
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
          <Button title="Login" onPress={registerUser} />
          <Button title="Sign up" onPress={() => navigation.navigate('Sign')} />
      </View>
  );
};

export default Login;
