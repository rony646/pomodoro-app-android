import React, { useState, useRef, useEffect } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


import { StyleSheet, View, Platform, Button } from 'react-native';
import Timer from './components/Timer';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldShowAlert: true,
    shouldSetBadge: false,
  })
})

const App: React.FC = () => {

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener: any = useRef();
  const responseListener: any = useRef();

  const getNotification = async () => {
    await schedulePushNotification();
  };

  useEffect(() => {
    registerForPushNotificationAsync().then(token => setExpoPushToken(token));

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });

    return() => {
      // Notifications.removeNotificationSubscription(notificationListener);
      // Notifications.removeNotificationSubscription(responseListener);
    }
  })


  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500); // 25 minutes timer


  return (
    <View style={styles.container}>
      <Timer expiryTimestamp={time} notify={getNotification}/>
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


const schedulePushNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'The time is over! 🍅⏲️',
      body: 'Time to open the app and star another timer',
      data: {},
    },
    trigger: {seconds: 1}
  })
};

const registerForPushNotificationAsync = async () => {
  let token;
  if(Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log('You must use a real device to use this feature')
  };

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};