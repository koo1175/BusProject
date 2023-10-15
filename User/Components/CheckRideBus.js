// 버스 탑승 확인/취소 페이지

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';



function CheckRideBus ({route}) {
    const { itemId, itemTitle } = route.params;

    return (
        <View>
            <Text style={ styles.titleStyle }> 버스를 탑승하시겠습니까? </Text>

            <View  style={ styles.viewStyle }>
                <TouchableOpacity style={styles.button}>
                    <Text style={ styles.text }>탑승 확인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={ styles.text }>탑승 취소</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center'
    },
    text: {
        color:'white',
        textAlign: 'center'
    },
    button: {
        width: '40%',
        backgroundColor:'gray',
        marginTop :40 ,
        paddingVertical :16,
        paddingHorizontal :32,
    },
    viewStyle: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }

});


export default CheckRideBus;