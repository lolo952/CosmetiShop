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

export default function CartScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <View style={styles.emptyContainer}>
                <View style={styles.imageContainer}>
                    <View style={styles.circleBg}>
                        <Ionicons name="cart-outline" size={80} color={Colors.light.primary} />
                    </View>
                    <View style={styles.dot1} />
                    <View style={styles.dot2} />
                </View>

                <Text style={styles.emptyTitle}>Votre panier est vide</Text>
                <Text style={styles.emptySubtitle}>
                    On dirait que vous n'avez pas encore ajouté de produits à votre panier.
                </Text>

                <TouchableOpacity
                    style={styles.continueBtn}
                    onPress={() => router.push('/')}
                >
                    <Text style={styles.continueBtnText}>Continuer mes achats</Text>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.whishlistBtn}
                    onPress={() => router.push('/favorites' as any)}
                >
                    <Text style={styles.whishlistBtnText}>Voir ma liste de souhaits</Text>
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
    dot1: {
        position: 'absolute',
        top: 20,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.light.primary,
        opacity: 0.3,
    },
    dot2: {
        position: 'absolute',
        bottom: 30,
        left: -10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.light.primary,
        opacity: 0.5,
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
    continueBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.primary,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        gap: 10,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    continueBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    whishlistBtn: {
        paddingVertical: 10,
    },
    whishlistBtnText: {
        color: Colors.light.primary,
        fontSize: 14,
        fontWeight: '500',
    },
});
