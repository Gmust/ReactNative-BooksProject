import {View, StyleSheet, Image, Text} from "react-native";

type BookItemProps = {
    book: Book
}

export const BookItem = ({book}: BookItemProps) => {

    return (
        <View style={styles.bookContainer}>
            <Image style={styles.image} source={{uri: book.image}}/>
            <View style={styles.bookContentContainer}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text>by {book.authors?.join(", ")}</Text>
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
});

