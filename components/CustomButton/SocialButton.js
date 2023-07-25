import React from 'react';
import {Text, StyleSheet,View,Image, Pressable, useColorScheme} from 'react-native';
import Colors from '../../constants/Colors';

const SocialButton = ({onPress, text, type ,source, bgColor, fgColor}) => {

const colorScheme = useColorScheme()

  const styles = StyleSheet.create({
  
    container_PRIMARY : {
      width: '100%',
      padding: 15,
      marginVertical: 5,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: Colors[colorScheme ?? 'light'].buttonBG,
      
    },
  
    view : {
      width: '100%',
      flexDirection: 'row',
      alignItems :'center',
      justifyContent : 'center'
  
    },
    view_image : {
      marginRight : 10,
      width : 25,
      height : 25
    },
  
    text_PRIMARY: {
      color: Colors[colorScheme ?? 'light'].buttonText,
      fontSize: 14,
      fontFamily: 'capriola',
    },
  });

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



export default SocialButton;
