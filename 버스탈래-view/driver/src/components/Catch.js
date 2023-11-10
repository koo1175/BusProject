import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

const Catch = ({navigation, route}) => {

  const { busUid } = route.params;
  const [passengers, setPassengers] = useState([]);
  const [on, setOn] = useState([]);
  const [off, setOff] = useState([]);
  useEffect(() => {
    axios.post(`http://10.20.106.98:8080/driver/getPassengers`, null,
    {
      params: {
        bus_uid:busUid,
      },
    })
    .then(response => {
      console.log('200 요청 성공 : passengers');
      if(response.data){

        setPassengers(response.data.passengerID);
        setOn(response.data.passengerBusStop);
        setOff(response.data.passengerDestination);
      }else{
        console.log("데이터가 비어있습니다.")
      }
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
        <Text style={ styles.titleStyle }>탑승 장소</Text>
        <FlatList
        data={passengers}
        renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleItemPress(item,index)}>
                <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item}번</ListItem.Title>
                    <ListItem.Subtitle>{passengers[index]}</ListItem.Subtitle>
                    <ListItem.Subtitle>탑승 장소 : {on[index]}</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
        )}
    />
    <Text style={ styles.titleStyle }>하차 장소</Text>
    <FlatList
        data={passengers}
        renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleItemPress(item,index)}>
                <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item}번</ListItem.Title>
                    <ListItem.Subtitle>{passengers[index]}</ListItem.Subtitle>
                    <ListItem.Subtitle>하차 장소 : {off[index]}</ListItem.Subtitle>
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