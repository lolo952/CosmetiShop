import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.light.primary,
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Accueil',
                    tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Recherche',
                    tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Panier',
                    tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={28} color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoris',
                    tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={28} color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color={color} />,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
