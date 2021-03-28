import React, {useState, useCallback} from 'react';
import { useTimer } from 'react-timer-hook';
import { StyleSheet, Text, View, Alert, Vibration } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressCircle from 'react-native-progress-circle';
import ControlButton from '../components/UI/ControlButton';
import ModeSelectButton from '../components/UI/ModeSelectButton';

import Colors from '../constants/Colors';

interface TimerProps{
    expiryTimestamp: any;
    notify: any;
  };

  const Timer: React.FC<TimerProps> = ({expiryTimestamp, notify}) => {
    
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500); // 10 minutes timer

    const [totalSeconds, setTotalSeconds] = useState(1500);

    const [buttonActiveColors, setButtonActiveColors] = useState({
      pomodoro: Colors.themePrimaryColor,
      shortBreak: '#1b1f36',
      longBreak: '#1b1f36'
    })

    const changeActiveButtonColorHandler = (activeButton: string) => {


      switch(activeButton) {
        case 'pomodoro':
         setButtonActiveColors({
          pomodoro: Colors.themePrimaryColor,
          shortBreak: '#1b1f36',
          longBreak: '#1b1f36'
        })
          break;
        case 'shortBreak':
          setButtonActiveColors({
            pomodoro: '#1b1f36',
            shortBreak: Colors.themePrimaryColor,
            longBreak: '#1b1f36'
          })
          break;
        case 'longBreak':
          setButtonActiveColors({
            pomodoro: '#1b1f36',
            shortBreak: '#1b1f36',
            longBreak: Colors.themePrimaryColor,
          })
          break;
        default:
          break;
        }

    };

    const onExpireTimeHandler = () => {
      // Vibration.vibrate(400);
      notify();
    };


    const  {
      seconds,
      minutes,
      isRunning,
      start,
      restart,
      pause,
      resume
    } = useTimer({expiryTimestamp, onExpire: onExpireTimeHandler})
    
    const currrentSeconds = ((minutes * 60) + seconds);
    const percentageSeconds = (currrentSeconds / totalSeconds) * 100;


    return(
      
      <View style={styles.screen}>
        <LinearGradient 
          start={[0,1]}
          end={[1,0]}
          colors={[Colors.primary1, Colors.primary2]}
          style={styles.background}
        />
        <View style={styles.modeButtonsContainer} >
            <ModeSelectButton text="Pomodoro" color={buttonActiveColors.pomodoro} onPressFunction={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 1500)
                setTotalSeconds(1500); // Função para regular a porcentagem do progress ring
                changeActiveButtonColorHandler('pomodoro')
                restart(time);
            }}>
            </ModeSelectButton>
            <ModeSelectButton text="Short Break" color={buttonActiveColors.shortBreak} onPressFunction={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 10)
                setTotalSeconds(10);
                changeActiveButtonColorHandler('shortBreak')
                restart(time);
            }}>
            </ModeSelectButton>
            <ModeSelectButton text="Long Break" color={buttonActiveColors.longBreak} onPressFunction={() => {
              const time = new Date();
              setTotalSeconds(600);
              time.setSeconds(time.getSeconds() + 600)
              changeActiveButtonColorHandler('longBreak')
              restart(time);
            }}/>
        </View>
        
      
        
        <ProgressCircle
            percent={percentageSeconds}
            radius={160}
            borderWidth={8}
            color={Colors.themePrimaryColor}
            shadowColor="rgb(146, 146, 146)"
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

        
        <View style={styles.controlButtonsContainer}>
          <ControlButton iconName="pause" onPressFunction={pause} />
          <ControlButton iconName="play" onPressFunction={resume} />
        </View>
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
    
  },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#fff',
    width: '80%',
    height: 100,
    marginTop: 50,
  },

  modeButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginBottom: 50,
    // borderWidth: 2,
    // borderColor: Colors.themePrimaryColor,
    borderRadius: 50,
    backgroundColor: '#1b1f36',
    width: '95%',
    height: 75
  }
})
  

export default Timer;