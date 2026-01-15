import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';
import { ProductProps } from '../components/shared/ProductCard';
import { db } from '../firebase'; 

export interface CartItem extends ProductProps {
    quantity: number;
}

export interface DeliveryInfo {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    shipping: DeliveryInfo;
    paymentMethod: string;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: any; // timestamp Firestore
}

interface CartContextType {
    items: CartItem[];
    orders: Order[];
    deliveryInfo: DeliveryInfo | null;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
    addToCart: (product: ProductProps) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    checkout: (details: { deliveryInfo: DeliveryInfo | null, paymentMethod: string, userId: string }) => Promise<void>;
    clearCart: () => void;
    totalAmount: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);

    const addToCart = (product: ProductProps) => {
        setItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const checkout = async ({ deliveryInfo, paymentMethod, userId }: { deliveryInfo: DeliveryInfo | null, paymentMethod: string, userId: string }) => {
        if (!deliveryInfo) throw new Error("Informations de livraison manquantes");
        if (!userId) throw new Error("Utilisateur non identifié");

        // Création de la commande pour Firestore
        const orderData = {
            userId,
            items,
            total: totalAmount,
            shipping: deliveryInfo,
            paymentMethod,
            status: 'pending', // tu peux mettre 'completed' si paiement déjà effectué
            createdAt: serverTimestamp(),
        };

        try {
            const docRef = await addDoc(collection(db, 'orders'), orderData);

            // Ajouter localement dans l'état pour afficher immédiatement
            setOrders(prev => [
                { ...orderData, id: docRef.id } as Order,
                ...prev
            ]);

            clearCart();
            console.log("Commande enregistrée avec succès:", docRef.id);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la commande :", error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{
            items,
            orders,
            deliveryInfo,
            setOrders,
            setDeliveryInfo,
            addToCart,
            removeFromCart,
            updateQuantity,
            checkout,
            clearCart,
            totalAmount,
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
