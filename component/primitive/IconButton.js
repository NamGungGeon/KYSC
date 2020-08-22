import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Text,
  Pressable,
} from 'react-native';
import MyColors from '../resources/colors/colors';

const IconButton = ({style, imageSize = 30, children, onPress = () => {}}) => {
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
        ...style,
      }}>
      <Pressable
        style={{
          width: imageSize,
          height: imageSize,
          position: 'absolute',
          zIndex: 999,
        }}
        onPress={() => {
          setPressed(!pressed);
          onPress();
        }}>
        {children}
      </Pressable>
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
