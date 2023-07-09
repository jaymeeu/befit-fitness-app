import { Pressable, Text } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';
import Onboarding from '../../components/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from '../../components/Themed';

export default function Page() {

    const { dbUser, userOnboard, setuserOnboard } = useAuthContext()

    return (
        <>
            {
                dbUser === null && userOnboard === null ?
                    <Onboarding />
                    :
                    dbUser === null ?
                        <View>

                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <View><Text>Home page</Text></View>
                            <Pressable
                                style={{ marginTop: "auto" }}
                                onPress={async () => {
                                    await AsyncStorage.removeItem('@user_onboard');
                                    setuserOnboard('onboarded')

                                }}>
                                <Text>Clear storage s</Text>
                            </Pressable>
                        </View>
            }
        </>
    )
        ;
}
