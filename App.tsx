import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Timer from './components/Timer';



const App: React.FC = () => {

  const [pomodoroCountTime , setPomodoroCountTime] = useState(1500)

  const time = new Date();
  time.setSeconds(time.getSeconds() + pomodoroCountTime); // 10 minutes timer


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
