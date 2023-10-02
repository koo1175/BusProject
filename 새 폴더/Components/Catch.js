import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const RideNotifications = () => {
  const [rideData, setRideData] = useState([]);

  // 사용자가 보낸 승차 알림을 처리하는 함수
  const handleRideNotification = (busNumber, userName, busStop) => {
    // 새로운 알림을 목록에 추가
    const newRide = { busNumber, userName, busStop };
    setRideData([...rideData, newRide]);
  };

  return (
    <View>
      <Text>승차 알림 목록</Text>
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
      />
    </View>
  );
};

export default RideNotifications;
