// 메인 -> 버스 정거장 등록 페이지

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { PermissionsAndroid } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

const busStops = [
    { id: 1, title: '연화마을 7단지' },
    { id: 2, title: '한들물빛중학교' },
    { id: 3, title: '한들물빛 하늘채' },
    { id: 4, title: '탕정역' },
    { id: 5, title: '용연마을1.3단지' },
    { id: 6, title: '매곡리신풍터' },
    { id: 7, title: '선문대입구' },
    { id: 8, title: '선문대학생회관' },
    // ... 추가 아이템들
  ];

  
const RideBus = ({navigation}) => {
    const handleItemPress = (item) => {
        navigation.navigate('BusStop', {
          itemId: item.id,
          itemTitle: item.title,
        });
      };
    useEffect(() => {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    }, []);


    return (
        <View>
        <Text style={ styles.titleStyle }>
            가까운 정류장
        </Text>

        <FlatList
            data={busStops}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
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

export default RideBus;
