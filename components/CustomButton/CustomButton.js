import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor, disabled}) => {
  return (
    <Pressable
      onPress={()=> disabled ? console.log('disable') : onPress()}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 18,
    marginVertical: 8,

    alignItems: 'center',
    borderRadius: 10,
  },

  container_TERTIARY: {
    backgroundColor: '#E8E8E8',
  },

  container_PRIMARY: {
    backgroundColor: '#0C0C0C',
    borderWidth : 1,
    borderColor : 'gray'
  },

  container_SECONDARY: {
    backgroundColor: '#FFFFFF',
    borderWidth : 1,
    borderColor : '#464646'
  },

  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'capriola',

  },

  text_SECONDARY: {
    color: '#000000',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
