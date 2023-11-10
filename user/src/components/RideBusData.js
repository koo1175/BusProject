// 출발지 버스 리스트 요청
import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, Button, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';


const RideBusData = ({navigation, route}) => {
    const { 
        selectedName,
        selectedUID,
        userId,
    } = route.params;
    const [busNums, setBusNums] = useState([]);             // 도착 버스 번호
    const [busFirstTime, setBusFirstTime] = useState([]);
    const [busSecondTime, setBusSecondTime] = useState([]);
    const [busFirstNum, setBusFirstNum] = useState([]);
    const [busSecondNum, setBusSecondNum] = useState([]);
    const [busDirs, setBusDirs] = useState([]);
    const [currentBusStop, setCurrentBusStop] = useState([]); // 현재 정류장 번호
    const [busRouteId, setBusRouteId] = useState([]); // 노선 ID -> 다음 axiod시 필요 ( 노선 ID에 해당하는 경유 정류장 리스트 조회 )
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/getStationByUid?arsId=${selectedUID}`)
                console.log('200 요청 성공');
                console.log(selectedName);
                console.log("seletedUID : "+selectedUID);
    
                // setState 함수를 Promise.all에서 제거
                setBusNums(response.data.arriveBusNum);            
                setBusFirstTime(response.data.arriveBusFirstTime);
                setBusSecondTime(response.data.arriveBusSecondTime);
                setBusFirstNum(response.data.arriveBusFirstNum);   
                setBusSecondNum(response.data.arriveBusSecondNum); 
                setCurrentBusStop(response.data.currentBusStop);   
                setBusDirs(response.data.arriveBusDir);            
                setBusRouteId(response.data.busRoutedId);         

                console.log("====== RideBusData 페이지 ======");
                console.log(response.data);
                console.log("busNums :  " + response.data.arriveBusNum);
                console.log("busRouteId :  " + response.data.busRoutedId);
                console.log("arriveBusFirstNum :  " + response.data.arriveBusFirstNum);
                autoStart(
                    response.data.arriveBusNum,
                    response.data.arriveBusFirstTime,
                    response.data.arriveBusSecondTime,
                    response.data.arriveBusFirstNum,
                    response.data.arriveBusSecondNum,
                    response.data.currentBusStop,
                    response.data.arriveBusDir,
                    response.data.busRoutedId
                    );
            } catch (error) {
                console.log('error : 요청 실패');
                console.error('Error fetching bus stops:', error);
            }
        };
    
        fetchData();
    }, []);
    
    

const autoStart = (busNums, busFirstTime, busSecondTime, busFirstNum, busSecondNum, busDirs, currentBusStop, busRoutedId) => {
    navigation.navigate('EndPoint', {
        busNums: busNums,
        busFirstTime : busFirstTime,
        busSecondTime : busSecondTime,
        busFirstNum : busFirstNum,
        busSecondNum : busSecondNum,
        busDirs : busDirs,
        currentBusStop : currentBusStop,
        busRouteId : busRoutedId, 
        selectedUID : selectedUID,
        userId: userId,
        selectedName: selectedName,
        })
}

    return (
      <>
      <Text>로딩중 ~ !</Text>
      </>
        
    );
};


export default RideBusData;
