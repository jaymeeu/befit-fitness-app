import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert, useWindowDimensions, useColorScheme } from 'react-native';
// import {useNavigation} from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import { Text, View } from '../../components/Themed';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Link } from 'expo-router';
import Colors from '../../constants/Colors';


const ForgotPasswordScreen = () => {

    const colorScheme = useColorScheme()
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

    const { height } = useWindowDimensions();

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
            // marginBottom : 20,
      fontFamily: 'capriola',

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
            <View style={{ flexDirection: "column", gap: 15, width: "100%", alignItems: "center", backgroundColor :'transparent' }}>

                <Text style={styles.title}>Request password reset</Text>

                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Username"
                    activeIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].text} />}
                    inactiveIcon={<EvilIcons name="lock" size={24} color={Colors[colorScheme ?? 'light'].tabIconDefault}/>}
                    rules={{
                        required: 'Username is required',
                    }}
                />
                <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />
                <Link href="/auth" asChild>
                    <CustomButton
                        text="Back to Sign in"
                        type="TERTIARY"
                    />
                </Link>
            </View>
        </SafeAreaView>
    );
};


export default ForgotPasswordScreen;