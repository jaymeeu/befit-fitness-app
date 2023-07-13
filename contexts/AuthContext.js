import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
    
    const [dbUser, setDbUser] = useState(null)

    const [userOnboard, setuserOnboard] = useState(null)

    const [authUser, setAuthUser] = useState(null)

    const getdbUser = async () => {
        try {
            const value = await AsyncStorage.getItem('@db_user')
            if(value){
                setDbUser(JSON.parse(value) )
            }
            else{
                setDbUser(value)
            }
        } catch (e) {
        }
    }

    const getOnboardState = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_onboard')
            setuserOnboard(value)

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
                setAuthUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext)