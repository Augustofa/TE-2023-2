import { db, auth } from "../../firebase/config.js";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./estilo.js";

export default function VerLancamentos({ navigation, limit }) {
  const [dados, setDados] = useState([]);

  const detalhesLancamento = (item) => {
    navigation.navigate('Lancamento', { item });
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
      setDados(data.slice(-limit));
    });
  }, []);
  
  return (
    <FlatList
      style={styles.list}
      data={dados}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.container} onPress={() => detalhesLancamento(item)}>
          <Text style={styles.data}>{item.data}</Text>

          <View style={styles.content}>
            <Text style={styles.descricao}>
              {typeof item.descricao === 'string' ? item.descricao.substring(0, 25) : ''}
            </Text>
            <Text 
              style={item.tipo === "Despesa" ? styles.despesa : styles.receita}
            >
              {item.tipo === "Despesa" ? `-${item.valor}` : `${item.valor}`}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}