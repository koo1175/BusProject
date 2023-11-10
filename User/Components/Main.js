import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, Platform} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios'; // 서버로 보내기 위한 import
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome5, Feather } from '@expo/vector-icons';

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

            console.log("UserId : "+userId);

            // 서버에서 blind 여부 확인
            try {
                await axios.post(
                    "http://10.20.100.88:8080/user/checkBlind",
                    { user_id: userId }
                ).then(res => {
                    console.log("res.data"+res.data);
                    console.log("res.data.blind"+res.data.isBlind);
                    console.log("res.data: " + JSON.stringify(res.data.blind));
                    if (res.data.blind === true) {
                        navigation.navigate('BlindBusStop', {
                            userId: userId,
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        });
                    } else {
                        console.error('사용자는 블라인드 상태가 아닙니다.');
                    }

                })
                    .catch(error => {
                        console.error('블라인드 여부 확인 중 오류 발생 : ', error);
                    });
            } catch (error) {
                console.error('블라인드 여부 확인 후 화면 전환 중 오류 발생:', error);
                // 오류 처리 코드를 추가할 수 있습니다.
            }

        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.TitleText}>busproject</Text>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                        <FontAwesome5 name="bus" size={24} color="black" style={styles.thirdIcon} />
                        <Text style={styles.thirdButtonText}>버스 탑승 등록</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
};

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
