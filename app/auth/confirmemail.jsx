import React from 'react';
import { StyleSheet, ScrollView, Alert, useWindowDimensions, useColorScheme} from 'react-native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify'
import { EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '../../components/Themed';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomInput from '../../components/CustomInput';
import Colors from '../../constants/Colors';


const ConfirmEmailScreen = () => {
const colorScheme = useColorScheme()

  const router = useRouter();
  const params = useLocalSearchParams();

  const {control, handleSubmit} = useForm();

  const onConfirmPressed = async data => {
    try{
      await Auth.confirmSignUp(params.username, data.code);
      router.push('/auth/login')
      console.log('navigate')
    }
    catch (e){
      Alert.alert('Opps', e.message);
    }
  };


  const onResendPress = async () => {
    try{
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
      backgroundColor : Colors[colorScheme ?? "light"].background
      

    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color : Colors[colorScheme ?? 'light'].text,
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
          activeIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].text} />}
          inactiveIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].tabIconDefault} />}
          
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
            router.push('/auth/login')
          }}
          type="TERTIARY"
        />
      </SafeAreaView>
  );
};



export default ConfirmEmailScreen;