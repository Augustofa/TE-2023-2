import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons';
import BotaoLancamento from './componentes/BotaoLancamento/BotaoLancamento';

import { TelaInicial, TelaLogin, TelaRegistrar, TelaTrocaSenha, TelaPrincipal, TelaLancamento, TelaVerLancamentos } from './telas';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopCollor: 'transparent',
                    paddingTop: 5,
                    paddingBottom: 5
                },
                tabBarActiveTintColor: '#FFF'
            }}
        >
            <Tab.Screen 
                name="Principal" 
                component={TelaPrincipal}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Lancamento" 
                component={TelaLancamento}
                options={{
                    // headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (
                        <BotaoLancamento size={size} color={color}/>
                    )
                }}
            />
            <Tab.Screen 
                name="VerLancamento" 
                component={TelaVerLancamentos}
                options={{
                    // headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="list" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='TelaInicial'>
            <Stack.Screen
                name="TelaInicial"
                component={TelaInicial}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Login"
                component={TelaLogin}
                options={{
                    title: ""
                }}
            />
            <Stack.Screen
                name="Registrar"
                component={TelaRegistrar}
                options={{
                    title: ""
                }}
            />
            <Stack.Screen
                name="Principal"
                component={Tabs}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;