// Main -> 경로 확인 버튼 눌렀을 때 페이지

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function RoadSetting ({navigation}) {
  return (
    <View style={styles.container}>
      {/* 상단 컨텐츠 */}
      <View style={styles.topContent}>
        {/* 여기에 상단 컨텐츠를 배치할 수 있습니다. */}
      </View>

      {/* 하단 컨텐츠 */}
      <View style={styles.bottomContent}>
        {/* 출발 지점 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="출발 지점"
        />

        {/* 도착 지점 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="도착 지점"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topContent: {
    flex: 1,
    // 상단 컨텐츠 스타일 지정
  },
  bottomContent: {
    flex: 3,  // 하단 30% 영역을 차지하도록 설정
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default RoadSetting;
