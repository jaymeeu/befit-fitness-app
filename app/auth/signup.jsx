import React, { useState } from 'react';
import { Alert, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, useColorScheme, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { API, Auth, DataStore, graphqlOperation } from 'aws-amplify'
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomInput from '../../components/CustomInput';
import { Text, View } from '../../components/Themed';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Link, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { Achievement, User } from '../../src/models';
import { listUsers } from '../../src/graphql/queries';

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const colorScheme = useColorScheme()

    const router = useRouter();

    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');

    const { height } = useWindowDimensions();

    const datastoretest = async ()=>{

        try {
          
            const todos = await API.graphql(graphqlOperation(listUsers));
            console.log(todos, "todoesss")
          } catch (error) {
            console.log('Error saving post', error);
          }

        // const datum =  DataStore.save(
        //     new User({
        //         "name": "Lorem ipsum dolor sit amet",
        //         "email": "Lorem ipsum dolor sit amet",
        //         "age": 1020,
        //         "height": 123.45,
        //         "weight": 123.45,
        //         "workouts": [],
        //         "achievements": [],
        //         "sub": "Lorem ipsum dolor sit amet"
        //     })
        // )
        // .then((res)=>{
        //     console.log(res)
        // })
        // .catch((err)=>{
        //     console.log(err, "error")
        // })

    }

    const onRegisterPressed = async (data) => {

        data.username = data.username.toLowerCase();
        
        const { username, password } = data

        console.log('am here starte')

      
        
        console.log(datum, "datum")

        console.log('am here end')
        // try {
        //     const response = await Auth.signUp({
        //         username,
        //         password,
        //         attributes: { preferred_username: username },
        //     })

        //     await DataStore.save(
        //         new User({
        //             "email": username,
        //             "sub": response.userSub
        //         })
        //     ).then((res)=>{
        //         console.log(res, "rpose")
        //     })
        //     .catch((err)=>{
        //         console.log(err, "reoorororo")
        //     })

        //     console.log(response.userSub)


        //     router.push({
        //         pathname: "/auth/confirmemail",
        //         params: { username}
        //     })
        // }
        // catch (e) {
        //     Alert.alert(e.message)
        // }
    };

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };


    const styles = StyleSheet.create({
        root: {
            alignItems: 'center',
            padding: 20,
            height: height,
      backgroundColor : Colors[colorScheme ?? "light"].background
            
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color : Colors[colorScheme ?? 'light'].text,
            margin: 10,
            fontFamily: 'capriola',

        },
        text: {
            color : Colors[colorScheme ?? 'light'].tabIconDefault,
            marginVertical: 10,
        },
        link: {
            color : Colors[colorScheme ?? 'light'].text
        },
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.root}>
                <Text style={styles.title}>Create an account</Text>

                {/* <CustomInput
                    name="name"
                    activeIcon={<MaterialIcons name="alternate-email" size={20} color={Colors[colorScheme ?? 'light'].text} />}
                    inactiveIcon={<MaterialIcons name="alternate-email" size={20} const colorScheme = useColorScheme()
 />}
                    control={control}
                    placeholder="Name"
                    rules={{
                        required: 'Name is required',
                        minLength: {
                            value: 3,
                            message: 'Name should be at least 3 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message: 'Name should be max 24 characters long',
                        },
                    }}
                /> */}

                {/* <CustomInput
                    activeIcon={<MaterialIcons name="alternate-email" size={20} color={Colors[colorScheme ?? 'light'].text} />}
                    inactiveIcon={<MaterialIcons name="alternate-email" size={20} const colorScheme = useColorScheme()
 />}
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username should be at least 3 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message: 'Username should be max 24 characters long',
                        },
                    }}
                /> */}
                <CustomInput
                    name="username"
                    activeIcon={<MaterialIcons name="alternate-email" size={20} color={Colors[colorScheme ?? 'light'].text} />}
                    inactiveIcon={<MaterialIcons name="alternate-email" size={20} color={Colors[colorScheme ?? 'light'].tabIconDefault}/>}
                    control={control}
                    placeholder="Email"
                    rules={{
                        required: 'Email is required',
                        pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                    }}
                />
                <CustomInput
                    name="password"
                    control={control}
                    placeholder="Password"
                    activeIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].text} />}
                    inactiveIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].tabIconDefault}/>}
                    secureTextEntry
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password should be at least 6 characters long',
                        },
                    }}
                />
                <CustomInput
                    name="password-repeat"
                    control={control}
                    placeholder="Repeat Password"
                    activeIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].text} />}
                    inactiveIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].tabIconDefault}/>}
                    secureTextEntry
                    rules={{
                        validate: value => value === pwd || 'Password do not match',
                    }}
                />
                <View style={{marginVertical : 15}}></View>
                <CustomButton
                    text="Register"
                    onPress={handleSubmit(onRegisterPressed)}
                />

                <Text style={styles.text}>
                    By registering, you confirm that you accept our{' '}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>
                        Terms of Use
                    </Text>{' '}
                    and{' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>
                        Privacy Policy
                    </Text>
                </Text>

                <Link href="/auth" asChild>
                    <TouchableOpacity
                        style={{ marginTop: 20, padding: 10 }}
                    >
                        <Text style={{ color : Colors[colorScheme ?? 'light'].tabIconDefault}}>Have an account? Sign in</Text>
                    </TouchableOpacity>
                </Link>

                <Pressable onPress={datastoretest}>
                    <Text>Tested</Text>
                </Pressable>
            </SafeAreaView>
        </ScrollView>
    );
};


export default SignUpScreen;