import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TelaLogin, TelaRegistrar, TelaPrincipal, TelaLancamento } from './src/telas'
import { decode, encode } from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
            // <Stack.Screen name="Principal" component={TelaPrincipal} />
          {/* Tela recebe usuario logado: TODO {props => <TelaPrincipal {...props} extraData={user} />} */}
          // </Stack.Screen>?
          ) : (
          <>
            <Stack.Screen name="Principal" component={TelaPrincipal} />
            <Stack.Screen name="Login" component={TelaLogin} />
            <Stack.Screen name="Registrar" component={TelaRegistrar} />
            <Stack.Screen name="Lancamento" component={TelaLancamento} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}