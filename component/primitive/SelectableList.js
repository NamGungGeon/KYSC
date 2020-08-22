import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MyColors from '../resources/colors/colors';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
  },
  row: {
    padding: 8,
    color: '#333333',
    backgroundColor: 'white',
    width: '100%',
  },
  selected: {},
  list: {},
});
const SelectableList = ({list = [], defaultSelect, onSelect}) => {
  const [selected, setSelected] = useState(defaultSelect);
  return (
    <View style={styles.wrapper}>
      {list.map((entity) => {
        return (
          <Pressable
            key={entity.value}
            onPress={() => {
              if (onSelect) onSelect(entity);
              console.log(entity);
              setSelected(entity);
            }}>
            <Text
              style={{
                ...styles.row,
                color:
                  selected.value === entity.value ? MyColors.primary : 'black',
              }}>
              {entity.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SelectableList;
