import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';

import Constants, { ExecutionEnvironment } from 'expo-constants';

// Expo Go cannot register remote push notifications. Load the native module only
// in standalone/development builds, keeping the rest of the app usable in Go.
const Notifications =
  Platform.OS !== 'web' && Constants.executionEnvironment !== ExecutionEnvironment.StoreClient
    ? require('expo-notifications')
    : null;
import AsyncStorage from '@react-native-async-storage/async-storage';


const pushNotification = () => {
    Notifications?.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
    });
      
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 2,
          },
        });
    }
      
      async function registerForPushNotificationsAsync() {
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return;
          }
          // Learn more about projectId:
          // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
          token = (await Notifications.getExpoPushTokenAsync({
            projectId:Constants.expoConfig?.extra?.eas.projectId,
            }
             )).data;
         // console.log(token);
        } else {
          console.log('Must use physical device for Push Notifications');
        }
       // setExpoPushToken(token)
        console.log(token);
        return token;
      }
  
    useEffect(() => {
      if (!Notifications) return;

      registerForPushNotificationsAsync().then(async (token) => {
        setExpoPushToken(token);
        //await AsyncStorage.setItem('expoPushToken', token);
      }).catch(error => {
        console.warn('Push notification registration failed:', error.message);
      });
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        notificationListener.current?.remove();
        responseListener.current?.remove();
      };
    }, []);

    return [expoPushToken, notification];
}

export default pushNotification
