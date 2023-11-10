// 메인 -> 버스 정거장 등록 페이지

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';


  
const RideBus = ({ navigation,route }) => {

  // 이전 Main페이지에서 받아온 위치
  const { latitude, longitude, userId } = route.params;

  // 버스 정류장 데이터 관리
  const [busUIDs, setBusUIDs] = useState([]);
  const [busNames, setBusNames] = useState([]);
  const [busStops, setBusStops] = useState([]);

      useEffect(() => {
        // 스프링 부트 서버(BusRouteAllListController)에서 api에 요청해서 받아온 정류장 데이터를 가져온다
        axios.get(`https://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/getStationByPos?X=126.9407&Y=37.56223`) 
          .then(response => {
            console.log("userId:"+ userId);
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
        <View style={styles.container}>
        <Text style={ styles.titleStyle }>
            가까운 정류장
        </Text>
        <FlatList
            data={busNames}
            renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handleItemPress(item, index)} style={styles.listItem}>
                    <ListItem style={styles.listItemContent}>
                    <ListItem.Content>
                      <Ionicons name="bus-outline" size={50} color="black" />
                        <ListItem.Title style={styles.listItemTitle}>{item}</ListItem.Title>
                    </ListItem.Content>
                    <Ionicons name="chevron-forward-outline" size={24} color="#999" />
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