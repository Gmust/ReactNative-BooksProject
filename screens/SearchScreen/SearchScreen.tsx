import * as React from "react";
import {ActivityIndicator, Alert, Button, FlatList, Pressable, StyleSheet, TextInput} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from '../../components/Themed';
import {useLazyQuery} from "@apollo/client";
import {BookItem} from "../../components/bookItem/BookItem";
import {FontAwesome} from "@expo/vector-icons";
import {useState} from "react";
import {searchQuery} from "./queries";
import {parseBookInfo} from "../../services/bookService";
import {styles} from "./styles";
import {BookProvider} from "../../Book";

export default function SearchScreen() {

    const [search, setSearch] = useState("");
    const [provider, setProvider] = useState<BookProvider>("googleBooksSearch");
    const [searchBooksQuery, {data, loading, error}] = useLazyQuery(searchQuery)


    return (
        <SafeAreaView edges={["top"]} style={styles.container}>
            <View style={styles.header}>
                <TextInput value={search} placeholder='Search...' style={styles.input}
                           onChangeText={setSearch}
                />
                <Pressable style={styles.searchBtn} onPress={() => searchBooksQuery({variables: {q: search}})}>
                    <Text style={styles.searchText}>Search</Text>
                    <FontAwesome
                        name="search"
                        size={16}
                        style={{color: '#0277bd', marginLeft: 5}}
                    />
                </Pressable>
            </View>

            <View style={styles.tabs}>
                <Text style={provider === 'googleBooksSearch' ? styles.selectedTab : {}}
                      onPress={() => setProvider('googleBooksSearch')}>
                    Google books
                </Text>
                <Text style={provider === 'openLibrarySearch' ? styles.selectedTab : {}}
                      onPress={() => setProvider('openLibrarySearch')}>
                    Open Library
                </Text>
            </View>

            {loading && <ActivityIndicator size="large"/>}
            {error && (
                <>
                    <Text>Error fetching books</Text>
                    <Text>{error.message}</Text>
                </>
            )}
            <FlatList data={
                (provider === 'googleBooksSearch' ?
                    data?.googleBooksSearch?.items
                    : data?.openLibrarySearch?.docs) || []
            }
                      renderItem={({item}) =>
                          <BookItem book={parseBookInfo(item, provider)}/>}
                      showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

