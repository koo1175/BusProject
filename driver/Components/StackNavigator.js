import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// StackNavigation에게 화면들을 알려주기 위해 각 화면을 import해줌
// from ~~여기서 해당 파일이 다른 폴더 안에 들어있을 경우 './폴더명을 추가해서 작성해줌/파일명'
import LogIn from './LogIn';            // 버스 기사님들의 로그인 화면
import HomeScreen from './HomeScreen';  // 사용 안함
import Main from './Main';              // 버스 기사님 메인 화면
import Catch from './Catch';            // 승차 예약 목록
import CatchInfo from './CatchInfo';    // 승차 예약세부 정보



const Stack = createNativeStackNavigator();

// StackNavigator 함수 
const StackNavigator = () => {
    return (
        // Stack.Navigator, Stack.Screen을 통해서 네비게이션을 등록
        // 가장 첫화면 : HomeScreen
        // 화면을 추가해서 이동할 화면이 늘어나면 StackNavigation에게 어떤 화면들이 있는지 알려줘야 함
        // name은 id나 변수같은거라 내가 이름 지정 / component에는 js파일명
        <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LogIn}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Main" component={Main}/>
            <Stack.Screen name="Catch" component={Catch}/>
            
        </Stack.Navigator>
    )
}

export default StackNavigator