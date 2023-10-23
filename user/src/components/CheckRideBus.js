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
        seletedRoutedId,        // 출발 정류장 노선 ID
        selectedDir,
        selectedName, //  현재 정류장 이름
        selectedEndPoint, // 전해받은 destination 도착지
        selectedEndPointRouteId, // 전해받은 도착지 노선ID
        userId                  // 유저 아이디
    } = route.params;
    const [busStops, setBusStops] = useState([]);
    
// 확인 버튼 눌렀을 때
// 해야하는 것 
const handleItemPress = async () => {
    try{
        await axios.post(`http://10.20.106.98:8080/driver/ride`, null, {
            params : {
                bus_uid : selectedFirstNum, //  버스 번호판
                start : selectedName, // 출발 정류소 이름
                start_route_id : seletedRoutedId,
                user_id: userId,
                end: selectedEndPoint, // 도착 정류소 이름
                end_route_id : selectedEndPointRouteId, // 도착 정류소 노선 ID

            }
        })
        .then(response => {
            // 성공적으로 요청을 보낸 경우의 처리
            console.log('요청 성공:', response.data);
            navigation.navigate('Buzzer', {
                selectedFirstNum: selectedFirstNum,
                selectedCurrentBusStop: selectedCurrentBusStop,
                selectedEndPoint: selectedEndPoint,
                start : selectedName,
                end : selectedEndPoint,
                userId: userId,
            });
            console.log('CheckRideBus ');
            console.log('출발 정류소 이름: ', selectedName);
            console.log('출발 정류소 노선 ID: ', seletedRoutedId);
            console.log('도착지 이름: ', selectedEndPoint);
            console.log('도착 정류소 노선 ID: ', selectedEndPointRouteId);
            // 가져온 데이터를 상태에 저장 <- busStop 클래스를 들고옴 stationNames와 nearStationNames라는 필드 존재
            setBusStops(response.data.setStationName);
            
           
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
