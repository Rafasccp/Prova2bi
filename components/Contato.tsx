import { View, Text, Button, StyleSheet } from "react-native"
import _contato from "../assets/types/contato"
import { SQLiteDatabase } from "expo-sqlite"


type _propsContato = {
    dados: _contato,
    db: SQLiteDatabase,
    recarregar: any
}

export default function Contato(props: _propsContato){

    const excluir = async () => {
        await props.db.runAsync("DELETE FROM contatos WHERE id = ?", props.dados.id);
        await props.recarregar();
    }

    return <View>
        <View style={styles.contato}>
            <Text style={styles.nome}>Nome: {props.dados.nome}</Text>
            <Text style={styles.telefone}>Telefone: {props.dados.telefone}</Text>
            <Button title="Excluir" color={'red'} onPress={excluir}/>
        </View> 
    </View>
}
const styles = StyleSheet.create({
    contato: {
        borderWidth: 2,
        borderRadius: 5,
        margin: 5,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 5,
        textAlign: 'center'
    },
    telefone: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center'
    }
})  