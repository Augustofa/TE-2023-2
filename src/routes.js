import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons';
import BotaoLancamento from './componentes/BotaoLancamento/BotaoLancamento';
import { HeaderBackButton } from "@react-navigation/elements";

import { TelaInicial, TelaLogin, TelaRegistrar, TelaTrocaSenha, TelaPrincipal, TelaLancamento, TelaVerLancamentos } from './telas';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs({ navigation }) {
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
                name="Home" 
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
                    title: "",
                    headerStyle: { backgroundColor: '#1B7E4C' },
                    headerShadowVisible: false,
                    headerTintColor: 'white',
                    headerLeft: () => (
                        <HeaderBackButton
                            label=' '
                            style={{
                                marginLeft: 20
                            }}
                            tintColor='#FFF'
                            onPress={() => navigation.navigate('Home')}
                        />
                    ),
                    tabBarStyle: { display: 'none'},
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (
                        <BotaoLancamento size={size} color={color}/>
                    )
                }}
            />
            <Tab.Screen 
                name="Extrato" 
                component={TelaVerLancamentos}
                options={{
                    headerStyle: { backgroundColor: '#1B7E4C' },
                    headerTitle: "Visualização de Lançamentos",
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <HeaderBackButton
                            label=' '
                            style={{
                                marginLeft: 10
                            }}
                            tintColor='#FFF'
                            onPress={() => navigation.navigate('Home')}
                        />
                    ),
                    headerTintColor: 'white',
                    tabBarStyle: { display: 'none'},
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
        <Stack.Navigator 
            initialRouteName='TelaInicial'
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#1B7E4C' },
                headerShadowVisible: false
            }}
        >
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
            <Stack.Screen
                name="Lancamento"
                component={TelaLancamento}
            />
            <Stack.Screen
                name="VerLancamentos"
                component={TelaVerLancamentos}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;