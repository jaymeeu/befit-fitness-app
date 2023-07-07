import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
    const [userToken, setuserToken] = useState(undefined)
    const [userOnboard, setuserOnboard] = useState(undefined)

    const getUserToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_token')
            setuserToken(value)
            console.log(value,"ghjkjk")
        } catch (e) {
        }
    }

    const getOnboardState = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_onboard')
            setuserOnboard(value)
            console.log(value,"ghjkjk")

        } catch (e) {
        }
    }

    useEffect(() => {
        getUserToken();
        getOnboardState()
    }, [])

    return (
        <AuthContext.Provider
            value={{ 
                userToken, 
                setuserToken, 
                userOnboard,
                setuserOnboard
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext)