import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            // await axios.post("http://bus-project.kro.kr/user/login", null, {
            await axios.post("http://10.20.100.72:8080/user/login", null, {
                params: {
                    user_id: userId,
                    password: password,
                }
            }).then(response => {
                // 성공적으로 요청을 보낸 경우의 처리
                console.log('요청 성공:', response.data);
                navigation.navigate('Main', {userId: userId});
                // 서버에서 보낸 응답 데이터는 response.data에서 접근할 수 있음
            })
                .catch(error => {
                    // 요청이 실패한 경우의 처리
                    console.error('아이디 또는 비밀번호가 일치하지 않습니다.', error);
                });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>BusProject</Text>
                </View>


                <View style={styles.formContainer}>
                <TextInput
                    style={styles.textInput}
                    keyboardType='default'
                    placeholder='아이디'
                    value={userId}
                    onChangeText={text => setUserId(text)}
                />

                <TextInput
                    style={styles.textInput}
                    keyboardType='default'
                    secureTextEntry={true}
                    placeholder='비밀번호'
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={registerUser}
                >
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>또는</Text>

                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.signupButtonText}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
            </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    formContainer: {        //전체 비율 조정
        width: '50%',
    },
    container: {
        flex: 1,
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center',     // 가로 중앙 정렬
        backgroundColor: 'white',
    },
    logoContainer: {
        marginBottom: 20,
    },
    logoText: {
        color: '#125688', // 텍스트 색상 설정
        fontSize: 50,
        fontWeight: 'bold',

    },

    textInput: {
        borderColor: "#E5E5E5",
        opacity : 0.7,
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        fontSize: 18,
        borderRadius: 5,
        paddingLeft: 30,
        width: '100%',

    },
    loginButton: {
        backgroundColor: '#458eff',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
    },
    signupButton: {
        backgroundColor: '#0095F6',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    orText: {
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 10,
    },
    signupButtonText: {
        color: 'white',
        fontSize: 20,
    }
});

export default Login;
