import { db, auth } from "../../firebase/config.js";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./estilo.js";

export default function VerLancamentos() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    console.log(auth.currentUser.uid)
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
