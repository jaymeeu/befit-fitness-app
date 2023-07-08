import React, {useState} from 'react';
import { StyleSheet, ScrollView, Alert, useWindowDimensions} from 'react-native';
// import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
// import { useRoute } from '@react-navigation/native';
import {Auth} from 'aws-amplify'
import { EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomInput from '../../components/CustomInput';
import { Text, View } from '../../components/Themed';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useLocalSearchParams, useRouter } from 'expo-router';


const ConfirmEmailScreen = () => {
  const router = useRouter();

  const params = useLocalSearchParams();

  const {control, handleSubmit} = useForm();

  const onConfirmPressed = async data => {
    try{
      await Auth.confirmSignUp(params.username, data.code);
      // navigation.navigate('SignIn');
      router.push('auth')
    }
    catch (e){
      Alert.alert('Opps', e.message);
    }
  };


  const onResendPress = async () => {
    try{
      // await Auth.resendSignUp(route?.params?.username);  or
      await Auth.resendSignUp(params.username);
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

        <Text>Verification code sent to your email : {params.username}</Text>


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
          onPress={()=>{
            router.push('/auth')
          }}
          type="TERTIARY"
        />
      </SafeAreaView>
  );
};



export default ConfirmEmailScreen;