import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용을 위해 추가

function Main({navigation, route}) {
    const { phoneNum, busUid } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>메인화면</Text>
            </View>
            <TouchableOpacity
                style={styles.panel}
                onPress={() => navigation.navigate('Catch', {busUid:busUid})}
            >
                <Ionicons name="people" size={40} color="white" />
                <Text style={styles.panelText}>탑승 현황</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panel}
                onPress={() => navigation.navigate('Settings')}
            >
                <Ionicons name="notifications" size={40} color="white" />
                <Text style={styles.panelText}>알림 설정</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingTop: 60, // 안전한 영역 고려
        paddingBottom: 20,
        width: '100%',
        backgroundColor: '#F3F3F3', // 헤더 배경색
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#D1D1D1', // 경계선 색
    },
    title: {
        fontSize: 30, // 크기 줄임
        fontWeight: 'bold',
        color: '#000',
    },
    panel: {
        width: '90%', // 패널 너비 증가
        height: 120, // 패널 높이 증가
        backgroundColor: '#000000', // 패널 배경색
        marginTop: 30,
        borderRadius: 20, // 둥근 모서리 효과
        justifyContent: 'center', // 내부 텍스트 정렬
        alignItems: 'center',
        shadowColor: "#000", // 그림자 색
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8, // 그림자 효과
    },
    panelText: {
        color: 'white',
        fontSize: 22, // 텍스트 크기 증가
        marginTop: 10, // 아이콘과의 여백 조정
        fontWeight: '600', // 텍스트 굵기
    },
});

export default Main;
