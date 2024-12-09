import { createContext, useState } from "react"

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ name: '', id: '' });

    const [recoveryEmail, setRecoveryEmail] = useState('');

    const [verificationCode, setVerificationCode] = useState('');

    const quote = {
        id: 0,
        text: '',
        book: ''
    };

    const [note, setNote] = useState({
        collections: [],
        groups: [],
        quote: null,
        text: ''
    });

    const [notes, setNotes] = useState([]);


    const [onboarding, setOnboarding] = useState({
        commitToGrowth: { 
            7: false,
            14: false,
            30: false,
            50: false,
        },
        minutesPerDay: {
            20: false,
            30: false,
            45: false,
            1: false,
        },
        bookPerYear: 13,
        areas: [],
        people: [],
        books: [],
        reasons: []
    });

    const [genres, setGenres] = useState({});

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
        onboarding,
        setOnboarding,
        note,
        setNote,
        //TODO: to remove
        user,
        setUser
    }}>
        {children}
    </UserContext.Provider>
}