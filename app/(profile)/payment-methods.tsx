import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../context/auth-context';
import { db } from '../../firebase';

const cardSchema = z.object({
    cardNumber: z.string().min(12, 'Numéro de carte invalide').max(16, 'Trop long'),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format MM/YY requis'),
    cvv: z.string().min(3, '3 chiffres requis').max(4, 'Trop long'),
});

type CardForm = z.infer<typeof cardSchema>;

interface Card {
    id: string;
    maskedNumber: string;
    type: string;
    expiry: string;
}

export default function PaymentMethodsScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const [cards, setCards] = useState<Card[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<CardForm>({
        resolver: zodResolver(cardSchema),
        defaultValues: {
            cardNumber: '',
            expiry: '',
            cvv: '',
        }
    });

    useEffect(() => {
        if (user) {
            fetchCards();
        }
    }, [user]);

    const fetchCards = async () => {
        if (!user) return;
        try {
            setIsLoading(true);
            const q = query(collection(db, `users/${user.uid}/cards`));
            const querySnapshot = await getDocs(q);
            const loadedCards: Card[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                loadedCards.push({
                    id: doc.id,
                    maskedNumber: data.maskedNumber,
                    type: data.type,
                    expiry: data.expiry
                });
            });
            setCards(loadedCards);
        } catch (error) {
            console.error("Error fetching cards:", error);
            Alert.alert("Erreur", "Impossible de charger vos cartes.");
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: CardForm) => {
        if (!user) return;
        try {
            setIsAdding(true);
            const maskedNumber = `**** **** **** ${data.cardNumber.slice(-4)}`;
            const cardType = 'Visa'; // Simplification for now

            const cardData = {
                maskedNumber,
                type: cardType,
                expiry: data.expiry,
                // NEVER store full card number or CVV in plain text in a real app
                // Here we store masked info only for the UI display
            };

            const docRef = await addDoc(collection(db, `users/${user.uid}/cards`), cardData);

            const newCard: Card = {
                id: docRef.id,
                ...cardData
            };

            setCards(prev => [...prev, newCard]);
            setIsModalVisible(false);
            reset();
            Keyboard.dismiss();
        } catch (error) {
            console.error("Error adding card:", error);
            Alert.alert("Erreur", "Impossible d'ajouter la carte.");
        } finally {
            setIsAdding(false);
        }
    };

    const deleteCard = async (id: string) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, `users/${user.uid}/cards`, id));
            setCards(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Error deleting card:", error);
            Alert.alert("Erreur", "Impossible de supprimer la carte.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Méthodes de Paiement</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {isLoading ? (
                    <View style={styles.loadingState}>
                        <ActivityIndicator size="large" color={Colors.light.primary} />
                    </View>
                ) : cards.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="card-outline" size={80} color={Colors.light.muted} />
                        <Text style={styles.emptyText}>Aucune méthode de paiement enregistrée.</Text>
                        <Button
                            title="Ajouter une carte"
                            onPress={() => setIsModalVisible(true)}
                            style={{ marginTop: 20 }}
                        />
                    </View>
                ) : (
                    <View style={styles.cardList}>
                        {cards.map((item) => (
                            <View key={item.id} style={styles.paymentCard}>
                                <View style={styles.cardInfo}>
                                    <Ionicons name="card" size={24} color={Colors.light.primary} />
                                    <View>
                                        <Text style={styles.cardNumberText}>{item.maskedNumber}</Text>
                                        <Text style={styles.cardExpiry}>Expire le {item.expiry}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => deleteCard(item.id)}>
                                    <Ionicons name="trash-outline" size={20} color={Colors.light.error} />
                                </TouchableOpacity>
                            </View>
                        ))}
                        <Button
                            title="Ajouter une autre carte"
                            onPress={() => setIsModalVisible(true)}
                            variant="outline"
                            style={{ marginTop: 10 }}
                        />
                    </View>
                )}
            </ScrollView>

            {/* Add Card Modal */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Ajouter une Carte</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Ionicons name="close" size={24} color={Colors.light.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name="cardNumber"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        label="Numéro de Carte"
                                        placeholder="0000 0000 0000 0000"
                                        keyboardType="number-pad"
                                        maxLength={16}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        error={errors.cardNumber?.message}
                                        icon="card-outline"
                                    />
                                )}
                            />

                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Controller
                                        control={control}
                                        name="expiry"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label="Date d'expiration"
                                                placeholder="MM/YY"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                error={errors.expiry?.message}
                                                maxLength={5}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Controller
                                        control={control}
                                        name="cvv"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label="CVV"
                                                placeholder="123"
                                                keyboardType="number-pad"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                error={errors.cvv?.message}
                                                maxLength={4}
                                                secureTextEntry
                                            />
                                        )}
                                    />
                                </View>
                            </View>

                            <Button
                                title="Ajouter la carte"
                                onPress={handleSubmit(onSubmit)}
                                loading={isAdding}
                                style={{ marginTop: 24, marginBottom: 20 }}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
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
        padding: 20,
    },
    loadingState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        gap: 16,
    },
    emptyText: {
        fontSize: 16,
        color: Colors.light.muted,
        textAlign: 'center',
    },
    cardList: {
        gap: 16,
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    cardNumberText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    cardExpiry: {
        fontSize: 12,
        color: Colors.light.muted,
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        minHeight: 450,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    form: {
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    }
});
