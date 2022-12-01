import React, {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

type MyBooksContextType = {
    isBookSaved: (book: Book) => boolean;
    onToggleSaved: (book: Book) => void;
    truncateDescription: (text: string) => string;
    deleteAlert: (book:Book) => void;
    savedBooks: Book[];
};

const MyBooksContext = createContext<MyBooksContextType>({
    isBookSaved: () => false,
    onToggleSaved: () => {
    },
    truncateDescription: () => '',
    deleteAlert: () => {
    },
    savedBooks: [],
});

type Props = {
    children: React.ReactNode;
};

const MyBooksProvider = ({children}: Props) => {
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        loadData()
    }, []);

    useEffect(() => {
        if (loaded) {
            persistData()
        }
    }, [savedBooks]);


    const truncateDescription = (text: string) => {
        const length = text.length;
        if (length < 180) {
            return text;
        } else {
            return text.slice(0, 180) + '...'
        }
    }

    const deleteAlert = (book:Book) => {
        Alert.alert(
            "Confirm action",
            "Delete from my books?",
            [
                {
                    text: "Delete",
                    onPress: () => setSavedBooks((books) => books.filter((item) => item !== book)),
                    style: "default"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        )
    }

    const isBookSaved = (book: Book) => {
        return savedBooks.some(
            (savedBook) => JSON.stringify(savedBook) === JSON.stringify(book)
        );
    };

    const onToggleSaved = (book: Book) => {
        if (isBookSaved(book)) {
            deleteAlert(book);
        } else {
            setSavedBooks((books) => [book, ...books]);
        }
    };

    const persistData = async () => {
        await AsyncStorage.setItem("booksData", JSON.stringify(savedBooks));
    }

    const loadData = async () => {
        const dataString = await AsyncStorage.getItem("booksData");
        if (dataString) {
            const items = JSON.parse(dataString);
            setSavedBooks(items);
        }
        setLoaded(true)
    }

    return (
        <MyBooksContext.Provider value={{isBookSaved, onToggleSaved, savedBooks, truncateDescription, deleteAlert}}>
            {children}
        </MyBooksContext.Provider>
    );
};

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;
