import React from 'react';
import { View } from 'react-native';
import styles from './estilo';
import { Entypo } from '@expo/vector-icons';

export default function BotaoLancamento({ size, color }) {
    return (
        <View style={styles.container}>
            <Entypo name="plus" size={size} color={color}/>
        </View>
    );
}

