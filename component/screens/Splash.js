import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import shaverIcon from '../resources/image/shaver.png';
import MyColors from '../resources/colors/colors';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: MyColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 84,
    height: 84,
  },
  title: {
    fontSize: 28,
    marginTop: 16,
    fontWeight: '400',
    color: MyColors.white,
    textAlign: 'center',
  },
  explain: {
    color: MyColors.white,
  },
});

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }, 1.5 * 1000);
  }, []);
  return (
    <View style={styles.wrapper}>
      <Image style={styles.icon} source={shaverIcon} />
      <Text style={styles.title}>KYSC</Text>
      <Text style={styles.explain}>Keep your shaver clean!</Text>
    </View>
  );
};

export default Splash;
