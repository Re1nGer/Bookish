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
        psychology: false,
        fiction: false,
        mystery: false,
        thriller: false,
        scienceFiction: false,
        fantasy: false,
        romance: false,
        biography: false,
    });

    const [book, setBook] = useState({
        id: '',
        volumeInfo: {
            title: '',
            authors: [],
            description: '',
            pageCount: 0,
            categories: [],
            imageLinks: {
                thumbnail: ''
            }
        }
    });

    return <UserContext.Provider value={{
        verificationCode,
        recoveryEmail,
        setRecoveryEmail,
        setVerificationCode,
        genres,
        setGenres,
        book,
        setBook,
        //TODO: to remove
        user,
        setUser
    }}>
        {children}
    </UserContext.Provider>
}