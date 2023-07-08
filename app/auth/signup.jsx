import React, { useState } from 'react';
import { Alert, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, useColorScheme } from 'react-native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify'
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomInput from '../../components/CustomInput';
import { Text, View } from '../../components/Themed';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Link, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const colorScheme = useColorScheme()

    const router = useRouter();

    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async (data) => {
        const { username, password } = data

        try {
            const response = await Auth.signUp({
                username,
                password,
                attributes: { preferred_username: username },
            })
            router.push({
                pathname: "/auth/confirmemail",
                params: { username}
            })
            // navigation.navigate('ConfirmEmail', {username});
        }
        catch (e) {
            Alert.alert(e.message)
            // console.log(e)
        }
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
            // backgroundColor: 'red'
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
            color: 'blue',
        },
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.root}>
                <Text style={styles.title}>Create an account</Text>

                {/* <CustomInput
                    name="name"
                    activeIcon={<MaterialIcons name="alternate-email" size={20} color="black" />}
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
                    activeIcon={<MaterialIcons name="alternate-email" size={20} color="black" />}
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
                    activeIcon={<MaterialIcons name="alternate-email" size={20} color="black" />}
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
                    activeIcon={<EvilIcons name="lock" size={24} color="black" />}
                    inactiveIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].tabIconDefault}/>}
                    secureTextEntry
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password should be at least 8 characters long',
                        },
                    }}
                />
                <CustomInput
                    name="password-repeat"
                    control={control}
                    placeholder="Repeat Password"
                    activeIcon={<EvilIcons name="lock" size={24} color="black" />}
                    inactiveIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].tabIconDefault}/>}
                    secureTextEntry
                    rules={{
                        validate: value => value === pwd || 'Password do not match',
                    }}
                />

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
                        <Text>Have an account? Sign in</Text>
                    </TouchableOpacity>
                </Link>
            </SafeAreaView>
        </ScrollView>
    );
};


export default SignUpScreen;