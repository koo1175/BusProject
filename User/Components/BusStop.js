import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

import { FontAwesome5 } from '@expo/vector-icons';


const BusStop = ({ navigation, route }) => {
    const { selectedName , selectedUID, userId } = route.params;
    const [busNums, setBusNums] = useState([]);             // 도착 버스 번호
    const [busFirstTime, setBusFirstTime] = useState([]);
    const [busSecondTime, setBusSecondTime] = useState([]);
    const [busFirstNum, setBusFirstNum] = useState([]);
    const [busSecondNum, setBusSecondNum] = useState([]);
    const [busDirs, setBusDirs] = useState([]);
    const [currentBusStop, setCurrentBusStop] = useState([]); // 현재 정류장 번호
    const [busRoutedId, setBusRoutedId] = useState([]); // 노선 ID -> 다음 axiod시 필요 ( 노선 ID에 해당하는 경유 정류장 리스트 조회 )

    useEffect(() => {
        const fetchData = () => {
            axios.get(`http://10.20.100.37:8080/getStationByUid?arsId=${selectedUID}`)
                .then(response => {
                    console.log('200 요청 성공');
                    setBusNums(response.data.arriveBusNum);            // 도착 버스 번호
                    setBusFirstTime(response.data.arriveBusFirstTime); // 도착 정보(첫번째)
                    setBusSecondTime(response.data.arriveBusSecondTime); // 도착 정보(두번째)
                    setBusFirstNum(response.data.arriveBusFirstNum);   // 차 번호판(첫번째)
                    setBusSecondNum(response.data.arriveBusSecondNum); // 차 번호판(두번째)
                    setCurrentBusStop(response.data.currentBusStop);   // 현재 버스 정류장 번호
                    setBusDirs(response.data.arriveBusDir);            // 버스 방향
                    setBusRoutedId(response.data.busRoutedId);         // 노선 ID
                })
                .catch(error => {
                    console.log('error: 요청 실패');
                    console.error('Error fetching bus stops:', error);
                });
        };
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 100000000);

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
        const seletedRoutedId = busRoutedId[index];
        // 선택한 문자열을 다음 페이지인 'EndPoint' 페이지로 전달
        navigation.navigate('EndPoint', {
            selectedNum,
            selectedFirstTime,
            selectedSecondTime,
            selectedFirstNum,
            selectedSecondNum,
            selectedCurrentBusStop,
            selectedDir,
            seletedRoutedId,
            selectedUID,
            userId: userId,
            selectedName: selectedName,// 현재 정류장 이름 - > 기사한테 승객이 타는 위치를 알려주기 위해 전달해두자
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}> {selectedName} 정류장 </Text>
            <Text style={styles.titleStyle}> {selectedUID} 정류장 UID </Text>


            <FlatList
                data={busNums}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item, index)}>
                        <ListItem bottomDivider>
                            <View style={styles.leftContainer}>
                                <FontAwesome5 name="bus" size={30} color="#125688" style={styles.icon} />

                                <ListItem.Title style={styles.busNumber}>{item}번</ListItem.Title>
                            </View>
                            <View style={styles.rightContainer}>
                                <ListItem.Subtitle style={styles.Bus1Time}>{busFirstTime[index]}</ListItem.Subtitle>
                                <ListItem.Subtitle style={styles.Bus2Time}>{busSecondTime[index]}</ListItem.Subtitle>
                            </View>
                        </ListItem>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    busNumber: {
        flex: 1,
    },
    timeContainer: {
        flex: 1,
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'column', // 세로로 나란히 정렬
        justifyContent: 'center', // 아이템을 세로 방향으로 가운데 정렬
    },
    rightContainer: {
        flex: 2,
        flexDirection: 'column', // 세로로 나란히 정렬
        justifyContent: 'center', // 아이템을 세로 방향으로 가운데 정렬
    },
    Bus1Time: {
        textAlign: 'right',
    },
    Bus2Time: {
        textAlign: 'right',
    },
});

export default BusStop;