import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/shared/Footer';
import ProductCard from '../components/shared/ProductCard';
import Section from '../components/shared/Section';
import { Colors } from '../constants/theme';

const NEW_ARRIVALS = [
    {
        id: 'n1',
        title: 'Brume Parfumée Fleur d\'Oranger',
        brand: 'Oasis',
        price: 245.00,
        rating: 4.9,
        reviews: 42,
        image: { uri: 'https://images.unsplash.com/photo-1594035910387-fea4779426aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        badge: { label: 'Nouveau', variant: 'new' as const },
    },
    {
        id: 'n2',
        title: 'Palette Regard Intense',
        brand: 'Glamour',
        price: 420.00,
        rating: 4.7,
        reviews: 86,
        image: { uri: 'https://images.unsplash.com/photo-1522335789203-abd1aaccd158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        badge: { label: 'Nouveau', variant: 'new' as const },
    },
];

export default function NewArrivalsPage() {
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
                                <View style={styles.badge}>
                                    <Ionicons name="sparkles" size={16} color={Colors.light.primary} />
                                    <Text style={styles.badgeText}>Arrivages de la semaine</Text>
                                </View>
                                <Text style={styles.title}>Nouveautés</Text>
                                <Text style={styles.subtitle}>Soyez les premiers à découvrir nos dernières pépites beauté.</Text>
                            </View>

                            <View style={[styles.grid, isMobile && styles.gridMobile]}>
                                {NEW_ARRIVALS.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
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
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.surface,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    badgeText: {
        color: Colors.light.primary,
        fontWeight: '600',
        fontSize: 14,
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
