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

    const { dbUser,setAuthUser, userOnboard, loaded } = useAuthContext()
    const router = useRouter()


    const segments = useSegments();
  const navigationState = useRootNavigationState();

    useEffect(() => {

        if (!navigationState?.key) return;
        if(!loaded) return ;

        if(dbUser === null && userOnboard === null){
            router.replace('/boarding');
        }
        else if( userOnboard !== null) {
            Auth.currentAuthenticatedUser()
            .then((currentUser)=>{
                setAuthUser(currentUser)
                if(currentUser?.attributes?.sub){
                    if(dbUser === null){
                        router.replace("/registration");
                    }
                    else{
                        router.replace("/home");
                    }
                }
                else{
                    router.replace("/auth");
                }
            })
            .catch(()=>{
                router.replace("/auth");
            })
        }

        // AsyncStorage.removeItem('@user_onboard')
        // AsyncStorage.removeItem('@db_user')
        // Auth.signOut()

    }, [router, segments, navigationState?.key, loaded])

    return <View>
        {!navigationState?.key || !loaded ? <Text>LOADING...</Text> : <></>}</View>;

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
