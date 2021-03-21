import React from 'react';
import { useTimer } from 'react-timer-hook';
import { StyleSheet, Text, View, Button } from 'react-native';

interface TimerProps{
    expiryTimestamp: any;
  };

  const Timer: React.FC<TimerProps> = ({expiryTimestamp}) => {

    
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500); // 10 minutes timer


    const  {
      seconds,
      minutes,
      isRunning,
      start,
      restart,
      pause,
      resume
    } = useTimer({expiryTimestamp, onExpire: () => console.log('Tempo acabou')})
    
    return(
      <View>
        <View style={{flexDirection: 'row'}}>
            <Button title="Pomodoro" color="red" onPress={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 1500)
                restart(time);
            }}>
            </Button>
            <Button title="Short Break" color="red" onPress={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 300)
                restart(time);
            }}>
            </Button>
            <Button title="Long Break" color="red" onPress={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 600)
                restart(time);
            }}>
            </Button>
        </View>
        
        <Text>{minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</Text>
        <Text>{isRunning ? 'running' : 'not running'}</Text>
        <Button title="Pause" onPress={pause}/>
        <Button title="Resume" onPress={resume}/>
      </View>
    );
  }
  

export default Timer;