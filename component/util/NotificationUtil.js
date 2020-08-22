import {AppState, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  requestPermissions: Platform.OS === 'ios',
  popInitialNotification: true,
});

const _handleAppStateChange = (nextAppState) => {
  if (nextAppState === 'active') {
    _registerLocalNotification();
  }
};

const _registerLocalNotification = (message = 'Welcome', time) => {
  let showTime = new Date();
  showTime.setSeconds(showTime.getSeconds() + 1);

  const details = {
    /* Android Only Properties */
    vibrate: true,
    vibration: 300,
    priority: 'high',
    visibility: 'public',
    importance: 'high',

    /* iOS and Android properties */
    message, // (required)
    playSound: false,
    // number: 3,
    allowWhileIdle: true,

    /* only for IOS*/
    alertBody: message,
    // fireDate: showTime,

    // for production
    repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    date: showTime,

    // test to trigger each miniute
    // repeatType: 'minute',
    // date: new Date(Date.now()),

    // test to trigger one time
    // date: new Date(Date.now() + 20 * 1000),
  };
  PushNotification.localNotificationSchedule(details);
  console.log('pushed');
};
export default {
  register: function (message, time) {
    // this.removeAllNotifications();
    _registerLocalNotification(message);
    // AppState.addEventListener('change', _handleAppStateChange);
  },
  unregister: () => {
    // AppState.removeEventListener('change', _handleAppStateChange);
  },
  removeAllNotifications: () => {
    PushNotification.setApplicationIconBadgeNumber(0);
    PushNotification.cancelAllLocalNotifications();
  },
};
