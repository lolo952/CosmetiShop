import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/shared/Button';
import Footer from '../../components/shared/Footer';
import { PRODUCTS } from '../../constants/products';
import { Colors } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const { addToCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();

    const [containerWidth, setContainerWidth] = React.useState(0);

    const product = PRODUCTS.find((p) => p.id === id);
    const favorited = product ? isFavorite(product.id) : false;

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text>Produit non trouvé</Text>
                <Button title="Retour" onPress={() => router.back()} />
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{
                headerShown: true,
                title: product.title,
                headerTitleStyle: { fontFamily: 'PlayfairDisplay_700Bold' }
            }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={[styles.container, isMobile ? styles.containerMobile : styles.containerDesktop]}>
                        {/* Product Images */}
                        <View
                            style={[styles.imageSection, !isMobile && { width: '45%' }]}
                            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
                        >
                            {product.secondaryImage ? (
                                <ScrollView
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={true}
                                    style={{ flex: 1 }}
                                >
                                    <Image
                                        source={product.image}
                                        style={[styles.image, { width: containerWidth || '100%' }]}
                                        resizeMode="cover"
                                    />
                                    <Image
                                        source={product.secondaryImage}
                                        style={[styles.image, { width: containerWidth || '100%' }]}
                                        resizeMode="cover"
                                    />
                                </ScrollView>
                            ) : (
                                <Image
                                    source={product.image}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            )}
                        </View>

                        {/* Product Info */}
                        <View style={[styles.infoSection, !isMobile && { width: '50%' }]}>
                            <Text style={styles.brand}>{product.brand}</Text>
                            <Text style={styles.title}>{product.title}</Text>

                            <View style={styles.ratingRow}>
                                <View style={styles.stars}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Ionicons
                                            key={s}
                                            name={s <= Math.floor(product.rating) ? "star" : (s - 0.5 <= product.rating ? "star-half" : "star-outline")}
                                            size={18}
                                            color="#FFD700"
                                        />
                                    ))}
                                </View>
                                <Text style={styles.reviews}>{product.rating} ({product.reviews} avis)</Text>
                            </View>

                            <View style={styles.priceRow}>
                                <Text style={styles.price}>{product.price.toFixed(2)} Dhs</Text>
                                {product.originalPrice && (
                                    <Text style={styles.originalPrice}>{product.originalPrice.toFixed(2)} Dhs</Text>
                                )}
                            </View>

                            <Text style={styles.descriptionTitle}>Description</Text>
                            <Text style={styles.description}>
                                {product.description || "Un produit d'exception sélectionné par CosmetiShop pour sa qualité et son efficacité. Retrouvez tout le savoir-faire de la marque pour sublimer votre routine beauté."}
                            </Text>

                            <View style={styles.actionButtons}>
                                <Button
                                    title="Ajouter au panier"
                                    onPress={() => addToCart(product)}
                                    style={styles.addToCartBtn}
                                    iconLeft={<Ionicons name="cart-outline" size={20} color="#fff" />}
                                />
                                <TouchableOpacity
                                    style={styles.favoriteBtn}
                                    onPress={() => toggleFavorite(product.id)}
                                >
                                    <Ionicons
                                        name={favorited ? "heart" : "heart-outline"}
                                        size={24}
                                        color={favorited ? Colors.light.primary : Colors.light.text}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.benefits}>
                                <View style={styles.benefitItem}>
                                    <Ionicons name="car-outline" size={20} color={Colors.light.primary} />
                                    <Text style={styles.benefitText}>Livraison gratuite dès 500 DHS</Text>
                                </View>
                                <View style={styles.benefitItem}>
                                    <Ionicons name="shield-checkmark-outline" size={20} color={Colors.light.primary} />
                                    <Text style={styles.benefitText}>Paiement 100% sécurisé</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Footer />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        padding: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
    },
    containerMobile: {
        flexDirection: 'column',
    },
    containerDesktop: {
        paddingVertical: 60,
    },
    imageSection: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: Colors.light.secondary,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 24,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoSection: {
        width: '100%',
    },
    brand: {
        fontSize: 14,
        textTransform: 'uppercase',
        color: Colors.light.primary,
        fontWeight: '700',
        letterSpacing: 2,
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontFamily: 'PlayfairDisplay_700Bold',
        color: Colors.light.text,
        marginBottom: 16,
        lineHeight: 40,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 12,
    },
    stars: {
        flexDirection: 'row',
        gap: 2,
    },
    reviews: {
        fontSize: 14,
        color: Colors.light.muted,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 32,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    originalPrice: {
        fontSize: 20,
        textDecorationLine: 'line-through',
        color: Colors.light.muted,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 26,
        color: Colors.light.muted,
        marginBottom: 40,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 40,
    },
    addToCartBtn: {
        flex: 1,
        height: 56,
        borderRadius: 16,
    },
    favoriteBtn: {
        width: 56,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    benefits: {
        paddingTop: 40,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        gap: 16,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    benefitText: {
        fontSize: 14,
        color: Colors.light.text,
    },
});
