//Main.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';

import * as Location from 'expo-location';

import { FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

function Main({navigation, route}) {
  
  const { userId } = route.params;
  
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
    <View style={styles.container}>
    <Text style={styles.TitleText}>busproject</Text>



    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/*{errorMsg ? (<Text>{errorMsg}</Text>) : location ? (*/}
        {/*    <View>*/}
        {/*        /!*<Text style={styles.locationText}>위도: {location.coords.latitude}</Text>*!/*/}
        {/*        /!*<Text style={styles.locationText}>경도: {location.coords.longitude}</Text>*!/*/}
        {/*    </View>*/}
        {/*) : (*/}
        {/*    <Text style={styles.loadingText}>로딩 중...</Text>*/}
        {/*)}*/}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoadSetting')}>
            <View style={styles.buttonContent}>
                <FontAwesome5 name="route" size={24} color="black" style={styles.icon} />
                <Text style={styles.buttonText}>경로 설정</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckRoad')}>
            <View style={styles.buttonContent}>
                <FontAwesome5 name="route" size={24} color="black" style={styles.icon} />
                <Text style={styles.buttonText}>경로 확인</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RideBus', {
            latitude: 126.924145806,
            longitude: 37.56205,
        })}>
            <View style={styles.buttonContent}>
                <FontAwesome5 name="bus" size={24} color="black" style={styles.thirdIcon} />
                <Text style={styles.thirdButtonText}>버스 탑승 등록</Text>
            </View>
        </TouchableOpacity>

    </View>
</View>
  );
};

const styles = StyleSheet.create({
  locationText: {
      fontSize: 16,
      marginBottom: 8,
  },
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  TitleText: {
      fontSize: 35,
      color: '#125688', // 텍스트 색상 설정
      fontWeight: 'bold',
      marginLeft: 20, // 왼쪽 여백
      marginRight: 20, // 오른쪽 여백
      marginTop: 20, // 위쪽 여백
      marginBottom: '-5%',
      // backgroundColor: 'red', // 확인용 색
  },

  mapContainer: {
      flex: 1,
      marginTop: '20%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
  },
  loadingText: {
      fontSize: 16,
      marginBottom: 16,
  },
  startMic: {
      width: 60,
      height: 60,
      // backgroundColor: 'red', // 확인용 색 넣기
      opacity: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  micContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1,
  },
  button: {
      backgroundColor: '#458eff',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      width: '70%',
  },
  buttonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      marginRight: 80,
  },

  buttonContent: {
      flexDirection: 'row',
      justifyContent: 'space-between', // 아이콘과 텍스트를 양쪽 끝으로 정렬
  },
  icon: {
      marginRight: 70,
  },
  thirdButtonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      marginRight: 60,
  },
  thirdIcon: {
      marginRight: 50,
  },
  map: {
      width: 500,
      height: 400,
  },
});


export default Main;