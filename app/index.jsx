import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import Onboarding from '../components/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SigninSIgnup from '../components/SigninSIgnup';
import { View } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Page() {

    const { userToken, userOnboard, setuserOnboard } = useAuthContext()

    return (
        <>
            {
                userToken === null && userOnboard === null ?
                    <Onboarding />
                    :
                    userToken === null ?
                    <View>
                        <SigninSIgnup/>
                    </View>
                    :
                    <View style={{flex: 1}}>
                        <View><Text>Home page</Text></View>
                        <Pressable 
                        style={{marginTop : "auto"}}
                        onPress={async () => {
                            await AsyncStorage.removeItem('@user_onboard');
                            setuserOnboard('onboarded')

                        }}>
                            <Text>Clear storage</Text>
                        </Pressable>
                    </View>
            }
        </>
    )
        ;
}
