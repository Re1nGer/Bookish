import { createContext, useState } from "react"

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ name: '', id: '' });

    const [recoveryEmail, setRecoveryEmail] = useState('');

    return <UserContext.Provider value={{
        recoveryEmail,
        setRecoveryEmail,
        //TODO: to remove
        user,
        setUser
    }}>
        {children}
    </UserContext.Provider>
}