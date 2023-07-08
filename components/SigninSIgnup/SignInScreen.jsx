import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../assets/images/GoogleIcon.png';
import { useForm } from 'react-hook-form';
import CustomButton from '../CustomButton/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import CustomInput from '../CustomInput';
import { Text, View } from '../Themed';
import { Auth } from 'aws-amplify'

const SignInScreen = () => {
  const { height } = useWindowDimensions();

  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
      height: height,
      paddingTop: 100
    },
    logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 150,
      marginBottom:20
    },
  });

  const [loading, setloading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async data => {
    if (loading) {
      return;
    }
    setloading(true);
    try {
      const response = await Auth.signIn(data.username, data.password)
      // console.log(response)
    }
    catch (e) {
      Alert.alert("Opps", e.message)
    }
    setloading(false)

    // console.log(data);
    // // validate user
    // navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    // navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    // navigation.navigate('SignUp');
  };


  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <CustomInput
        name="username"
        control={control}
        placeholder="Enter Email"
        activeIcon={<MaterialIcons name="alternate-email" size={20} color="black" />}
        inactiveIcon={<MaterialIcons name="alternate-email" size={20} color="#888888" />}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\s*[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\s*$/,
            message: 'Valid email is required'
          }
        }}
      />

      <CustomInput
        name="password"
        control={control}
        placeholder="Enter Password"
        activeIcon={<EvilIcons name="lock" size={24} color="black" />}
        inactiveIcon={<EvilIcons name="lock" size={24} color="#888888" />}
        secureTextEntry={true}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password should be minimum 6 characters long',
          },
        }}
      />

      <TouchableOpacity
        style={{ padding: 10, alignSelf: 'flex-end' }}
        onPress={onForgotPasswordPressed}
      >
        <Text style={{ textAlign: 'right', width: '100%', }}>Forgot password</Text>
      </TouchableOpacity>


      <CustomButton text={loading ? "Loading..." : "Sign In"} onPress={handleSubmit(onSignInPressed)} />


      <TouchableOpacity
        style={{marginTop:20, padding: 10 }}
        onPress={onSignUpPress}
      >
        <Text>Don't have an account? Create one</Text>
      </TouchableOpacity>
     
    </View>
  );
};



export default SignInScreen;