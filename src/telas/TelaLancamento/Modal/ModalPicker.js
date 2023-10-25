import React from "react"
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import styles from './estilo'

const OPTIONS = ['Despesa', 'Receita']
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ModalPicker = (props) => {
    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setTipo(option);
    }

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 60, height: HEIGHT/8}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

export {ModalPicker}