import React from 'react';
import { Image, Text, TouchableOpacity, View, Modal, Pressable, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './estilo'

export default function TelaInicial({ navigation }) {
    const onRegisterPress = () => {
        navigation.navigate('Registrar');
    }

    const onLoginPress = () => {
        navigation.navigate('Login');
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

            </KeyboardAwareScrollView>
        </View>
    );
}