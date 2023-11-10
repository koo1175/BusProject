// 정거장 등록 (RideBus) -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, Button, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

import { Audio } from 'expo-av';
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons";

const BlindEndPoint = ({navigation, route}) => {
    const {
        busNums,
        busFirstTime,
        busSecondTime,
        busFirstNum,
        busSecondNum,
        busDirs,
        currentBusStop,
        busRoutedId,
        selectedUID,
        userId,
        selectedName,
    } = route.params;
    const [arrive, setArrive] = useState('');
    console.log("==== EndPoint 페이지 ====");
    console.log(busNums);


    const handleItemPress = () => {
        // 선택한 문자열을 다음 페이지인 'CheckRideBus' 페이지로 전달
        navigation.navigate('BlindEndPointList', {
            busNums,
            busFirstTime,
            busSecondTime,
            busFirstNum,
            busSecondNum,
            busDirs,
            currentBusStop,
            busRoutedId,
            userId,
            selectedUID,
            selectedName,
            arrive: arrive // 검색한 정류장 이름(도착)
            // selectedNum: selectedNum,  // 현재 선택된 버스 번호
            // selectedFirstTime: selectedFirstTime,
            // selectedSecondTime: selectedSecondTime,
            // selectedFirstNum: selectedFirstNum,   // 버스 번호판
            // selectedSecondNum: selectedSecondNum,
            // selectedCurrentBusStop: selectedCurrentBusStop, // 현재 정류장 번호
            // selectedDir: selectedDir,
            // seletedRoutedId: seletedRoutedId,
            // selectedName : selectedName, // 현재(탑승) 정류장 이름
            // userId: userId,
            // selectedEndPointRouteId,       // 하차 정류소 노선 ID
            // selectedEndPointBusNum,        // 하차 정류소의 첫번째 도착 버스 ( <- 저장해두면 안될것 같음 )
            // selectedEndPoint,               // 하차 정류소 이름
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
                    url: "http://10.20.100.88:8080/Voice_Android",
                    data: formData,
                    headers: {"Content-Type": "multipart/form-data"},
                })
                    .then(response => {
                        console.log('요청 성공:', response.data);
                        textFromVoice = response.data; // 서버로부터 반환된 텍스트를 저장
                        //반환된 텍스트가 한글 숫자일 경우 아라비아 숫자로 변환
                        // if (isNaN(textFromVoice)) {
                        //     textFromVoice = koreanToNumber(textFromVoice);
                        // }
                        // // 띄어쓰기 제거 및 문자열 변환
                        // textFromVoice = textFromVoice.toString();
                        textFromVoice = textFromVoice.replace(/\s/g, '');
                        setArrive(textFromVoice);
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
                    url: "http://10.20.100.88:8080/Voice",
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
            <Text style={styles.titleStyle}>도착지 설정</Text>
            <View style={styles.micContainer}>
                <TouchableOpacity style={styles.startMic} onPress={toggleRecording}>
                    {isRecording ? (
                        <MaterialCommunityIcons name="stop-circle-outline" size={50} color="black" />
                    ) : (
                        <Feather name="mic" size={50} color="black" />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="어디로 가시나요?"
                    placeholderTextColor="#999"
                    onChangeText={text => setArrive(text)}
                    value={arrive}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleItemPress}>
                <Text style={styles.buttonText}>완료</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        padding: 20,
    },
    titleStyle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#262626',
        marginBottom: 25,
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#DBDBDB',
        borderRadius: 10,
        padding: 8,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#262626',
    },
    button: {
        height : 50,
        width: 300,
        backgroundColor: '#3897f0',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        left: 25,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    micContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
});

export default BlindEndPoint;