import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase, auth, db } from '../../firebase/config'
// import { getAuth, createUserWithEmailAndPassword } from "firebase/compat/auth"
import styles from './estilo';

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordLength, setPasswordLength] = useState('12')
  
    useEffect(() => {
        generateRandomPassword();
    }, []);

    // Gera senha aleatoria de 12 digitos
    const generateRandomPassword = () => {
        let newPassword = ''; 
        let charset = ('!@#$%^&*' + '0123456789' + 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  
        for (let i = 0; i < parseInt(passwordLength); i++) { 
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length)); 
        } 
  
        setPassword(newPassword); 
    }; 

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        generateRandomPassword();
        auth.
        createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };

                var actionCodeSettings = {
                    url: password,
                    iOS: {
                      bundleId: password
                    },
                    android: {
                      packageName: password,
                      installApp: true,
                      minimumVersion: '12'
                    },
                    handleCodeInApp: true
                };
                auth.sendSignInLinkToEmail(email, actionCodeSettings);
                const usersRef = db.ref()
                // usersRef
                //     .doc(uid)
                //     .set(data)
                //     .then(() => {
                //         navigation.navigate('Principal', {user: data})
                //     })
                //     .catch((error) => {
                //         alert(error)
                //     });
                
                Alert.alert("Conta criada com sucesso!", "Sua senha foi enviada ao email: " + email);
                navigation.navigate('Login');
            })
            .catch((error) => {
                alert(error)
        });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="never">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/transaction-64.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='CPF'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.footerView}>
                    <Text style={styles.passWarning}>Sua senha será gerada e enviada ao seu email</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Criar conta</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Já possui uma conta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Fazer login</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}