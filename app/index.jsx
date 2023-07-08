import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import Onboarding from '../components/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {

    const { userToken, userOnboard, setuserOnboard } = useAuthContext()

    return (
        <>
            {
                userToken === null && userOnboard === null ?
                    <Onboarding />
                    :
            //         <Pressable onPress={async() =>{
            //             await AsyncStorage.removeItem('@user_onboard');
            //   setuserOnboard('onboarded')
            //         }}>
                    <Text>Hello</Text>

                    // </Pressable>
            }
        </>
    )
        ;
}
