import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native'
import google from '../../assets/images/GoogleIcon.png'
import CustomButton from '../../components/CustomButton/CustomButton';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth, DataStore, Hub } from 'aws-amplify'
import { Link, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { useAuthContext } from '../../contexts/AuthContext';
import { User } from '../../src/models';
import SocialButton from '../../components/CustomButton/SocialButton';
import { Text, View } from '../../components/Themed';

export default SigninSIgnup = () => {
    const router = useRouter()
    const { setAuthUser, authUser, updateDbUser } = useAuthContext()

    const [customState, setCustomState] = useState(null);

    const checkuser = async ()=>{

       await Auth.currentAuthenticatedUser()
        .then(async currentUser => {
            setAuthUser(currentUser)
            if(currentUser?.attributes?.sub){
                try {
                    const users = await DataStore.query(User, (user) => user.sub.eq(currentUser?.attributes?.sub));
                
                    console.log(users, " users users users ")
                    if(users[0]?.sub){
                        updateDbUser(users[0])
                        router.replace("/(tabs)/home");
                    }
                    else{
                        router.replace("/registration");
                    }
                } catch (error) {
                    console.log(error, "eoorr")
                }

                console.log('i got here')
            }

        })
        .catch(() => console.log("Not signed in yet"));

       
    }

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    checkuser(data);
                    break;
                case "signOut":
                    setAuthUser(undefined);
                    break;
                case "customOAuthState":
                    setCustomState(data);
            }
        });

       
        return unsubscribe;
    }, []);


  


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


