// 정거장 등록 (RideBus) -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import React, { useState, useEffect }from 'react';
import { View, Button, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';


const EndPoint = ({navigation, route}) => {
    const { 
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
    } = route.params;
    
    const [arrive, setArrive] = useState('');
    const [inputText, setInputText] = useState(''); // 사용자가 입력하는 도중에 사용할 로컬 상태

    console.log("==== EndPoint 페이지 ====");
    console.log(busNums);
    console.log("userId:"+ userId);

  //   useEffect(() => {
  //     if (!busNums || busNums.length === 0) {
  //         navigation.navigate('RideBus');
  //     }
  // }, [busNums]); // busNums가 변경될 때마다 이 useEffect는 새로 실행됩니다.



  const handleItemPress = () => {
    setArrive(inputText);
    // 선택한 문자열을 다음 페이지인 'CheckRideBus' 페이지로 전달
    navigation.navigate('EndPointList', {
      busNums,
      busFirstTime,
      busSecondTime,
      busFirstNum,
      busSecondNum,
      busDirs,
      currentBusStop,
      busRouteId,
      userId, 
      selectedUID,
      selectedName,
      arrive: inputText // 검색한 정류장 이름(도착)
        // selectedNum: selectedNum,  // 현재 선택된 버스 번호
        // selectedFirstTime: selectedFirstTime,
        // selectedSecondTime: selectedSecondTime,
        // selectedFirstNum: selectedFirstNum,   // 버스 번호판
        // selectedSecondNum: selectedSecondNum,
        // selectedCurrentBusStop: selectedCurrentBusStop, // 현재 정류장 번호
        // selectedDir: selectedDir,
        // seletedRoutedId: seletedRoutedId,
        // selectedName : selectedName, // 현재(탑승) 정류장 이름
        // userId: userId,
        // selectedEndPointRouteId,       // 하차 정류소 노선 ID
        // selectedEndPointBusNum,        // 하차 정류소의 첫번째 도착 버스 ( <- 저장해두면 안될것 같음 )
        // selectedEndPoint,               // 하차 정류소 이름
    });
  };


    return (
        <View>
            <Text style={ styles.titleStyle }> 도착지 설정 </Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => setInputText(text)}
                value={inputText}
            />
            <Button title="완료" onPress={handleItemPress} />
            {/* <Text style={ styles.titleStyle }> 출발 정류장 : {selectedName} 정류장 </Text>
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
          /> */}
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
