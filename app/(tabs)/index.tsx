import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Href, Stack, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/shared/Button';
import Footer from '../../components/shared/Footer';
import Input from '../../components/shared/Input';
import Section from '../../components/shared/Section';
import { Colors } from '../../constants/theme';



const CATEGORIES = [
    { id: '1', title: 'Soins', image: 'https://images.unsplash.com/photo-1570172619643-c39712a7732a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: '2', title: 'Maquillage', image: 'https://images.unsplash.com/photo-1522335789203-abd1aaccd158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: '3', title: 'Corps', image: 'https://images.unsplash.com/photo-1556228720-1957be982260?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: '4', title: 'Parfums', image: 'https://images.unsplash.com/photo-1594035910387-fea4779426aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: '5', title: 'Cheveux', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
];

const BENEFITS = [
    { icon: 'car-outline', title: 'Livraison gratuite', desc: 'Dès 500 DHS d\'achat' },
    { icon: 'gift-outline', title: 'Échantillons offerts', desc: 'À chaque commande' },
    { icon: 'refresh-circle-outline', title: 'Retours gratuits', desc: 'Sous 30 jours' },
    { icon: 'shield-checkmark-outline', title: 'Paiement sécurisé', desc: '100% protégé' },
];

export default function Home() {
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

                        {/* Hero Section */}
                        <Section>
                            <View style={styles.heroContent}>
                                <View style={styles.newCollectionBadge}>
                                    <Ionicons name="sparkles" size={16} color={Colors.light.primary} />
                                    <Text style={styles.newCollectionText}>Nouvelle collection Printemps 2026</Text>
                                </View>

                                <Text style={styles.heroTitle}>
                                    Révélez votre <Text style={styles.textPink}>beauté naturelle</Text>
                                </Text>

                                <Text style={styles.heroSubtitle}>
                                    Découvrez notre sélection exclusive de cosmétiques premium,
                                    soigneusement choisis pour sublimer votre peau au quotidien.
                                </Text>

                                <View style={styles.heroButtons}>
                                    <Button
                                        title="Découvrir la collection"
                                        onPress={() => { }}
                                        iconRight={<Ionicons name="arrow-forward" size={18} color="#fff" />}
                                        style={{ height: 48, borderRadius: 12 }}
                                    />
                                    <Button
                                        title="Nos best-sellers"
                                        variant="outline"
                                        onPress={() => { }}
                                        style={{ borderRadius: 12, borderColor: Colors.light.primary, paddingHorizontal: 32 }}
                                        textStyle={{ color: Colors.light.primary }}
                                    />
                                </View>
                            </View>
                        </Section>

                        <View style={[styles.statsSection, isMobile && { gap: 30 }]}>
                            {[
                                { number: '500+', label: 'Produits' },
                                { number: '50k+', label: 'Clients heureux' },
                                { number: '4.9', label: 'Note moyenne' },
                            ].map((stat, index) => (
                                <React.Fragment key={index}>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statNumber}>{stat.number}</Text>
                                        <Text style={styles.statLabel}>{stat.label}</Text>
                                    </View>
                                    {index < 2 && !isMobile && <View style={styles.statDivider} />}
                                </React.Fragment>
                            ))}
                        </View>

                        {/* Benefits Section */}
                        <Section style={styles.benefitsSection}>
                            <View style={styles.benefitsGrid}>
                                {[
                                    { icon: 'car-outline', title: 'Livraison gratuite', desc: 'Dès 490 Dhs d\'achat' },
                                    { icon: 'gift-outline', title: 'Échantillons offerts', desc: 'À chaque commande' },
                                    { icon: 'refresh-circle-outline', title: 'Retours gratuits', desc: 'Sous 30 jours' },
                                    { icon: 'shield-checkmark-outline', title: 'Paiement sécurisé', desc: '100% protégé' },
                                ].map((item, index) => (
                                    <View key={index} style={styles.benefitItem}>
                                        <View style={[styles.benefitIcon, { backgroundColor: Colors.light.secondary }]}>
                                            <Ionicons name={item.icon as any} size={28} color={Colors.light.primary} />
                                        </View>
                                        <Text style={styles.benefitTitle}>{item.title}</Text>
                                        <Text style={styles.benefitDesc}>{item.desc}</Text>
                                    </View>
                                ))}
                            </View>
                        </Section>

                        {/* Best Sellers */}
                        <Section>
                            <View style={styles.sectionHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.sectionTag}>SÉLECTION DU MOMENT</Text>
                                    <Text style={styles.sectionTitle}>Nos produits phares</Text>
                                    <Text style={styles.sectionSubtitle}>Découvrez les favoris de notre communauté, plébiscités pour leur efficacité.</Text>
                                </View>
                                <Button
                                    title="Voir tout"
                                    variant="outline"
                                    onPress={() => router.push('/products' as Href)}
                                    style={{
                                        marginTop: isMobile ? 16 : 0,
                                        borderColor: Colors.light.primary,
                                        borderRadius: 12,
                                        paddingHorizontal: 24
                                    }}
                                    textStyle={{ color: Colors.light.primary }}
                                    iconRight={<Ionicons name="arrow-forward" size={16} color={Colors.light.primary} />}
                                />
                            </View>


                        </Section>

                        {/* Categories */}
                        <Section style={styles.categoriesSection}>
                            <View style={{ alignItems: 'center', marginBottom: 40 }}>
                                <Text style={styles.sectionTag}>EXPLOREZ</Text>
                                <Text style={styles.sectionTitle}>Nos catégories</Text>
                                <Text style={[styles.sectionSubtitle, { textAlign: 'center' }]}>
                                    Trouvez exactement ce que vous cherchez parmi notre large sélection.
                                </Text>
                            </View>

                            <View style={styles.categoriesGrid}>
                                {CATEGORIES.map((cat) => (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[styles.categoryCard, isMobile ? { width: '100%' } : { width: '31%' }]}
                                        onPress={() => router.push({ pathname: '/search', params: { category: cat.title } } as Href)}
                                    >
                                        <ImageBackground source={{ uri: cat.image }} style={styles.categoryImage}>
                                            <View style={styles.categoryOverlay}>
                                                <Text style={styles.categoryTitle}>{cat.title}</Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </Section>

                        {/* Newsletter */}
                        <Section>
                            <View style={styles.newsletterContainer}>
                                <Text style={styles.newsletterTitle}>Restez connecté(e)</Text>
                                <Text style={styles.newsletterDesc}>
                                    Inscrivez-vous pour recevoir nos offres exclusives et conseils beauté.
                                </Text>

                                <View style={[styles.newsletterForm, isMobile && { flexDirection: 'column' }]}>
                                    <Input placeholder="Votre email" style={{ flex: 1 }} />
                                    <Button title="S'inscrire" onPress={() => { }} style={{ minWidth: 120 }} />
                                </View>
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
    heroContent: {
        alignItems: 'center',
        paddingVertical: 40,
        maxWidth: 800,
        alignSelf: 'center',
    },
    newCollectionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.surface,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 8,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    newCollectionText: {
        color: Colors.light.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    heroTitle: {
        fontSize: Platform.select({ web: 64, default: 40 }),
        // fontWeight: 'bold', // Handled by font family
        textAlign: 'center', // Added property
        color: Colors.light.text,
        marginBottom: 24,
        lineHeight: Platform.select({ web: 72, default: 48 }),
        fontFamily: 'PlayfairDisplay_700Bold',
    },
    textPink: {
        color: Colors.light.primary,
        fontStyle: 'italic', // Approximate the design
    },
    heroSubtitle: {
        fontSize: 18,
        color: Colors.light.muted,
        textAlign: 'center',
        maxWidth: 600,
        marginBottom: 40,
        lineHeight: 28,
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    heroButtons: {
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        paddingVertical: 40,
        backgroundColor: '#fff',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 32,
        // fontWeight: 'bold',
        color: Colors.light.text,
        fontFamily: 'PlayfairDisplay_700Bold',
    },
    statLabel: {
        fontSize: 14,
        color: Colors.light.muted,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#E0E0E0',
    },
    benefitsSection: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    benefitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 20,
    },
    benefitItem: {
        flex: 1,
        minWidth: 200,
        alignItems: 'center',
        padding: 20,
    },
    benefitIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.light.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    benefitTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.light.text,
    },
    benefitDesc: {
        color: Colors.light.muted,
        textAlign: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 40,
        flexWrap: 'wrap',
    },
    sectionTag: {
        color: Colors.light.primary,
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 1.5,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    sectionTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
        fontFamily: Platform.select({ web: 'serif', default: 'System' }),
    },
    sectionSubtitle: {
        fontSize: 16,
        color: Colors.light.muted,
        maxWidth: 500,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'space-between',
    },
    productsGridMobile: {
        justifyContent: 'center',
    },
    categoriesSection: {
        backgroundColor: '#F8F9FA',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
        justifyContent: 'center',
    },
    categoryCard: {
        minWidth: 300,
        aspectRatio: 0.8, // Taller cards as per screenshot
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
        backgroundColor: 'rgba(0,0,0,0.1)', // Subtle darkening
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 32,
        paddingLeft: 32,
    },
    categoryTitle: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: Platform.select({ web: 'serif', default: 'System' }),
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    newsletterContainer: {
        backgroundColor: '#fff',
        padding: 60,
        borderRadius: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 4,
    },
    newsletterTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: Platform.select({ web: 'serif', default: 'System' }),
        marginBottom: 16,
        color: Colors.light.text,
    },
    newsletterDesc: {
        fontSize: 16,
        color: Colors.light.muted,
        textAlign: 'center',
        marginBottom: 32,
        maxWidth: 500,
    },
    newsletterForm: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 500,
        gap: 12,
    },
});