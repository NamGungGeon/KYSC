import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import MyColors from '../resources/colors/colors';
import shaverIcon from '../resources/image/shaver.png';
import settingIcon from '../resources/image/settings.png';
import HeartBeating from '../primitive/HeartBeating';
import IconButton from '../primitive/IconButton';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import cleanIcon from '../resources/image/clean.png';
import dirtyIcon from '../resources/image/virus.png';
import cautionIcon from '../resources/image/stain.png';
import ResetModal from '../modal/ResetModal';
import ChangeConfirmModal from '../modal/ChangeConfirmModal';
import * as PushNotification from 'react-native-push-notification';
import {NOTIFICATION_CHANGE_ALARM} from '../resources/values/notificationId';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  background_good: {
    backgroundColor: MyColors.primary,
  },
  background_caution: {
    backgroundColor: MyColors.caution,
  },
  background_danger: {
    backgroundColor: MyColors.alert,
  },
  options_wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  status_wrapper: {
    flex: 1,
  },
  options_item: {
    margin: 8,
  },
  status_icon_wrapper: {
    marginTop: 32,
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  status_icon: {
    width: 128,
    height: 128,
  },
  status_text_wrapper: {
    marginBottom: 64,
  },
  status_summary: {
    fontWeight: '400',
    color: MyColors.white,
    textAlign: 'center',
    fontSize: 24,
  },
  status_detail: {
    color: MyColors.white,
    textAlign: 'center',
    fontSize: 16,
  },
  bottom_section: {},
  bottom_button: {
    padding: 16,
    backgroundColor: MyColors.white,
  },
  bottom_button_text: {
    color: MyColors.white,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

let refresherId = null;
const Home = ({navigation}) => {
  const [lastChangingDate, setLastChangingDate] = useState();
  const [changingPeriod, setChangingPeriod] = useState();
  const [ready, setReady] = useState(false);

  //initialize
  const loadInitialData = async () => {
    try {
      const lastChangeDay = await AsyncStorage.getItem('lastChangingDate');
      const changingPeriod = await AsyncStorage.getItem('changingPeriod');
      setLastChangingDate(lastChangeDay);
      console.log('before parsing', lastChangeDay, changingPeriod);
      setChangingPeriod(parseInt(changingPeriod));

      if (!lastChangeDay || !changingPeriod || isNaN(changingPeriod)) {
        //initial setting is needed
        navigation.reset({
          index: 0,
          routes: [{name: 'InitialSettings'}],
        });
      } else {
        //ready!
        setReady(true);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    loadInitialData();

    refresherId = setInterval(loadInitialData, 60 * 1000);
    return () => {
      if (refresherId) clearInterval(refresherId);
    };
  }, []);

  const [diffDays, setDiffDays] = useState(0);
  const [message, setMessage] = useState();
  const [backgroundStyle, setBackgroundStyle] = useState(
    styles.background_good,
  );
  const [baseColor, setBaseColor] = useState(MyColors.primary);
  const [representIcon, setRepresentIcon] = useState(cleanIcon);
  //UI handling
  useEffect(() => {
    console.log('UI redraw', lastChangingDate, changingPeriod);
    if (lastChangingDate && changingPeriod) {
      const diffDays = moment().diff(
        moment(lastChangingDate, 'YYYY-MM-DD'),
        'days',
      );
      console.log(diffDays, changingPeriod);
      setDiffDays(diffDays);

      if (diffDays < changingPeriod) {
        setMessage('Your shaver is so clean');
        setBackgroundStyle(styles.background_good);
        setBaseColor(MyColors.primary);
        setRepresentIcon(cleanIcon);
      } else if (diffDays < changingPeriod * 1.2) {
        setMessage('You should change shaver');
        setBackgroundStyle(styles.background_caution);
        setBaseColor(MyColors.caution);
        setRepresentIcon(cautionIcon);
      } else {
        setMessage('Your shaver is dirty. You must change shaver');
        setBackgroundStyle(styles.background_danger);
        setBaseColor(MyColors.alert);
        setRepresentIcon(dirtyIcon);
      }
    }
  }, [lastChangingDate, changingPeriod]);

  const [showResetModal, setShowResetModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  return (
    <>
      <StatusBar backgroundColor={baseColor} />
      <ResetModal
        visible={showResetModal}
        onYes={() => {
          setShowResetModal(false);
          navigation.push('InitialSettings');
        }}
        onNo={() => {
          setShowResetModal(false);
        }}
      />
      <ChangeConfirmModal
        visible={showChangeModal}
        onYes={async () => {
          setShowChangeModal(false);

          // const current = '2020-01-01';
          const current = moment().format('YYYY-MM-DD');
          setLastChangingDate(current);
          console.log(current);
          await AsyncStorage.setItem('lastChangingDate', current)
            .then(() => {
              setLastChangingDate(current);
              Alert.alert('Good!', 'Successfully saved');
            })
            .catch((e) => {
              Alert.alert('Error', e.toString());
              console.error(e);
            });
          //re-setting change alarm
          const nextChangeDate = moment(lastChangingDate, 'YYYY-MM-DD').add(
            changingPeriod,
            'days',
          );
          PushNotification.cancelLocalNotifications({
            id: NOTIFICATION_CHANGE_ALARM,
          });
          PushNotification.localNotificationSchedule({
            id: NOTIFICATION_CHANGE_ALARM,
            message: 'You should change shaver', // (required)
            date: nextChangeDate.toDate(), // next changing date
            allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
          });
        }}
        onNo={() => {
          setShowChangeModal(false);
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          ...backgroundStyle,
        }}>
        <View style={styles.options_wrapper}>
          {/*menu*/}
          <IconButton
            imageSize={30}
            style={styles.options_item}
            onPress={() => {
              setShowResetModal(true);
            }}>
            <Image
              source={settingIcon}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </IconButton>
        </View>
        {/*Status Section*/}
        <View style={styles.status_wrapper}>
          {ready ? (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.status_icon_wrapper}>
                  <Image source={shaverIcon} style={styles.status_icon} />
                  <View>
                    <HeartBeating
                      fromValue={32}
                      toValue={48}
                      duration={400}
                      style={{
                        marginBottom: 48,
                      }}>
                      <Image
                        source={representIcon}
                        style={{width: '100%', height: '100%'}}
                      />
                    </HeartBeating>
                  </View>
                </View>
                <View style={styles.status_text_wrapper}>
                  <Text style={styles.status_summary}>{message}</Text>
                  <Text style={styles.status_detail}>
                    {diffDays
                      ? `The last changing day was ${diffDays} days ago`
                      : 'You changed shaver today'}
                  </Text>
                </View>
              </View>
              <View style={styles.bottom_section}>
                <Pressable
                  style={styles.bottom_button}
                  onPress={() => {
                    console.log('onPress');
                    setShowChangeModal(true);
                  }}>
                  <Text
                    style={{...styles.bottom_button_text, color: baseColor}}>
                    I change my shaver today
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <ActivityIndicator size={'large'} color={MyColors.white} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
