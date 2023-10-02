import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import StackNavigator from './Components/StackNavigator';

export default function App() {
  return (
    // App()함수 내부에 NavigationContainer 만들고 그 내부에 StackNavigator를 만든다.
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}

