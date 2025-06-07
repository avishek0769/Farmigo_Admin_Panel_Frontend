import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from './constant';
import Account from './screens/Account';
import Chats from './screens/Chats';
import Dashboard from './screens/Dashboard';

const Tab = createBottomTabNavigator();

export default function BuyersTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 63,
                    paddingTop: 4,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: THEME_COLOR,
                tabBarInactiveTintColor: '#6c757d',
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chats"
                component={Chats}
                options={{
                    tabBarLabel: 'Chats',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="store" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}