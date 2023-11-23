import { db, auth } from "../../firebase/config.js";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
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
      style={styles.list}
      data={dados}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        
        <TouchableOpacity style={styles.container}>
          <Text style={styles.data}>{item.data}</Text>

          <View style={styles.content}>
            <Text style={styles.descricao}>{item.descricao}</Text>
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
