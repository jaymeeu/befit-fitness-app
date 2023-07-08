import React from 'react';
import {View, Text, StyleSheet, Pressable, useColorScheme} from 'react-native';
import Colors from '../../constants/Colors';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor, disabled}) => {

const colorScheme = useColorScheme()

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
    backgroundColor: Colors[colorScheme ?? 'light'].buttonBG,
    borderWidth : 1,
    borderColor : 'gray'
  },

  container_SECONDARY: {
    backgroundColor: Colors[colorScheme ?? 'light'].buttonText,
    borderWidth : 1,
    borderColor : Colors[colorScheme ?? 'light'].buttonBG
  },

  text: {
    color: Colors[colorScheme ?? 'light'].buttonText,
    fontSize: 15,
    fontFamily: 'capriola',

  },

  text_SECONDARY: {
    color: Colors[colorScheme ?? 'light'].buttonBG,
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

  return (
    <Pressable
      onPress={()=> disabled ? console.log('disable') : onPress()}
      style={[
        styles.container,
        styles[`container_${type}`]
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




export default CustomButton;
