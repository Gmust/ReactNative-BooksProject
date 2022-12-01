import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles} from "./styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useMyBooks} from "../../context/MyBooksProvider";

type DescProps = {
    description: string | undefined,
    setShowDesc: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShowDescription = ({description = '0', setShowDesc}: DescProps) => {

    const [isFullText, setIsFullText] = useState<boolean>(false)
    const {truncateDescription} = useMyBooks();

    const fullDesc = description
    const desc = truncateDescription(description);


    return (
        <Pressable style={styles.description} onPress={() => setShowDesc(false)}>
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>
                    {isFullText? fullDesc : desc}
                </Text>
                <Text>
                    {
                        !isFullText && desc.length >180 ?
                            <MaterialCommunityIcons onPress={()=>setIsFullText(!isFullText)} name="page-next-outline" size={16} color="green"/>
                            :  null
                    }
                    {
                        isFullText? <MaterialCommunityIcons name='close-circle' size={20} color="red"/> : null
                    }
                </Text>
            </View>

        </Pressable>
    );
};

