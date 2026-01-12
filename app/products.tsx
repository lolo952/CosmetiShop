import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/shared/Footer';
import ProductCard from '../components/shared/ProductCard';
import Section from '../components/shared/Section';
import { Colors } from '../constants/theme';

// Reuse mock data for now
const PRODUCTS = [
    {
        id: '1',
        title: 'Sérum Vitamine C Éclat Radieux',
        brand: 'Luminé',
        price: 499.00,
        originalPrice: 699.00,
        rating: 4.8,
        reviews: 234,
        image: { uri: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        badge: { label: '-29%', variant: 'sale' as const },
    },
    {
        id: '2',
        title: 'Crème Hydratante Intensive 24h',
        brand: 'Aqua Pure',
        price: 380.00,
        rating: 4.9,
        reviews: 512,
        image: { uri: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        badge: { label: 'Nouveau', variant: 'new' as const },
    },
    {
        id: '3',
        title: 'Huile Précieuse Rose Musquée',
        brand: 'Botanica',
        price: 325.00,
        rating: 4.7,
        reviews: 189,
        image: { uri: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    },
    {
        id: '4',
        title: 'Masque Peel-Off Charbon Détox',
        brand: 'Clear Skin',
        price: 249.00,
        originalPrice: 299.00,
        rating: 4.5,
        reviews: 98,
        image: { uri: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        badge: { label: '-17%', variant: 'sale' as const },
    },
];

export default function ProductsPage() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['left', 'right']}>
                <LinearGradient
                    colors={['#FFF0F5', '#FFFCFD']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                >
                    <ScrollView style={{ flex: 1 }}>
                        <Section>
                            <View style={styles.header}>
                                <Text style={styles.title}>Tous nos produits</Text>
                                <Text style={styles.subtitle}>Explorez notre gamme complète de soins et beauté.</Text>
                            </View>

                            <View style={[styles.grid, isMobile && styles.gridMobile]}>
                                {PRODUCTS.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onPress={() => { }}
                                        style={isMobile ? { width: '100%' } : { width: '23%' }}
                                    />
                                ))}
                                {PRODUCTS.map((product) => (
                                    <ProductCard
                                        key={`dup-${product.id}`}
                                        product={{ ...product, id: `dup-${product.id}` }}
                                        onPress={() => { }}
                                        style={isMobile ? { width: '100%' } : { width: '23%' }}
                                    />
                                ))}
                            </View>
                        </Section>
                        <Footer />
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontFamily: 'PlayfairDisplay_700Bold',
        color: Colors.light.text,
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        color: Colors.light.muted,
        textAlign: 'center',
        maxWidth: 600,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        paddingBottom: 40,
    },
    gridMobile: {
        justifyContent: 'center',
    },
});
