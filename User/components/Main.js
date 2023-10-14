import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import axios from 'axios';

import MapView, { Marker } from 'react-native-maps';

import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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

function Main({ navigation, route }) {      //navigation 있어야
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    let timestamp = Date.now();
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

    const [isRecording, setRecording] = React.useState(false);

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
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('음성 녹음 시작 실패', err);
        }
    }

    async function stopRecording() {
        console.log('Recording 중지');
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);

        let formData = new FormData();
        formData.append('audio', {
            uri: uri,
            type: 'audio/m4a',
            name: `recording_${timestamp}.m4a`,
        });
        formData.append('userId', userId);

        try {
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
        } catch (error) {
            console.error('실패 :', error);
        }

        await Audio.setAudioModeAsync({
            allowsRecording: false,
        });

        console.log('Recording 중지 및 저장', uri);
    }

    async function toggleRecording() {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
        setRecording(!isRecording);
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

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'white'  }}>
                {/*{errorMsg ? (<Text>{errorMsg}</Text>) : location ? (*/}
                {/*    <View>*/}
                {/*        /!*<Text style={styles.locationText}>위도: {location.coords.latitude}</Text>*!/*/}
                {/*        /!*<Text style={styles.locationText}>경도: {location.coords.longitude}</Text>*!/*/}
                {/*    </View>*/}
                {/*) : (*/}
                {/*    <Text style={styles.loadingText}>로딩 중...</Text>*/}
                {/*)}*/}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoadSetting')}>
                    <View style={styles.buttonContent}>
                        <FontAwesome5 name="route" size={24} color="black" style={styles.icon} />
                        <Text style={styles.buttonText}>경로 설정</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckRoad')}>
                    <View style={styles.buttonContent}>
                        <FontAwesome5 name="route" size={24} color="black" style={styles.icon} />
                        <Text style={styles.buttonText}>경로 확인</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RideBus', {
                    latitude: 126.924145806,
                    longitude: 37.56205,
                })}>
                    <View style={styles.buttonContent}>
                        <FontAwesome5 name="bus" size={24} color="black" style={styles.icon} />
                        <Text style={styles.buttonText}>버스 탑승 등록</Text>
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
        fontWeight: 'bold',
        marginRight: 180,
        marginTop: 20,
        marginBottom: '-5%',
        // backgroundColor: 'red', // 확인용 색
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
        // backgroundColor: 'red', // 확인용 색 넣기
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
        backgroundColor: '#0095F6',
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
        textAlign: 'center',
        marginRight: 90,
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between', // 아이콘과 텍스트를 양쪽 끝으로 정렬
    },
    icon: {
        marginRight: 70,
    },
    map: {
        width: 500,
        height: 400,
    },
});

export default Main;
