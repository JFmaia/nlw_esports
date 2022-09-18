import {useRef, useEffect} from  "react"
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';
import './src/services/notificationConfig';
import {getPushNotificationToken} from './src/services/getPushNotificationToken';
import * as  Notification from 'expo-notifications';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter'

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { Subscription } from "expo-modules-core";


export default function App() {
  const [fontsLoaded] = useFonts ({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getPushNotificationListen = useRef<Subscription>();
  const responsePushNotificationListen = useRef<Subscription>();

  useEffect(()=>{
    getPushNotificationToken();
  });

  useEffect(()=>{
    getPushNotificationListen.current= Notification.addNotificationReceivedListener(notification =>{
      console.log(notification);
    });

    responsePushNotificationListen.current = Notification.addNotificationResponseReceivedListener(response =>{
      console.log(response);
    });

    return() => {
      if(getPushNotificationListen.current && responsePushNotificationListen.current){
        Notification.removeNotificationSubscription(getPushNotificationListen.current);
        Notification.removeNotificationSubscription(responsePushNotificationListen.current);
      }
    }
  },[]);
  return (
    <Background>  
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />

      {
        fontsLoaded ? <Routes/> : <Loading/>
      }

    </Background>
  );
}