import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
import { auth } from '../../firebase';

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const emailRef = React.useRef<TextInput>(null);
    const passwordRef = React.useRef<TextInput>(null);

    const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: LoginForm) => {
        setIsLoading(true);
        Keyboard.dismiss(); // Dismiss keyboard on submit
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            router.replace('/(tabs)');
        } catch (error: any) {
            console.error(error);
            let message = "Une erreur est survenue lors de la connexion.";
            if (
                error.code === 'auth/user-not-found' ||
                error.code === 'auth/wrong-password' ||
                error.code === 'auth/invalid-credential'
            ) {
                message = "Compte inexistant ou mot de passe incorrect.";
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
                        <Text style={styles.title}>Bon Retour !</Text>
                        <Text style={styles.subtitle}>Connectez-vous pour continuer vos achats chez CosmetiShop.</Text>
                    </View>

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
                                            returnKeyType="next"
                                            onSubmitEditing={() => passwordRef.current?.focus()}
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                        </View>

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
                                            returnKeyType="done"
                                            onSubmitEditing={handleSubmit(onSubmit)}
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

                        <TouchableOpacity
                            onPress={() => router.push('/(auth)/forgot-password')}
                            style={styles.forgotPassword}
                        >
                            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                        </TouchableOpacity>

                        <Button
                            title="Se Connecter"
                            onPress={handleSubmit(onSubmit)}
                            loading={isLoading}
                            style={{ marginTop: 12 }}
                        />

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Vous n'avez pas de compte ? </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                <Text style={styles.signupLink}>S'inscrire</Text>
                            </TouchableOpacity>
                        </View>
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
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        fontSize: 14,
        color: Colors.light.primary,
        fontWeight: '600',
    },
    loginButton: {
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
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
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
});
