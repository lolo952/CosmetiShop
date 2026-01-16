import { LinearGradient } from 'expo-linear-gradient';
import { Href, Stack, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/shared/Footer';
import Section from '../components/shared/Section';
import { Colors } from '../constants/theme';

const CATEGORIES = [
    { id: '1', title: 'Soins', image: require('../assets/images/soins.jpg') },
    { id: '2', title: 'Maquillage', image: require('../assets/images/maquillage.jpg') },
    { id: '3', title: 'Corps', image: require('../assets/images/corps.webp') },
    { id: '4', title: 'Parfums', image: require('../assets/images/parfum.webp') },
    { id: '5', title: 'Cheveux', image: require('../assets/images/cheveux.webp') },
    { id: '6', title: 'Accessoires', image: require('../assets/images/accesoires.jpg') },
];

export default function CategoriesPage() {
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
                                <Text style={styles.title}>Nos Catégories</Text>
                                <Text style={styles.subtitle}>Trouvez exactement ce qu'il vous faut.</Text>
                            </View>

                            <View style={styles.categoriesGrid}>
                                {CATEGORIES.map((cat) => (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[styles.categoryCard, isMobile ? { width: '100%' } : { width: '48%' }]}
                                        onPress={() => router.push({ pathname: '/search', params: { category: cat.title } } as Href)}
                                    >
                                        <ImageBackground source={cat.image} style={styles.categoryImage}>
                                            <View style={styles.categoryOverlay}>
                                                <Text style={styles.categoryTitle}>{cat.title}</Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
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
        marginBottom: 40,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
        justifyContent: 'center',
        paddingBottom: 40,
    },
    categoryCard: {
        minWidth: 300,
        aspectRatio: 1.5,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    categoryOverlay: {
        padding: 32,
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryTitle: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: Platform.select({ web: 'serif', default: 'System' }),
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
});
