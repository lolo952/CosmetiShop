import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';

export default function WishlistScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Ma Liste d'Envies</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.emptyContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="heart-outline" size={64} color={Colors.light.primary} />
                    </View>
                    <Text style={styles.emptyTitle}>Liste vide</Text>
                    <Text style={styles.emptySubtitle}>Ajoutez des produits à vos favoris pour les retrouver ici plus tard.</Text>
                    <TouchableOpacity
                        style={styles.shopButton}
                        onPress={() => router.push('/(tabs)')}
                    >
                        <Text style={styles.shopButtonText}>Explorer les produits</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCFD',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontFamily: Platform.select({ web: 'Playfair Display', default: 'System' }),
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingBottom: 100,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFF0F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 12,
    },
    emptySubtitle: {
        fontSize: 16,
        color: Colors.light.muted,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
        marginBottom: 32,
    },
    shopButton: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 30,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    shopButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
