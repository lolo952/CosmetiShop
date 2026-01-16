import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../../components/shared/ProductCard';
import { Colors } from '../../constants/theme';

import { Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { CATEGORIES, PRODUCTS } from '../../constants/products';

export default function SearchScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const { category } = useLocalSearchParams<{ category: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
            setShowFilters(true); // Show filters so user sees what is selected
        }
    }, [category]);

    const filteredProducts = PRODUCTS.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Title and Result Count */}
                    <View style={styles.headerSection}>
                        <Text style={styles.pageTitle}>Catalogue</Text>
                        <Text style={styles.resultCount}>{filteredProducts.length} produits trouvés</Text>
                    </View>

                    {/* Secondary Search Bar */}
                    <View style={styles.secondarySearchContainer}>
                        <Ionicons name="search-outline" size={20} color={Colors.light.muted} style={styles.searchIcon} />
                        <TextInput
                            style={styles.secondaryInput}
                            placeholder="Rechercher un produit..."
                            placeholderTextColor={Colors.light.muted}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Filter Button */}
                    <TouchableOpacity
                        style={styles.filterBtn}
                        onPress={() => setShowFilters(!showFilters)}
                    >
                        <Ionicons name="options-outline" size={20} color={Colors.light.primary} />
                        <Text style={styles.filterBtnText}>{showFilters ? "Masquer les filtres" : "Filtres"}</Text>
                    </TouchableOpacity>

                    {/* Interactive Filters */}
                    {showFilters && (
                        <>
                            {/* Category Filter */}
                            <View style={styles.filterSection}>
                                <Text style={styles.sectionLabel}>Catégorie</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsContainer}>
                                    {CATEGORIES.map((cat) => (
                                        <TouchableOpacity
                                            key={cat}
                                            onPress={() => setSelectedCategory(cat)}
                                            style={[
                                                styles.pill,
                                                selectedCategory === cat && styles.activePill
                                            ]}
                                        >
                                            <Text style={[
                                                styles.pillText,
                                                selectedCategory === cat && styles.activePillText
                                            ]}>
                                                {cat}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </>
                    )}

                    {/* Results Grid */}
                    <View style={styles.grid}>
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onPress={() => router.push(`/product/${product.id}` as Href)}
                                style={isMobile ? { width: '100%', marginBottom: 16 } : { width: '48%', marginBottom: 20 }}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCFD', // Using the theme background
    },
    topSearchWrapper: {
        padding: 16,
        backgroundColor: '#fff',
    },
    topSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F5',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 6,
        height: 54,
        borderWidth: 1,
        borderColor: '#F8DBE0',
    },
    topSearchInput: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text,
        ...Platform.select({
            web: { outlineStyle: 'none' } as any,
        }),
    },
    topSearchBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 20,
    },
    headerSection: {
        marginBottom: 24,
    },
    pageTitle: {
        fontSize: 32,
        fontFamily: Platform.select({ web: 'Playfair Display', default: 'System' }),
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 4,
    },
    resultCount: {
        fontSize: 16,
        color: Colors.light.muted,
    },
    secondarySearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F5',
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 48,
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 10,
    },
    secondaryInput: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text,
        ...Platform.select({
            web: { outlineStyle: 'none' } as any,
        }),
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF0F5',
        borderRadius: 12,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#F8DBE0',
        marginBottom: 32,
        gap: 8,
    },
    filterBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    filterSection: {
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 16,
        fontFamily: Platform.select({ web: 'Playfair Display', default: 'System' }),
    },
    pillsContainer: {
        paddingBottom: 4,
    },
    pill: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#FFF0F5',
        marginRight: 12,
    },
    activePill: {
        backgroundColor: Colors.light.primary,
    },
    pillText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
    },
    activePillText: {
        color: '#fff',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
