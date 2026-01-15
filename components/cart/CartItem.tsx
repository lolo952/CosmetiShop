import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/theme';
import { CartItem, useCart } from '../../context/CartContext';

interface CartItemProps {
    item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <View style={styles.container}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />

            <View style={styles.details}>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.price}>{item.price.toFixed(2)} Dhs</Text>

                <View style={styles.controls}>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                            style={styles.qtyBtn}
                        >
                            <Ionicons name="remove" size={16} color={Colors.light.text} />
                        </TouchableOpacity>

                        <Text style={styles.quantity}>{item.quantity}</Text>

                        <TouchableOpacity
                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                            style={styles.qtyBtn}
                        >
                            <Ionicons name="add" size={16} color={Colors.light.text} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => removeFromCart(item.id)}
                        style={styles.deleteBtn}
                    >
                        <Ionicons name="trash-outline" size={18} color="#FF4D4D" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: Colors.light.secondary,
    },
    details: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    brand: {
        fontSize: 10,
        textTransform: 'uppercase',
        color: Colors.light.muted,
        fontWeight: '600',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.primary,
        marginBottom: 12,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 4,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantity: {
        fontSize: 14,
        fontWeight: '600',
        marginHorizontal: 12,
        minWidth: 20,
        textAlign: 'center',
    },
    deleteBtn: {
        padding: 8,
    }
});
