import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import axios from 'axios';
import { encode } from 'base-64';

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
    let timestamp = Date.now();  // 현재 시간 타임스탬프를 사용 , formData에 저장하는 오디오 이름을 다르게 구분해주기 위함
    const { userId } = route.params;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const [recording, setRecordingUri] = React.useState(null);
    //sconst [recording, setRecording] = React.useState();

    async function startRecording() {
        try {
            console.log('Recording 시작');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecording: true,
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('음성 녹음 시작');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecordingUri(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('음성 녹음 시작 실패', err);
        }
    }

    async function stopRecording() {
        console.log('Recording 중지');
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordingUri(uri);

        let formData = new FormData();      // formData -> 서버에 오디오 파일을 직접 보내주기 위함

        // FormData에 오디오 파일 추가
        formData.append('audio', {
            uri: uri,
            type: 'audio/m4a', // 저장되는 audio타입
            name: `recording_${timestamp}.m4a`, // 이름 감싸고 있는거 작은 따옴표 아님/ tab위에 있는 백틱임 => 문자열 안에 변수를 직접 사용하기 위함
        });
        formData.append('userId', userId);

        // 음성 API에 음성 파일 (FormData) 보내기
        try{
            await axios({
                method: "post",
                url: "http://10.20.100.72:8080/saveVoice",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(response => {
                    console.log('요청 성공:', response.data);
                })
                .catch(error => {
                    console.error('음성을 보내지 못했습니다.', error);
                });
        }catch (error) {
            console.error('실패 :', error);
        }

        await Audio.setAudioModeAsync({
            allowsRecording: false,
        });

        console.log('Recording 중지 및 저장', uri);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
                <TouchableOpacity style={styles.startButton1} onPress={startRecording}>
                    <Text style={styles.buttonText}>녹음 시작</Text>
                </TouchableOpacity>
                <Button
                    title={recording ? '녹음 중지' : '녹음 시작'}
                    onPress={recording ? stopRecording : startRecording}
                />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {errorMsg ? (
                    <Text>{errorMsg}</Text>
                ) : location ? (
                    <View>
                        <Text style={styles.locationText}>위도: {location.coords.latitude}</Text>
                        <Text style={styles.locationText}>경도: {location.coords.longitude}</Text>
                    </View>
                ) : (
                    <Text style={styles.loadingText}>로딩 중...</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoadSetting')}>
                    <Text style={styles.buttonText}>경로 설정</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckRoad')}>
                    <Text style={styles.buttonText}>경로 확인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RideBus', {
                    latitude: 126.924145806,
                    longitude: 37.56205,
                })}>
                    <Text style={styles.buttonText}>버스 탑승 등록</Text>
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
    loadingText: {
        fontSize: 16,
        marginBottom: 16,
    },
    startButton: {
        backgroundColor: '#bc2a8d',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        width: '40%',
    },
    startButton1: {
        backgroundColor: '#bc2a8d',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: 150,
    },
    button: {
        backgroundColor: '#bc2a8d',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        width: '40%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Main;