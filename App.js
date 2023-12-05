import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TelaLogin, TelaRegistrar, TelaTrocaSenha, TelaPrincipal, TelaLancamento, TelaVerLancamentos } from './src/telas'
import { decode, encode } from 'base-64'
import { auth } from './src/firebase/config';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Principal">
            {props => <TelaPrincipal {...props} loggedUser={user} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Principal" component={TelaPrincipal} />
        )}
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Registrar" component={TelaRegistrar} />
        <Stack.Screen name="TrocaSenha" component={TelaTrocaSenha} />
        <Stack.Screen name="Lancamento" component={TelaLancamento} />
        <Stack.Screen name="VerLancamentos" component={TelaVerLancamentos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}