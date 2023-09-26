import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';


function Main({navigation}) {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <TouchableOpacity style={{ backgroundColor: 'gray', padding: 8 }}>
          <Text style={styles.text}>민원 신고</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'gray', padding: 8 }}>
          <Text style={styles.text}>마이크</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoadSetting')}>
          <Text style={styles.text}>경로 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckRoad')}>
          <Text style={styles.text}>경로 확인</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RideBus')}> 
          <Text style={styles.text}>버스 탑승 등록</Text> 
        </TouchableOpacity> 

        </View >
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color:'white', 
    textAlign: 'center'
  },
  button: {
    width: '40%',
     backgroundColor:'gray', 
     marginTop :16 ,
     paddingVertical :16,
     paddingHorizontal :32
  },
});

export default Main;