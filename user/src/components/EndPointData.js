// 도착지 버스 리스트 요청

import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

const EndPointData = ({navigation, route}) => {
  const { 
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
            ebusArsId,
            arrive
   } = route.params;
  const [ebusNums, setEBusNums] = useState([]);             // 도착 버스 번호
  const [ebusFirstTime, setEBusFirstTime] = useState([]);
  const [ebusSecondTime, setEBusSecondTime] = useState([]);
  const [ebusFirstNum, setEBusFirstNum] = useState([]);
  const [ebusSecondNum, setEBusSecondNum] = useState([]);
  const [ebusDirs, setEBusDirs] = useState([]);
  const [ecurrentBusStop, setECurrentBusStop] = useState([]); // 현재 정류장 번호
  const [ebusRouteId, setEBusRouteId] = useState([]); // 노선 ID -> 다음 axiod시 필요 ( 노선 ID에 해당하는 경유 정류장 리스트 조회 )

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/getStationByUid?arsId=${ebusArsId}`
          )
          console.log('200 요청 성공 ebusArsId : ' + ebusArsId);
          setEBusNums(response.data.arriveBusNum); // 도착 버스 번호
          setEBusFirstTime(response.data.arriveBusFirstTime); // 도착 정보(첫번째)
          setEBusSecondTime(response.data.arriveBusSecondTime); // 도착 정보(두번째)
          setEBusFirstNum(response.data.arriveBusFirstNum); // 차 번호판(첫번째)
          setEBusSecondNum(response.data.arriveBusSecondNum); // 차 번호판(두번째)
          setECurrentBusStop(response.data.currentBusStop); // 현재 버스 정류장 번호
          setEBusDirs(response.data.arriveBusDir); // 버스 방향
          setEBusRouteId(response.data.busRoutedId); // 노선 ID
          
          console.log("==== EndPointData 페이지 ====");  
          console.log("ebusNums : "+response.data.arriveBusNum);
          console.log("busRouteId : "+busRouteId);
          console.log("ebusRouteId : "+ebusArsId);
          console.log("busFirstNum : "+busFirstNum);

          autoStart(
            response.data.arriveBusNum,
            response.data.arriveBusFirstTime,
            response.data.arriveBusSecondTime,
            response.data.arriveBusFirstNum,
            response.data.arriveBusSecondNum,
            response.data.currentBusStop,
            response.data.arriveBusDir,
            ebusArsId
          );
        }
        catch(error) {
          console.log('EndPointData 페이지 error : 요청 실패');
          console.error('Error fetching bus stops:', error);
        }
      };
  
      fetchData();
    }, []);


  const autoStart = (ebusNums, ebusFirstTime, ebusSecondTime, ebusFirstNum, ebusSecondNum, ebusDirs, ecurrentBusStop, ebusRoutedId) => {
    navigation.navigate('BusStop', {

       // 출발지
       busNums,
       busFirstTime,
       busSecondTime,
       busFirstNum,
       busSecondNum,
       busDirs,
       currentBusStop,
       busRouteId,

       selectedUID: selectedUID,
       userId: userId,
       selectedName: selectedName,
       arrive,

        ebusNums,
        ebusFirstTime,
        ebusSecondTime,
        ebusFirstNum,
        ebusSecondNum,
        ebusDirs,
        ecurrentBusStop,
        ebusRoutedId:ebusArsId

        })
}

    return (
      <>
      <Text>로딩중 ~ !</Text>
      </>
        
    );
};


export default EndPointData;
