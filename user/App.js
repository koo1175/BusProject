import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/components/Login';
import Sign from './src/components/Sign';
import Main from './src/components/Main';
import RoadSetting from './src/components/RoadSetting';
import CheckRoad from './src/components/CheckRoad';
import RideBus from './src/components/RideBus';
import BusStop from './src/components/BusStop';
import HowLong from './src/components/HowLong';
import CheckRideBus from './src/components/CheckRideBus';
import Buzzer from './src/components/Buzzer';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="RoadSetting" component={RoadSetting} />
        <Stack.Screen name="CheckRoad" component={CheckRoad} />
        <Stack.Screen name="RideBus" component={RideBus} />
        <Stack.Screen name="BusStop" component={BusStop} />
        <Stack.Screen name="HowLong" component={HowLong} />
        <Stack.Screen name="CheckRideBus" component={CheckRideBus} />
        <Stack.Screen name="Buzzer" component={Buzzer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;