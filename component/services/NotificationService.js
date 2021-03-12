import * as PushNotification from 'react-native-push-notification';
import {NOTIFICATION_CHANGE_ALARM} from '../resources/values/notificationId';

export const reserveNotification = (options, preserveNotifications = false) => {
  const defaultOption = {
    id: NOTIFICATION_CHANGE_ALARM,
    message: 'Test Notification',
    date: new Date(Date.now() + 5 * 1000),
    allowWhileIdle: true,
  };
  const reserve = (option) => {
    //reserve new notification
    PushNotification.localNotificationSchedule({
      defaultOption,
      ...option,
    });
  };
  if (!preserveNotifications) {
    //cancel all reserved notification
    PushNotification.cancelLocalNotifications({
      id: NOTIFICATION_CHANGE_ALARM,
    });
  }
  if (Array.isArray(options)) {
    options.map(reserve);
  } else {
    reserve(options);
  }
};
