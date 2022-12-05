import React, {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {Book} from "../Book";

type MyBooksContextType = {
    isBookSaved: (book: Book) => boolean;
    isBookRead: (book: Book) => boolean;
    onToggleRead: (book: Book) => void;
    onToggleSaved: (book: Book) => void;
    truncateDescription: (text: string) => string;
    deleteAlert: (book: Book, action: any, message: string) => void;
    savedBooks: Book[];
    readBooks: Book[];
};

const MyBooksContext = createContext<MyBooksContextType>({
    isBookSaved: () => false,
    isBookRead: () => false,
    onToggleSaved: () => {
    },
    onToggleRead: () => {
    },
    truncateDescription: () => '',
    deleteAlert: () => {
    },
    savedBooks: [],
    readBooks: []
});

type Props = {
    children: React.ReactNode;
};

const MyBooksProvider = ({children}: Props) => {
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);
    const [readBooks, setReadBooks] = useState<Book[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        loadData()
    }, []);

    useEffect(() => {
        if (loaded) {
            persistData()
        }
    }, [savedBooks, readBooks]);


    const truncateDescription = (text: string) => {
        const length = text.length;
        if (length < 180) {
            return text;
        } else {
            return text.slice(0, 180) + '...'
        }
    }

    const deleteAlert = (book: Book, action: (book: Book) => void, message: string) => {
        Alert.alert(
            "Confirm action",
            message,
            [
                {
                    text: "Delete",
                    onPress: () => action(book),
                    style: "default"
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
            ],
            {cancelable: true}
        )
    }

    const isBookSaved = (book: Book) => {
        return savedBooks.some(
            (savedBook) => JSON.stringify(savedBook) === JSON.stringify(book)
        );
    };

    const isBookRead = (book: Book) => {
        return readBooks.some(
            (readBooks) => JSON.stringify(readBooks) == JSON.stringify(book)
        )
    }

    const onToggleSaved = (book: Book) => {
        if (isBookSaved(book)) {
            deleteAlert(book, handleToggleSaved, "Delete from My books?");
        } else {
            setSavedBooks((books) => [book, ...books]);
        }
    };

    const onToggleRead = (book: Book) => {
        if (isBookRead(book)) {
            deleteAlert(book, handleToggleRead, "Want to delete from Already Read books?")
        } else if (isBookSaved(book)) {
            handleToggleSaved(book);
            setReadBooks((books) => [book, ...books]);
        } else {
            setReadBooks((books) => [book, ...books]);
        }
    }

    const handleToggleSaved = (book: Book) => setSavedBooks((books) => books.filter((item) => item !== book))


    const handleToggleRead = (book: Book) => {
        setReadBooks((books) => books.filter((item) => item !== book))
    }


    const persistData = async () => {
        await AsyncStorage.setItem("booksData", JSON.stringify(savedBooks));
        await AsyncStorage.setItem("readBooks", JSON.stringify(readBooks));
    }

    const loadData = async () => {
        const dataString = await AsyncStorage.getItem("booksData");
        const readBooks = await AsyncStorage.getItem("readBooks");
        if (dataString) {
            const items = JSON.parse(dataString);
            setSavedBooks(items);
        }
        if (readBooks) {
            const items = JSON.parse(readBooks);
            setReadBooks(items)
        }
        setLoaded(true)
    }

    return (
        <MyBooksContext.Provider value={{
            isBookSaved,
            onToggleSaved,
            savedBooks,
            readBooks,
            truncateDescription,
            deleteAlert,
            onToggleRead,
            isBookRead
        }}>
            {children}
        </MyBooksContext.Provider>
    );
};

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;
