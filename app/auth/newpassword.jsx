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

const NewPasswordScreen = () => {

  // const route = useRoute();

  const {control, handleSubmit} = useForm();

  const colorScheme = useColorScheme()

  const onSubmitPressed = async data => {
    try{
      await Auth.forgotPasswordSubmit(data.username, data.code, data.username);
      // navigation.navigate('SignIn');
    }
    catch (e){
      Alert.alert('Opps', e.message);
    }
  };

  const onSignInPress = () => {
    // navigation.navigate('SignIn');
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
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Username"
          name="username"
          control={control}
          activeIcon={<EvilIcons name="lock" size={24} color="black" />}
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
              value: 8,
              message: 'Password should be at least 8 characters long',
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