import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
    const navigation = useNavigation();
    const [inputId, setInputId] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputPassword2, setInputPassword2] = useState("");
    const [inputPhoneNumber, setInputPhoneNumber] = useState("");
    const [inputName, setInputName] = useState("");
    const [idValidationMessage, setIdValidationMessage] = useState(""); // 아이디 유효성 검사 결과 메시지를 저장할 상태 변수

    // 정규 표현식 패턴들
    const regexrId = /^[a-zA-Z0-9]{4,12}$/;
    const regexrPw = /^[a-zA-Z0-9]{4,12}$/;
    const regexrName = /^[가-힣]{2,4}$/;
    const regexrPhone = /\d{3}-\d{3,4}-\d{4}/g;

    // 아이디 유효성 검사 버튼을 눌렀을 때 호출되는 함수
    const handleIdValidation = () => {
        if (inputId === "") {
            setIdValidationMessage("아이디를 입력하세요.");
            return;
        }

        if (!regexrId.test(inputId)) {
            setIdValidationMessage("아이디는 대소문자 또는 숫자로 시작하고 끝나며 4~12자리로 입력해야합니다.");
            return;
        }

        // 유효성 검사를 통과하면 메시지 초기화
        setIdValidationMessage("사용할 수 있는 아이디 입니다.");
    };

    const handleSignUp = () => {
        if (inputId === "") {
            Alert.alert("아이디를 입력하세요.");
            return;
        }

        if (inputPassword === "") {
            Alert.alert("비밀번호를 입력하세요.");
            return;
        }

        if (inputPassword2 === "") {
            Alert.alert("비밀번호를 다시 입력하세요.");
            return;
        }

        if (inputPassword !== inputPassword2) {
            Alert.alert("입력된 비밀번호의 값이 다릅니다. 확인해주세요.");
            return;
        }

        if (inputPassword.length < 4 || inputPassword.length > 10) {
            Alert.alert("비밀번호는 4~10글자로 입력해주세요.");
            return;
        }

        // 이름 유효성 검사 (2글자 이상)
        if (inputName.length < 2) {
            Alert.alert("이름은 2글자 이상이어야 합니다.");
            return;
        }

        // 전화번호 유효성 검사 (10 또는 11자리 숫자)
        if (!regexrPhone.test(inputPhoneNumber)) {
            Alert.alert("전화번호는 000-0000-0000 형식으로 입력하세요.");
            return;
        }

        // 회원가입 로직을 수행하고, 성공/실패 메시지를 표시하거나 원하는 동작을 수행하세요.
        Alert.alert('회원가입이 완료되었습니다.');
        navigation.navigate('LogIn'); // 모든 검사를 통과한 후 로그인 화면으로 이동
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text_title}>회원가입</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>아이디</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='default'
                    placeholder='아이디를 입력하세요'
                    value={inputId}
                    onChangeText={(text) => setInputId(text)}
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
                    value={inputPassword}
                    onChangeText={(text) => setInputPassword(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호 확인</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='default'
                    secureTextEntry={true}
                    placeholder='비밀번호를 다시 입력하세요'
                    value={inputPassword2}
                    onChangeText={(text) => setInputPassword2(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>이름</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='default'
                    placeholder='이름을 입력하세요'
                    value={inputName}
                    onChangeText={(text) => setInputName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>전화번호</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='phone-pad'
                    placeholder='전화번호를 입력하세요'
                    value={inputPhoneNumber}
                    onChangeText={(text) => setInputPhoneNumber(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
            >
                <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
        </View>
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

export default SignUp;
