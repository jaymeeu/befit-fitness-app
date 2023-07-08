import React, {useState} from 'react';
import { StyleSheet, ScrollView, Alert, useWindowDimensions} from 'react-native';
// import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
// import { useRoute } from '@react-navigation/native';
import {Auth} from 'aws-amplify'
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Text, View } from '../Themed';
import { SafeAreaView } from 'react-native-safe-area-context';


const ConfirmEmailScreen = () => {
  // const route = useRoute();

  const {control, handleSubmit, watch} = useForm({
      defaultValues: "email@gmail.com"  //email coming from signup
      // {username: route?.params?.username}
  });

  // const navigation = useNavigation();

  const username = watch('username')

  const onConfirmPressed = async data => {
    try{
      await Auth.confirmSignUp(data.username, data.code);
      // navigation.navigate('SignIn');
    }
    catch (e){
      Alert.alert('Opps', e.message);
    }
  };


  const onSignInPress = () => {
    // navigation.navigate('SignIn');
  };

  const onResendPress = async () => {
    try{
      // await Auth.resendSignUp(route?.params?.username);  or
      await Auth.resendSignUp(username);
      Alert.alert('Success', "Code was resent to your email");
    }
    catch (e){
      Alert.alert('Opps', e.message);
    }
  };

  const { height } = useWindowDimensions();


  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
      height : height ,
      // backgroundColor:'green'

    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#051C60',
      margin: 10,
    },
    text: {
      color: 'gray',
      marginVertical: 10,
    },
    link: {
      color: '#FDB075',
    },
  });

  return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          activeIcon={<EvilIcons name="lock" size={24} color="black" />}
          inactiveIcon={<EvilIcons name="lock" size={24} color="#888888" />}
          
          rules={{
            required: 'Username is required',
          }}
        />

        <CustomInput
          name="code"
          control={control}
          activeIcon={<EvilIcons name="lock" size={24} color="black" />}
          inactiveIcon={<EvilIcons name="lock" size={24} color="#888888" />}
          
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </SafeAreaView>
  );
};



export default ConfirmEmailScreen;