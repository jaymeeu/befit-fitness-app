import React from 'react'
import { Stack } from 'expo-router'
import Colors from '../../constants/Colors'
import { useColorScheme } from 'react-native'

const AuthLayout = () => {
const colorScheme = useColorScheme() 

    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='login' 
            // options={{ headerShown: false }}
                options={{ 
                title : 'Login',
                headerStyle : { backgroundColor: Colors[colorScheme ?? "light"].background }
            }}
                
            />
            <Stack.Screen name='signup' 
                // options={{ headerShown: false }} 
                options={{ 
                    title : 'Registration',
                    headerStyle : { backgroundColor: Colors[colorScheme ?? "light"].background }
                }}
                />
            <Stack.Screen name='confirmemail' options={{ title: 'Confirm your email' }} />
            <Stack.Screen name='forgetpassword' options={{ headerShown: false }} />
            <Stack.Screen name='newpassword' options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout