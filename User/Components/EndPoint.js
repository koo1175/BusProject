// 정거장 등록 (RideBus) -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, Button, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';


const EndPoint = ({navigation, route}) => {
    const {
        busNums,
        busFirstTime,
        busSecondTime,
        busFirstNum,
        busSecondNum,
        busDirs,
        currentBusStop,
        busRoutedId,
        selectedUID,
        userId,
        selectedName,
    } = route.params;
    const [arrive, setArrive] = useState('');
    console.log("==== EndPoint 페이지 ====");
    console.log(busNums);


    const handleItemPress = () => {
        // 선택한 문자열을 다음 페이지인 'CheckRideBus' 페이지로 전달
        navigation.navigate('EndPointList', {
            busNums,
            busFirstTime,
            busSecondTime,
            busFirstNum,
            busSecondNum,
            busDirs,
            currentBusStop,
            busRoutedId,
            userId,
            selectedUID,
            selectedName,
            arrive: arrive // 검색한 정류장 이름(도착)
            // selectedNum: selectedNum,  // 현재 선택된 버스 번호
            // selectedFirstTime: selectedFirstTime,
            // selectedSecondTime: selectedSecondTime,
            // selectedFirstNum: selectedFirstNum,   // 버스 번호판
            // selectedSecondNum: selectedSecondNum,
            // selectedCurrentBusStop: selectedCurrentBusStop, // 현재 정류장 번호
            // selectedDir: selectedDir,
            // seletedRoutedId: seletedRoutedId,
            // selectedName : selectedName, // 현재(탑승) 정류장 이름
            // userId: userId,
            // selectedEndPointRouteId,       // 하차 정류소 노선 ID
            // selectedEndPointBusNum,        // 하차 정류소의 첫번째 도착 버스 ( <- 저장해두면 안될것 같음 )
            // selectedEndPoint,               // 하차 정류소 이름
        });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>도착지 설정</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="어디로 가시나요?"
                    placeholderTextColor="#999"
                    onChangeText={text => setArrive(text)}
                    value={arrive}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleItemPress}>
                <Text style={styles.buttonText}>완료</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        padding: 20,
    },
    titleStyle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#262626',
        marginBottom: 25,
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#DBDBDB',
        borderRadius: 10,
        padding: 8,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#262626',
    },
    button: {
        height : 50,
        width: 300,
        backgroundColor: '#3897f0',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        left: 25,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EndPoint;