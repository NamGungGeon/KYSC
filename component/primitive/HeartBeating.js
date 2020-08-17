import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const HeartBeating = ({
  fromValue = 0,
  toValue = 100,
  duration = 600,
  children,
  style,
}) => {
  const size = useRef(new Animated.Value(fromValue)).current;
  const styles = StyleSheet.create({
    wrapper: {
      width: toValue,
      height: toValue,
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    },
  });
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(size, {
          toValue,
          useNativeDriver: false,
          duration,
        }),
        Animated.timing(size, {
          toValue: fromValue,
          useNativeDriver: false,
          duration,
        }),
      ]),
    ).start();
  }, [size]);
  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={{
          width: size,
          height: size,
        }}>
        {children}
      </Animated.View>
    </View>
  );
};

export default HeartBeating;
