import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';
import Button from '../../components/shared/Button';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../context/auth-context';
import { db } from '../../firebase';

const personalInfoSchema = z.object({
    fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    phone: z.string().optional(),
});

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoScreen() {
    const router = useRouter();
    const { user, userProfile, loading: authLoading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<PersonalInfoForm>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            fullName: userProfile?.fullName || user?.displayName || '',
            email: userProfile?.email || user?.email || '',
            phone: userProfile?.phone || '',
        }
    });

    // Sync form values when userProfile changes (e.g., after a background update)
    useEffect(() => {
        if (userProfile && !isEditing) {
            setValue('fullName', userProfile.fullName || '');
            setValue('email', userProfile.email || '');
            setValue('phone', userProfile.phone || '');
        }
    }, [userProfile, isEditing]);

    const onSubmit = async (data: PersonalInfoForm) => {
        if (!user) return;
        setIsLoading(true);
        Keyboard.dismiss();
        try {
            // 1. Update Firebase Auth Profile (for displayName)
            if (data.fullName !== user.displayName) {
                await updateProfile(user, {
                    displayName: data.fullName
                });
            }

            // 2. Update/Create Firestore Profile Document
            const docRef = doc(db, 'users', user.uid);
            await setDoc(docRef, {
                fullName: data.fullName,
                email: data.email,
                uid: user.uid,
                phone: data.phone || '',
                updatedAt: new Date().toISOString()
            }, { merge: true });

            setIsEditing(false);
            Alert.alert("Succès", "Vos informations ont été mises à jour.");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset({
            fullName: userProfile?.fullName || '',
            email: userProfile?.email || '',
            phone: userProfile?.phone || '',
        });
        setIsEditing(false);
    };

    if (authLoading) {
        return (
            <SafeAreaView style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Informations Personnelles</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.infoSection}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Nom Complet</Text>
                        {isEditing ? (
                            <Controller
                                control={control}
                                name="fullName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="Votre nom"
                                        />
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={styles.value}>{userProfile?.fullName || user?.displayName || 'Non renseigné'}</Text>
                        )}
                        {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Email</Text>
                        {isEditing ? (
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={[styles.inputWrapper, styles.disabledInput]}>
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="votre@email.com"
                                            editable={false}
                                        />
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={styles.value}>{userProfile?.email || user?.email || 'Non renseigné'}</Text>
                        )}
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Numéro de téléphone</Text>
                        {isEditing ? (
                            <Controller
                                control={control}
                                name="phone"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="+212 ..."
                                            keyboardType="phone-pad"
                                        />
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={styles.value}>{userProfile?.phone || 'Non renseigné'}</Text>
                        )}
                    </View>
                </View>

                {isEditing ? (
                    <View style={styles.buttonGroup}>
                        <Button
                            title="Enregistrer"
                            onPress={handleSubmit(onSubmit)}
                            loading={isLoading}
                            style={{ flex: 1 }}
                        />
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}
                            disabled={isLoading}
                        >
                            <Text style={styles.cancelButtonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Button
                        title="Modifier mes informations"
                        onPress={() => setIsEditing(true)}
                        variant="outline"
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCFD',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
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
        padding: 20,
    },
    infoSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    infoItem: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 12,
    },
    label: {
        fontSize: 14,
        color: Colors.light.muted,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    inputWrapper: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 48,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        marginTop: 4,
    },
    disabledInput: {
        opacity: 0.6,
        backgroundColor: '#f0f0f0',
    },
    input: {
        fontSize: 16,
        color: Colors.light.text,
    },
    errorText: {
        fontSize: 12,
        color: Colors.light.error,
        marginTop: 4,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },
    cancelButtonText: {
        color: Colors.light.muted,
        fontWeight: '600',
    }
});
