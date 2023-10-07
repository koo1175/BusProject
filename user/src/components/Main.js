//Main.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import * as Location from 'expo-location';

function Main({navigation}) {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

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

       {errorMsg ? (
        <Text>{errorMsg}</Text>
        ) : location ? (
          <View>
            <Text>Latitude: {location.coords.latitude}</Text>
            <Text>Longitude: {location.coords.longitude}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoadSetting')}>
          <Text style={styles.text}>경로 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckRoad')}>
          <Text style={styles.text}>경로 확인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RideBus', {
          latitude: 126.924145806, // latitude 전달   126.924145806  {latitude}
          longitude: 37.56205, // longitude 전달   37.56205   {longitude}
        })}>
          <Text style={styles.text}>버스 탑승 등록</Text>
        </TouchableOpacity>
      </View>
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