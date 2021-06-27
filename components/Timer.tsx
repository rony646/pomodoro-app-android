import React, {useContext, useState} from 'react';
import { useTimer } from 'react-timer-hook';
import { StyleSheet, Text, View, Alert } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import ControlButton from '../components/UI/ControlButton';
import ModeSelectButton from '../components/UI/ModeSelectButton';
import { Audio } from 'expo-av';
import ThemeContext from '../contexts/theme';

import Colors from '../constants/Colors';

interface TimerProps{
    expiryTimestamp: any;
  };

  const Timer: React.FC<TimerProps> = ({expiryTimestamp}) => {

    const themeContext = useContext(ThemeContext);
    
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500); // 10 minutes timer

    const [sound, setSound] = useState<any>();
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
          pomodoro: themeContext.color,
          shortBreak: '#1b1f36',
          longBreak: '#1b1f36'
        })
          break;
        case 'shortBreak':
          setButtonActiveColors({
            pomodoro: '#1b1f36',
            shortBreak: themeContext.color,
            longBreak: '#1b1f36'
          })
          break;
        case 'longBreak':
          setButtonActiveColors({
            pomodoro: '#1b1f36',
            shortBreak: '#1b1f36',
            longBreak: themeContext.color,
          })
          break;
        default:
          break;
        }

    };

    async function playSound() {
      console.log('Loading sound');

      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sound.mp3')
      )

      setSound(sound)

      console.log('Playing sound')
      sound.playAsync();
    };

    const onExpireTimeHandler = () => {
      Alert.alert(
        "The time is over!",
        "Time to select another timer",
        [  
          {
            text: "Close message",
            onPress: () => {},
            style: "cancel"
          }
        ]
      )
      playSound();

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
                time.setSeconds(time.getSeconds() + 300)
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
            color={themeContext.color}
            shadowColor="#929292"
            bgColor={Colors.primary1}
        >
              
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</Text>
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
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 250,
  },
  timerText: {
    fontSize: 60,
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