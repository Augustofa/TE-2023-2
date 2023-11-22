import React, { useRef, useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase, auth, db } from '../../firebase/config'
import emailjs from "@emailjs/browser"
// import { getAuth, createUserWithEmailAndPassword } from "firebase/compat/auth"
import styles from './estilo';

export default function RegistrationScreen({navigation}) {
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordLength, setPasswordLength] = useState('12')

    const [loading, setLoading] = useState(false);

    useEffect(() => emailjs.init("kthqolNvK52RnfZ1k"), []);
  
    useEffect(() => {
        generateRandomPassword();
    }, []);

    async function sendEmail() {
        const serviceId = "service_4y6tkek";
        const templateId = "template_ai2aqgh";
        try {
            setLoading(true);
            await emailjs.send(serviceId, templateId, {
                message: password,
                to_email: email,
            });
            console.log("Email enviado com sucesso");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

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
                sendEmail();

                const uid = response.user.uid
                const dados = {
                    id: uid,
                    email: email,
                    cpf: cpf,
                };

                const usersRef = db.ref('usuarios')
                const newUserKey = usersRef.push().key;

                usersRef.child(newUserKey).set(dados);
                
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
                    onChangeText={(text) => setCpf(text)}
                    value={cpf}
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