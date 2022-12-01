import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
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
