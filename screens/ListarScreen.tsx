import { useCallback, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import _contato from '../types/contato';
import Contato from '../components/Contato';
import { ScrollView, View, StyleSheet, Text, TextInput } from 'react-native';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabaseSync("to-do.sqlist");

export default function ListarScreen({navigation} : any) {

    const [contatos, setContatos] = useState<_contato[]>([]);
    const [busca, setBusca] = useState('');

    useFocusEffect(
        useCallback(() => {
        recarregar();
        }, [])
    );

    useEffect(() => {
        recarregar();
    }, []);
    
    const renderContatos = () => {
        const filtrados = contatos.filter(c =>
            c.nome.toLowerCase().includes(busca.toLowerCase()) ||
            c.telefone.includes(busca)
        );

        return filtrados.map(t => (
        <Contato
            dados={t}
            db={db}
            recarregar={recarregar}
            navigation={navigation}
            key={t.id}
        />
        ));
    };

    const recarregar = async () => {
        let temp: _contato[] = await db.getAllAsync("SELECT * FROM contatos");
        setContatos(temp);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Listar Contato</Text>
            <TextInput style={styles.input} placeholder="Buscar por nome ou telefone" value={busca} onChangeText={setBusca}/>
            <ScrollView>
                {renderContatos()}
            </ScrollView>
        </View>
    )
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
    }
})