import {FlatList, StyleSheet, Text} from 'react-native';
import {View} from '../components/Themed';
import {useMyBooks} from "../context/MyBooksProvider";
import {BookItem} from "../components/bookItem/BookItem";
import {Separator} from "../assets/Separator/Separator";

export default function SavedBooksScreen() {

    const {savedBooks, readBooks} = useMyBooks();

    return (
        <View style={styles.container}>
            <FlatList data={savedBooks} renderItem={({item}) => <BookItem book={item}/>}/>
            <Separator/>
            <Text>Already Read</Text>
            <FlatList data={readBooks} renderItem={({item}) => <BookItem book={item} type={'readBooks'}/>}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});
