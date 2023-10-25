// Sign.js
import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

function Sign({navigation}) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState(''); // 이름을 추가합니다.
  const [phoneNum, setPhoneNum] = useState('');
  const [rideORgetOff, setRideORgetOff] = useState(false);
  const [idValidationMessage, setIdValidationMessage] = useState(""); // 아이디 유효성 검사 결과 메시지를 저장할 상태 변수
  const [isValid, setIsValid] = useState(false);

  // 정규 표현식 패턴들
  const regexrId = /^[a-zA-Z0-9]{4,12}$/;
  const regexrPw = /^[a-zA-Z0-9]{4,12}$/;
  const regexrName = /^[가-힣]{2,4}$/;
  const regexrPhone = /^[0-9]{4}/g;


  const handleSignUp = () => {
    if (userId === "") {
      Alert.alert("아이디를 입력하세요.");
      return;
    }

    if (!regexrId.test(userId)) {
      Alert.alert("아이디는 대소문자 또는 숫자로 시작하고 끝나며 4~12자리로 입력해야합니다.");
        return;
    }

    if (password === "") {
        Alert.alert("비밀번호를 입력하세요.");
        return;
    }else if(!regexrPw.test(password)){
      return;
    }

    if (password2 === "") {
        Alert.alert("비밀번호를 다시 입력하세요.");
        return;
    }

    if (password !== password2) {
        Alert.alert("입력된 비밀번호의 값이 다릅니다. 확인해주세요.");
        return;
    }

    if (password.length < 4 || password.length > 10) {
        Alert.alert("비밀번호는 4~10글자로 입력해주세요.");
        return;
    }

    // 이름 유효성 검사 (2글자 이상)
    if (name.length < 2) {
        Alert.alert("이름은 2글자 이상이어야 합니다.");
        return;
    }

    // 전화번호 유효성 검사 (10 또는 11자리 숫자)
    if (!regexrPhone.test(phoneNum)) {
        Alert.alert("전화번호는 -없이 입력하세요.");
        return;
    }
    
    Alert.alert("회원가입 완료");
    setIsValid(true);
    // // 회원가입 로직을 수행하고, 성공/실패 메시지를 표시하거나 원하는 동작을 수행하세요.
    // Alert.alert('회원가입이 완료되었습니다.');
    // navigation.navigate('LogIn'); // 모든 검사를 통과한 후 로그인 화면으로 이동
};

  const registerUser = async () => {
    try {
      if (!isValid) {
        console.error("정보를 정확하게 입력해주세요.");
        return;
      }
        await axios.post("http://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/user/create", null,
        {
          params : {user_id: userId,
            name: name,
            password: password,
            ride_or_getoff: rideORgetOff,
            phone_num: phoneNum}
          })
        .then(response => {
          // 성공적으로 요청을 보낸 경우의 처리
          console.log('요청 성공:', response.data);
          navigation.navigate('Login');
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
          <Text>아이디 :</Text>
          <TextInput
              placeholder="아이디를 입력하세요"
              value={userId}
              onChangeText={text => setUserId(text)}
          />
          <TouchableOpacity
                    style={styles.validationButton}
                    onPress={handleSignUp}
                >
                    <Text style={styles.buttonText}>아이디 확인</Text>
                </TouchableOpacity>
          <Text>비밀번호 :</Text>
          <TextInput
              placeholder="비밀번호를 입력하세요"
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
          />
          <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호 확인</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='default'
                    secureTextEntry={true}
                    placeholder='비밀번호를 다시 입력하세요'
                    value={password2}
                    onChangeText={(text) => setPassword2(text)}
                />
            </View>
          <Text>이름 :</Text>
          <TextInput
              placeholder="이름을 입력하세요"
              value={name}
              onChangeText={text => setName(text)} // 이름을 상태로 업데이트합니다.
          />
          <Text>연락처 :</Text>
          <TextInput
                placeholder="연락처를 입력하세요"
                value={phoneNum}
                onChangeText={text => setPhoneNum(text)}
            />
            
          <Button style={styles.signupButton} title="회원가입" onPress={() => registerUser()} />
      </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
      width: '80%',
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
  },
  text_title: {
      fontSize: 50,
      color: '#125688', // 텍스트 색상 설정
      marginBottom: 30,
      fontWeight: 'bold',
  },
  inputContainer: {
      flexDirection: 'column',
      marginBottom: 20,
  },
  inputLabel: {
      fontSize: 18,
      marginBottom: 10,
      color: 'gray',
      textAlign: 'left',
  },
  textInput: {
      borderColor: "#E5E5E5",
      borderWidth: 1,
      height: 40,
      fontSize: 18,
      borderRadius: 5,
      paddingLeft: 10,
      textAlign: 'left',
      backgroundColor: '#FAFAFA',
  },
  InputId: {
      borderColor: "#E5E5E5",
      borderWidth: 1,
      width : '70%',
      height: 40,
      fontSize: 18,
      borderRadius: 5,
      paddingLeft: 10,
      textAlign: 'left',
      backgroundColor: '#FAFAFA',
  },
  idInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  signupButton: {
      backgroundColor: '#0095F6',
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 20,
  },
  buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
  },
  validationButton: {
      backgroundColor: '#0095F6',
      width: 80,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginLeft: 10,
  },
  validationMessage: {
      color: '#0095F6',
      marginTop: 5,
      textAlign: 'left',
  },
});
export default Sign;
