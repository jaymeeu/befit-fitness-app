import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import { View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { Auth, DataStore, Hub } from 'aws-amplify';
import { User, Workout } from '../src/models';

import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Page = () => {

    const { dbUser, setAuthUser, userOnboard, updateDbUser, loaded } = useAuthContext()
    const router = useRouter()

    const segments = useSegments();
    const navigationState = useRootNavigationState();

    const [customState, setCustomState] = useState(null);

    const checkuser = async () => {
        await Auth.currentAuthenticatedUser()
            .then(async currentUser => {
                setAuthUser(currentUser)
                if (currentUser?.attributes?.sub) {
                    if (dbUser === null) {
                        const users = await DataStore.query(User, (user) => user.sub.eq(currentUser?.attributes?.sub));
                        if (users[0]?.sub) {
                            updateDbUser(users[0])
                            router.replace("/(tabs)/home");
                        }
                        else {
                            router.replace("/registration");
                        }
                    }
                    else {
                        router.replace("/(tabs)/home");
                    } 
                }
                else {
                    router.replace("/auth");
                }
            })
            .catch((err) => {
                router.replace("/auth")
            });


    }

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    checkuser(data);
                    break;
                case "signOut":
                    router.replace('/auth')
                    break;
                case "customOAuthState":
                    setCustomState(data);
            }
        });
        return unsubscribe;
    }, []);


    useEffect(() => {

        if (!navigationState?.key) return;
        if (!loaded) return;

        if (userOnboard === null) {
            router.push('/boarding');
        }
        else if (userOnboard !== null) {
            checkuser()
        }
    }, [navigationState?.key, loaded])
// }, [segments, navigationState?.key])

// useEffect(() => {
//     AsyncStorage.removeItem('@user_onboard')
//     AsyncStorage.removeItem('@db_user')
//     Auth.signOut()
//     DataStore.clear()
//     console.log('herer')
// }, [])

    return ( 
        <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          opacity: 0.6,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <LottieView
          style={{ height: 150 }}
          source={require("../assets/animations/scanner.json")}
          autoPlay
          speed={3}
        />
      </View>
      );

}

export default Page
