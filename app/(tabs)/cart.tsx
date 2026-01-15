import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItemComponent from '../../components/cart/CartItem';
import Button from '../../components/shared/Button';
import { Colors } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

export default function CartScreen() {
    const router = useRouter();
    const { items, totalAmount, checkout, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const shippingFee = items.length > 0 ? (totalAmount > 500 ? 0 : 50) : 0;
    const finalTotal = totalAmount + shippingFee;

    const handleCheckout = () => {
        router.push('/checkout/delivery' as any);
    };

    if (items.length === 0 && !showSuccessModal) {
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

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Mon Panier</Text>
                <TouchableOpacity onPress={() => clearCart()}>
                    <Text style={styles.clearBtn}>Vider</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CartItemComponent item={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Sous-total</Text>
                    <Text style={styles.summaryValue}>{totalAmount.toFixed(2)} Dhs</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Livraison</Text>
                    <Text style={styles.summaryValue}>
                        {shippingFee === 0 ? "Gratuite" : `${shippingFee.toFixed(2)} Dhs`}
                    </Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>{finalTotal.toFixed(2)} Dhs</Text>
                </View>

                <Button
                    title={isProcessing ? "Traitement..." : "Passer la commande"}
                    onPress={handleCheckout}
                    disabled={isProcessing}
                    style={styles.checkoutBtn}
                    iconRight={isProcessing ? <ActivityIndicator color="#fff" /> : <Ionicons name="arrow-forward" size={20} color="#fff" />}
                />
                <Button
                    title="Continuer mes achats"
                    onPress={() => router.push('/')}
                    variant="outline"
                    style={styles.continueShoppingBtn}
                />
            </View>

            {/* Success Modal */}
            <Modal
                visible={showSuccessModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.successIcon}>
                            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
                        </View>
                        <Text style={styles.modalTitle}>Commande validée !</Text>
                        <Text style={styles.modalSubtitle}>
                            Votre paiement a été traité avec succès. Vous recevrez un email de confirmation sous peu.
                        </Text>
                        <Button
                            title="Retour à l'accueil"
                            onPress={() => {
                                setShowSuccessModal(false);
                                router.push('/');
                            }}
                            style={{ width: '100%' }}
                        />
                    </View>
                </View>
            </Modal>
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    backBtn: {
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
        fontFamily: Platform.select({ web: 'serif', default: 'System' }),
    },
    clearBtn: {
        color: '#FF4D4D',
        fontWeight: '600',
    },
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    footer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        color: Colors.light.muted,
        fontSize: 14,
    },
    summaryValue: {
        color: Colors.light.text,
        fontSize: 14,
        fontWeight: '600',
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginBottom: 24,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    totalValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    checkoutBtn: {
        height: 56,
        borderRadius: 16,
    },
    continueShoppingBtn: {
        marginTop: 12,
        height: 56,
        borderRadius: 16,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
    },
    successIcon: {
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 16,
        color: Colors.light.muted,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    }
});

