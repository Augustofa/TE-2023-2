import { db } from "../../firebase/config.js";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, Text, TouchableOpacity, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInputMask } from "react-native-masked-text";
import styles from "./estilo";
import { ModalPicker } from "./Modal/ModalPicker";

export default function CadastroLancamentos({navigation}) {
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setchooseTipo] = useState("Selecione um tipo ...");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };
  const setTipo = (option) => {
    setchooseTipo(option);
  };

  const handleCadastro = () => {
    db.ref("lancamentos") // Especifica o nó onde os dados serão salvos
      .push({
        data: data,
        valor: valor,
        tipo: tipo,
        descricao: descricao,
      })
      .then(() => {
        console.log(
          "Lançamento cadastrado no Firebase:",
          data,
          valor,
          tipo,
          descricao
        );
        alert("Lançamento cadastrado com sucesso");
        navigation.navigate('VerLancamentos');
      })
      .catch((error) => {
        console.error("Erro ao cadastrar lançamento:", error);
        alert("Erro ao cadastrar lançamento!");
      });
  };

  const onSavePress = () => {
    handleCadastro();
  };

  const onCancelPress = () => {
    navigation.navigate('Principal');
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="never"
      >
        <Text style={styles.labelInput}>Data</Text>
        <TextInputMask
          style={styles.input}
          type={"datetime"}
          options={{
            format: "DD/MM/YYYY",
          }}
          keyboardType="numeric"
          placeholder="DD/MM/YYYY"
          value={data}
          onChangeText={setData}
        />
        <Text style={styles.labelInput}>Valor</Text>
        <TextInputMask
          style={styles.input}
          type="money"
          options={{
            precision: 2,
            separator: ",",
            delimiter: ".",
            unit: "R$",
          }}
          keyboardType="numeric"
          placeholder="Valor"
          value={valor}
          onChangeText={setValor}
        />
        <Text style={styles.labelInput}>Tipo</Text>
        <TouchableOpacity onPress={() => changeModalVisibility(true)}>
          <View>
            <Text style={styles.comboBox}>{tipo}</Text>
          </View>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType={"fade"}
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}
        >
          <ModalPicker
            changeModalVisibility={changeModalVisibility}
            setTipo={setTipo}
          />
        </Modal>
        <Text style={styles.labelInput}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TouchableOpacity style={styles.button} onPress={onSavePress}>
          <Text style={styles.buttonTitle}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCancelPress}>
          <Text style={styles.buttonTitle}>Cancelar</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
