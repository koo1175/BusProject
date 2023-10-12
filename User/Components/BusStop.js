// 정거장 등록 (RideBus) -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';


const BusStop = ({navigation, route}) => {
    const { selectedUID, selectedName } = route.params;

    const [busNums, setBusNums] = useState([]);
    const [busFirstTime, setBusFirstTime] = useState([]);
    const [busSecondTime, setBusSecondTime] = useState([]);
    const [busFirstNum, setBusFirstNum] = useState([]);
    const [busSecondNum, setBusSecondNum] = useState([]);
    const [busDirs, setBusDirs] = useState([]);
    const [currentBusStop, setCurrentBusStop] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get(`http://10.20.100.72:8080/getStationByUid?arsId=${selectedUID}`)
                .then(response => {
                    // 가져온 데이터를 상태에 저장 response.data == bus Class
                    console.log('200 요청 성공');
                    setBusNums(response.data.arriveBusNum);            // 도착 버스 번호
                    setBusFirstTime(response.data.arriveBusFirstTime); // 도착 정보(첫번째)
                    setBusSecondTime(response.data.arriveBusSecondTime); // 도착 정보(두번째)
                    setBusFirstNum(response.data.arriveBusFirstNum);   // 차 번호판(첫번째)
                    setBusSecondNum(response.data.arriveBusSecondNum); // 차 번호판(두번째)
                    setCurrentBusStop(response.data.currentBusStop);   // 현재 버스 정류장 번호
                    setBusDirs(response.data.arriveBusDir);            // 버스 방향

                })
                .catch(error => {
                    console.log('error : 요청 실패');
                    console.error('Error fetching bus stops:', error);
                });
        };
        // 3초마다 데이터를 갱신
        const interval = setInterval(() => {
            fetchData();
        }, 3000);

        // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 간격 함수를 정리
        return () => {
            clearInterval(interval);
        };
    }, [selectedUID]);



    const handleItemPress = (item, index) => {
        const selectedNum = busNums[index];
        const selectedFirstTime = busFirstTime[index];
        const selectedSecondTime = busSecondTime[index];
        const selectedFirstNum = busFirstNum[index];
        const selectedSecondNum = busSecondNum[index];
        const selectedCurrentBusStop = currentBusStop[index];
        const selectedDir = busDirs[index];
        // 선택한 문자열을 다음 페이지인 'BusStop' 페이지로 전달
        navigation.navigate('HowLong', {
            selectedNum,
            selectedFirstTime,
            selectedSecondTime,
            selectedFirstNum,
            selectedSecondNum,
            selectedCurrentBusStop,
            selectedDir
        });
    };


    return (
        <View>
            <Text style={ styles.titleStyle }> {selectedName} 정류장 </Text>
            <Text style={ styles.titleStyle }> {selectedUID} 정류장 UID </Text>
            <Text style={ styles.titleStyle }>결과 출력 확인란 :  {busNums}  </Text>
            <FlatList
                data={busNums}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item,index)}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item}번</ListItem.Title>
                                <ListItem.Subtitle>{busFirstTime[index]}</ListItem.Subtitle>
                                <ListItem.Subtitle>{busSecondTime[index]}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                )}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10
    },

});


export default BusStop;