import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Animated, Text} from 'react-native';
import MyColors from '../resources/colors/colors';

const IconButton = ({imageSize = 30, children, onPress = () => {}}) => {
  const effectSize = imageSize * 1.6;
  const styles = StyleSheet.create({
    wrapper: {
      width: effectSize,
      height: effectSize,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rippleEffect: {
      width: effectSize,
      height: effectSize,
      borderRadius: effectSize / 2,
      backgroundColor: MyColors.white,
    },
    onPress: {},
  });

  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = useState(true);
  useEffect(() => {
    if (pressed) {
      Animated.sequence([
        Animated.timing(rippleOpacity, {
          toValue: 0.6,
          useNativeDriver: true,
          duration: 200,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: 200,
        }),
      ]).start(() => {
        setPressed(false);
      });
    }
  }, [rippleOpacity, pressed]);

  return (
    <View
      style={{
        ...styles.wrapper,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: 30,
          height: 30,
          position: 'absolute',
          zIndex: 999,
        }}
        onPress={() => {
          setPressed(!pressed);
          onPress();
        }}>
        {children}
      </TouchableOpacity>
      <Animated.View
        style={{
          ...styles.rippleEffect,
          opacity: rippleOpacity,
        }}
      />
    </View>
  );
};

export default IconButton;
