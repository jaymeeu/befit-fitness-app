import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Auth, DataStore } from 'aws-amplify'

import Logo from '../../assets/images/GoogleIcon.png';
import CustomInput from '../../components/CustomInput';
import { Text, View } from '../../components/Themed';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Link, useRouter } from 'expo-router';
import { useAuthContext } from '../../contexts/AuthContext';
import Colors from '../../constants/Colors';
import { User } from '../../src/models';

const SignInScreen = () => {

  const router = useRouter()
  const { height } = useWindowDimensions();

const { updateDbUser, setAuthUser } = useAuthContext()
const colorScheme = useColorScheme();


  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
      height: height,
      paddingTop: 100,
      backgroundColor : Colors[colorScheme ?? "light"].background
    },
    logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 150,
      marginBottom: 20
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
      setAuthUser(response)
      try {
        const users = await DataStore.query(User, (user) =>  user.sub.eq(response?.attributes?.sub));

        if(users[0]?.attributes?.sub){
          updateDbUser(users[0])
          router.replace("/(tabs)/home")
        }
        else{
          router.replace("/registration")
        }

      } catch (error) {
        console.log(error, "eoorr")
      }
    }
    catch (e) {
      if(e.message === 'User is not confirmed.'){
        router.push({
          pathname: "/auth/confirmemail",
          params: { username : data.username}
        })
      }
      else{
        Alert.alert("Opps", e.message)
      }
    }
    setloading(false)
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
        activeIcon={<MaterialIcons name="alternate-email" size={20} color={Colors[colorScheme ?? 'light'].text} />}
        inactiveIcon={<MaterialIcons name="alternate-email" size={20} color={Colors[colorScheme ?? 'light'].tabIconDefault}/>}
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
        activeIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].text} />}
        inactiveIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].tabIconDefault}/>}
        secureTextEntry={true}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password should be minimum 6 characters long',
          },
        }}
      />

      <Link href="/auth/forgetpassword" asChild>
        <TouchableOpacity style={{ padding: 10, alignSelf: 'flex-end' }}>
          <Text style={{ textAlign: 'right', width: '100%', color : Colors[colorScheme ?? 'light'].tabIconDefault }}>Forgot password</Text>
        </TouchableOpacity>
      </Link>

      <CustomButton text={loading ? "Loading..." : "Sign In"} onPress={handleSubmit(onSignInPressed)} />

      <Link href="/auth/signup" asChild>
        <TouchableOpacity style={{ marginTop: 20, padding: 10 }}>
          <Text style={{color : Colors[colorScheme ?? 'light'].tabIconDefault}}>Don't have an account? Create one</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
};



export default SignInScreen;