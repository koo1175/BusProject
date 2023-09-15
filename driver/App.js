import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [phone, setPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const handleSignUp = () => {
    // 회원가입 로직을 구현합니다.
    console.log('전화번호', phone);
    console.log('차량 번호', licensePlate);
    // 회원가입 로직을 완성한 후, 필요한 작업을 수행하세요.
  };

  const handleLogin = () => {
    // 로그인 로직을 구현합니다.
    console.log('로그인 버튼이 클릭되었습니다.');
    // 로그인 로직을 완성한 후, 필요한 작업을 수행하세요.
  };

  return (
    <View style={styles.container}>
      <Text>전화번호</Text>
      <TextInput
        style={styles.input}
        placeholder="전화번호"
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <Text>차량 번호</Text>
      <TextInput
        style={styles.input}
        placeholder="차량 번호"
        onChangeText={(text) => setLicensePlate(text)}
        value={licensePlate}
      />
      <Button title="차량등록" onPress={handleSignUp} />
      <Button title="로그인" onPress={handleLogin} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
  },
});
