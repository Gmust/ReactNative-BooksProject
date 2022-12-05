import {View, Image, Text, Pressable, Button} from "react-native";
import {styles} from "./styles";
import {useState} from "react";
import {BookFooter} from "./BookFooter";
import {Book} from "../../Book";
import {BookHeader} from "./BookHeader";
import {BookActionsPopUp} from "./popUp/BookActionsPopUp";
import {useMyBooks} from "../../context/MyBooksProvider";


type BookItemProps = {
    book: Book
    type?: string
}

export const BookItem = ({book, type}: BookItemProps) => {

    const [showDesc, setShowDesc] = useState<boolean>(false)
    const {onToggleRead} = useMyBooks()

    return (
        <View style={styles.bookContainer}>
            <Image style={styles.image} source={{uri: book.image}}/>
            <View style={styles.bookContentContainer}>
                <BookHeader showDesc={showDesc} setShowDesc={setShowDesc} book={book}/>
                {type === 'readBooks'
                    ? <Button onPress={() => onToggleRead(book)} title={"Delete from already read"} color="red"/>
                    : <BookFooter showDesc={showDesc} setShowDesc={setShowDesc} book={book}/>}
            </View>
            <BookActionsPopUp image={book.image} title={book.title} authors={book.authors} isbn={book.isbn}/>
        </View>
    )
}


