import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [idValidationMessage, setIdValidationMessage] = useState('');

    const regexrId = /^[a-zA-Z0-9]{4,12}$/;
    const regexrPhone = /^\d{11}$/;

    const screenWidth = Dimensions.get('window').width;

    const handleIdValidation = () => {
        if (userId === "") {
            setIdValidationMessage("아이디를 입력하세요.");
            return;
        }

        if (!regexrId.test(userId)) {
            setIdValidationMessage("아이디는 대소문자 또는 숫자로 시작하고 끝나며 4~12자리로 입력해야합니다.");
            return;
        }

        setIdValidationMessage("사용할 수 있는 아이디 입니다.");
    };

    const registerUser = async () => {
        try {
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

        if (password.length < 4 || password.length > 12) {
            Alert.alert("비밀번호는 4~12글자로 입력해주세요.");
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

        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text_title}>회원가입</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>아이디</Text>
                    <View style={styles.idInputContainer}>
                        <TextInput
                            style={styles.InputId}
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
                    style={styles.signupButton}
                    onPress={handleSignUp}
                >
                    <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

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

export default SignUp;
