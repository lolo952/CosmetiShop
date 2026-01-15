import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
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
import { auth, db } from '../../firebase';

const registerSchema = z.object({
    fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const fullNameRef = React.useRef<TextInput>(null);
    const emailRef = React.useRef<TextInput>(null);
    const passwordRef = React.useRef<TextInput>(null);
    const confirmPasswordRef = React.useRef<TextInput>(null);

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: RegisterForm) => {
        setIsLoading(true);
        Keyboard.dismiss();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            // 1. Update Auth profile
            await updateProfile(user, {
                displayName: data.fullName
            });

            // 2. Create Firestore profile document
            await setDoc(doc(db, 'users', user.uid), {
                fullName: data.fullName,
                email: data.email,
                uid: user.uid,
                createdAt: new Date().toISOString()
            });

            router.replace('/(tabs)');
        } catch (error: any) {
            console.error(error);
            let message = "Une erreur est survenue lors de l'inscription.";
            if (error.code === 'auth/email-already-in-use') {
                message = "Cet email est déjà utilisé.";
            }
            Alert.alert("Erreur", message);
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
                        <Text style={styles.title}>Créer un Compte</Text>
                        <Text style={styles.subtitle}>Rejoignez la communauté CosmetiShop pour une expérience beauté unique.</Text>
                    </View>

                    <View style={styles.form}>
                        {/* Full Name */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nom Complet</Text>
                            <Controller
                                control={control}
                                name="fullName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => fullNameRef.current?.focus()}
                                        style={[styles.inputWrapper, errors.fullName && styles.inputError]}
                                    >
                                        <Ionicons name="person-outline" size={20} color={Colors.light.muted} style={styles.inputIcon} />
                                        <TextInput
                                            ref={fullNameRef}
                                            placeholder="Votre Nom"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            style={styles.input}
                                            returnKeyType="next"
                                            onSubmitEditing={() => emailRef.current?.focus()}
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                            {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
                        </View>

                        {/* Email */}
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
                                            returnKeyType="next"
                                            onSubmitEditing={() => passwordRef.current?.focus()}
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                        </View>

                        {/* Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mot de passe</Text>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => passwordRef.current?.focus()}
                                        style={[styles.inputWrapper, errors.password && styles.inputError]}
                                    >
                                        <Ionicons name="lock-closed-outline" size={20} color={Colors.light.muted} style={styles.inputIcon} />
                                        <TextInput
                                            ref={passwordRef}
                                            placeholder="••••••••"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            style={styles.input}
                                            secureTextEntry={!showPassword}
                                            returnKeyType="next"
                                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Ionicons
                                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                                size={20}
                                                color={Colors.light.muted}
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )}
                            />
                            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirmer le mot de passe</Text>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => confirmPasswordRef.current?.focus()}
                                        style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}
                                    >
                                        <Ionicons name="lock-closed-outline" size={20} color={Colors.light.muted} style={styles.inputIcon} />
                                        <TextInput
                                            ref={confirmPasswordRef}
                                            placeholder="••••••••"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            style={styles.input}
                                            secureTextEntry={!showPassword}
                                            returnKeyType="done"
                                            onSubmitEditing={handleSubmit(onSubmit)}
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                        </View>
                    </View>

                    <Button
                        title="S'inscrire"
                        onPress={handleSubmit(onSubmit)}
                        loading={isLoading}
                        style={{ marginTop: 12 }}
                    />

                    <View style={styles.loginContainer}>
                        <Text style={styles.signupText}>Vous avez déjà un compte ? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                            <Text style={styles.signupLink}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
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
        marginBottom: 32,
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
        gap: 16,
    },
    inputContainer: {
        gap: 6,
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
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    signupText: {
        fontSize: 14,
        color: Colors.light.muted,
    },
    signupLink: {
        fontSize: 14,
        color: Colors.light.primary,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
});
