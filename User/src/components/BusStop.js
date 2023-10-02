// 정거장 등록 -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

const busNums = [
    { id: 1, title: '순환 5번' },
    { id: 2, title: '우레레레' },
    { id: 3, title: '이히히히' },
    { id: 4, title: '타요타요' },
    // ... 추가 아이템들
  ];


function BusStop ({navigation, route}) {
    const { itemId, itemTitle } = route.params;
    // 버스 눌렀을 때 
    const handleItemPress = (item) => {
        navigation.navigate('HowLong', {
          itemId: item.id,
          itemTitle: item.title,
        });
      };
    return (
        <View>
            <Text style={ styles.titleStyle }> {itemTitle} 정류장 </Text>
            <FlatList
            data={busNums}
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
  

export default BusStop;
