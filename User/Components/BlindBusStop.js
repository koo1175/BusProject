// 메인 -> 버스 정거장 등록 페이지

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import axios from 'axios';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const BlindBusStop = ({ navigation,route }) => {

    // 이전 Main페이지에서 받아온 위치
    const {  userId } = route.params;

    // 버스 정류장 데이터 관리
    const [busUIDs, setBusUIDs] = useState([]);
    const [busNames, setBusNames] = useState([]);

    useEffect(() => {
        axios.get(`http://10.20.100.88:8080/getStationByPos?X=126.9407&Y=37.56223`)
            .then(response => {
                setBusNames(response.data.nearStationName);
                setBusUIDs(response.data.nearStationUIDs);
            })
            .catch(error => {
                console.error('Error fetching bus stops:', error);
            });
    }, []);

    useEffect(() => {
        if (busNames.length > 0 && busUIDs.length > 0) {
            next();
        }
    }, [busNames, busUIDs]);

    const next = () => {
        const selectedName = busNames[0];
        const selectedUID = busUIDs[0];
        console.log("busstop", selectedUID);
        navigation.navigate('BlindEndPoint', {
            selectedName,
            selectedUID,
            userId: userId
        });
    };


};

export default BlindBusStop;