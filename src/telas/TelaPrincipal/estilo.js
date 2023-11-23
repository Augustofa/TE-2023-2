import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    userMenu: {
        position: 'absolute',
        top: 10, // Adjust this value to set the distance from the top
        right: 10, // Adjust this value to set the distance from the right
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    logo: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        margin: 30
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonEntries: {
        backgroundColor: 'red',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Modal style
    modalPosition: {
        position: 'absolute',
        top: 105,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderRadius: 10,
        paddingTop: 5,
        padding: 15,
        elevation: 1,
    },
    option: {
        alignItems: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        color: 'gray',
        fontSize: 14,
    }
});

export default styles