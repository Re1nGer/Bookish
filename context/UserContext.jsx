import { createContext, useState } from "react"

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ name: '', id: '' });

    const [recoveryEmail, setRecoveryEmail] = useState('');

    const [verificationCode, setVerificationCode] = useState('');

    const [genres, setGenres] = useState({
        adventures: false,
        business: false,
        contemporary: false,
        crime: false,
        drama: false,
        history: false,
        horror: false,
        nonFiction: false,
        psychology: false
    });

    return <UserContext.Provider value={{
        verificationCode,
        recoveryEmail,
        setRecoveryEmail,
        setVerificationCode,
        genres,
        setGenres,
        //TODO: to remove
        user,
        setUser
    }}>
        {children}
    </UserContext.Provider>
}