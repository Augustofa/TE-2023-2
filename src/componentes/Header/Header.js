import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, Alert  } from 'react-native';
import { auth } from '../../firebase/config.js';
import { Feather } from '@expo/vector-icons';
import styles from './estilo';

export default function Header() {
    const [user, setUser] = useState(null)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

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
        auth.onAuthStateChanged(function(user){
            setUser(user)
        })
    });

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                { user ? (
                    <Text style={styles.userName}>Olá, { user.email.split('@')[0] }!</Text>

                ) : (
                    <Text style={styles.userName}>Usuário não logado</Text>
                )}

                <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
                    <Feather name="user" size={27} color="#FFF" />
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
                </TouchableOpacity>
            </View>
        </View>
    );
}