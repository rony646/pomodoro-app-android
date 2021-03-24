import React, {useState} from 'react';
import { useTimer } from 'react-timer-hook';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressCircle from 'react-native-progress-circle';

import Colors from '../constants/Colors';

interface TimerProps{
    expiryTimestamp: any;
  };

  const Timer: React.FC<TimerProps> = ({expiryTimestamp}) => {
    
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500); // 10 minutes timer

    const [totalSeconds, setTotalSeconds] = useState(1500);

    const  {
      seconds,
      minutes,
      isRunning,
      start,
      restart,
      pause,
      resume
    } = useTimer({expiryTimestamp, onExpire: () => console.log('Tempo acabou')})
    
    const currrentSeconds = ((minutes * 60) + seconds);
    const percentageSeconds = (currrentSeconds / totalSeconds) * 100;
    console.log(percentageSeconds.toFixed(2));

    return(
      <View style={styles.screen}>
        <LinearGradient 
          start={[0,1]}
          end={[1,0]}
          colors={[Colors.primary1, Colors.primary2]}
          style={styles.background}
        />
        <View style={{flexDirection: 'row'}}>
            <Button title="Pomodoro" color="red" onPress={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 1500)
                setTotalSeconds(1500);
                restart(time);
            }}>
            </Button>
            <Button title="Short Break" color="red" onPress={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 300)
                setTotalSeconds(300);
                restart(time);
            }}>
            </Button>
            <Button title="Long Break" color="red" onPress={() => {
                const time = new Date();
                setTotalSeconds(600);
                time.setSeconds(time.getSeconds() + 600)
                restart(time);
            }}>
            </Button>
        </View>
        
      

        
        <ProgressCircle
            percent={percentageSeconds}
            radius={160}
            borderWidth={8}
            color="#f47375"
            shadowColor="transparent"
            bgColor={Colors.primary1}
        >
              <LinearGradient 
                start={[0,1]}
                end={[1,0]}
                colors={[Colors.primary1, Colors.primary2]}
                style={styles.background}
              />
              <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</Text>
            {/* <Text>{isRunning ? 'running' : 'not running'}</Text> */}
        </View>
        </ProgressCircle>
        <Button title="Pause" onPress={pause}/>
        <Button title="Resume" onPress={resume}/>
      </View>
    );
  }

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
   
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 250,
  },
  timerText: {
    fontSize: 75,
    fontWeight: 'bold',
    color: '#fff',
    
  }
})
  

export default Timer;