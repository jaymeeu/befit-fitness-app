import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
    
    const [dbUser, setDbUser] = useState(undefined)

    const [userOnboard, setuserOnboard] = useState(undefined)

    const [authUser, setAuthUser] = useState(undefined)

    const getdbUser = async () => {
        try {
            const value = await AsyncStorage.getItem('@db_user')
            setDbUser(value)
            console.log(value,"ghjkjk")
        } catch (e) {
        }
    }

    const getOnboardState = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_onboard')
            setuserOnboard(value)
            console.log(value,"ghjkjkxxx")

        } catch (e) {
        }
    }

    const updateDbUser = async (user) => {
      await AsyncStorage.setItem('@db_user', JSON.stringify(user) );
      setDbUser(user)
  }


    useEffect(() => {
        getdbUser();
        getOnboardState()
    }, [])

    return (
        <AuthContext.Provider
            value={{ 
                dbUser, 
                updateDbUser,
                userOnboard,
                setuserOnboard,
                setDbUser,
                authUser, 
                setAuthUser,
                updateDbUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext)