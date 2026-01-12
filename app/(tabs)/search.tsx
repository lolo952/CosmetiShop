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

const CATEGORIES = ['Tous', 'Soins', 'Maquillage', 'Parfums', 'Corps'];
const PRICE_RANGES = ['Tous les prix', '0-20 Dhs', '20-40 Dhs', '40-60 Dhs', '60+ Dhs'];

const MOCK_PRODUCTS = [
    {
        id: '1',
        title: 'Sérum Vitamine C Éclat Radieux',
        brand: 'Luminé',
        price: 499.00,
        originalPrice: 699.00,
        rating: 4.8,
        reviews: 234,
        image: { uri: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        badge: { label: '-29%', variant: 'sale' as const },
    },
    {
        id: '2',
        title: 'Crème Hydratante Intensive 24h',
        brand: 'Aqua Pure',
        price: 380.00,
        rating: 4.9,
        reviews: 512,
        image: { uri: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        badge: { label: 'Nouveau', variant: 'new' as const },
    },
];

export default function SearchScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [selectedPrice, setSelectedPrice] = useState('Tous les prix');
    const [showFilters, setShowFilters] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Title and Result Count */}
                    <View style={styles.headerSection}>
                        <Text style={styles.pageTitle}>Tous nos produits</Text>
                        <Text style={styles.resultCount}>8 produits trouvés</Text>
                    </View>

                    {/* Secondary Search Bar */}
                    <View style={styles.secondarySearchContainer}>
                        <Ionicons name="search-outline" size={20} color={Colors.light.muted} style={styles.searchIcon} />
                        <TextInput
                            style={styles.secondaryInput}
                            placeholder="Rechercher un produit..."
                            placeholderTextColor={Colors.light.muted}
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

                            {/* Price Filter */}
                            <View style={styles.filterSection}>
                                <Text style={styles.sectionLabel}>Prix</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsContainer}>
                                    {PRICE_RANGES.map((range) => (
                                        <TouchableOpacity
                                            key={range}
                                            onPress={() => setSelectedPrice(range)}
                                            style={[
                                                styles.pill,
                                                selectedPrice === range && styles.activePill
                                            ]}
                                        >
                                            <Text style={[
                                                styles.pillText,
                                                selectedPrice === range && styles.activePillText
                                            ]}>
                                                {range}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </>
                    )}

                    {/* Results Grid */}
                    <View style={styles.grid}>
                        {[...MOCK_PRODUCTS, ...MOCK_PRODUCTS, ...MOCK_PRODUCTS, ...MOCK_PRODUCTS].map((product, index) => (
                            <ProductCard
                                key={`${product.id}-${index}`}
                                product={product}
                                onPress={() => { }}
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
