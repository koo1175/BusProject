// 버스 등록 페이지 -> 버스 고유 번호 확인 페이지 ( 몇분 뒤 도착하는 버스 탈건지 )
import { FlatList } from 'react-native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements';

// 버스 고유번호
const busUids = [
    { id: 1, title: '1234' },
    { id: 2, title: '전화ㅈ봉고' },
    { id: 3, title: '울 팀고 띠팅 나가랑 ㅜㄴ구 본적일ㄴ느'},
    { id: 4, title: '5678' },
    // ... 추가 아이템들
  ];


function Catch ({navigation, route}) {
 //   const { itemId, itemTitle } = route.params;
    // 특정 버스 눌렀을 때 
    const handleItemPress = (item) => {
        navigation.navigate('CheckRideBus', {
          itemId: item.id,
          itemTitle: item.title,
          //na.jape.dieee
        });
      };
    return (
        <View>
            <FlatListvaluse
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
  

export default Catch;