import React from 'react';
import {Text, StyleSheet,View,Image, Pressable} from 'react-native';

const SocialButton = ({onPress, text, type ,source, bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles[`container_${type}`]}>
        <View style={styles.view}>
          <Image style={text === "Sign Up with Apple" ? styles.view_image_a : styles.view_image} source={source}/>
      <Text style={[styles.text, styles[`text_${type}`] ]}>
        {text}
      </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  
  container_PRIMARY : {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor : '#1F1F1F'
  },
  container_SECONDARY : {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderWidth : 1,
    borderColor: '#e8e8e8',
    borderRadius: 10,
    backgroundColor : 'white'
  },
  view : {
    width: '100%',
    flexDirection: 'row',
    alignItems :'center'

  },
  view_image : {
    marginRight : 10,
    width : 25,
    height : 25
  },
  view_image_a : {
    marginRight : 10,
    width : 25,
    height : 30
  },
  text_PRIMARY: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'capriola',
  },
  text_SECONDARY: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'capriola',

  },
});

export default SocialButton;
