import React from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const LogIn = () => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text_title}>로그인</Text>
                <Text style={styles.text}>전화번호</Text>
                <TextInput style={styles.textInput} type='text' placeholder=' 전화번호' />
                <Text style={styles.text}>버스 번호판</Text>
                <TextInput style={styles.textInput} type='text' placeholder=' 버스 번호판' />
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
    )
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#FFFFFF'
    },
    text_title: {
        marginTop: 40,
        marginBottom: 120,
        fontSize: 50,
    },
    text: {
        fontSize: 25
    },
    textInput: {
        borderColor: "#000000",
        borderWidth: 1,
        width: '70%',
        height: '8%',
        marginTop: 8,
        marginBottom: 50,
        fontSize: 25,
        borderRadius: 5
    },
    button: {
        backgroundColor: 'blue', // Set the background color to blue
        width: '50%',
        padding: 10,
        justifyContent: 'center',
        fontSize: 20,
        marginTop: 20, // Add margin to match the spacing
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    signupButton: {
        backgroundColor: 'green', // You can customize the button's style here
        width: '50%',
        padding: 10,
        justifyContent: 'center',
        marginTop: 20, // Adjust the spacing as needed
    },
    signupButtonText: {
        color: 'white', // You can customize the text color
        fontSize: 20,
        textAlign: 'center',
    }

});

export default LogIn;
