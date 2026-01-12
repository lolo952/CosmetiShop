import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';

export default function FavoritesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <View style={styles.emptyContainer}>
                <View style={styles.imageContainer}>
                    <View style={styles.circleBg}>
                        <Ionicons name="heart-outline" size={80} color={Colors.light.primary} />
                    </View>
                    <View style={styles.sparkle1}>
                        <Ionicons name="sparkles" size={24} color={Colors.light.primary} />
                    </View>
                    <View style={styles.sparkle2}>
                        <Ionicons name="sparkles" size={16} color={Colors.light.primary} />
                    </View>
                </View>

                <Text style={styles.emptyTitle}>Vos favoris sont vides</Text>
                <Text style={styles.emptySubtitle}>
                    Enregistrez les produits que vous aimez pour les retrouver facilement plus tard.
                </Text>

                <TouchableOpacity
                    style={styles.exploreBtn}
                    onPress={() => router.push('/products')}
                >
                    <Text style={styles.exploreBtnText}>Découvrir nos produits</Text>
                    <Ionicons name="search" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCFD',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 40,
    },
    circleBg: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#FFF0F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sparkle1: {
        position: 'absolute',
        top: 0,
        right: -10,
        opacity: 0.6,
    },
    sparkle2: {
        position: 'absolute',
        bottom: 20,
        left: -15,
        opacity: 0.4,
    },
    emptyTitle: {
        fontSize: 28,
        fontFamily: Platform.select({ web: 'Playfair Display', default: 'System' }),
        fontWeight: 'bold',
        color: Colors.light.text,
        textAlign: 'center',
        marginBottom: 16,
    },
    emptySubtitle: {
        fontSize: 16,
        color: Colors.light.muted,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    exploreBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.primary,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        gap: 12,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    exploreBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
