import { Ionicons } from '@expo/vector-icons';
import { Link, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';

export default function Header() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isSearchVisible, setIsSearchVisible] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { label: 'Accueil', path: '/' },
        { label: 'Produits', path: '/products' },
        { label: 'Catégories', path: '/categories' },
        { label: 'Nouveautés', path: '/new-arrivals' },
    ];

    const handleNavigation = (path: string) => {
        setIsMenuOpen(false);
        setIsSearchVisible(false);
        router.push(path as any);
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setIsSearchVisible(false);
            router.push(`/search?q=${encodeURIComponent(searchQuery)}` as any);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                {/* Logo */}
                <Link href="/" asChild>
                    <TouchableOpacity>
                        <View style={styles.logoContainer}>
                            <Text style={[styles.logo, { color: Colors.light.primary }]}>Cosmeti<Text style={styles.logoPink}>Shop</Text></Text>
                            <Text style={styles.tagline}>Votre beauté, notre passion</Text>
                        </View>
                    </TouchableOpacity>
                </Link>

                {/* Desktop Navigation - Hidden on mobile */}
                <View style={styles.desktopNav}>
                    {navItems.map((item) => (
                        <TouchableOpacity
                            key={item.label}
                            style={styles.navItem}
                            onPress={() => handleNavigation(item.path)}
                        >
                            <Text style={[styles.navText, (pathname === item.path || (item.path === '/' && pathname === '/(tabs)')) && styles.activeNavText]}>
                                {item.label}
                            </Text>
                            {(pathname === item.path || (item.path === '/' && pathname === '/(tabs)')) && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Icons */}
                <View style={styles.icons}>
                    {isSearchVisible ? (
                        <View style={styles.searchOverlay}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Rechercher..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoFocus
                                onSubmitEditing={handleSearch}
                                placeholderTextColor={Colors.light.muted}
                            />
                            <TouchableOpacity onPress={() => setIsSearchVisible(false)}>
                                <Ionicons name="close-outline" size={24} color={Colors.light.text} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.iconBtn} onPress={() => setIsSearchVisible(true)}>
                            <Ionicons name="search-outline" size={20} color={Colors.light.text} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.iconBtn} onPress={() => handleNavigation('/cart')}>
                        <Ionicons name="cart-outline" size={20} color={Colors.light.text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn} onPress={() => handleNavigation('/profile')}>
                        <Ionicons name="person-outline" size={20} color={Colors.light.text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuBtn} onPress={toggleMenu}>
                        <Ionicons name={isMenuOpen ? "close-outline" : "menu-outline"} size={26} color={Colors.light.text} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <View style={styles.mobileMenu}>
                    {navItems.map((item) => (
                        <TouchableOpacity
                            key={item.label}
                            style={styles.menuItem}
                            onPress={() => handleNavigation(item.path)}
                        >
                            <Text style={[styles.menuText, (pathname === item.path) && { color: Colors.light.primary }]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        zIndex: 100,
        position: 'relative', // Ensure menu absolute positioning works relative to this
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        maxWidth: 1400,
        width: '100%',
        alignSelf: 'center',
        zIndex: 101, // Keep content above menu
        backgroundColor: 'transparent', // Ensure background covers menu top
    },
    logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    logo: {
        fontSize: 24,
        // fontWeight: 'bold', // Handled by font family
        color: Colors.light.primary,
        fontFamily: 'PlayfairDisplay_700Bold',
    },
    logoPink: {
        color: Colors.light.primary,
    },
    tagline: {
        fontSize: 10,
        color: Colors.light.muted,
    },
    desktopNav: {
        flexDirection: 'row',
        gap: 32,
        display: Platform.select({ web: 'flex', default: 'none' }), // Simple hiding for now
    },
    navItem: {
        position: 'relative',
        paddingVertical: 4,
    },
    navText: {
        fontSize: 16,
        color: Colors.light.muted,
        fontWeight: '500',
    },
    activeNavText: {
        color: Colors.light.primary,
        fontWeight: '600',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: Colors.light.primary,
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    searchOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 40,
        width: Platform.select({ web: 300, default: 200 }),
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: Colors.light.text,
        marginRight: 10,
        ...Platform.select({
            web: { outlineStyle: 'none' } as any,
        }),
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5', // Light grey background restored for mobile consistency
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    mobileMenu: {
        position: 'absolute',
        top: '100%', // Position exactly below the header container
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        zIndex: 99,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    menuItem: {
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    menuText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#1A1A1A',
    },
});
