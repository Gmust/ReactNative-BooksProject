import {View, StyleSheet, Image, Text, Pressable} from "react-native";
import {useMyBooks} from "../context/MyBooksProvider";
import Colors from "../constants/Colors";

type BookItemProps = {
    book: Book
}

export const BookItem = ({book}: BookItemProps) => {

    const {isBookSaved, onToggleSaved} = useMyBooks();
    const saved = isBookSaved(book)


    return (
        <View style={styles.bookContainer}>
            <Image style={styles.image} source={{uri: book.image}}/>
            <View style={styles.bookContentContainer}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text>by {book.authors?.join(", ")}</Text>

                <Pressable
                    style={[styles.toggleBtn, saved ? {backgroundColor: "lightgray"} : {}]}
                    onPress={() => onToggleSaved(book)}
                >
                    <Text style={styles.toggleBtnText}>
                        {saved ? "Remove" : "Want to Read"}
                    </Text>
                </Pressable>

            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    bookContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    image: {
        flex: 1,
        aspectRatio: 2 / 3,
        marginRight: 10,
    },
    bookContentContainer: {
        flex: 4,
        borderColor: "lightgray",
        borderBottomWidth: 0.5,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    toggleBtn: {
        backgroundColor: Colors.light.tint,
        alignSelf: "flex-start",
        marginTop: "auto",
        marginVertical: 10,
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 6
    },
    toggleBtnText: {
        color: "white",
        fontWeight: "600"
    }
});

