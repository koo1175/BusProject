import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

import { FontAwesome5 } from '@expo/vector-icons';

const BusStop = ({ navigation, route }) => {
    const { selectedUID, selectedName } = route.params;

    const [busNums, setBusNums] = useState([]);
    const [busFirstTime, setBusFirstTime] = useState([]);
    const [busSecondTime, setBusSecondTime] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get(`http://10.20.100.72:8080/getStationByUid?arsId=${selectedUID}`)
                .then(response => {
                    console.log('200 요청 성공');
                    setBusNums(response.data.arriveBusNum);
                    setBusFirstTime(response.data.arriveBusFirstTime);
                    setBusSecondTime(response.data.arriveBusSecondTime);
                })
                .catch(error => {
                    console.log('error: 요청 실패');
                    console.error('Error fetching bus stops:', error);
                });
        };

        const interval = setInterval(() => {
            fetchData();
        }, 1000000);

        return () => {
            clearInterval(interval);
        };
    }, [selectedUID]);

    const handleItemPress = (item, index) => {
        const selectedNum = busNums[index];
        const selectedFirstTime = busFirstTime[index];
        const selectedSecondTime = busSecondTime[index];
        navigation.navigate('HowLong', {
            selectedNum,
            selectedFirstTime,
            selectedSecondTime,
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
