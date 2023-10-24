import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, Platform} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios'; // 서버로 보내기 위한 import
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome5, Feather } from '@expo/vector-icons';

import { Audio } from 'expo-av';
import response from "mysql/lib/protocol/packets/LocalDataFilePacket"; // 녹음을 위한 import

const recordingOptions = {
    isMeteringEnabled: true,
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
    web: {
        mimeType: 'audio/webm',
        bitsPerSecond: 128000,
    },
};

function Main({ navigation, route }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const { userId } = route.params;

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // 서버에서 blind 여부 확인
            const res = await axios.get(`http://10.20.100.163:8080/api/checkBlind/${userId}`);
            console.log('여기까지는 됩니다.2');
            if (res.data == true) {  // 예시로 사용한 키 값입니다. 실제 응답에서 어떤 키를 사용하는지 확인하십시오.

                navigation.navigate('BlindBusStop', {
                    userId: userId,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });  // 'BusList'는 버스 목록을 보여주는 페이지 컴포넌트 이름입니다.
            }

        })();
    }, []);

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
                    console.log('Recording started');
                } catch (err) {
                    console.error('Failed to start recording', err);
                }
            }   else if (Platform.OS === 'ios') {       // IOS의 녹음 실행

                    try {
                        console.log('Recording 시작');
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
                        console.log('Recording started');
                    } catch (err) {
                        console.error('음성 녹음 시작 실패', err);
                    }
                }

        }


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
                        })
                        .catch(error => {
                            console.error('음성을 보내지 못했습니다.', error);
                        });
                } catch (error) {
                    console.error('실패 :', error);
                }

                setRecording(undefined);

                console.log('녹음을 중단하고 저장합니다 ..', uri);

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

        

    return (
        <View style={styles.container}>
            <Text style={styles.TitleText}>busproject</Text>

            <View style={styles.mapContainer}>
                {location ? (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="현재 위치"
                            description="당신의 현재 위치입니다."
                        />
                    </MapView>
                ) : (
                    <Text style={styles.loadingText}>로딩 중...</Text>
                )}
            </View>

            <View style={styles.micContainer}>
                <TouchableOpacity style={styles.startMic} onPress={toggleRecording}>
                    {isRecording ? (
                        <MaterialCommunityIcons name="stop-circle-outline" size={50} color="black" />
                    ) : (
                        <Feather name="mic" size={50} color="black" />
                    )}
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoadSetting')}>
                    <View style={styles.buttonContent}>
                        <FontAwesome5 name="route" size={24} color="white" style={styles.icon} />
                        <Text style={styles.buttonText}>경로 설정</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckRoad')}>
                    <View style={styles.buttonContent}>
                        <FontAwesome5 name="route" size={24} color="white" style={styles.icon} />
                        <Text style={styles.buttonText}>경로 확인</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RideBus', {
                    latitude: 126.924145806,
                    longitude: 37.56205,
                })}>
                    <View style={styles.buttonContent}>
                        <FontAwesome5 name="bus" size={24} color="white" style={styles.thirdIcon} />
                        <Text style={styles.thirdButtonText}>버스 탑승 등록</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    locationText: {
        fontSize: 16,
        marginBottom: 8,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    TitleText: {
        fontSize: 35,
        color: '#125688',
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: '-5%',
    },
    mapContainer: {
        flex: 1,
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    loadingText: {
        fontSize: 16,
        marginBottom: 16,
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
    button: {
        backgroundColor: '#458eff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: '70%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 80,
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 70,
    },
    thirdButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 60,
    },
    thirdIcon: {
        marginRight: 50,
    },
    map: {
        width: 500,
        height: 400,
    },
});

export default Main;
