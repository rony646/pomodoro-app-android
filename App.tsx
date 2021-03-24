import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import Timer from './components/Timer';
import ProgressCircle from 'react-native-progress-circle';



const App: React.FC = () => {


  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500); // 25 minutes timer


  return (
    <View style={styles.container}>
      <Timer expiryTimestamp={time}/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
