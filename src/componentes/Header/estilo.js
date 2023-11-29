import { StyleSheet, StatusBar } from "react-native"

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "blue",
        padding: statusBarHeight,
        flexDirection: "row",
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44
    },
    content: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
    buttonUser: {
        height: 44,
        width: 44,
        backgroundColor: "rgba(255,255,255,0.5)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 44 / 2
    }
});

export default styles