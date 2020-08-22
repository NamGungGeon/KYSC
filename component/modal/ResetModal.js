import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import MyColors from '../resources/colors/colors';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#00000099',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: MyColors.white,
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingLeft: 32,
  },
});
const ResetModal = ({onYes, onNo}) => {
  return (
    <View style={styles.background}>
      <View style={styles.modal}>
        <View>
          <Text style={styles.title}>Do you wanna reset data?</Text>
        </View>
        <View>
          <Text>The data includes last changing date and changing period</Text>
        </View>
        <View
          style={{
            height: 36,
          }}
        />
        <View style={styles.buttons}>
          <Pressable onPress={onYes} style={styles.button}>
            <Text>Yes</Text>
          </Pressable>
          <Pressable onPress={onNo} style={styles.button}>
            <Text>No</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ResetModal;
