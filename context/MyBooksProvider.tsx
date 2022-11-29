
import React, { createContext, useContext, useEffect, useState } from "react";

type MyBooksContextType = {
    isBookSaved: (book: Book) => boolean;
    onToggleSaved: (book: Book) => void;
    savedBooks: Book[];
};

const MyBooksContext = createContext<MyBooksContextType>({
    isBookSaved: () => false,
    onToggleSaved: () => {},
    savedBooks: [],
});

type Props = {
    children: React.ReactNode;
};

const MyBooksProvider = ({ children }: Props) => {
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);

    const isBookSaved = (book: Book) => {
        return savedBooks.some(
            (savedBook) => JSON.stringify(savedBook) === JSON.stringify(book)
        );
    };

    const onToggleSaved = (book: Book) => {
        if (isBookSaved(book)) {
            setSavedBooks((books) => books.filter((item) => item !== book));
        } else {
            setSavedBooks((books) => [book, ...books]);
        }
    };

    return (
        <MyBooksContext.Provider value={{ isBookSaved, onToggleSaved, savedBooks }}>
            {children}
        </MyBooksContext.Provider>
    );
};

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;
