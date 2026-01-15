import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/shared/Footer';
import ProductCard from '../components/shared/ProductCard';
import Section from '../components/shared/Section';
import { Colors } from '../constants/theme';

import { Href, useRouter } from 'expo-router';
import { PRODUCTS } from '../constants/products';

export default function ProductsPage() {
    const router = useRouter();
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
                                        onPress={() => router.push(`/product/${product.id}` as Href)}
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
