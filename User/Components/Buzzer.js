import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const Buzzer = ({ route }) => {
    const {
        userId,
        selectedCurrentBusStop,
        selectedEndPoint,
        selectedFirstNum,
    } = route.params;

    const [isPressed, setPressed] = useState(false);

    // 버튼의 스케일을 위한 상태
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
        // 버튼을 눌렀을 때 스케일을 줄임
        Animated.spring(scaleValue, {
            toValue: 0.95,
            friction: 5,
            useNativeDriver: true,
        }).start();
    }

    const handlePressOut = () => {
        // 버튼에서 손을 떼면 스케일을 원래대로 복구
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    }

    const handleBellPress = () => {
        console.log('하차벨을 눌렀습니다.');

        axios.post(`http://10.20.100.28:8080/driver/getOff`, null, {
            params: {
                user_id: userId,
                start: selectedCurrentBusStop,
                bus_uid: selectedFirstNum,
                end: selectedEndPoint,
            }
        })
            .then(response => {
                console.log('요청 성공:', response.data);
                setPressed(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    // 버튼 스타일 변경
    const buttonColor = isPressed ? '#CCCCCC' : '#FF4136';
    const buttonText = isPressed ? '완료!' : '하차벨';

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColor }]}
                    onPress={handleBellPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={0.7}
                    disabled={isPressed}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    button: {
        width: 400,
        height: 400,
        borderRadius: 200, // Make it circle
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10, // Shadow for Android
        shadowColor: '#000000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 100,
        fontWeight: 'bold',
    },
});

export default Buzzer;
