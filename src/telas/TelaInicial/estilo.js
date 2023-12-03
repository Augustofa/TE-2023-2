import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#25C573'
    },
    logo: {
        height: 500,
        width: 500,
        alignSelf: 'center'
    },
    buttonRegister: {
        backgroundColor: '#B76E04',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLogin: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 10,
        height: 48,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default styles