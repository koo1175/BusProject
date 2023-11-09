// 메인 -> 버스 정거장 등록 페이지

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import axios from 'axios';

  
const RideBus = ({ navigation,route }) => {

  // 이전 Main페이지에서 받아온 위치
  const { latitude, longitude, userId } = route.params;

  // 버스 정류장 데이터 관리
  const [busUIDs, setBusUIDs] = useState([]);
  const [busNames, setBusNames] = useState([]);

      useEffect(() => {
        // 스프링 부트 서버(BusRouteAllListController)에서 api에 요청해서 받아온 정류장 데이터를 가져온다
        axios.get(`https://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/getStationByPos?X=126.9407&Y=37.56223`) 
          .then(response => {
            console.log(response.data);
            setBusNames(response.data.nearStationName);
            setBusUIDs(response.data.nearStationUIDs);
          })
          .catch(error => {
            console.error('Error fetching bus stops:', error);
          });
      }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때 한 번만 실행
      
      const handleItemPress = (item, index) => {
        const selectedName = busNames[index]; 
        const selectedUID = busUIDs[index];
        // 선택한 문자열을 다음 페이지인 'BusStop' 페이지로 전달
        navigation.navigate('RideBusData', {
          selectedName,
          selectedUID,
          userId: userId,
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
            {/* <Text>busStops: {busStops.nearStationName}</Text> */}
            <Text>busNames: {busNames}</Text>
            <Text>busUIDs: {busUIDs}</Text>
        </View>
        <FlatList
            data={busNames}
            renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handleItemPress(item, index)}>
                    <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{item}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
            )}
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
      marginVertical: 10,
  },
  locationInfo: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#F0F0F0',

  },
  listItem: {
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
  },
  listItemTitle: {
      fontSize: 23,
  },
});
export default RideBus;