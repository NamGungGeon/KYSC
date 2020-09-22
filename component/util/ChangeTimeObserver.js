import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {Platform} from 'react-native';

const observer = async () => {
  const lastChangeDay = await AsyncStorage.getItem('lastChangingDate');
  const changingPeriod = parseInt(await AsyncStorage.getItem('changingPeriod'));
  console.log('observed', lastChangeDay, changingPeriod);

  console.log('observed', lastChangeDay, changingPeriod);
  if (lastChangeDay && changingPeriod && !isNaN(changingPeriod)) {
    const diffDays = moment().diff(moment(lastChangeDay, 'YYYY-MM-DD'), 'days');
    if (diffDays >= changingPeriod) {
      // NotificationUtil.register(
      //   'Today is the day you should change your shaver',
      // );
    }
  }
};

const MAX_MILLISECONDS = 1000;
const MAX_SECONDS = 60;
const MAX_MINUTES = 60;
//
// export const observerId = setInterval(
//   observer,
//   6 * MAX_MINUTES * MAX_SECONDS * MAX_MILLISECONDS,
// );
export const observerId =
  Platform.OS === 'android' &&
  setInterval(observer, 6 * MAX_MINUTES * MAX_SECONDS * MAX_MILLISECONDS);
// export const observerId = setInterval(
//   observer,
//   6 * MAX_MINUTES * MAX_SECONDS * MAX_MILLISECONDS,
// );
