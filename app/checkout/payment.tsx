import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import { Colors } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { auth } from '../../firebase';

type PaymentMethod = 'card' | 'cash';

export default function PaymentScreen() {
    const router = useRouter();
    const { items, totalAmount, checkout, deliveryInfo } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

    // Card info
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const shippingFee = items.length > 0 ? (totalAmount > 500 ? 0 : 50) : 0;
    const finalTotal = totalAmount + shippingFee;

    const handlePayment = async () => {
        if (paymentMethod === 'card' && (!cardNumber || !cardName || !expiry || !cvv)) {
            Alert.alert('Erreur', 'Veuillez remplir toutes les informations de votre carte.');
            return;
        }

        setIsProcessing(true);
        try {
            await checkout({
    deliveryInfo: deliveryInfo || {
        email: 'test@test.com',
        firstName: 'Jean',
        lastName: 'Dupont',
        address: '123 Rue Exemple',
        city: 'Casablanca',
        postalCode: '20000',
        phone: '0612345678',
    },
    paymentMethod,
    userId: 'test-user', // temporaire
});
console.log('Avant redirection vers success');
router.push('/checkout/success');

        } catch (error) {
            console.error('Erreur durant le paiement:', error);
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors du paiement. Veuillez réessayer.'
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const renderRadio = (selected: boolean) => (
        <View style={[styles.radio, selected && styles.radioSelected]}>
            {selected && <View style={styles.radioInner} />}
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={styles.stepContainer}>
                        <View style={[styles.stepDot, styles.completedStepDot]}>
                            <Ionicons name="checkmark" size={12} color="#fff" />
                        </View>
                        <Text style={[styles.stepLabel, styles.completedStepLabel]}>
                            Livraison
                        </Text>
                    </View>

                    <View style={[styles.stepLine, styles.completedStepLine]} />

                    <View style={styles.stepContainer}>
                        <View style={[styles.stepDot, styles.activeStepDot]}>
                            <Text style={styles.stepNumber}>2</Text>
                        </View>
                        <Text style={[styles.stepLabel, styles.activeStepLabel]}>Paiement</Text>
                    </View>
                </View>

                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.pageTitle}>Paiement sécurisé</Text>

                <View style={styles.mainLayout}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                        {/* Payment Methods */}
                        <View style={styles.card}>
                            <View style={styles.sectionHeader}>
                                <View style={styles.iconCircle}>
                                    <Ionicons name="card" size={20} color="#B8860B" />
                                </View>
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={[styles.sectionTitle, { marginBottom: 2 }]}>
                                        Méthode de paiement
                                    </Text>
                                    <Text style={styles.sectionSubtitle}>
                                        Sélectionnez votre mode de paiement
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.methodItem,
                                    paymentMethod === 'card' && styles.methodItemSelected,
                                ]}
                                onPress={() => setPaymentMethod('card')}
                                activeOpacity={0.7}
                            >
                                {renderRadio(paymentMethod === 'card')}
                                <View style={styles.methodDetails}>
                                    <Text style={styles.methodName}>Carte bancaire</Text>
                                    <Text style={styles.methodInfo}>
                                        Visa, Mastercard, American Express
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.methodItem,
                                    paymentMethod === 'cash' && styles.methodItemSelected,
                                ]}
                                onPress={() => setPaymentMethod('cash')}
                                activeOpacity={0.7}
                            >
                                {renderRadio(paymentMethod === 'cash')}
                                <View style={styles.methodDetails}>
                                    <Text style={styles.methodName}>Paiement à la livraison</Text>
                                    <Text style={styles.methodInfo}>
                                        Payez en espèces lors de la réception
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.infoBanner}>
                                <Ionicons name="shield-checkmark" size={18} color="#4CAF50" />
                                <Text style={styles.infoText}>
                                    Vos données de paiement sont sécurisées par un cryptage SSL 256 bits
                                </Text>
                            </View>
                        </View>

                        {/* Card Info */}
                        {paymentMethod === 'card' && (
                            <View style={[styles.card, { marginTop: 24 }]}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name="card-outline" size={20} color={Colors.light.primary} />
                                    <Text style={[styles.sectionTitle, { marginLeft: 8 }]}>
                                        Informations de paiement
                                    </Text>
                                </View>

                                <Input
                                    label="Numéro de carte"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChangeText={setCardNumber}
                                    style={styles.input}
                                />
                                <Input
                                    label="Nom sur la carte"
                                    placeholder="JEAN DUPONT"
                                    value={cardName}
                                    onChangeText={setCardName}
                                    style={styles.input}
                                />
                                <View style={styles.row}>
                                    <Input
                                        label="Date d'expiration"
                                        placeholder="MM/AA"
                                        value={expiry}
                                        onChangeText={setExpiry}
                                        style={[styles.input, { flex: 1, marginRight: 12 }]}
                                    />
                                    <Input
                                        label="CVV"
                                        placeholder="123"
                                        value={cvv}
                                        onChangeText={setCvv}
                                        style={[styles.input, { flex: 1 }]}
                                    />
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                        <View style={[styles.card, styles.summaryCard]}>
                            <Text style={styles.sectionTitle}>Récapitulatif</Text>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Sous-total ({items.length} articles)</Text>
                                <Text style={styles.summaryValue}>{totalAmount.toFixed(2)} Dhs</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Livraison</Text>
                                <Text style={styles.summaryValue}>
                                    {shippingFee === 0 ? 'Gratuite' : `${shippingFee.toFixed(2)} Dhs`}
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={[styles.summaryRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>{finalTotal.toFixed(2)} Dhs</Text>
                            </View>

                            <View style={styles.shippingSummary}>
                                <Text style={styles.shippingLabel}>Livraison à :</Text>
                                {deliveryInfo ? (
                                    <>
                                        <Text style={styles.shippingText}>
                                            {deliveryInfo.firstName} {deliveryInfo.lastName}
                                        </Text>
                                        <Text style={styles.shippingText}>{deliveryInfo.address}</Text>
                                        <Text style={styles.shippingText}>
                                            {deliveryInfo.postalCode} {deliveryInfo.city}
                                        </Text>
                                        <Text style={styles.shippingText}>{deliveryInfo.phone}</Text>
                                    </>
                                ) : (
                                    <Text style={styles.shippingText}>Informations non disponibles</Text>
                                )}
                            </View>

                            <Button
                                title={isProcessing ? 'Traitement...' : `Payer ${finalTotal.toFixed(2)} Dhs`}
                                onPress={handlePayment}
                                disabled={isProcessing}
                                style={styles.payBtn}
                                iconLeft={
                                    !isProcessing && <Ionicons name="lock-closed" size={16} color="#fff" />
                                }
                            />

                            <View style={styles.secureFooter}>
                                <Ionicons name="lock-closed-outline" size={12} color={Colors.light.muted} />
                                <Text style={styles.secureText}>Paiement sécurisé par cryptage SSL</Text>
                            </View>
                        </View>
                    </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    backBtn: {
        padding: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    completedStepDot: {
        backgroundColor: '#4CAF50',
    },
    activeStepDot: {
        backgroundColor: Colors.light.primary,
    },
    stepNumber: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    stepLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    completedStepLabel: {
        color: '#4CAF50',
    },
    activeStepLabel: {
        color: Colors.light.primary,
    },
    stepLine: {
        width: 40,
        height: 2,
        backgroundColor: '#E5E5E5',
        marginHorizontal: 12,
    },
    completedStepLine: {
        backgroundColor: '#4CAF50',
    },
    scrollContent: {
        padding: 24,
    },
    pageTitle: {
        fontSize: 32,
        fontFamily: Platform.OS === 'web' ? 'Playfair Display' : 'System',
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 32,
    },
    mainLayout: {
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        gap: 40,
    },
    leftSection: {
        flex: 2,
    },
    rightSection: {
        flex: 1,
        minWidth: Platform.OS === 'web' ? 350 : '100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        ...(Platform.OS === 'web' ? {
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        } : {}),
    },
    summaryCard: {
        position: Platform.OS === 'web' ? 'sticky' as any : 'relative',
        top: Platform.OS === 'web' ? 24 : 0,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF8E1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: Colors.light.muted,
    },
    methodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    methodItemSelected: {
        borderColor: Colors.light.primary,
        backgroundColor: '#FFF9FA',
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    radioSelected: {
        borderColor: Colors.light.primary,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.light.primary,
    },
    methodDetails: {
        flex: 1,
    },
    methodName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    methodInfo: {
        fontSize: 12,
        color: Colors.light.muted,
        marginTop: 2,
    },
    infoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FBF8',
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
        gap: 8,
    },
    infoText: {
        fontSize: 11,
        color: '#666',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: Colors.light.muted,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 16,
    },
    totalRow: {
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    shippingSummary: {
        backgroundColor: '#fafafa',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
    },
    shippingLabel: {
        fontSize: 12,
        color: Colors.light.muted,
        marginBottom: 4,
    },
    shippingText: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.light.text,
        lineHeight: 18,
    },
    payBtn: {
        height: 56,
        borderRadius: 16,
    },
    secureFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        gap: 6,
    },
    secureText: {
        fontSize: 10,
        color: Colors.light.muted,
    },
});
