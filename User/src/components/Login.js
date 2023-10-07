// Login.js
import React, { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import LogIn from "../../components/Login";

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
        <View backgroundColor='#FFFFFF' style={styles.container}>
            <Text style={styles.text_title}>로그인</Text>
            <Text style={styles.text}>아이디</Text>
            <TextInput
                style={styles.textInput}
                keyboardType='default'
                placeholder='아이디를 입력하세요'
                value={userId}
                onChangeText={text => setUserId(text)}
            />
            <Text style={styles.text}>비밀번호</Text>
            <TextInput
                style={styles.textInput}
                keyboardType='default'
                secureTextEntry={true}
                placeholder='비밀번호를 입력하세요'
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={registerUser}
            >
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('Sign')}
            >
                <Text style={styles.signupButtonText}>회원가입</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 30,
        alignItems: 'center'
    },
    text_title: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 50,
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 25,
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    textInput: {
        borderColor: "#000000",
        borderWidth: 1,
        width: '70%',
        height: '8%',
        marginTop: 8,
        marginBottom: 20,
        fontSize: 25,
        borderRadius: 5,
        paddingLeft: 10
    },
    button: {
        backgroundColor: 'blue',
        width: '50%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    signupButton: {
        backgroundColor: 'green',
        width: '50%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        borderRadius: 5
    },
    signupButtonText: {
        color: 'white',
        fontSize: 20
    }
});


export default LogIn;
