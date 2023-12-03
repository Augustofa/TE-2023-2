import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1B7E4C',
        paddingTop: 20
    },
    input: {
        height: 48,
        width: '85%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    labelInput: {
        marginTop: 10,
        marginLeft: 30,
        color: '#FFF'
    },
    buttonSave: {
        backgroundColor: '#EFA106',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonCancel: {
        backgroundColor: '#BD7F05',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonAlter: {
        backgroundColor: '#BD7F05',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonDelete: {
        backgroundColor: '#9E1B06',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    comboBox: {
        height: 48,
        width: '85%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        paddingTop: 15
    }
});

export default styles