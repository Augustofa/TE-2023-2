import React, { useRef, useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase, auth, db } from '../../firebase/config'
import emailjs from "@emailjs/browser"
// import { getAuth, createUserWithEmailAndPassword } from "firebase/compat/auth"
import styles from './estilo';
import firebaseAuth from 'firebase-auth';

export default function ChangePassScreen({navigation}) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onRegisterPress = () => {
        if(newPassword === confirmPassword){
            const emailCred  = firebase.auth.EmailAuthProvider.credential(
                    firebase.auth().currentUser.email, oldPassword);
            
            firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
                .then(() => {
                    firebase.auth().currentUser.updatePassword(newPassword)
                        .then(() => {
                            Alert.alert("", "Mudança de senha efetuada com sucesso!")
                            navigation.navigate('Principal')
                        })
                        .catch(error => {
                            console.log(error);
                            Alert.alert("", "Erro ao alterar senha!: " + error.message)
                        })
                })
                .catch(error => {
                    console.log(error);
                    if(error.code === "auth/wrong-password"){
                        Alert.alert("", "Senha atual inválida")
                    }
                });

            
        }else{
            Alert.alert("","Os campos \"Nova senha\" e \"Confirmar nova senha\" devem ser iguais!")
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="never">
                <TextInput
                    style={styles.input}
                    placeholder='Senha atual'
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    onChangeText={(text) => setOldPassword(text)}
                    value={oldPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nova senha'
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    onChangeText={(text) => setNewPassword(text)}
                    value={newPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirmar a nova senha'
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Alterar Senha</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}