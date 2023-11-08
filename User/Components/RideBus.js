import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const RideBus = ({ navigation, route }) => {
    const { latitude, longitude } = route.params;
    const [busStops, setBusStops] = useState([]);
    const [busUIDs, setBusUIDs] = useState([]);
    const [busNames, setBusNames] = useState([]);

    useEffect(() => {
        axios.get(`http://10.20.100.28:8080/getStationByPos?X=126.9407&Y=37.56223`)
            .then(response => {
                setBusStops(response.data);
                setBusNames(response.data.nearStationName);
                setBusUIDs(response.data.nearStationUIDs);
            })
            .catch(error => {
                console.error('Error fetching bus stops:', error);
            });
    }, []);

    const handleItemPress = (item, index) => {
        const selectedName = busNames[index];
        const selectedUID = busUIDs[index];
        navigation.navigate('BusStop', {
            selectedName,
            selectedUID,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>가까운 정류장</Text>
            <FlatList
                data={busNames.slice(0, 5)} // 최대 5개의 정류장 이름만 표시
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => handleItemPress(item, index)}
                        style={styles.listItem}
                    >
                        <View style={styles.listItemContent}>
                            <Ionicons name="bus-outline" size={50} color="black" />
                            <Text style={styles.listItemTitle}>{` ${item}`}</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={24} color="#999" />
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
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9', // 애플 디자인에 맞는 연한 배경색
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10, // 라운드 코너
        shadowColor: "#000", // 간단한 그림자 효과
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
        elevation: 2,
    },
    listItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemTitle: {
        fontSize: 30,
        marginLeft: 10, // 아이콘과 텍스트 사이의 간격
    },
});

export default RideBus;
