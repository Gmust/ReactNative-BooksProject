import React from "react";

type Book = {
    image: string;
    title: string;
    authors: string[];
    isbn: string;
    description?: string;
    averageRating?: number
}

type BookProvider = 'googleBooksSearch' | 'openLibrarySearch'

type BookProps = {
    showDesc: boolean,
    setShowDesc: React.Dispatch<React.SetStateAction<boolean>>,
    book: Book
}