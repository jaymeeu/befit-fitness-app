import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import SigninSIgnup from '../components/SigninSIgnup';
import { View } from '../components/Themed';
import Onboarding from '../components/Onboarding';
import { useEffect } from 'react';
import Registration from '../components/CompleteRegistration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataStore } from 'aws-amplify';
import { User } from '../src/models';


import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";

export default function Page() {

    const { dbUser, userOnboard } = useAuthContext()
    const router = useRouter()

    const segments = useSegments();
  const navigationState = useRootNavigationState();

    useEffect(() => {

        if (!navigationState?.key) return;

        if(dbUser === null && userOnboard === null){
            router.replace('/boarding');
        }
        else if(dbUser === null && userOnboard !== null){
            router.replace("/auth");
        }
        else if(dbUser?.name){
            router.replace('/home')
        }
        else{
            router.replace('/registration')

        }

        // if (router && dbUser?.name) {
        //     router.replace('(home)')
        // }
        // AsyncStorage.removeItem('@user_onboard')
        // AsyncStorage.removeItem('@db_user')
        console.log(dbUser, "userdb at home")

    }, [router, segments, navigationState?.key])

    return <View>{!navigationState?.key ? <Text>LOADING...</Text> : <></>}</View>;

    // return (
    //     <>
    //         {
    //             dbUser === null && userOnboard === null ?
    //                 <Onboarding />
    //                 :
    //                 dbUser === null && userOnboard !== null ?
    //                     <View>
    //                         <SigninSIgnup />
    //                     </View>
    //                     :
    //                     dbUser?.name ?
    //                         <Registration />
    //                         :
    //                         <>
    //                         </>
    //         }
    //     </>
    // )
        // ;
}
