import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 14,
        marginBottom: 24,
        marginLeft: 24,
        marginRight: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray"
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 2,
        marginBottom: 8
    },
    data: {
        color: "gray",
        fontWeight: "bold"
    },
    descricao: {
        fontWeight: "bold",
        fontSize: 16
    },
    despesa: {
        fontWeight: "bold",
        fontSize: 16,
        color: "red"
    },
    receita: {
        fontWeight: "bold",
        fontSize: 16,
        color: "green"
    }
});

export default styles