import React, { useState,  useContext, createContext } from "react";

const UserContext = createContext({});
const UserContextProvider = ({ children }) => {

    const [info, setInfo] = useState({
        gender : '',
        fullname : '',
        age : '',
        weight : '',
        height : '',
    })
    
    const [isFeet, setisFeet] = useState(true)
    const [isPound, setisPound] = useState(true)

    const updateState = (field, value)=>{
        setInfo((data)=>({...data, [field] : value}))
    }

    return (
        <UserContext.Provider
            value={{ 
                updateState,
                info,
                isFeet, setisFeet,
                isPound, setisPound
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;

export const useUserContext = () => useContext(UserContext)