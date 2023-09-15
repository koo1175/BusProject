import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>버튼을 만들어보자</Text>
      <StatusBar style="auto" />
      <View style={styles.fixToText}>
        <Button 
          title="회원가입"
          onPress = {() => Alert.alert("alert 띄우기")}
        />
        <Button 
          title="로그인"
          onPress = {() => Alert.alert("alert 띄우기")}
        />
      </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSize: {
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
