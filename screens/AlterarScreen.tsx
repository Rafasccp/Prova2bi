import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("to-do.sqlist");

export default function AlterarScreen({ navigation, route }) {
  const { contato_id } = route.params;

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const result = await db.getFirstAsync("SELECT * FROM contatos WHERE id = ?", contato_id);
    if (result) {
      setNome(result.nome);
      setTelefone(result.telefone);
    } else {
      Alert.alert("Erro", "Contato não encontrado.");
      navigation.goBack();
    }
  };

  const salvar = async () => {
    if (!nome || !telefone) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    await db.runAsync("UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?", nome, telefone, contato_id);
    Alert.alert("Sucesso", "Contato atualizado com sucesso.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Editar Contato</Text>
        <Text>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome}/>
        <Text>Telefone</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad"/>

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
            <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
            <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f2f6',
        padding: 20,
        paddingTop: 40,
    },
    titulo: {
        fontSize: 32,
        paddingBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#2d3436',
    },
    input: {
        borderWidth: 1,
        borderColor: '#dfe6e9',
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#ffffff',
        marginBottom: 15,
    },
    botaoSalvar: {
        backgroundColor: '#0984e3', 
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    botaoCancelar: {
        backgroundColor: '#636e72', 
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
