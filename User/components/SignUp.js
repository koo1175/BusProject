import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const Sign = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [rideORgetOff, setRideORgetOff] = useState(false);
    const [idValidationMessage, setIdValidationMessage] = useState('');

    // 정규 표현식 패턴들
    const regexrId = /^[a-zA-Z0-9]{4,12}$/;
    const regexrPw = /^[a-zA-Z0-9]{4,12}$/;
    const regexrName = /^[가-힣]{2,4}$/;
    const regexrPhone = /^\d{11}$/; // Updated phone number format to accept 11 digits only

    // 아이디 유효성 검사 버튼을 눌렀을 때 호출되는 함수
    const handleIdValidation = () => {
        if (userId === "") {
            setIdValidationMessage("아이디를 입력하세요.");
            return;
        }

        if (!regexrId.test(userId)) {
            setIdValidationMessage("아이디는 대소문자 또는 숫자로 시작하고 끝나며 4~12자리로 입력해야합니다.");
            return;
        }

        // 유효성 검사를 통과하면 메시지 초기화
        setIdValidationMessage("사용할 수 있는 아이디 입니다.");
    };

    const registerUser = async () => {
        try {
            // await axios.post("http://bus-project.kro.kr/user/create", null, {
            await axios.post("http://10.20.100.72:8080/user/login", null, {
                params: {
                    user_id: userId,
                    name: name,
                    password: password,
                    ride_or_getoff: rideORgetOff,
                    phone_num: phoneNum
                }
            }).then(response => {
                console.log('요청 성공:', response.data);
                Alert.alert('회원가입이 완료되었습니다.');
                navigation.navigate('Login');
            }).catch(error => {
                console.error('요청 실패:', error);
            });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleSignUp = () => {
        if (userId === "") {
            Alert.alert("아이디를 입력하세요.");
            return;
        }

        if (password === "") {
            Alert.alert("비밀번호를 입력하세요.");
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

        if (name.length < 2) {
            Alert.alert("이름은 2글자 이상이어야 합니다.");
            return;
        }

        if (!regexrPhone.test(phoneNum)) {
            Alert.alert("전화번호는 11자리 숫자로 입력하세요.");
            return;
        }

        registerUser();

        // Close the keyboard (input focus)
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.text_title}>회원가입</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>아이디</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='default'
                        placeholder='아이디를 입력하세요'
                        value={userId}
                        onChangeText={(text) => setUserId(text)}
                    />
                    <TouchableOpacity
                        style={styles.validationButton}
                        onPress={handleIdValidation}
                    >
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.validationMessage}>{idValidationMessage}</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>비밀번호</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='default'
                        secureTextEntry={true}
                        placeholder='비밀번호를 입력하세요'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
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
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>이름</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='default'
                        placeholder='이름을 입력하세요'
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>전화번호</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='phone-pad'
                        placeholder='전화번호를 입력하세요 (11자리 숫자)'
                        value={phoneNum}
                        onChangeText={(text) => setPhoneNum(text.replace(/[^0-9]/g, ''))}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignUp}
                >
                    <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    text_title: {
        fontSize: 50,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 10,
        color: 'gray',
        width: '20%',
        textAlign: 'left',
    },
    textInput: {
        borderColor: "#000000",
        borderWidth: 1,
        width: '60%',
        height: 40,
        fontSize: 18,
        borderRadius: 5,
        paddingLeft: 10,
        textAlign: 'left',
    },
    button: {
        backgroundColor: 'blue',
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    validationButton: {
        backgroundColor: 'gray',
        width: '20%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
    },
    validationMessage: {
        color: 'red',
        marginTop: 5,
        width: '80%',
        textAlign: 'left',
    },
});

export default Sign;
