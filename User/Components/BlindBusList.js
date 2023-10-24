// 정거장 등록 (RideBus) -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

import {Feather, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';

import { Audio } from 'expo-av';

const BlindBusList = ({navigation, route}) => {
    const { selectedName , selectedUID, userId } = route.params;

    const [busNums, setBusNums] = useState([]);             // 도착 버스 번호
    const [busFirstTime, setBusFirstTime] = useState([]);
    const [busSecondTime, setBusSecondTime] = useState([]);
    const [busFirstNum, setBusFirstNum] = useState([]);
    const [busSecondNum, setBusSecondNum] = useState([]);
    const [busDirs, setBusDirs] = useState([]);
    const [currentBusStop, setCurrentBusStop] = useState([]); // 현재 정류장 번호
    const [busRoutedId, setBusRoutedId] = useState([]); // 노선 ID -> 다음 axiod시 필요 ( 노선 ID에 해당하는 경유 정류장 리스트 조회 )

    useEffect(() => {
        // const fetchData = () => {
        axios.get(`http://10.20.100.163:8080/getStationByUid?arsId=${selectedUID}`)
            .then(response => {
                // 가져온 데이터를 상태에 저장 response.data == bus Class
                console.log('blind 200 요청 성공');
                setBusNums(response.data.arriveBusNum);            // 도착 버스 번호
                setBusFirstTime(response.data.arriveBusFirstTime); // 도착 정보(첫번째)
                setBusSecondTime(response.data.arriveBusSecondTime); // 도착 정보(두번째)
                setBusFirstNum(response.data.arriveBusFirstNum);   // 차 번호판(첫번째)
                setBusSecondNum(response.data.arriveBusSecondNum); // 차 번호판(두번째)
                setCurrentBusStop(response.data.currentBusStop);   // 현재 버스 정류장 번호
                setBusDirs(response.data.arriveBusDir);            // 버스 방향
                setBusRoutedId(response.data.busRoutedId);         // 노선 ID
                console.log(selectedUID);
            })
            .catch(error => {
                console.log('error : 요청 실패');
                console.error('Error fetching bus stops:', error);
            });
        // };
        //   // 3초마다 데이터를 갱신
        // const interval = setInterval(() => {
        //   fetchData();
        // }, 3000);

        //   // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 간격 함수를 정리
        //   return () => {
        //     clearInterval(interval);
        //   };
        // }, [selectedUID]);

    }, []);


    const handleItemPress = (item, index) => {
        const selectedNum = busNums[index];
        const selectedFirstTime = busFirstTime[index];
        const selectedSecondTime = busSecondTime[index];
        const selectedFirstNum = busFirstNum[index];
        const selectedSecondNum = busSecondNum[index];
        const selectedCurrentBusStop = currentBusStop[index];
        const selectedDir = busDirs[index];
        const seletedRoutedId = busRoutedId[index];   // 출발 정류장 노선 ID
        // 선택한 문자열을 다음 페이지인 'EndPoint' 페이지로 전달
        navigation.navigate('EndPoint', {
            selectedNum,
            selectedFirstTime,
            selectedSecondTime,
            selectedFirstNum,
            selectedSecondNum,
            selectedCurrentBusStop,
            selectedDir,
            //selectedName, // 현재 정류장 이름 - > 기사한테 승객이 타는 위치를 알려주기 위해 전달해두자
            seletedRoutedId,
            selectedUID,
            userId: userId,
            selectedName: selectedName,
        });
    };


    // 음성녹음 함수
    const [recordingUri, setRecordingUri] = React.useState(null);
    const [recording, setRecording] = React.useState();     // useState를 활용해 음성 녹음을 실시간으로 반영? ..
    const [isRecording, setIsRecording] = React.useState(false);  // 녹음 중인지 아닌지를 판단하는 상태 변수

    async function startRecording() {

        // 이미 녹음이 실행 중인 경우,
        if (recording) {
            console.log('녹음이 이미 실행 중 입니다.');
            return;
        }

        if (Platform.OS === 'android') {    // 안드로이드의 녹음 실행
            try {
                console.log('녹음을 요청합니다 ..');
                await Audio.requestPermissionsAsync();
                await Audio.setAudioModeAsync({
                    shouldDuckAndroid: true,
                    // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, 현재 어플리케이션이 사운드를 재생할 때, 다른 어플리케이션에서 나온 사운드를 일시정지하게 만드는 코드
                });

                console.log('음성 녹음을 시작합니다 ..');
                const {recording} = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );
                setRecording(recording);
                setIsRecording(true); // 현재 녹음 상태를 true로 설정
                console.log('녹음을 시작했습니다.');
            } catch (err) {
                console.error('녹음 시작을 실패했습니다.', err);
            }
        }   else if (Platform.OS === 'ios') {       // IOS의 녹음 실행

            try {
                console.log('녹음 시작');
                await Audio.requestPermissionsAsync();
                await Audio.setAudioModeAsync({
                    allowsRecording: true,
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                if (recording) {
                    await recording.stopAndUnloadAsync();
                    setRecording(null);
                    setIsRecording(true); // 현재 녹음 상태를 true로 설정
                }

                console.log('음성 녹음 시작');
                const {recording} = await Audio.Recording.createAsync(recordingOptions);
                setRecordingUri(recording);
                console.log('음성녹음을 시작했습니다.');
            } catch (err) {
                console.error('음성 녹음 시작 실패', err);
            }
        }

    }

    let textFromVoice;
    async function stopRecording() {

        if (!recording) {   // 녹음 중이 아닐경우
            console.log("No active recording");
            return;
        }

        if (Platform.OS === 'android') {        // 안드로이드의 녹음 중단
            console.log('녹음을 중단합니다 ..');

            await recording.stopAndUnloadAsync();
            const uri = recording.getURI(); // 앱 캐시 디렉토리 내 음성 파일 경로
            setRecordingUri(uri);
            setIsRecording(false); // 녹음 상태를 false로 설정
            console.log("녹음 중단 및 저장", uri);

            let formData = new FormData();      // formData -> 서버에 오디오 파일을 직접 보내주기 위함

            // FormData에 오디오 파일 추가
            formData.append('audio', {
                uri: uri,
                type: 'audio/m4a', // 저장되는 audio타입
                name: `recording_${Date.now()}.m4a`, // 이름 감싸고 있는거 작은 따옴표 아님/ tab위에 있는 백틱임 => 문자열 안에 변수를 직접 사용하기 위함
            });
            formData.append('userId', userId);

            // 음성 API에 음성 파일 (FormData) 보내기
            try {
                await axios({
                    method: "post",
                    url: "http://10.20.100.163:8080/Voice_Android",
                    data: formData,
                    headers: {"Content-Type": "multipart/form-data"},
                })
                    .then(response => {
                        console.log('요청 성공:', response.data);
                        textFromVoice = response.data; // 서버로부터 반환된 텍스트를 저장

                    })
                    .catch(error => {
                        console.error('음성을 보내지 못했습니다.', error);
                    });
            } catch (error) {
                console.error('실패 :', error);
            }

            setRecording(undefined);

            console.log('녹음을 중단하고 저장합니다 ..', uri);

            console.log(textFromVoice);
            // 반환된 텍스트가 한글 숫자일 경우 아라비아 숫자로 변환
            if (isNaN(textFromVoice)) {
                textFromVoice = koreanToNumber(textFromVoice);
            }
            console.log(textFromVoice);
            // 버스 번호와 반환된 텍스트를 비교
            for (let i = 0; i < busNums.length; i++) {
                if (busNums[i] === String(textFromVoice)) {
                    handleItemPress(busNums[i], i); // 일치하는 버스 번호가 있으면 해당 버스 번호로 handleItemPress를 호출
                    break;
                }
            }

        } else if (Platform.OS === 'ios') {     // IOS의 녹음 중단

            console.log('Recording 중지');
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setRecordingUri(uri);
            setIsRecording(false); // 녹음 상태를 false로 설정
            console.log("녹음 중단 및 저장", uri);

            let formData = new FormData();
            formData.append('audio', {
                uri: uri,
                type: 'audio/m4a',
                name: `recording_${Date.now()}.m4a`,
            });
            formData.append('userId', userId);

            try {
                await axios({
                    method: "post",
                    url: "http://10.20.100.163:8080/Voice",
                    data: formData,
                    headers: {"Content-Type": "multipart/form-data"},
                })
                    .then(response => {
                        console.log('요청 성공:', response.data);
                    })
                    .catch(error => {
                        console.error('음성을 보내지 못했습니다.', error);
                    });
            } catch (error) {
                console.error('실패 :', error);
            }

            await Audio.setAudioModeAsync({
                allowsRecording: false,
            });

            console.log('Recording 중지 및 저장', uri);
        }
    }
    async function toggleRecording() {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }
    
    // 한글 숫자의 경우 아라비아 숫자로 바꿔주는 함수
    function koreanToNumber(koreanNumber) {
        const koreanNumbers = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"]; // ''를 추가하여 인덱스와 숫자를 일치시킴
        const units = ["", "십", "백", "천"]; // ''를 추가하여 인덱스와 자릿수를 일치시킴
        let currentNumber = 0;
        let totalNumber = 0;

        for (let char of koreanNumber) {
            let numberIndex = koreanNumbers.indexOf(char);
            let unitIndex = units.indexOf(char);

            if (numberIndex !== -1) { // 숫자인 경우
                currentNumber = numberIndex;
            } else if (unitIndex !== -1) { // 단위인 경우
                if (currentNumber === 0) currentNumber = 1; // '십', '백', '천' 등 단위만 있는 경우를 처리
                totalNumber += currentNumber * (10 ** unitIndex);
                currentNumber = 0; // 현재 숫자를 초기화
            }
        }
        totalNumber += currentNumber; // 마지막 숫자를 더해줌

        return totalNumber;
    }




    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}> {selectedName} 정류장 </Text>
            <Text style={styles.titleStyle}> {selectedUID} 정류장 UID </Text>

            <View style={styles.micContainer}>
                <TouchableOpacity style={styles.startMic} onPress={toggleRecording}>
                    {isRecording ? (
                        <MaterialCommunityIcons name="stop-circle-outline" size={50} color="black" />
                    ) : (
                        <Feather name="mic" size={50} color="black" />
                    )}
                </TouchableOpacity>
            </View>

            <FlatList
                data={busNums}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item, index)}>
                        <ListItem bottomDivider>
                            <View style={styles.leftContainer}>
                                <FontAwesome5 name="bus" size={30} color="#125688" style={styles.icon} />

                                <ListItem.Title style={styles.busNumber}>{item}번</ListItem.Title>
                            </View>
                            <View style={styles.rightContainer}>
                                <ListItem.Subtitle style={styles.Bus1Time}>{busFirstTime[index]}</ListItem.Subtitle>
                                <ListItem.Subtitle style={styles.Bus2Time}>{busSecondTime[index]}</ListItem.Subtitle>
                            </View>
                        </ListItem>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    startMic: {
        width: 60,
        height: 60,
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
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    busNumber: {
        flex: 1,
    },
    timeContainer: {
        flex: 1,
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'column', // 세로로 나란히 정렬
        justifyContent: 'center', // 아이템을 세로 방향으로 가운데 정렬
    },
    rightContainer: {
        flex: 2,
        flexDirection: 'column', // 세로로 나란히 정렬
        justifyContent: 'center', // 아이템을 세로 방향으로 가운데 정렬
    },
    Bus1Time: {
        textAlign: 'right',
    },
    Bus2Time: {
        textAlign: 'right',
    },
});

export default BlindBusList;
