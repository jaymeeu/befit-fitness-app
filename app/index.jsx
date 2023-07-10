import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import SigninSIgnup from '../components/SigninSIgnup';
import { View } from '../components/Themed';
import Onboarding from '../components/Onboarding';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Registration from '../components/CompleteRegistration';

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
                          console.log(dbUser, "dbUser")  
                        }
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
                            <Registration/>
                        :
                        <>
                        
                        </>
            }
        </>
    )
        ;
}
