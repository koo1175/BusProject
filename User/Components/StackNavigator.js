import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// StackNavigation에게 화면들을 알려주기 위해 각 화면을 import해줌
// from ~~여기서 해당 파일이 다른 폴더 안에 들어있을 경우 './폴더명을 추가해서 작성해줌/파일명'
import HomeScreen from './HomeScreen';
import Main from './Main';
import Catch from './Catch';
import SignUp from "./SignUp";
import Login from "./Login";
import RoadSetting from "./RoadSetting";
import RideBus from "./RideBus";
import CheckRoad from "./CheckRoad";
import CheckRideBus from "./CheckRideBus";
import BusStop from "./BusStop";
import HowLong from "./HowLong";
import EndPoint from "./EndPoint";
import Buzzer from "./Buzzer";
import RideBusData from "./RideBusData";
import EndPointData from "./EndPointData";
import EndPointList from "./EndPointList";

import BlindEndPoint from "./BlindEndPoint";
import BlindEndPointData from "./BlindEndPointData";
import BlindEndPointList from "./BlindEndPointData";
import BlindBusList from "./BlindBusList";
import BlindBusStop from "./BlindBusStop";


const Stack = createNativeStackNavigator();

// StackNavigator 함수
const StackNavigator = () => {
        return (
            // Stack.Navigator, Stack.Screen을 통해서 네비게이션을 등록
            // 가장 첫화면 : HomeScreen
            // 화면을 추가해서 이동할 화면이 늘어나면 StackNavigation에게 어떤 화면들이 있는지 알려줘야 함
            // name은 id나 변수같은거라 내가 이름 지정 / component에는 js파일명
            <Stack.Navigator>
                    <Stack.Screen name="Home" component={Login}/>
                    <Stack.Screen name="BusStop" component={BusStop}/>
                    <Stack.Screen name="Catch" component={Catch}/>
                    <Stack.Screen name="CheckRideBus" component={CheckRideBus}/>
                    <Stack.Screen name="CheckRoad" component={CheckRoad}/>
                    <Stack.Screen name="HowLong" component={HowLong}/>
                    <Stack.Screen name="Main" component={Main}/>
                    <Stack.Screen name="RideBus" component={RideBus}/>
                    <Stack.Screen name="RoadSetting" component={RoadSetting}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                    <Stack.Screen name="EndPoint" component={EndPoint}/>
                    <Stack.Screen name="Buzzer" component={Buzzer}/>
                    <Stack.Screen name="RideBusData" component={RideBusData}/>
                    <Stack.Screen name="EndPointData" component={EndPointData}/>
                    <Stack.Screen name="EndPointList" component={EndPointList}/>

                    <Stack.Screen name="BlindBusList" component={BlindBusList}/>
                    <Stack.Screen name="BlindBusStop" component={BlindBusStop}/>
                    <Stack.Screen name="BlindEndPoint" component={BlindEndPoint}/>
                    <Stack.Screen name="BlindEndPointList" component={BlindEndPointList}/>
                    <Stack.Screen name="BlindEndPointData" component={BlindEndPointData}/>
            </Stack.Navigator>
        )
}

export default StackNavigator