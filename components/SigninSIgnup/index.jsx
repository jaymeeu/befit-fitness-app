import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native'
import { Text, View } from '../Themed';
import SocialButton from '../CustomButton/SocialButton';
import google from '../../assets/images/GoogleIcon.png'
import CustomButton from '../CustomButton/CustomButton';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth, Hub } from 'aws-amplify'
import { Link, router } from 'expo-router';

export default SigninSIgnup = () => {



    const [user, setUser] = useState(null);
    const [customState, setCustomState] = useState(null);

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    setUser(data);
                    break;
                case "signOut":
                    setUser(null);
                    break;
                case "customOAuthState":
                    setCustomState(data);
            }
        });

        Auth.currentAuthenticatedUser()
            .then(currentUser => setUser(currentUser))
            .catch(() => console.log("Not signed in"));

        return unsubscribe;
    }, []);

    const { height } = useWindowDimensions();


    const styles = StyleSheet.create({
        container: {
            height: height,
            backgroundColor: "black",
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
            color: "white",
            marginBottom: 15,
        },
        or: {
            width: "100%",
            textAlign: "center",
            fontFamily: "capriola",
            fontSize: 18,
            marginVertical: 20,
            color: "#888888",
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
                        text="Sign Up with Google"
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
                    <Link href="/auth" asChild>

                        <CustomButton
                            text="Login"
                            type="PRIMARY"
                        />
                    </Link>

                    <Link href="/auth/signup" asChild>
                        <CustomButton
                            text="Sign up"
                            type="SECONDARY"
                        />
                    </Link>
                </View>
            </View>

        </View>
        //   </SafeAreaView>
    )
}


