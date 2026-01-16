import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import { Colors } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
export default function DeliveryScreen() {
    const router = useRouter();
    const { totalAmount, items, setDeliveryInfo } = useCart();
    // Form state
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const shippingFee = items.length > 0 ? (totalAmount > 500 ? 0 : 50) : 0;

    const finalTotal = totalAmount + shippingFee;
    const handleContinue = () => {
        // Validation could go here
        setDeliveryInfo({
            email,
            firstName,
            lastName,
            address,
            city,
            postalCode,
            phone
        });
        router.push('/checkout/payment' as any);
    };
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                    <View style={styles.stepContainer}>
                        <View style={[styles.stepDot, styles.activeStepDot]}>
                            <Text style={styles.stepNumber}>1</Text>
                        </View>
                        <Text style={[styles.stepLabel, styles.activeStepLabel]}>Livraison</Text>
                    </View>
                    <View style={styles.stepLine} />
                    <View style={styles.stepContainer}>
                        <View style={[styles.stepDot, styles.inactiveStepDot]}>
                            <Text style={[styles.stepNumber, styles.inactiveStepNumber]}>2</Text>
                        </View>
                        <Text style={[styles.stepLabel, styles.inactiveStepLabel]}>Paiement</Text>
                    </View>
                </View>
                <View style={{ width: 40 }} /> {/* Spacer to balance back button */}
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.pageTitle}>Informations de livraison</Text>
                <View style={styles.mainLayout}>
                    {/* Left Side: Form */}
                    <View style={styles.formSection}>
                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>Contact</Text>
                            <Input
                                label="Email"
                                placeholder="votre@email.com"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                            />
                        </View>
                        <View style={[styles.card, { marginTop: 24 }]}>
                            <View style={styles.sectionHeader}>
                                <Ionicons name="location-outline" size={20} color={Colors.light.primary} />
                                <Text style={[styles.sectionTitle, { marginLeft: 8, marginBottom: 0 }]}>Adresse de livraison</Text>
                            </View>
                            <View style={styles.row}>
                                <Input
                                    label="Prénom"
                                    placeholder="Marie"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    style={[styles.input, { flex: 1, marginRight: 12 }]}
                                />
                                <Input
                                    label="Nom"
                                    placeholder="Dupont"
                                    value={lastName}
                                    onChangeText={setLastName}
                                    style={[styles.input, { flex: 1 }]}
                                />
                            </View>
                            <Input
                                label="Adresse"
                                placeholder="123 Rue de la Beauté"
                                value={address}
                                onChangeText={setAddress}
                                style={styles.input}
                            />
                            <View style={styles.row}>
                                <Input
                                    label="Ville"
                                    placeholder="Paris"
                                    value={city}
                                    onChangeText={setCity}
                                    style={[styles.input, { flex: 2, marginRight: 12 }]}
                                />
                                <Input
                                    label="Code postal"
                                    placeholder="75001"
                                    value={postalCode}
                                    onChangeText={setPostalCode}
                                    style={[styles.input, { flex: 1 }]}
                                />
                            </View>
                            <Input
                                label="Téléphone"
                                placeholder="0612345678"
                                value={phone}
                                onChangeText={setPhone}
                                style={styles.input}
                            />
                        </View>
                    </View>
                    {/* Right Side: Summary Card */}
                    <View style={styles.summarySection}>
                        <View style={[styles.card, styles.summaryCard]}>
                            <Text style={styles.sectionTitle}>Récapitulatif</Text>
                            <View style={styles.itemsList}>
                                {items.map((item) => (
                                    <View key={item.id} style={styles.summaryItem}>
                                        <Image source={item.image} style={styles.itemImage} />
                                        <View style={styles.itemDetails}>
                                            <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                                            <Text style={styles.itemQty}>Qté: {item.quantity}</Text>
                                        </View>
                                        <Text style={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)} Dhs</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Sous-total</Text>
                                <Text style={styles.summaryValue}>{totalAmount.toFixed(2)} Dhs</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Livraison</Text>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.summaryValue}>
                                        {shippingFee === 0 ? "Gratuite" : `${shippingFee.toFixed(2)} Dhs`}
                                    </Text>
                                    {totalAmount < 500 && (
                                        <Text style={styles.shippingTip}>Livraison gratuite dès 500 Dhs d'achat</Text>
                                    )}
                                </View>
                            </View>
                            <View style={[styles.summaryRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>{finalTotal.toFixed(2)} Dhs</Text>
                            </View>
                            <Button
                                title="Continuer vers le paiement"
                                onPress={handleContinue}
                                style={styles.paymentBtn}
                            />
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
    activeStepDot: {
        backgroundColor: Colors.light.primary,
    },
    inactiveStepDot: {
        backgroundColor: '#E5E5E5',
    },
    stepNumber: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    inactiveStepNumber: {
        color: '#999',
    },
    stepLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    activeStepLabel: {
        color: Colors.light.primary,
    },
    inactiveStepLabel: {
        color: '#999',
    },
    stepLine: {
        width: 40,
        height: 1,
        backgroundColor: '#E5E5E5',
        marginHorizontal: 12,
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
    formSection: {
        flex: 2,
    },
    summarySection: {
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
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
    },
    itemsList: {
        marginBottom: 24,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemImage: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 12,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
    },
    itemQty: {
        fontSize: 12,
        color: Colors.light.muted,
        marginTop: 2,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
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
    shippingTip: {
        fontSize: 10,
        color: Colors.light.muted,
        marginTop: 2,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    paymentBtn: {
        height: 48,
        borderRadius: 12,
    },
});