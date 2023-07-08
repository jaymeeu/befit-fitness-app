import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert, useWindowDimensions } from 'react-native';
// import {useNavigation} from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { Text, View } from '../Themed';
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput';
import { EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
    const { control, handleSubmit } = useForm();
    //   const navigation = useNavigation();

    const onSendPressed = async data => {
        try {
            await Auth.forgotPassword(data.username);
            //   navigation.navigate('NewPassword');
        }
        catch (e) {
            Alert.alert('Opps', e.message);
        }

        // console.warn(data);
    };

    const onSignInPress = () => {
        // navigation.navigate('SignIn');
    };

    const { height } = useWindowDimensions();

    const styles = StyleSheet.create({
        root: {
            alignItems: 'center',
            padding: 20,
            height: height,
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
            <View style={{ flexDirection: "column", gap: 15, width: "100%", alignItems: "center" }}>

                <Text style={styles.title}>Reset your password</Text>

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
                <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

                <CustomButton
                    text="Back to Sign in"
                    onPress={onSignInPress}
                    type="TERTIARY"
                />
            </View>
        </SafeAreaView>
    );
};


export default ForgotPasswordScreen;