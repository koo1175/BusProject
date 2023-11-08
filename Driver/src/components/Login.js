import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; // Material icons 사용

function Login({ navigation }) {
    const [phoneNum, setPhoneNum] = useState('');
    const [busUid, setBusUid] = useState('');

    const login = async () => {
        try {
            const response = await axios.post('http://10.20.100.28:8080/driver/login', null, {
                params: {
                    phone_num: phoneNum,
                    bus_uid: busUid,
                },
            });
            console.log('요청 성공:', response.data);
            navigation.navigate('Main', {
                phoneNum: phoneNum,
                busUid: busUid,
            });
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <MaterialIcons name='directions-bus' size={120} color='#5E35B1' style={styles.icon} />
            <Text style={styles.title}>로그인</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='휴대전화 번호'
                    keyboardType='phone-pad'
                    value={phoneNum}
                    onChangeText={setPhoneNum}
                    placeholderTextColor='#999'
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='버스 차 번호판'
                    value={busUid}
                    onChangeText={setBusUid}
                    placeholderTextColor='#999'
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        padding: 20,
    },
    title: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        marginVertical: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        borderColor: '#5E35B1',
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderRadius: 8,
        fontSize: 18,
        padding: 15,
        color: '#333',
        elevation: 3, // Android 에서 그림자 효과
    },
    button: {
        marginTop: 10,
        backgroundColor: '#5E35B1',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 25,
        width: '100%',
        elevation: 3, // Android 에서 그림자 효과
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '500',
    },
    icon: {
        marginBottom: 32,
    },
});

export default Login;
