import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdicionarScreen from './screens/AdicionarScreen';
import ListarScreen from './screens/ListarScreen';
import AlterarScreen from './screens/AlterarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Adicionar">
        <Stack.Screen name="Adicionar" component={AdicionarScreen} />
        <Stack.Screen name="Listar" component={ListarScreen} />
         <Stack.Screen name="Alterar" component={AlterarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
