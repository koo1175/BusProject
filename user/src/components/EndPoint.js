// 정거장 등록 (RideBus) -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';


const EndPoint = ({navigation, route}) => {
    const { 
        selectedNum,  // 버스 번호
        selectedName, // 정류장 이름
        selectedFirstTime,
        selectedSecondTime,
        selectedFirstNum,   // 버스 번호판
        selectedSecondNum,
        selectedCurrentBusStop, // 현재 정류장 번호
        selectedDir,
        seletedRoutedId,
        userId                  // 유저 아이디
    } = route.params;

    const [station, setStation] = useState([]);  // 노선 ID로 조회한 전체 정류소 리스트
    useEffect(() => {
      // const fetchData = () => {
        axios.get(`http://10.20.105.164:8080/getArrInfoByRouteAll?busRouteId=${seletedRoutedId}`) // 노선 ID
        .then(response => {
          // 가져온 데이터를 상태에 저장 response.data == bus Class
          setStation(response.data.stationNames);
          console.log('200 요청 성공');
        })
        .catch(error => {
          console.log('error : 요청 실패');
          console.error('Error fetching bus stops:', error);
        });

}, []);


  const handleItemPress = (item, index) => {
    const selectedEndPoint = station[index]; 
    // 선택한 문자열을 다음 페이지인 'CheckRideBus' 페이지로 전달
    navigation.navigate('CheckRideBus', {
        selectedNum: selectedNum,  // 버스 번호
        selectedFirstTime: selectedFirstTime,
        selectedSecondTime: selectedSecondTime,
        selectedFirstNum: selectedFirstNum,   // 버스 번호판
        selectedSecondNum: selectedSecondNum,
        selectedCurrentBusStop: selectedCurrentBusStop, // 현재 정류장 번호
        selectedDir: selectedDir,
        seletedRoutedId: seletedRoutedId,
        selectedName : selectedName, // 현재 정류장 이름
        userId: userId,
        selectedEndPoint
    });
  };


    return (
        <View>
            <Text style={ styles.titleStyle }> 도착지 설정 </Text>
            
            <Text style={ styles.titleStyle }> 출발 정류장 : {selectedName} 정류장 </Text>
            <Text style={ styles.titleStyle }> {selectedNum} 번 버스 </Text>
            
            <FlatList
            data={station}
            renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handleItemPress(item,index)}>
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
    titleStyle: {
      fontSize: 24, 
      fontWeight: 'bold', 
      marginVertical: 10
    },
    
});
  

export default EndPoint;