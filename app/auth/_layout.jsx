import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='signup' options={{ headerShown: false }} />
            <Stack.Screen name='confirmemail' options={{ headerShown: false }} />
            <Stack.Screen name='forgetpassword' options={{ headerShown: false }} />
            <Stack.Screen name='newpassword' options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout