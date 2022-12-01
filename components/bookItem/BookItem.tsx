import {View, Image, Text, Pressable} from "react-native";
import {styles} from "./styles";
import {useState} from "react";
import {BookFooter} from "./BookFooter";
import {Book} from "../../Book";
import {BookHeader} from "./BookHeader";


type BookItemProps = {
    book: Book
}

export const BookItem = ({book}: BookItemProps) => {

    const [showDesc, setShowDesc] = useState<boolean>(false)

    return (
        <>
            <View style={styles.bookContainer}>
                <Image style={styles.image} source={{uri: book.image}}/>
                <View style={styles.bookContentContainer}>
                    <BookHeader showDesc={showDesc} setShowDesc={setShowDesc} book={book}/>
                    <BookFooter showDesc={showDesc} setShowDesc={setShowDesc} book={book}/>
                </View>
            </View>

        </>
    )
}


