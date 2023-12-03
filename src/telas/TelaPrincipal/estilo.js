import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: '#1FA15F'
    },
    content: {
        backgroundColor: '#FFF',
        borderRadius: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 14,
        marginRight: 14,
        marginTop: 24,
        marginBottom: 24
    },
    userMenu: {
        position: 'absolute',
        top: 10, // Adjust this value to set the distance from the top
        right: 10, // Adjust this value to set the distance from the right
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
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