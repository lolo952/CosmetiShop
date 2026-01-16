import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/shared/Button';
import { Colors } from '../../constants/theme';

export default function SuccessScreen() {
    const router = useRouter();

    React.useEffect(() => {
        console.log("SuccessScreen monté avec succès !");
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <View style={styles.circleBg}>
                        <Ionicons name="checkmark-sharp" size={60} color="#fff" />
                    </View>
                    <View style={styles.sparkle1} />
                    <View style={styles.sparkle2} />
                    <View style={styles.sparkle3} />
                </View>

                <Text style={styles.title}>Paiement confirmé !</Text>
                <Text style={styles.subtitle}>
                    Votre paiement a été effectué avec succès. Votre commande a été enregistrée.
                </Text>

                <View style={styles.infoBox}>
                    <Ionicons name="mail-outline" size={20} color={Colors.light.primary} />
                    <Text style={styles.infoText}>
                        Un email de confirmation vous a été envoyé avec tous les détails de votre commande.
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Continuer mes achats"
                        onPress={() => router.replace('/(tabs)')}
                        style={styles.mainBtn}
                    />
                    <Button
                        title="Voir mes commandes"
                        onPress={() => router.push('/(tabs)/profile' as any)}
                        variant="outline"
                        style={styles.outlineBtn}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCFD',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    iconContainer: {
        position: 'relative',
        marginBottom: 40,
    },
    circleBg: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    sparkle1: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFD700',
    },
    sparkle2: {
        position: 'absolute',
        bottom: 20,
        left: -15,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.light.primary,
    },
    sparkle3: {
        position: 'absolute',
        top: 30,
        left: -25,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#64B5F6',
        opacity: 0.6,
    },
    title: {
        fontSize: 28,
        fontFamily: Platform.OS === 'web' ? 'Playfair Display' : 'System',
        fontWeight: 'bold',
        color: Colors.light.text,
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.muted,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F5',
        padding: 16,
        borderRadius: 16,
        gap: 12,
        marginBottom: 48,
        maxWidth: 350,
    },
    infoText: {
        fontSize: 14,
        color: Colors.light.text,
        flex: 1,
        lineHeight: 20,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        gap: 12,
    },
    mainBtn: {
        height: 56,
        borderRadius: 16,
    },
    outlineBtn: {
        height: 56,
        borderRadius: 16,
    },
});
