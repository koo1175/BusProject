import React from "react";
import {View, Text, Button} from 'react-native'
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        // navigation.navigate('navigation에서 설정해둔 name이 들어감(Stack으로 정한 이름)')
        <View>
            <Text>HomeScreen</Text>
            <Button title="로그인하러 가기" onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

export default HomeScreen