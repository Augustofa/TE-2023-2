import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase, auth } from '../../firebase/config.js'
import styles from './estilo'

export default function HomeScreen({navigation}) {
    const onRegisterPress = () => {
        navigation.navigate('Registrar')
    }

    const onLoginPress = () => {
        navigation.navigate('Login')
    }

    const onEntriesPress = () => {
        navigation.navigate('Lancamento')
    }

    const onViewEntriesPress = () => {
        navigation.navigate('VerLancamentos')
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps='never'>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/transaction-64.png')}
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
                <View>
                    <TouchableOpacity
                        style={styles.buttonEntries}
                        onPress={() => onEntriesPress()}>
                        <Text style={styles.buttonTitle}>Novo Lançamento (botão temporário)</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.buttonEntries}
                        onPress={() => onViewEntriesPress()}>
                        <Text style={styles.buttonTitle}>Lançamentos (botão temporário)</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>

    )
}
