import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button, Alert, ScrollView, TouchableOpacity} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import _contato from '../types/contato';
import React from 'react';
import Contato from '../components/Contato';

const db = SQLite.openDatabaseSync("to-do.sqlist");

export default function AdicionarScreen({navigation}: any) {


  const [nomeContato,setNomeContato] = useState<string>('');
  const [telefoneContato,setTelefoneContato] = useState<string>('');
  const [contatos, setContatos] = useState<_contato[]>([]);

   useEffect(() => {
    db.execSync(`CREATE TABLE IF NOT EXISTS contatos(
                 id INTEGER PRIMARY KEY NOT NULL,
                 nome VARCHAR(255),
                 telefone VARCHAR(255)
                )`);

    recarregar();
  }, []);

  const recarregar = async () => {
    let temp: _contato[] = await db.getAllAsync("SELECT * FROM contatos");
    setContatos(temp);
  }

  const adicionar = async () => {
    if(nomeContato == ""){
      Alert.alert("Insira um nome");
      return;
    }
    if(telefoneContato == ""){
      Alert.alert("Insira um telefone");
      return;
    }

    await db.runAsync("INSERT INTO contatos (nome, telefone) VALUES (?, ?)", nomeContato, telefoneContato);

    setNomeContato('');
    setTelefoneContato('');
    await recarregar();
    Alert.alert("Sucesso", "Contato adicionado com sucesso.");
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Adicionar Contato</Text>
      <Text>Nome</Text>
      <TextInput style={styles.input} value={nomeContato} onChangeText={setNomeContato}/>
      <Text>Telefone</Text>
      <TextInput style={styles.input} value={telefoneContato} onChangeText={setTelefoneContato}/>

      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionar}>
        <Text style={styles.textoBotao}>Adicionar</Text></TouchableOpacity>
        
      <TouchableOpacity style={styles.botaoListar} onPress={() => navigation.navigate('Listar')}>
        <Text style={styles.textoBotao}>Ir para Listar Contatos</Text>
      </TouchableOpacity>

      <StatusBar style="auto"/>
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
  titulo:{
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
  botaoAdicionar: {
    backgroundColor: '#00b894', 
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoListar: {
    backgroundColor: '#0984e3', 
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
},
  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
