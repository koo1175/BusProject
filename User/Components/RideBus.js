import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import axios from 'axios';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const RideBus = ({ navigation, route }) => {
    const { latitude, longitude } = route.params;
    const [busStops, setBusStops] = useState([]);
    const [busUIDs, setBusUIDs] = useState([]);
    const [busNames, setBusNames] = useState([]);
    const { userId } = route.params;

    useEffect(() => {
        axios.get(`http://10.20.100.37:8080/getStationByPos?X=126.9407&Y=37.56223`)
            .then(response => {
                setBusStops(response.data);
                setBusNames(response.data.nearStationName);
                setBusUIDs(response.data.nearStationUIDs);
            })
            .catch(error => {
                console.error('Error fetching bus stops:', error);
            });
    }, []);

    const handleItemPress = (item, index) => {
        const selectedName = busNames[index];
        const selectedUID = busUIDs[index];
        navigation.navigate('BusStop', {
            selectedName,
            selectedUID,
            userId: userId
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>가까운 정류장</Text>
            {/*<View style={styles.locationInfo}>*/}
            {/*<Text>Latitude: {latitude}</Text>*/}
            {/*<Text>Longitude: {longitude}</Text>*/}
            {/*</View>*/}
            <FlatList
                data={busNames}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item, index)}>
                        <ListItem containerStyle={styles.listItem}>
                            <ListItem.Content>
                                <ListItem.Title style={styles.listItemTitle}>
                                    <MaterialCommunityIcons name="bus-stop" size={40} color="black" />     {item}</ListItem.Title>
                            </ListItem.Content>
                            <Icon name="chevron-right" type="entypo" color="#999" size={24} />
                        </ListItem>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    locationInfo: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#F0F0F0',

    },
    listItem: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
    },
    listItemTitle: {
        fontSize: 23,
    },
});

export default RideBus;
