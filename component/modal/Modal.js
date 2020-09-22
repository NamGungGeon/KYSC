import React from 'react';
import {Pressable, Text, View, StyleSheet, Modal} from 'react-native';
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
const _Modal = ({
  visible = false,
  title,
  body,
  onYes = () => {},
  onNo = () => {},
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.background}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>{typeof body === 'string' ? <Text>{body}</Text> : body}</View>
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
    </Modal>
  );
};

export default _Modal;
