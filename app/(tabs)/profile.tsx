import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderHistory from '../../components/cart/OrderHistory';
import { Colors } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/auth-context';

const MENU_ITEMS = [
    { id: '1', icon: 'person-outline', label: 'Informations personnelles', sub: 'Nom, email, numéro...', route: '/personal-info' },
    { id: '2', icon: 'cart-outline', label: 'Mes Commandes', sub: 'Historique, suivi...', route: '/orders' },
    { id: '3', icon: 'heart-outline', label: 'Ma Liste de Souhaits', sub: 'Produits enregistrés', route: '/wishlist' },
    { id: '4', icon: 'location-outline', label: 'Adresses de livraison', sub: 'Gérer vos adresses', route: '/addresses' },
    { id: '5', icon: 'card-outline', label: 'Méthodes de paiement', sub: 'Gérer vos cartes', route: '/payment-methods' },
    { id: '6', icon: 'notifications-outline', label: 'Notifications', sub: 'Alertes, promotions...', route: '/notifications-settings' },
    { id: '7', icon: 'help-circle-outline', label: 'Aide & Support', sub: 'FAQ, contact...', route: '/help-support' },
];

export default function ProfileScreen() {
    const { orders } = useCart();
    const { user, userProfile, signOut, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
    };

    const handleAuthAction = () => {
        if (user) {
            handleLogout();
        } else {
            router.push('/login' as any);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons name="person" size={40} color={Colors.light.primary} />
                        </View>
                        <TouchableOpacity style={styles.editAvatarBtn}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>
                        {userProfile?.fullName || user?.displayName || 'Utilisateur'}
                    </Text>
                    <Text style={styles.userEmail}>
                        {userProfile?.email || user?.email || 'invité@cosmetishop.ma'}
                    </Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{orders.length}</Text>
                            <Text style={styles.statLabel}>Commandes</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>5</Text>
                            <Text style={styles.statLabel}>Favoris</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>320</Text>
                            <Text style={styles.statLabel}>Points</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Section */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuTitle}>Mon Compte</Text>
                    {MENU_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => {
                                if (user) {
                                    router.push(item.route as any);
                                } else {
                                    router.push('/login' as any);
                                }
                            }}
                        >
                            <View style={styles.menuItemLeft}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name={item.icon as any} size={22} color={Colors.light.primary} />
                                </View>
                                <View>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                    <Text style={styles.menuSubLabel}>{item.sub}</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={Colors.light.muted} />
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={[styles.menuItem, styles.logoutBtn]}
                        onPress={handleAuthAction}
                    >
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: user ? '#FFEEF0' : '#E8F5E9' }]}>
                                <Ionicons
                                    name={user ? "log-out-outline" : "log-in-outline"}
                                    size={22}
                                    color={user ? "#FF4D4D" : "#4CAF50"}
                                />
                            </View>
                            <Text style={[styles.menuLabel, { color: user ? '#FF4D4D' : '#4CAF50' }]}>
                                {user ? 'Se déconnecter' : 'Se connecter'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Order History Section */}
                    {orders.length > 0 && (
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.menuTitle}>Mon Historique</Text>
                            <OrderHistory />
                        </View>
                    )}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.versionText}>CosmetiShop v1.0.0</Text>
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
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF0F5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: '#fff',
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.light.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    userName: {
        fontSize: 24,
        fontFamily: Platform.select({ web: 'Playfair Display', default: 'System' }),
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.light.muted,
        marginBottom: 24,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    statItem: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.light.muted,
        marginTop: 4,
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: '#f0f0f0',
    },
    menuSection: {
        padding: 20,
    },
    menuTitle: {
        fontSize: 20,
        fontFamily: Platform.select({ web: 'Playfair Display', default: 'System' }),
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 20,
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FFF0F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    menuSubLabel: {
        fontSize: 12,
        color: Colors.light.muted,
        marginTop: 2,
    },
    logoutBtn: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#FFEEF0',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 30,
        opacity: 0.5,
    },
    versionText: {
        fontSize: 12,
        color: Colors.light.muted,
    },
});
