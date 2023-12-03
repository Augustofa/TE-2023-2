import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth, db } from '../../firebase/config.js'
import styles from './estilo';

export default function LoginScreen({navigation}) {
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')

    const findUserByCpf = async () => {
        try{
            const snapshot = await db.ref('usuarios').once('value');
            const users = snapshot.val();

            const user = Object.values(users).find((user) => (user.cpf == cpf));

            if(user){
                console.log("Usuário encontrado: " + user.email);
                return user.email;
            }else{
                console.log("Usuário não encontrado");
                return null;
            }
        }catch(error){
            console.error("Erro na busca de usuário" + error);
        }
    }

    const onFooterLinkPress = () => {
        navigation.navigate('Registrar')
    }

    const onLoginPress = async () => {
        const userEmail = await findUserByCpf();
        if(userEmail != null){
            auth
            .signInWithEmailAndPassword(userEmail, password)
            .then((response) => {
                navigation.navigate('Principal');
            })
            .catch(error => {
                alert(error);
            })
        }else{
            alert("Usuário não encontrado!");
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="never">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='CPF'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setCpf(text)}
                    value={cpf}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Senha'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Não possui um Login? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Crie uma conta</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}