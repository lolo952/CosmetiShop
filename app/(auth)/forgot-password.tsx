import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
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
import { auth } from '../../firebase';

const forgotPasswordSchema = z.object({
    email: z.string().email('Email invalide'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const emailRef = useRef<TextInput>(null);

    const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = async (data: ForgotPasswordForm) => {
        Keyboard.dismiss();
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, data.email);
            setIsSent(true);
        } catch (error: any) {
            console.error(error);
            Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi de l'email de réinitialisation.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.title}>Mot de passe oublié ?</Text>
                        <Text style={styles.subtitle}>
                            {isSent
                                ? "Un email de réinitialisation a été envoyé à votre adresse."
                                : "Entrez votre email pour recevoir un lien de réinitialisation."}
                        </Text>
                    </View>

                    {!isSent ? (
                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => emailRef.current?.focus()}
                                            style={[styles.inputWrapper, errors.email && styles.inputError]}
                                        >
                                            <Ionicons name="mail-outline" size={20} color={Colors.light.muted} style={styles.inputIcon} />
                                            <TextInput
                                                ref={emailRef}
                                                placeholder="votre@email.com"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                style={styles.input}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                returnKeyType="done"
                                                onSubmitEditing={handleSubmit(onSubmit)}
                                            />
                                        </TouchableOpacity>
                                    )}
                                />
                                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                            </View>

                            <Button
                                title="Envoyer le lien"
                                onPress={handleSubmit(onSubmit)}
                                loading={isLoading}
                                style={{ marginTop: 12 }}
                            />
                        </View>
                    ) : (
                        <Button
                            title="Retour au Login"
                            onPress={() => router.replace('/login' as any)}
                            style={{ marginTop: 12 }}
                        />
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    scrollContent: {
        padding: 24,
        flexGrow: 1,
        maxWidth: 600,
        width: '100%',
        alignSelf: 'center',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontFamily: Platform.select({ web: 'Playfair Display', default: 'System' }),
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.muted,
        lineHeight: 24,
    },
    form: {
        gap: 20,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text,
    },
    inputError: {
        borderColor: Colors.light.error,
    },
    errorText: {
        fontSize: 12,
        color: Colors.light.error,
        marginLeft: 4,
    },
    sendButton: {
        backgroundColor: Colors.light.primary,
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
