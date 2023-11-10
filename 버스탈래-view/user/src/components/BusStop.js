// EndPointData -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';


const BusStop = ({navigation, route}) => {
  const { 
    // 출발지
    busNums,
    busFirstTime,
    busSecondTime,
    busFirstNum,
    busSecondNum,
    busDirs,
    currentBusStop,
    busRouteId,

    selectedUID,
    userId,
    selectedName,
    arrive,

    ebusFirstTime,
    ebusSecondTime,
    ebusFirstNum,
    ebusSecondNum,
    ebusDirs,
    ecurrentBusStop,
    ebusRoutedId,
    // 도착지
    ebusNums,
   } = route.params;
   console.log("==== BusStop 페이지 ====")
   console.log("userId:"+ userId);
   console.log("출발지 버스들 busNums:"+ busNums);
   console.log("출발지 버스들 busRouteId:"+ busRouteId);
   console.log("출발지 버스들 busFirstNum:"+ busFirstNum);
   console.log("도착지 버스들 ebusNums:"+ ebusNums);
   console.log("도착지 버스들 ebusRouteId:"+ ebusRoutedId);


// 두 배열에서 중복되는 값을 찾아 새 배열을 생성
const duplicatedBusNums = busNums.filter(value => ebusNums.includes(value));

// busNums 중에서 duplicatedBusNums에 해당하는 값의 인덱스를 찾아서 busNumArr에 저장합니다.
const busNumArr = busNums.map((busNum, index) => duplicatedBusNums.includes(busNum) ? index : -1).filter(index => index !== -1);

console.log("busNumArr:"+ busNumArr);
// busNumArr에 저장된 인덱스를 기반으로 busArr를 생성합니다.
const busArr = busNumArr.map(index => ({
  busNum: busNums[index],
  busFirstTime: busFirstTime[index],
  busSecondTime: busSecondTime[index],
  busFirstNum: busFirstNum[index],
  busSecondNum: busSecondNum[index],
  busDirs: busDirs[index],
  currentBusStop: currentBusStop[index],
  busRouteId: busRouteId[index],
}));

console.log("busArr:"+ busArr[0].busNum);
console.log("busFirstNum:"+ busArr[0].busFirstNum);

console.log("duplicatedBusNums : " + duplicatedBusNums);

  const handleItemPress = (item, index) => {
    const selectedNum = item.busNum;
    const selectedFirstTime = item.busFirstTime;
    const selectedSecondTime = item.busSecondTime;
    const selectedFirstNum = item.busFirstNum;
    const selectedSecondNum = item.busSecondNum;
    const selectedCurrentBusStop = item.currentBusStop;
    const selectedDir = item.busDirs;

    // 선택한 문자열을 다음 페이지인 'EndPoint' 페이지로 전달
    navigation.navigate('CheckRideBus', {
      selectedNum,
      selectedFirstTime,
      selectedSecondTime,
      selectedFirstNum,
      selectedSecondNum,
      selectedCurrentBusStop,
      selectedDir,
      selectedName, // 현재 정류장 이름 - > 기사한테 승객이 타는 위치를 알려주기 위해 전달해두자
      // seletedRoutedId : busRouteId, 기존 코드
      seletedRoutedId : selectedUID,
      userId: userId,
      selectedName: selectedName,
      arrive,
      selectedEndPointRouteId : ebusRoutedId
    });
  };


    return (
      <View style={styles.container}>
      <Text style={styles.titleStyle}> 출발 정류장 : {selectedName} </Text>
      <Text style={styles.titleStyle}> 도착 정류장 : {arrive} </Text>

      <FlatList
      data={busArr}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => handleItemPress(item, index)}>
          <ListItem bottomDivider>
            <View style={styles.leftContainer}>
              <FontAwesome5 name="bus" size={30} color="#125688" style={styles.icon} />
              <ListItem.Title style={styles.busNumber}>{item.busNum}번</ListItem.Title>
            </View>
            <View style={styles.rightContainer}>
              <ListItem.Subtitle style={styles.Bus1Time}>{item.busFirstTime}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.Bus2Time}>{item.busSecondTime}</ListItem.Subtitle>
            </View>
          </ListItem>
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
    padding: 10,
},
titleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
},
icon: {
    marginRight: 10,
},
subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
busNumber: {
    flex: 1,
    fontSize:20,
    fontWeight: 'bold',
},
timeContainer: {
    flex: 1,
},
leftContainer: {
    flex: 1,
    flexDirection: 'column', // 세로로 나란히 정렬
    justifyContent: 'center', // 아이템을 세로 방향으로 가운데 정렬
},
rightContainer: {
    flex: 2,
    flexDirection: 'column', // 세로로 나란히 정렬
    justifyContent: 'center', // 아이템을 세로 방향으로 가운데 정렬
},
Bus1Time: {
    textAlign: 'right',
    fontSize: 16,
},
Bus2Time: {
    textAlign: 'right',
    fontSize: 16,
},
});

export default BusStop;
