// 메인 -> 버스 정거장 등록 페이지

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { PermissionsAndroid } from 'react-native';
import axios from 'axios';


  
const RideBus = ({ navigation,route }) => {

  // 이전 Main페이지에서 받아온 위치
  const { latitude, longitude } = route.params;

  // 버스 정류장 데이터 관리
  const [busStops, setBusStops] = useState([]);

      useEffect(() => {
        // 스프링 부트 서버(BusRouteAllListController)에서 api에 요청해서 받아온 정류장 데이터를 가져온다
        axios.get(`http://bus-project.kro.kr/getStationByPos?X=${latitude}&Y=${longitude}`) 
          .then(response => {
            // 가져온 데이터를 상태에 저장
            setBusStops(response.data);
          })
          .catch(error => {
            console.error('Error fetching bus stops:', error);
          });
      }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때 한 번만 실행
      
      const handleItemPress = (item) => {
        // 선택한 문자열을 다음 페이지인 'BusStop' 페이지로 전달
        navigation.navigate('BusStop', {
          selectedItem: item.nearStationName,
        });
      };

    return (
        <View>
        <Text style={ styles.titleStyle }>
            가까운 정류장
        </Text>
        <View>
            <Text>Latitude: {latitude}</Text>
            <Text>Longitude: {longitude}</Text>
        </View>
        <FlatList
            data={busStops}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{item.nearStationName}</ListItem.Title>
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

export default RideBus;
