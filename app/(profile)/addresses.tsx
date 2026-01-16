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

const addressSchema = z.object({
    label: z.string().min(2, 'Le nom est requis'),
    street: z.string().min(5, 'L\'adresse est trop courte'),
    city: z.string().min(2, 'La ville est requise'),
    zip: z.string().min(4, 'Code postal invalide'),
});

type AddressForm = z.infer<typeof addressSchema>;

interface Address extends AddressForm {
    id: string;
}

export default function AddressesScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<AddressForm>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            label: '',
            street: '',
            city: '',
            zip: '',
        }
    });

    useEffect(() => {
        if (user) {
            fetchAddresses();
        }
    }, [user]);

    const fetchAddresses = async () => {
        if (!user) return;
        try {
            setIsLoading(true);
            const q = query(collection(db, `users/${user.uid}/addresses`));
            const querySnapshot = await getDocs(q);
            const loadedAddresses: Address[] = [];
            querySnapshot.forEach((doc) => {
                loadedAddresses.push({ id: doc.id, ...doc.data() } as Address);
            });
            setAddresses(loadedAddresses);
        } catch (error) {
            console.error("Error fetching addresses:", error);
            Alert.alert("Erreur", "Impossible de charger vos adresses.");
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: AddressForm) => {
        if (!user) return;
        try {
            setIsAdding(true);
            const docRef = await addDoc(collection(db, `users/${user.uid}/addresses`), data);
            const newAddr: Address = {
                id: docRef.id,
                ...data
            };
            setAddresses(prev => [...prev, newAddr]);
            setIsModalVisible(false);
            reset();
            Keyboard.dismiss();
        } catch (error) {
            console.error("Error adding address:", error);
            Alert.alert("Erreur", "Impossible d'ajouter l'adresse.");
        } finally {
            setIsAdding(false);
        }
    };

    const deleteAddress = async (id: string) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, `users/${user.uid}/addresses`, id));
            setAddresses(prev => prev.filter(a => a.id !== id));
        } catch (error) {
            console.error("Error deleting address:", error);
            Alert.alert("Erreur", "Impossible de supprimer l'adresse.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Mes Adresses</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {isLoading ? (
                    <View style={styles.loadingState}>
                        <ActivityIndicator size="large" color={Colors.light.primary} />
                    </View>
                ) : addresses.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="location-outline" size={80} color={Colors.light.muted} />
                        <Text style={styles.emptyText}>Vous n'avez pas encore d'adresses enregistrées.</Text>
                        <Button
                            title="Ajouter une adresse"
                            onPress={() => setIsModalVisible(true)}
                            style={{ marginTop: 20 }}
                        />
                    </View>
                ) : (
                    <View style={styles.addressList}>
                        {addresses.map((item) => (
                            <View key={item.id} style={styles.addressCard}>
                                <View style={styles.addressInfo}>
                                    <View style={styles.labelBadge}>
                                        <Text style={styles.labelText}>{item.label}</Text>
                                    </View>
                                    <Text style={styles.addressText}>{item.street}</Text>
                                    <Text style={styles.addressSubText}>{item.zip} {item.city}</Text>
                                </View>
                                <TouchableOpacity onPress={() => deleteAddress(item.id)}>
                                    <Ionicons name="trash-outline" size={20} color={Colors.light.error} />
                                </TouchableOpacity>
                            </View>
                        ))}
                        <Button
                            title="Ajouter une nouvelle adresse"
                            onPress={() => setIsModalVisible(true)}
                            variant="outline"
                            style={{ marginTop: 10 }}
                        />
                    </View>
                )}
            </ScrollView>

            {/* Add Address Modal */}
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
                            <Text style={styles.modalTitle}>Nouvelle Adresse</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Ionicons name="close" size={24} color={Colors.light.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.form}>
                                <Controller
                                    control={control}
                                    name="label"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label="Nom de l'adresse"
                                            placeholder="Maison, Bureau..."
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            error={errors.label?.message}
                                            icon="bookmark-outline"
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="street"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label="Rue"
                                            placeholder="123 Rue de la Beauté"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            error={errors.street?.message}
                                            icon="location-outline"
                                        />
                                    )}
                                />

                                <View style={styles.row}>
                                    <View style={{ flex: 1 }}>
                                        <Controller
                                            control={control}
                                            name="city"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input
                                                    label="Ville"
                                                    placeholder="Casablanca"
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    error={errors.city?.message}
                                                />
                                            )}
                                        />
                                    </View>
                                    <View style={{ width: 120 }}>
                                        <Controller
                                            control={control}
                                            name="zip"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input
                                                    label="Code Postal"
                                                    placeholder="20000"
                                                    keyboardType="number-pad"
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    error={errors.zip?.message}
                                                />
                                            )}
                                        />
                                    </View>
                                </View>

                                <Button
                                    title="Ajouter"
                                    onPress={handleSubmit(onSubmit)}
                                    loading={isAdding}
                                    style={{ marginTop: 24, marginBottom: 40 }}
                                />
                            </View>
                        </ScrollView>
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
    addressList: {
        gap: 16,
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    addressInfo: {
        flex: 1,
    },
    labelBadge: {
        backgroundColor: '#FFF0F5',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 8,
    },
    labelText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    addressText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    addressSubText: {
        fontSize: 14,
        color: Colors.light.muted,
        marginTop: 2,
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
        maxHeight: '90%',
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
