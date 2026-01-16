import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../context/auth-context';
import { db } from '../../firebase';

export default function NotificationsSettingsScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const [isPushEnabled, setIsPushEnabled] = useState(true);
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchSettings();
        }
    }, [user]);

    const fetchSettings = async () => {
        if (!user) return;
        try {
            setIsLoading(true);
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.settings) {
                    setIsPushEnabled(data.settings.pushNotifications ?? true);
                    setIsEmailEnabled(data.settings.emailMarketing ?? false);
                }
            }
        } catch (error) {
            console.error("Error fetching notification settings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateSettings = async (type: 'push' | 'email', value: boolean) => {
        if (!user) return;

        // Optimistic update
        if (type === 'push') setIsPushEnabled(value);
        else setIsEmailEnabled(value);

        try {
            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                [`settings.${type === 'push' ? 'pushNotifications' : 'emailMarketing'}`]: value,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error updating settings:", error);
            // Revert on error
            if (type === 'push') setIsPushEnabled(!value);
            else setIsEmailEnabled(!value);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Notifications</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={Colors.light.primary} />
                ) : (
                    <View style={styles.section}>
                        <View style={styles.settingItem}>
                            <View style={styles.textContainer}>
                                <Text style={styles.settingLabel}>Notifications Push</Text>
                                <Text style={styles.settingDesc}>Alertes sur vos commandes et promos.</Text>
                            </View>
                            <Switch
                                value={isPushEnabled}
                                onValueChange={(val) => updateSettings('push', val)}
                                trackColor={{ false: '#f0f0f0', true: Colors.light.primary }}
                                thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <View style={styles.textContainer}>
                                <Text style={styles.settingLabel}>Email Marketing</Text>
                                <Text style={styles.settingDesc}>Recevoir nos meilleures offres par email.</Text>
                            </View>
                            <Switch
                                value={isEmailEnabled}
                                onValueChange={(val) => updateSettings('email', val)}
                                trackColor={{ false: '#f0f0f0', true: Colors.light.primary }}
                                thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
                            />
                        </View>
                    </View>
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
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    textContainer: {
        flex: 1,
        paddingRight: 16,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    settingDesc: {
        fontSize: 12,
        color: Colors.light.muted,
        marginTop: 2,
    }
});
