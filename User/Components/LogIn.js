import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const LogIn = () => {
    const navigation = useNavigation();

    return (
        <View backgroundColor='#FFFFFF'>
            <View style={styles.container}>
                <Text style={styles.text_title}>로그인</Text>
                <Text style={styles.text}>아이디</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='default'
                    placeholder='아이디를 입력하세요'
                />
                <Text style={styles.text}>비밀번호</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='default'
                    secureTextEntry={true}
                    placeholder='비밀번호를 입력하세요'
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Main')}
                >
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.signupButtonText}>회원가입</Text>
                </TouchableOpacity>
            </View>
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
