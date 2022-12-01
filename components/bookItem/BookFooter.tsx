import React from "react";
import {Pressable, Text, View} from "react-native";
import {styles} from "./styles";
import {ShowDescription} from "./ShowDescription";
import {AntDesign} from "@expo/vector-icons";
import {useMyBooks} from "../../context/MyBooksProvider";
import {BookProps} from "../../Book";




export const BookFooter = ({showDesc, setShowDesc, book}: BookProps) => {

    const {isBookSaved, onToggleSaved} = useMyBooks();
    const saved = isBookSaved(book)


    return (
        <View style={styles.footer}>
            {showDesc ? (<ShowDescription setShowDesc={setShowDesc} description={book?.description}/>)
                :
                (
                    <>
                        <Pressable
                            style={[styles.toggleBtn, saved ? {backgroundColor: "lightgray"} : {}]}
                            onPress={() => onToggleSaved(book)}
                        >
                            <Text style={styles.toggleBtnText}>
                                {saved ? "Remove" : "Want to Read"}
                            </Text>
                        </Pressable>
                        {
                            book?.averageRating
                                ? <Text style={{color: 'black'}}>
                                    {book?.averageRating} / 5 <AntDesign name="star" color="green" size={15}/>
                                </Text>
                                : <Text>Not enough rates</Text>
                        }
                    </>
                )
            }

        </View>
    )


}