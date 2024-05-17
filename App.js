import React, { useEffect } from "react";

/*  Redux Files  */
import store from "./src/redux/store/store";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigations/AppNavigator";
import { NativeBaseProvider, Box } from "native-base";
import { LogBox, Platform } from "react-native";
// import { SheetProvider } from "react-native-actions-sheet";
import Geocoder from 'react-native-geocoding';
import { FCM_TOKEN, GOOGLE_API_KEY } from "./src/constants/ConstantKey";
import messaging from '@react-native-firebase/messaging';
import { storeData } from "./src/commonComponents/AsyncManager";
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import { navigate } from "./src/navigations/RootNavigation";


const App = () => {
  LogBox.ignoreAllLogs();


  useEffect(() => {
    if (Platform.OS == 'ios') {
      requestUserPermission();
    } else {
      getFcmToken();
    }
    Geocoder.init(GOOGLE_API_KEY)

     /** Use when Tap on Notification & app is in backgroud state to foreground */
     messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
        'Data Is ',
        remoteMessage.data,
      );

      let data = remoteMessage.data;
      
    });

    /** Use when Tap on Notification & app is in Kill state to foreground */
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
            'Data Is ',
            remoteMessage.data,
          );
          let data = remoteMessage.data;
          
        }
      });

    /** Use when app is in foreground state & display a notification*/
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!' + JSON.stringify(remoteMessage));

      let notification = remoteMessage.notification;

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: notification.title,
        textBody: notification.body,
        button: 'Ok',
        onPressButton: () => {
          Dialog.hide();
          // navigate('Notification');
        },
      });

      // DisplayMessage({
      //   title: notification.title,
      //   description: notification.body,
      //   type: 'success',
      //   onPress: () => {

      //     let data = remoteMessage.data
      //     navigate("Notification")
      //   }
      // })
    });
    return unsubscribe;
  },[])


  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);

      getFcmToken();
    } else {
      await messaging().requestPermission({
        sound: true,
        alert: true,
        badge: true,
        announcement: true,
      });
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      storeData(FCM_TOKEN, fcmToken);
    } else {j
      console.log('Failed', 'No token received');
    }
  };



  return (
   
      <NativeBaseProvider>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </NativeBaseProvider>

  );
};

export default App;
