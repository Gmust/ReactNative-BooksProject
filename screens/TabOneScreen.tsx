import {ActivityIndicator, Alert, Button, FlatList, Pressable, StyleSheet, TextInput} from 'react-native';
import {Text, View} from '../components/Themed';
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {BookItem} from "../components/BookItem";
import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {useState} from "react";


const query = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }
    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`


export default function TabOneScreen() {

    const [search, setSearch] = useState("");
    const [provider, setProvider] = useState<'googleBooksSearch' | 'openLibrarySearch'>("googleBooksSearch");
    const [searchBooksQuery, {data, loading, error}] = useLazyQuery(query)

    const parseBookInfo = (item:any): Book => {
        if (provider === 'googleBooksSearch') {
            return {
                image: item.volumeInfo?.imageLinks?.thumbnail,
                title: item.volumeInfo?.title,
                authors: item.volumeInfo?.authors,
                isbn: item.volumeInfo?.industryIdentifiers[0]?.identifier
            }
        } else {
            return {
                image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
                title: item?.title,
                authors: item?.author_name,
                isbn: item.isbn?.[0]
            }
        }
    };

    return (
        <View style={styles.container}>
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
                          <BookItem book={parseBookInfo(item)}/>}
                      showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    header: {
        flexDirection: "row",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 5,
        borderRadius: 10,
        marginVertical: 10
    },
    searchBtn: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#0277bd',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        alignItems: 'center'
    },
    selectedTab: {
        fontWeight: 'bold',
        color: '#0277bd'
    }
});
