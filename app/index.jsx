import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import SigninSIgnup from '../components/SigninSIgnup';
import { View } from '../components/Themed';
import Onboarding from '../components/Onboarding';
import { useEffect } from 'react';
import Registration from '../components/CompleteRegistration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../src/models';


import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";

export default function Page() {

    const { dbUser, setAuthUser, userOnboard, loaded, updateDbUser } = useAuthContext()
    const router = useRouter()


    const segments = useSegments();
    const navigationState = useRootNavigationState();

    useEffect(() => {

        if (!navigationState?.key) return;
        if (!loaded) return;

        if (dbUser === null && userOnboard === null) {
            router.replace('/boarding');
        }
        else if (userOnboard !== null) {
            Auth.currentAuthenticatedUser({ bypassCache: true })
                .then(async (currentUser) => {
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
                .catch(() => {
                    router.replace("/auth");
                })
        }

        // AsyncStorage.removeItem('@user_onboard')
        // AsyncStorage.removeItem('@db_user')
        // Auth.signOut()
        // DataStore.clear()

    }, [router, segments, navigationState?.key, loaded])

    return <View>
        {!navigationState?.key || !loaded ? <Text>LOADING...</Text> : <></>}</View>;

}
