import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../../firebase/config.js'
import styles from './estilo'

export default function HomeScreen({navigation}) {
    const onRegisterPress = () => {
        navigation.navigate('Registrar')
    }

    const onLoginPress = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Criar minha conta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Já tenho conta</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}
