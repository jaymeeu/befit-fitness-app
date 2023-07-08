import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import SigninSIgnup from '../components/SigninSIgnup';
import { View } from '../components/Themed';
import { Logout } from '../utils/Logout';
import { SafeAreaView } from 'react-native-safe-area-context';
import Onboarding from '../components/Onboarding';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Page() {

    const { userToken, userOnboard, setuserToken } = useAuthContext()
const router = useRouter()

    useEffect(() => {
     if(router && userToken !== null  ){
        router.replace('(home)') 
     }
    }, [router])
    
    return (
        <>
            {
                userToken === null && userOnboard === null ?
                    <Onboarding />
                    :
                    userToken === null && userOnboard !== null ?
                        <View>
                            <SigninSIgnup />
                        </View>
                        :
                        <></>
            }
        </>
    )
        ;
}
