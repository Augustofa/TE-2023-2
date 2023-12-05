import React, { useState, useEffect } from 'react'
import { Image, Text, TouchableOpacity, View, Modal, Pressable, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase, auth } from '../../firebase/config.js';
import styles from './estilo'

export default function HomeScreen(props) {
    const [user, setUser] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const navigation = props.navigation;
    const loggedUser = props.loggedUser;

    const handleMenuPress = () => {
        setIsModalVisible(true);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        switch(option){
            case "Alterar senha":
                navigation.navigate('TrocaSenha')
                break;
            case "Sair":
                auth.signOut();
                Alert.alert("", "Logout efetuado")
                break;
                // OPT: estilo na hora de fazer logout
        }
        setIsModalVisible(false);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    }

    useEffect(() => {
        if(loggedUser){
            setUser(loggedUser)
        }

        auth.onAuthStateChanged(function(user){
            setUser(user)
        })
    });

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
        <><View>
            { user ? (
                <TouchableOpacity style={styles.userMenu} onPress={handleMenuPress}>
                    <Text>
                        Logado como: {user ? user.email : 'Usuário não logado'}
                    </Text>
                </TouchableOpacity>
            ) : (
                <></>
            )}
        </View>
        {/* OPT: trocar modal por elemento mais simples */}
        <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
        }}
        >
            <Pressable style={styles.modalBackdrop} onPress={closeModal}>
                <View style={styles.modalPosition}>
                    <View style={styles.modalView}>
                        <Pressable
                        style={styles.option}
                        onPress={() => handleOptionSelect('Alterar senha')}
                        >
                        <Text style={styles.optionText}>Alterar senha</Text>
                        </Pressable>
                        <Pressable
                        style={styles.option}
                        onPress={() => handleOptionSelect('Sair')}
                        >
                        <Text style={styles.optionText}>Sair</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal>
        <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps='never'>

                    <Image
                        style={styles.logo}
                        source={require('../../../assets/transaction-64.png')} />
                    {user ? (
                        <></>
                    ) : (
                        <><TouchableOpacity
                            style={styles.button}
                            onPress={() => onRegisterPress()}>
                            <Text style={styles.buttonTitle}>Criar minha conta</Text>
                        </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => onLoginPress()}>
                                <Text style={styles.buttonTitle}>Já tenho conta</Text>
                            </TouchableOpacity></>
                    )}
                    <View>
                        <TouchableOpacity
                            style={styles.buttonEntries}
                            onPress={() => onEntriesPress()}>
                            <Text style={styles.buttonTitle}>Novo Lançamento</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonEntries}
                            onPress={() => onViewEntriesPress()}>
                            <Text style={styles.buttonTitle}>Ver Lançamentos</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View></>

    )
}
