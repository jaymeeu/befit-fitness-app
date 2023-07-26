import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native'
import { Text, View } from '../Themed';
import SocialButton from '../CustomButton/SocialButton';
import google from '../../assets/images/GoogleIcon.png'
import CustomButton from '../CustomButton/CustomButton';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth, DataStore, Hub } from 'aws-amplify'
import { Link, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { useAuthContext } from '../../contexts/AuthContext';
import { User } from '../../src/models';

export default SigninSIgnup = () => {
  

    const { height } = useWindowDimensions();
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            height: height,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            paddingTop: 100
        },
        top: {
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: 'transparent',
            marginBottom: 20
        },
        below: {
            justifyContent: "space-between",
            maxHeight: 500,
            padding: 20,
            backgroundColor: 'transparent',
            paddingBottom: 40,
        },
        started: {
            width: "100%",
            textAlign: "center",
            fontFamily: "capriola",
            fontSize: 18,
            color: Colors[colorScheme ?? 'light'].text,
            marginBottom: 15,
        },
        or: {
            width: "100%",
            textAlign: "center",
            fontFamily: "capriola",
            fontSize: 18,
            marginVertical: 20,
            color: Colors[colorScheme ?? 'light'].text,
        },
    });

    return (
        // <SafeAreaView >
        <View style={styles.container}>

            <View style={styles.top}>
                <Image source={google} style={{ width: 60, height: 60 }} />
            </View>
            {
                // console.log(user, "currentUser")
            }
            <View style={styles.below}>
                <View style={{ backgroundColor: 'transparent' }}>
                    <Text style={styles.started}>Get started</Text>
                    <SocialButton
                        text="Continue with Google"
                        // onPress={authGoogle}
                        onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
                        source={google}
                        type="PRIMARY"
                    />

                </View>
                <View style={{ backgroundColor: 'transparent' }}>
                    <Text style={styles.or}>Or</Text>
                </View>

                <View style={{ backgroundColor: 'transparent' }}>
                    <Link href="/auth/login" asChild>

                        <CustomButton
                            text="Login"
                            type="PRIMARY"
                        />
                    </Link>

                    <Link href="/auth/signup" asChild>
                        <CustomButton
                            text="Sign up"
                            type="PRIMARY"
                        />
                    </Link>
                </View>
            </View>

        </View>
        //   </SafeAreaView>
    )
}


