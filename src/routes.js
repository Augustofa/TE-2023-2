import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons';
import BotaoLancamento from './componentes/BotaoLancamento/BotaoLancamento';

import TelaPrincipal from './telas/TelaPrincipal/TelaPrincipal';
import TelaLancamento from './telas/TelaLancamento/TelaLancamento';
import TelaVerLancamentos from './telas/TelaVerLancamentos/TelaVerLancamentos';

const Tab = createBottomTabNavigator();

export default function Routes() {
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
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Lancamento" 
                component={TelaLancamento}
                options={{
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
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="list" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}