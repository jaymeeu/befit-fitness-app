import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext, createContext } from "react";

const UserContext = createContext({});
const UserContextProvider = ({ children }) => {

    const [info, setInfo] = useState({
        gender : '',
        fullname : '',
        age : '',
        weight : '',
        height : '',
    })
    
    const updateState = (field, value)=>{
        setInfo((data)=>({...data, [field] : value}))
    }

    return (
        <UserContext.Provider
            value={{ 
                updateState,
                info
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;

export const useUserContext = () => useContext(UserContext)