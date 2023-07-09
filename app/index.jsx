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

    const { dbUser, userOnboard, setDbUser } = useAuthContext()
const router = useRouter()

    useEffect(() => {
     if(router && dbUser?.length > 0  ){
        router.replace('(home)') 
     }
    }, [router])
    
    return (
        <>
            {
                dbUser === null && userOnboard === null ?
                    <Onboarding />
                    :
                    dbUser === null && userOnboard !== null ?
                        <View>
                            <SigninSIgnup />
                        </View>
                        :
                        dbUser?.length === 0 ?
                        <View>
                            <Text>Onboarding flow</Text>
                        </View>
                        :
                        <></>
            }
        </>
    )
        ;
}
