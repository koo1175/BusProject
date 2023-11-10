// 정거장 등록 (RideBus) -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import React, { useState, useEffect }from 'react';
import { View, Button, StyleSheet, Text, TouchableWithoutFeedback, Keyboard , FlatList, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
      arrive: inputText 
    });
  };


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <MaterialCommunityIcons name="bus-stop" size={200} color="#4F4F4F" style={styles.iconStyle} />
          <Text style={styles.titleStyle}>도착지 설정</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="도착지를 입력하세요"
              placeholderTextColor="#999"
              onChangeText={text => setInputText(text)}
              value={inputText}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleItemPress}>
            <Text style={styles.buttonText}>완료</Text>
          </TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Apple often uses pure white backgrounds
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom:50
},
iconStyle: {
    marginBottom: 20,
    color: '#007AFF', // Apple's iconic blue color for interactive elements
},
titleStyle: {
    fontSize: 28, // Slightly larger for bold headers
    fontWeight: 'bold',
    color: '#1C1C1E', // Soft black for text
    marginBottom: 25,
},
inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C7C7CC', // A light gray border color
    borderRadius: 10,
    padding: 15, // More padding for a spacious look
    backgroundColor: '#F2F2F7', // A very light gray that Apple often uses for input fields
    marginBottom: 20,
    width: '90%', // Stretching it a bit more for a spacious design
},
input: {
    flex: 1,
    fontSize: 18, // Larger font size for readability
    color: '#1C1C1E', // Soft black for text
    // Removing the height for input to expand based on padding and content
},
button: {
    width: '90%', // Consistent with the input field width
    backgroundColor: '#007AFF', // Apple's blue color for primary buttons
    paddingVertical: 12, // More vertical padding for a taller button
    borderRadius: 14, // Apple typically uses rounded corners for buttons
    justifyContent: 'center',
    // Minimal shadow and elevation as Apple tends to avoid heavy use of shadows
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
},
buttonText: {
    color: '#FFFFFF', // White text on blue background
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
},
});

export default EndPoint;
