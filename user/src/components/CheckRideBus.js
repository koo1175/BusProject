// 버스 탑승 확인/취소 페이지 -> Buzzer

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


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
        userId,                  // 유저 아이디
        arrive
    } = route.params;
    const [busStops, setBusStops] = useState([]);
    console.log("selectedFirstNum: "+selectedFirstNum);
    console.log("selectedName: "+selectedName);
    console.log("seletedRoutedId: "+seletedRoutedId);
    console.log("userId: "+userId);
    console.log("selectedEndPointRouteId: "+selectedEndPointRouteId);
// 확인 버튼 눌렀을 때
// 해야하는 것 
const handleItemPress = async () => {
    try{
        await axios.post(`http://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/passenger/ride`, null, {
            params : {
                bus_uid : selectedFirstNum, //  버스 번호판
                start : selectedName, // 출발 정류소 이름
                start_route_id : seletedRoutedId,
                user_id: userId,
                end: arrive, // 도착 정류소 이름
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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleStyle}>버스 탑승 확인</Text>
            </View>

            <View style={styles.busIconContainer}>
                <FontAwesome5 name="bus" size={300} color="black" />
                <Text style={styles.busIconText}>{selectedNum}</Text>
                <Text style={styles.busIconNum}>{selectedFirstNum}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>탑승할 버스 번호판: {selectedFirstNum}</Text>
                <Text style={styles.infoText}>내릴 정류장: {arrive}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleItemPress()}>
                    <Text style={styles.buttonText}>탑승 확인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {/* 탑승 취소 처리 */}}>
                    <Text style={styles.buttonText}>탑승 취소</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    header: {
        marginTop: 50,
    },
    titleStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#125688',
    },
    busIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    busIconText: {
        position: 'absolute',
        color: '#125688',
        fontSize: 80,
        fontWeight: 'bold',
        top: '24%', // 아이콘 내에서의 상대적 위치 조정
        textAlign: 'center', // 텍스트 중앙 정렬
        width: '100%', // 부모 컨테이너의 전체 너비 사용
    },
    busIconNum: {
        position: 'absolute',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        top: '70%', // 아이콘 내에서의 상대적 위치 조정
        textAlign: 'center', // 텍스트 중앙 정렬
        width: '100%', // 부모 컨테이너의 전체 너비 사용
    },
    infoContainer: {
        alignItems: 'center',
    },
    infoText: {
        fontSize: 20,
        color: '#333',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#125688',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default CheckRideBus;
