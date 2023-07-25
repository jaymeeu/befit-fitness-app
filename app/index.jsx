import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import { View } from '../components/Themed';
import { useEffect } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../src/models';

import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";

const Page = () => {

    const { dbUser, setAuthUser, userOnboard, updateDbUser } = useAuthContext()
    const router = useRouter()


    const segments = useSegments();
    const navigationState = useRootNavigationState();

    useEffect(() => {

        if (!navigationState?.key) return;

        if (dbUser === null && userOnboard === null) {
            router.replace('/boarding');
        }
        else if (userOnboard !== null) {
            Auth.currentAuthenticatedUser()
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

        console.log('i got here')

    }, [segments, navigationState?.key])

    return ( <View></View> );

}

export default Page
