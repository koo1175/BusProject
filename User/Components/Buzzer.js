//Buzzer 하차벨 누르는 페이지

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';


const Buzzer = ({navigation, route}) => {


    const {
        userId,             // user ID
        start, // 출발 정류장 이름
        end, // 도착 정류장 이름
        selectedFirstNum,   // 차 번호
    } = route.params;


    const [isPressed, setPressed] = useState(false);
    const [state, setState] = useState('');

    const handleBellPress = () => {
        console.log('하차벨을 눌렀습니다.');

        axios.post(`http://10.20.100.37:8080/driver/getOff`, null, {
            params : {
                user_id : userId,
                start : start,
                bus_uid : selectedFirstNum,
                end : end,
            }
        })
            .then(response => {
                // 성공적으로 요청을 보낸 경우의 처리
                console.log('요청 성공:', response.data);

                // 가져온 데이터를 상태에 저장 <- busStop 클래스를 들고옴 stationNames와 nearStationNames라는 필드 존재
                setState(response.data);

                // 버틀을 눌린 상태로 변경해준다.
                setPressed(true);

            }).catch(error => {
            console.error('Error fetching bus stops:', error);
        });
    };

    const buttonStyle = isPressed? styles.pressedButton : styles.button;

    return (
        <View>
            <Text style={ styles.titleStyle }>하차벨</Text>

            <TouchableOpacity
                style={buttonStyle}
                onPress={handleBellPress}
                activeOpacity={0.7} // 투명도 조절
            >
                <Text style={styles.buttonText}>버스 하차벨</Text>
            </TouchableOpacity>
        </View>

    );
};


const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center'
    },
    text: {
        color:'white',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#c23a3a', // 기본 배경색 (탁한 빨간색)
        padding: 20,
        borderRadius: 10,
    },
    pressedButton: {
        backgroundColor: '#eb2a2a', // 눌린 상태의 배경색 (밝은 빨간색)
        padding: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white', // 버튼 텍스트 색상
        fontSize: 24,
    },
    viewStyle: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }

});


export default Buzzer;