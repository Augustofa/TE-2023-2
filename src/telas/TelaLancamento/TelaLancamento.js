import { db } from "../../firebase/config.js";
import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInputMask } from "react-native-masked-text";
import styles from "./estilo";
import { ModalPicker } from "./Modal/ModalPicker";

export default function CadastroLancamentos({route, navigation}) {
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setchooseTipo] = useState("Selecione um tipo ...");
  const [isExistente, setIsExistente] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };
  const setTipo = (option) => {
    setchooseTipo(option);
  };

  const { params } = route;

  useEffect(() => {
    if(params !== undefined && params.item !== undefined){
      const item = params.item
      setIsExistente(true)
      setData(item.data)
      setValor(item.valor)
      setDescricao(item.descricao)
      setTipo(item.tipo)
    }
  }, [params]);

  const deleteNode = async (deletedItem) => {
    try {
      const nodeRef = db.ref('lancamentos');
  
      const query = nodeRef
        .orderByChild('data')
        .equalTo(deletedItem.data)

        const snapshot = await query.once('value');
        let deletedNode = undefined;

        snapshot.forEach((childSnapshot) => {
          const node = childSnapshot.val();

          if(node.data === deletedItem.data &&
            node.valor === deletedItem.valor &&
            node.tipo === deletedItem.tipo &&
            node.descricao === deletedItem.descricao
          ){
            deletedNode = childSnapshot.key
          }
        })

      if (deletedNode !== undefined) {
        Alert.alert(
          'Confirmar deleção',
          'Tem certeza que deseja excluir esse registro?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Deletar',
              onPress: async () => {
                snapshot.forEach((childSnapshot) => {
                  const key = childSnapshot.key;
                  nodeRef.child(key).remove();
                });
  
                Alert.alert('Lancamento deletado com sucesso!')
                console.log('Lancamento deletado com sucesso!');
                navigation.navigate('VerLancamentos');
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Erro ao deletar lancamento!', error);
    }
  };

  const modifyNode = async (newItem) => {
    const oldItem = params.item
    try {
      const nodeRef = db.ref('lancamentos');
  
      const query = nodeRef
        .orderByChild('data')
        .equalTo(oldItem.data)

        const snapshot = await query.once('value');
        let oldNode = undefined;

        snapshot.forEach((childSnapshot) => {
          const node = childSnapshot.val();

          if(node.data === oldItem.data &&
            node.valor === oldItem.valor &&
            node.tipo === oldItem.tipo &&
            node.descricao === oldItem.descricao
          ){
            oldNode = childSnapshot.key
          }
        })

      if (oldNode !== undefined) {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          nodeRef.child(key).set(newItem);
        });

        Alert.alert('Lancamento modificado com sucesso!')
        console.log('Lancamento modificado com sucesso!');
        navigation.navigate('VerLancamentos');
      }
    } catch (error) {
      console.error('Erro ao modificar lancamento!', error);
    }
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

  const onModifyPress = () => {
    const novosDados = {
      data: data,
      valor: valor,
      tipo: tipo,
      descricao: descricao,
    }
    modifyNode(novosDados)
  }

  const onDeletePress = () => {
    deleteNode(params.item)
  }

  const onCancelPress = () => {
    navigation.navigate('Home');
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

        
        {isExistente ? (
          <View>
            <TouchableOpacity style={styles.buttonAlter} onPress={onModifyPress}>
              <Text style={styles.buttonTitle}>Alterar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete} onPress={onDeletePress}>
              <Text style={styles.buttonTitle}>Apagar Registro</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.buttonSave} onPress={onSavePress}>
            <Text style={styles.buttonTitle}>Salvar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonCancel} onPress={onCancelPress}>
          <Text style={styles.buttonTitle}>Cancelar</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}