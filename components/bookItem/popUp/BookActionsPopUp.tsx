import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {Text} from "react-native";
import {styles} from "./styles";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Separator} from "../../../assets/Separator/Separator";
import {Book} from "../../../Book";

export const BookActionsPopUp = (book: Book) => {


    return (
        <Menu>
            <MenuTrigger><MaterialCommunityIcons name="dots-vertical" size={24} color="black"/></MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: styles.optionsContainer}}>
                <MenuOption>
                    <Text style={{color: 'green'}}>
                        Already read <MaterialIcons name="done-outline" size={15} color="green"/>
                    </Text>
                </MenuOption>
                <Separator/>
                <MenuOption>
                    <Text style={{color: '#6E7D1B'}}>
                        Reading now <MaterialCommunityIcons name="progress-clock" size={18} color="#6E7D1B"/>
                    </Text>
                </MenuOption>
                <Separator/>
                <MenuOption>
                    <Text style={{color: 'royalblue'}}>
                        Share book <MaterialCommunityIcons name="share-all-outline" size={16} color="royalblue"/>
                    </Text>
                </MenuOption>
                <Separator/>
            </MenuOptions>
        </Menu>
    )

}