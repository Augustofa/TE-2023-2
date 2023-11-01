import { db } from "../../firebase/config.js";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInputMask } from "react-native-masked-text";
import styles from "./estilo.js";

export default function CadastroLancamentos() {
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setchooseTipo] = useState("Selecione um tipo ...");
  const [dados, setDados] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const setTipo = (option) => {
    setchooseTipo(option);
  };

  useEffect(() => {
    const data = db.ref("lancamentos");
    data.on("value", (datasnap) => {
      let data = [];
      datasnap.forEach((childsnap) => {
        let val = childsnap.val();
        val["$key"] = childsnap.key;
        data.push(val);
      });
      setDados(data);
    });
  }, []);

  const onSavePress = () => {
    handleCadastro();
  };
  
  return (
    <FlatList
      data={dados}
      renderItem={({item}) => (
        
        <View>
            <View style={styles.listItem}>
              <Text>Data: {item.data}</Text>
              <Text>Descrição: {item.descricao}</Text>
              <Text>Tipo: {item.tipo}</Text>
              <Text>Valor: {item.valor}</Text>
            </View>
        </View>
      )}
    />
  );
}
