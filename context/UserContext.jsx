import { createContext, useState } from "react"

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ name: '', id: '' });

    const [recoveryEmail, setRecoveryEmail] = useState('');

    const [verificationCode, setVerificationCode] = useState('');

    return <UserContext.Provider value={{
        verificationCode,
        recoveryEmail,
        setRecoveryEmail,
        setVerificationCode,
        //TODO: to remove
        user,
        setUser
    }}>
        {children}
    </UserContext.Provider>
}