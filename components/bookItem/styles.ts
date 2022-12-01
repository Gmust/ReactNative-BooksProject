import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    bookContainer: {
        flex: 1,
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
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: "500"
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
    },
    description: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        backgroundColor: "white"
    },
    footer:{
        flex:1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

});

