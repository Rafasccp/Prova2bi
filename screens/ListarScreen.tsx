import { useState } from 'react';
import * as SQLite from 'expo-sqlite';
import _contato from '../assets/types/contato';
import Contato from '../components/Contato';
import recarregar from './AdicionarScreen'
import { ScrollView, View } from 'react-native';

const db = SQLite.openDatabaseSync("to-do.sqlist");

export default function ListarScreen() {

    const [contatos, setContatos] = useState<_contato[]>([]);
    
    const renderContatos = () => {
        let contato = contatos.map(t => <Contato dados={t} db={db} recarregar={recarregar} key={t.id}/>);
        return contato;
    }

    return (
        <View>
            <ScrollView>
                {renderContatos()}
            </ScrollView>
        </View>
    )
}