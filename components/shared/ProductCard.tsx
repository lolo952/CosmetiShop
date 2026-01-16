import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../hooks/useFavorites';
import { Product } from '../../types/product';
import Badge from './Badge';
import Button from './Button';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
    style?: ViewStyle;
}

export default function ProductCard({ product, onPress, style }: ProductCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { addToCart } = useCart();
    const favorited = isFavorite(product.id);



    const handleAddToCart = (e?: any) => {
        e?.stopPropagation?.();
        addToCart(product);
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.card, style]}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image source={product.image} style={styles.image} resizeMode="cover" />

                {/* Badges */}
                {product.badge && (
                    <View style={styles.badgeContainer}>
                        <Badge label={product.badge.label} variant={product.badge.variant} />
                    </View>
                )}

                {/* Favorite & Cart Buttons */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                        }}
                    >
                        <Ionicons
                            name={favorited ? "heart" : "heart-outline"}
                            size={18}
                            color={favorited ? Colors.light.primary : Colors.light.text}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                    >
                        <Ionicons
                            name="cart-outline"
                            size={18}
                            color={Colors.light.text}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.details}>
                <Text style={styles.brand}>{product.brand}</Text>
                <Text style={styles.title} numberOfLines={2}>{product.title}</Text>

                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Ionicons name="star-half" size={14} color="#FFD700" />
                    <Text style={styles.reviews}>({product.reviews})</Text>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{product.price.toFixed(2)} Dhs</Text>
                    {product.originalPrice && (
                        <Text style={styles.originalPrice}>
                            {product.originalPrice.toFixed(2)} Dhs
                        </Text>
                    )}
                </View>

                {/* Add to Cart Button */}
                <Button
                    title="Ajouter"
                    onPress={handleAddToCart}
                    variant="primary"
                    size="small"
                    style={styles.addBtn}
                    iconLeft={<Ionicons name="cart-outline" size={16} color="#fff" />}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        width: 250, // Fixed width for horizontal scrolls, can be overridden
        ...Platform.select({
            web: {
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            },
            default: {
                elevation: 2,
            },
        }),
    },
    imageContainer: {
        height: 300,
        width: '100%',
        backgroundColor: Colors.light.secondary,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    badgeContainer: {
        position: 'absolute',
        top: 12,
        left: 12,
    },
    actionsContainer: {
        position: 'absolute',
        top: 12,
        right: 12,
        gap: 8,
    },
    actionBtn: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    details: {
        padding: 16,
    },
    brand: {
        fontSize: 10,
        textTransform: 'uppercase',
        color: Colors.light.muted,
        marginBottom: 4,
        fontWeight: '600',
        letterSpacing: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 8,
        fontFamily: Platform.select({ web: 'serif', default: 'System' }),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 2,
    },
    reviews: {
        fontSize: 12,
        color: Colors.light.muted,
        marginLeft: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    originalPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: Colors.light.muted,
    },
    addBtn: {
        marginTop: 12,
        height: 36,
        borderRadius: 8,
    },
});


