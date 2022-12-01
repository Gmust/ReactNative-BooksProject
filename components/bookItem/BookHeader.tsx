import {Pressable, Text, View} from "react-native";
import {styles} from "./styles";
import {AntDesign} from "@expo/vector-icons";
import {BookProps} from "../../Book";


export const BookHeader =({book,showDesc,setShowDesc}:BookProps)=>{

    return(
        <Pressable onPress={book.description ? () => {
                setShowDesc(!showDesc)
            }
            : () => {
            }}>
            <View style={styles.titleContainer}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={{marginLeft: 10}}>
                    {book.description ? (showDesc ? <AntDesign name="minuscircleo" size={14} color="red"/>
                            : <AntDesign name="pluscircleo" size={14} color="green"/>)
                        : ''}
                </Text>
            </View>

            <Text>by {book.authors?.join(", ")}</Text>
        </Pressable>
    )

}