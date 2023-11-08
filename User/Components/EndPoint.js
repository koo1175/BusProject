import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';


const EndPoint = ({navigation, route}) => {
    const {
        selectedNum,  // 버스 번호
        selectedName, // 정류장 이름
        selectedFirstTime,
        selectedSecondTime,
        selectedFirstNum,   // 버스 번호판
        selectedSecondNum,
        selectedCurrentBusStop, // 현재 정류장 번호
        selectedDir,
        seletedRoutedId,
        userId                  // 유저 아이디
    } = route.params;

    const [station, setStation] = useState([]);
    const [busNum, setBusNum] = useState([]);
    const [routeId, setRouteId] = useState([]);

    useEffect(() => {
        axios.get(`http://10.20.100.28:8080/getArrInfoByRouteAll?busRouteId=${seletedRoutedId}`)
            .then(response => {
                setStation(response.data.stationNames);
                setBusNum(response.data.busNum);
                setRouteId(response.data.busRouteId);
            })
            .catch(error => {
                console.error('Error fetching bus stops:', error);
            });
    }, []);


        const handleItemPress = (item, index) => {
        const selectedEndPoint = station[index];
        const selectedEndPointRouteId = routeId && routeId.length > index ? routeId[index] : null;
        const selectedEndPointBusNum = busNum && busNum.length > index ? busNum[index] : null;

        // navigation.navigate('CheckRideBus', {
        //     selectedNum: selectedNum,  // 현재 선택된 버스 번호
        //     selectedFirstTime: selectedFirstTime,
        //     selectedSecondTime: selectedSecondTime,
        //     selectedFirstNum: selectedFirstNum,   // 버스 번호판
        //     selectedSecondNum: selectedSecondNum,
        //     selectedCurrentBusStop: selectedCurrentBusStop, // 현재 정류장 번호
        //     selectedDir: selectedDir,
        //     seletedRoutedId: seletedRoutedId,
        //     selectedName : selectedName, // 현재(탑승) 정류장 이름
        //     userId: userId,
        //     selectedEndPointRouteId,       // 하차 정류소 노선 ID
        //     selectedEndPointBusNum,        // 하차 정류소의 첫번째 도착 버스 ( <- 저장해두면 안될것 같음 )
        //     selectedEndPoint,               // 하차 정류소 이름
        //     bus_stop : selectedEndPointRouteId,
        // });
            navigation.navigate('Buzzer', {

            });

    };

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <FontAwesome5 name="bus" size={30} color="#125688" style={styles.icon} />
                <Text style={styles.subHeaderTextBold}>{selectedNum}번 버스</Text>
                <Text style={styles.subHeaderText}>출발 정류장: {selectedName}</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>내릴 정류장을 선택해주세요</Text>
            </View>
            <FlatList
                contentContainerStyle={styles.listContentContainer}
                data={station}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => handleItemPress(item, index)}
                    >
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItemTitle}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    subHeader: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D6',
    },
    subHeaderText: {
        fontSize: 15,
        fontWeight: '400',
        color: '#1C1C1E',
        fontFamily: 'System',
    },
    subHeaderTextBold: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1C1C1E',
        fontFamily: 'System',
        marginBottom: 4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    listContentContainer: {
        backgroundColor: '#F0F0F0',
    },
    listItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemTitle: {
        fontWeight: '500',
        fontSize: 17,
        color: '#1C1C1E',
    },
});

export default EndPoint;
