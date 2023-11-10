// 출발지 버스 리스트 요청
import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, Button, StyleSheet, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

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
    //추가
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);


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
                // autoStart(
                //     response.data.arriveBusNum,
                //     response.data.arriveBusFirstTime,
                //     response.data.arriveBusSecondTime,
                //     response.data.arriveBusFirstNum,
                //     response.data.arriveBusSecondNum,
                //     response.data.currentBusStop,
                //     response.data.arriveBusDir,
                //     response.data.busRoutedId
                //     );
            } catch (error) {
                console.log('error : 요청 실패');
                console.error('Error fetching bus stops:', error);
            }
        };
    
        fetchData();
     //추가
     const progressInterval = setInterval(() => {
        setProgress(currentProgress => {
            if (currentProgress < 100) {
                return currentProgress + 20; // 로딩 진행률을 증가시킵니다.
            }
            clearInterval(progressInterval); // 진행률이 100에 도달하면 인터벌을 정지시킵니다.
            return 100;
        });
    }, 1000);

    return () => clearInterval(progressInterval); // 컴포넌트가 언마운트되면 인터벌을 정지시킵니다.
}, []);

useEffect(() => {
    if (progress === 100) {
        // 진행률이 100%에 도달하면 loading 상태를 false로 설정합니다.
        setLoading(false);
    }
}, [progress]);
 // 로딩이 완료되었을 때 네비게이션을 수행하는 useEffect
 useEffect(() => {
    if (!loading) {
        // 로딩 상태가 false이면 'EndPoint'로 자동 이동
        autoStart({
            busNums,
            busFirstTime,
            busSecondTime,
            busFirstNum,
            busSecondNum,
            busDirs,
            currentBusStop,
            busRouteId,
        });
    }
}, [loading]); // 로딩 상태의 변화를 감지하기 위해 loading을 의존성 배열에 추가합니다.

const RideBusDataLoadingScreen = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#E1306C" />
        <Text style={styles.loadingText}>로딩중... {progress}%</Text>
    </View>
);

    

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

const RideBusDataLoadingScreen = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E1306C" /> {/* 인스타그램 핑크 색상 */}
            <Text style={styles.loadingText}>로딩중... {progress}%</Text>
        </View>
    );
};
    
}

    return (
    <View style={styles.container}>
        {loading ? (
            <RideBusDataLoadingScreen />
        ) : (
            // 로딩이 완료되었을 때의 컴포넌트
            <Text style={styles.finishedText}>완료!</Text>
        )}
    </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA', // 인스타그램에서 자주 사용하는 배경색
    },
    loadingContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '600', // 약간 두꺼운 폰트로 변경
        color: '#262626', // 인스타그램의 텍스트 색상
        textShadowColor: 'rgba(0, 0, 0, 0.1)', // 텍스트 그림자 색상
        textShadowOffset: { width: 1, height: 1 }, // 텍스트 그림자 위치
        textShadowRadius: 10, // 텍스트 그림자 블러 반경
    },
    finishedText: {
        fontSize: 58,
        fontWeight: 'bold', // 더 두꺼운 폰트로 변경
        color: '#262626', // 인스타그램의 텍스트 색상
        textShadowColor: 'rgba(0, 0, 0, 0.1)', // 텍스트 그림자 색상
        textShadowOffset: { width: 1, height: 1 }, // 텍스트 그림자 위치
        textShadowRadius: 10, // 텍스트 그림자 블러 반경
    },
});


export default RideBusData;
