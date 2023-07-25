import React, {useState} from 'react';
import { StyleSheet, ScrollView, Alert, useWindowDimensions, useColorScheme} from 'react-native';
import {useForm} from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import { Text } from '../../components/Themed';
import CustomButton from '../../components/CustomButton/CustomButton';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

const NewPasswordScreen = () => {

  const route = useRouter();

  const {control, handleSubmit} = useForm();

  const colorScheme = useColorScheme()

  const onSubmitPressed = async data => {
    try{
      await Auth.forgotPasswordSubmit(data.username, data.code, data.username);
      route.push('/auth/login')
    }
    catch (e){
      Alert.alert('Opps', e.message);
    }
  };

  const onSignInPress = () => {
    route.push('/auth/login')
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
    fontFamily: 'capriola',

  },
  link: {
    color : Colors[colorScheme ?? 'light'].text,
  },
});

  return (
    <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Username"
          name="username"
          control={control}
          activeIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].text} />}
          inactiveIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].tabIconDefault}/>}
          
          rules={{required: 'Username is required'}}
        />

        <CustomInput
          placeholder="Code"
          name="code"
          control={control}
          rules={{required: 'Code is required'}}
        />

        <CustomInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters long',
            },
          }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
        </SafeAreaView>
  );
};


export default NewPasswordScreen;