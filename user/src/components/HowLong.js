// 버스 등록 페이지 -> 버스 고유 번호 확인 페이지 ( 몇분 뒤 도착하는 버스 탈건지 )

import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';


// 클릭한 버스의 기사님에게 알림이 가도록 해주는 server url에 post요청

function HowLong ({navigation, route}) {

  const { selectedNum,
    selectedFirstTime,
    selectedSecondTime,
    selectedFirstNum,
    selectedSecondNum,
    selectedCurrentBusStop,
    selectedDir } = route.params;
  
  useEffect(() => {
    // 스프링 부트 서버에 요청해서 해당 번호판에 해당하는 기사님에게 현재 유저가 있는 정류장 id 전달
    axios.get(`http://10.20.106.98:8080/getStationByPos?X=126.9407&Y=37.56223`, null,{
    params : {
      
    }}) 
      .then(response => {
        // 가져온 데이터를 상태에 저장 <- busStop 클래스를 들고옴 stationNames와 nearStationNames라는 필드 존재
        setBusStops(response.data);

        setBusNames(response.data.nearStationName);
        setBusUIDs(response.data.nearStationUIDs);
        
      })
      .catch(error => {
        console.error('Error fetching bus stops:', error);
      });
  }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때 한 번만 실행
  
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
