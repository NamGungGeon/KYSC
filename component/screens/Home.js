import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import MyColors from '../resources/colors/colors';
import shaverIcon from '../resources/image/shaver.png';
import cleanIcon from '../resources/image/clean.png';
import settingIcon from '../resources/image/settings.png';
import HeartBeating from '../primitive/HeartBeating';
import IconButton from '../primitive/IconButton';

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
    marginBottom: 32,
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
});
const Home = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor={MyColors.primary} />
      <SafeAreaView
        style={{
          flex: 1,
          ...styles.background_good,
        }}>
        <View style={styles.options_wrapper}>
          {/*menu*/}
          <IconButton
            onPress={() => {
              navigation.push('Settings');
            }}>
            <Image
              source={settingIcon}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
        </View>
        {/*Status Section*/}
        <View style={{...styles.wrapper}}>
          <View>
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
                    source={cleanIcon}
                    style={{width: '100%', height: '100%'}}
                  />
                </HeartBeating>
              </View>
            </View>
            <View style={styles.status_text_wrapper}>
              <Text style={styles.status_summary}>Your Shaver is clean!</Text>
              <Text style={styles.status_detail}>
                The last changing day was 9 days ago
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
