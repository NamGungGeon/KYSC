import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import moment from 'moment';
import MyColors from '../resources/colors/colors';
import {Calendar} from 'react-native-calendars';
import SelectableList from '../primitive/SelectableList';
import AsyncStorage from '@react-native-community/async-storage';
import {reserveNotification} from '../services/NotificationService';

const styles = StyleSheet.create({
  background: {
    backgroundColor: MyColors.primary,
    flex: 1,
  },
  section: {
    padding: 16,
  },
  mainTitle: {
    color: MyColors.white,
    fontWeight: '600',
    fontSize: 32,
  },
  title: {
    color: MyColors.white,
    fontWeight: '600',
    fontSize: 24,
  },
  explain: {
    color: MyColors.white,
    fontWeight: '400',
    fontSize: 16,
  },
  buttonWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyColors.white,
  },
  buttonText: {
    padding: 16,
    color: MyColors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});
const InitialSettings = ({navigation}) => {
  const currentDate = moment().format('YYYY-MM-DD');
  const periods = [
    {
      title: '1 week',
      value: 7,
    },
    {
      title: '2 week',
      value: 14,
    },
    {
      title: '3 week',
      value: 21,
    },
    {
      title: '4 week',
      value: 28,
    },
  ];
  const [lastChangingDate, setLastChangingDate] = useState(currentDate);
  const [changingPeriod, setChangingPeriod] = useState(periods[0].value);

  const onSettingFinished = async () => {
    await AsyncStorage.setItem('lastChangingDate', lastChangingDate);
    await AsyncStorage.setItem('changingPeriod', `${changingPeriod}`);
    Alert.alert(
      'All Setting is finished',
      'Now, we check your shaver is clean or dirty.\nIf notification is allowed, We notice the day when you should change your shaver',
    );
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });

    //reserve notification for the day when shaver should be changed
    const nextChangeDate = moment(lastChangingDate, 'YYYY-MM-DD').add(
      changingPeriod,
      'days',
    );
    reserveNotification([
      {
        message: 'OK! Notification service is successfully registered.', // (required)
        date: new Date(Date.now() + 5 * 1000), // in 5 secs
      },
      {
        message: 'You should change shaver', // (required)
        date: nextChangeDate.toDate(), // next changing date
      },
    ]);
  };
  return (
    <>
      <StatusBar backgroundColor={MyColors.primary} />
      <SafeAreaView style={styles.background}>
        <ScrollView overScrollMode={'never'}>
          <View>
            <View style={styles.section}>
              <Text style={styles.mainTitle}>Welcome to KYSC!</Text>
              <Text style={styles.explain}>
                This action is needed only once
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>
                Step 1: Choose the last date changing shaver
              </Text>
              <Text style={styles.explain}>
                This information is used to notify the next changing day
              </Text>
              <View
                style={{
                  backgroundColor: MyColors.white,
                }}>
                <Calendar
                  markedDates={{
                    [lastChangingDate]: {
                      selected: true,
                      selectedColor: '#00adf5',
                    },
                  }}
                  maxDate={currentDate}
                  onDayPress={(day) => {
                    setLastChangingDate(day.dateString);
                    console.log(day.dateString);
                  }}
                  theme={{
                    selectedDayBackgroundColor: '#00adf5',
                  }}
                  current={currentDate}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>
                Step 2: Inform changing period to us
              </Text>
              <Text style={styles.explain}>
                This information is used to notify the next changing day also
              </Text>
              <View>
                <SelectableList
                  list={periods}
                  onSelect={(period) => setChangingPeriod(period.value)}
                  defaultSelect={periods[0]}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Step 3: Finish</Text>
              <Pressable
                style={styles.buttonWrapper}
                onPress={onSettingFinished}>
                <Text style={styles.buttonText}>Done!</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default InitialSettings;
