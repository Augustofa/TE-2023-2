import React from 'react'
import { Text, View } from 'react-native'
import styles from './estilo';
import TelaVerLancamentos from '../TelaVerLancamentos/TelaVerLancamentos';
import Header from '../../componentes/Header/Header';

export default function HomeScreen({ navigation }) {
    return (
        <>
        <View style={styles.container}>
            <Header/>

            <View style={styles.content}>
                <Text style={styles.title}>Últimos lançamentos</Text>
                <TelaVerLancamentos/>
            </View>
        </View>
        </>
    );
}
