import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

function Catch({navigation, route})  {

  const { busUid } = route.params;
  const [passengers, setPassengers] = useState([]);
  const [busStops, setBusStops] = useState([]);
  useEffect(() => {
    axios.post(`http://192.168.13.122:8080/driver/getPassengers`, null,
    {
      params: {
        bus_uid:busUid,}
    })
    .then(response => {
      console.log('200 요청 성공 : passengers');
      setPassengers(response.data.passengerID);
      setBusStops(response.data.passengerBusStop);
    })
    .catch(error => {
      console.log('error : 요청 실패');
      console.error('Error fetching bus stops:', error);
    });
    
  }, []);

  const handleItemPress = (item, index) => {
    const selectedPassengers = passengers[index]; 
    const selectedBusStops = busStops[index];
    // 선택한 문자열을 다음 페이지인 'BusStop' 페이지로 전달
    
  };

  return (
    
    <View>
        <Text style={ styles.titleStyle }>승객</Text>
        <Text style={ styles.titleStyle }>  정류장 에서 탑승 예정 </Text>
        <Text style={ styles.titleStyle }> </Text>
        <FlatList
        data={busStops}
        renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleItemPress(item,index)}>
                <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item}번</ListItem.Title>
                    <ListItem.Subtitle>{passengers[index]}</ListItem.Subtitle>
                    <ListItem.Subtitle>{busStops[index]}</ListItem.Subtitle>
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


export default Catch;