import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import _contato from '../assets/types/contato';
import Contato from '../components/Contato';


const db = SQLite.openDatabaseSync("to-do.sqlist");

export default function AdicionarScreen() {

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
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Adicionar Contato</Text>
      <Text>Nome</Text>
      <TextInput style={styles.input} value={nomeContato} onChangeText={setNomeContato}/>
      <Text>Telefone</Text>
      <TextInput style={styles.input} value={telefoneContato} onChangeText={setTelefoneContato}/>
      <Button title='Adicionar' onPress={adicionar}/>


      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      borderWidth: 3,
      width: 400,
      height: 1136,
      padding: 20,
      borderRadius: 8,
      backgroundColor: '#abfffe',
  },
  titulo:{
    fontSize: 40,
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderRadius: 4,
    color: "black",
    marginVertical: 10,
    height: 35,
    padding: 8,
  }
});
