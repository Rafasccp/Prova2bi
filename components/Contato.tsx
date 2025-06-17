import { View, Text, Button, StyleSheet, Linking, TouchableOpacity, Alert } from "react-native"
import _contato from "../types/contato"
import { SQLiteDatabase } from "expo-sqlite"
import React from "react"


type _propsContato = {
    dados: _contato,
    db: SQLiteDatabase,
    recarregar: any,
    navigation: any
}

export default function Contato(props: _propsContato){

    const excluir = async () => {
        await props.db.runAsync("DELETE FROM contatos WHERE id = ?", props.dados.id);
        await props.recarregar();
        Alert.alert("Sucesso", "Contato excluido com sucesso.");
    }

    const editar = async () => {
        props.navigation.navigate("Alterar", { contato_id: props.dados.id });
    }

    const ligar = async () => {
        Linking.openURL(`tel:${props.dados.telefone}`)
    }

    return <View>
        <View style={styles.contato}>
            <Text style={styles.nome}>Nome: {props.dados.nome}</Text>
            <Text style={styles.telefone}>Telefone: {props.dados.telefone}</Text>

            <TouchableOpacity style={styles.botaoExcluir} onPress={excluir}>
                <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoEditar} onPress={editar}>
                <Text style={styles.textoBotao}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoLigar} onPress={ligar}>
                <Text style={styles.textoBotao}>Ligar</Text>
            </TouchableOpacity>
        </View> 
    </View>
}
const styles = StyleSheet.create({
    contato: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginVertical: 10,
        marginHorizontal: 10,
        shadowColor: '#787878',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, 
        borderLeftWidth: 3,
        borderLeftColor: '#b0b0b0',
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    telefone: {
        fontSize: 16,
        marginBottom: 12,
    },
    botaoExcluir: {
        backgroundColor: '#d63031', // vermelho
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 30,
    },
    botaoEditar: {
        backgroundColor: '#fdcb6e', // amarelo
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 30,
    },
    botaoLigar: {
        backgroundColor: '#00b894', // verde
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 30,
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})  