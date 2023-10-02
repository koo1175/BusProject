import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const RideNotifications = () => {
  // 하드코딩된 데이터로 초기화
  const initialRideData = [
    { busNumber: '101', userName: '사용자1', busStop: '정류장A' },
    { busNumber: '202', userName: '사용자2', busStop: '정류장B' },
    { busNumber: '303', userName: '사용자3', busStop: '정류장C' },
  ];

  const [rideData, setRideData] = useState(initialRideData);

  /* 여기부터는 사용자가 보내는 데이터를 처리해서 list를 보여줌 (_예시 함수)
  const RideNotifications = () => {
    const [rideData, setRideData] = useState([]);
  
    // 사용자가 보낸 승차 알림을 처리하는 함수
    const handleRideNotification = (busNumber, userName, busStop) => {
      // 새로운 알림을 목록에 추가
      const newRide = { busNumber, userName, busStop };
      setRideData([...rideData, newRide]);
    };
*/
  /* 위의 함수가 보내는 데이터를 가져와서 리스트 목록으로 보려주는 부분
    <FlatList
    data={rideData}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <View>
        <Text>버스 번호: {item.busNumber}</Text>
        <Text>사용자 이름: {item.userName}</Text>
        <Text>정류장 이름: {item.busStop}</Text>
      </View>
    )}
*/
  return (
    <View>
      <Text style = {styles.title}>승차 알림 목록</Text>

      <FlatList
        data={rideData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View >
            <View >
            <TouchableOpacity style = {styles.listItem}> 
              <Text style = {styles.itemText}>버스 번호: {item.busNumber}</Text>
              <Text style = {styles.itemText}>사용자 이름: {item.userName}</Text>
              <Text style = {styles.itemText}>정류장 이름: {item.busStop}</Text> 
            </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
      alignItems : 'center',
      backgroundColor : '#FFFFFF'
     },
  listItem :{ 
      backgroundColor :'#ffffff',
      marginTop : '5%',
  },
  itemText : {
    marginStart : 10,
    marginTop : 5,
    marginBottom : 5
  },
  title : {
      fontSize : 40,
  }
  

});

export default RideNotifications;
