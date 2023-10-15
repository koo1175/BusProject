// 버스 탑승 확인/취소 페이지 -> Buzzer

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';


function CheckRideBus ({navigation, route}) {

    const { 
        selectedNum,  // 버스 번호
        selectedFirstTime,
        selectedSecondTime,
        selectedFirstNum,   // 버스 번호판
        selectedSecondNum,
        selectedCurrentBusStop, // 현재 정류장 번호
        selectedDir,
        selectedName, //  현재 정류장 이름
        selectedEndPoint, // 전해받은 destination 도착지
        userId                  // 유저 아이디
    } = route.params;
    
    const [busStops, setBusStops] = useState([]);
    
// 확인 버튼 눌렀을 때
// 해야하는 것 
const handleItemPress = async () => {
    try{
        await axios.post(`http://10.20.105.164:8080/driver/ride`, null, {
            params : {
                bus_uid : selectedFirstNum,
                bus_stop : selectedName,
                user_id: userId,
                destination: selectedEndPoint,
            }
        })
        .then(response => {
            // 성공적으로 요청을 보낸 경우의 처리
            console.log('요청 성공:', response.data);
            navigation.navigate('Buzzer', {
                selectedFirstNum: selectedFirstNum,
                selectedCurrentBusStop: selectedCurrentBusStop,
                selectedEndPoint: selectedEndPoint,
                userId: userId,
            });
            // 가져온 데이터를 상태에 저장 <- busStop 클래스를 들고옴 stationNames와 nearStationNames라는 필드 존재
            setBusStops(response.data);
    
           
        }).catch(error => {
            console.error('Error fetching bus stops:', error);
          });
        }
        catch(error){
            console.error('Error registering user:', error);
        }
  };
    return (
        <View>
            <Text style={ styles.titleStyle }> 버스를 탑승하시겠습니까? </Text>
            <Text style={ styles.titleStyle }> 탑승할 버스 번호 : {selectedNum} 번</Text>
            <Text style={ styles.titleStyle }> 탑승할 버스 번호판 : {selectedFirstNum} </Text>
            <Text style={ styles.titleStyle }> 내릴 정류장 : {selectedEndPoint}</Text>
            <View  style={ styles.viewStyle }>
                <TouchableOpacity style={styles.button} onPress={() => handleItemPress()}>
                    <Text style={ styles.text }>탑승 확인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={ styles.text }>탑승 취소</Text> 
                </TouchableOpacity> 
            </View>
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
        width: '40%',
        backgroundColor:'gray', 
        marginTop :40 ,
        paddingVertical :16,
        paddingHorizontal :32,
    },
    viewStyle: {
        flex: 0, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
    
});
  

export default CheckRideBus;
