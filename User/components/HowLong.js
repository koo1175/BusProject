// 버스 등록 페이지 -> 버스 고유 번호 확인 페이지 ( 몇분 뒤 도착하는 버스 탈건지 )

import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

// 버스 고유번호
const busUids = [
    { id: 1, title: '1234' },
    { id: 2, title: '2345' },
    { id: 3, title: '3456' },
    { id: 4, title: '5678' },
    // ... 추가 아이템들
  ];


function HowLong ({navigation, route}) {
    const { itemId, itemTitle } = route.params;
    // 특정 버스 눌렀을 때 
    const handleItemPress = (item) => {
        navigation.navigate('CheckRideBus', {
          itemId: item.id,
          itemTitle: item.title,
        });
      };
    return (
        <View>
            <Text style={ styles.titleStyle }> {itemTitle} 번 버스 </Text>
            <FlatList
            data={busUids}
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
  

export default HowLong;
