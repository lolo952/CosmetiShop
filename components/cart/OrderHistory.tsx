import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/theme';
import { Order, useCart } from '../../context/CartContext';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

// Fonction pour récupérer les commandes depuis Firestore
const fetchOrdersFromFirestore = async (): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc')); // Tri par date décroissante
    const snapshot = await getDocs(q);
    const orders: Order[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
    return orders;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return [];
  }
};

export default function OrderHistory() {
  const { orders: contextOrders, setOrders } = useCart(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const ordersFromDB = await fetchOrdersFromFirestore();
      setOrders(ordersFromDB);
      setLoading(false);
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Chargement des commandes...</Text>
      </View>
    );
  }

  if (!contextOrders || contextOrders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="receipt-outline" size={60} color={Colors.light.muted} />
        <Text style={styles.emptyText}>Aucune commande passée pour le moment.</Text>
      </View>
    );
  }

  const renderOrderItem = ({ item }: { item: Order }) => {
    // Sécurité : forcer items à être un tableau
    const items = Array.isArray(item.items) ? item.items : [];

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Commande #{item.id}</Text>
            <Text style={styles.orderDate}>
              {item.createdAt
                ? new Date(item.createdAt.seconds * 1000).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Date inconnue'}
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status?.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.itemsPreview}>
          {items.slice(0, 3).map((product, index) => (
            <Image key={index} source={{ uri: product.image }} style={styles.itemThumb} />
          ))}

          {items.length > 3 && (
            <View style={styles.moreIndicator}>
              <Text style={styles.moreText}>+{items.length - 3}</Text>
            </View>
          )}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.itemCount}>{items.length} article(s)</Text>
          <Text style={styles.totalPrice}>{item.total?.toFixed(2)} Dhs</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={contextOrders}
      renderItem={renderOrderItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: { paddingBottom: 20 },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 10,
  },
  emptyText: {
    marginTop: 16,
    color: Colors.light.muted,
    textAlign: 'center',
    fontSize: 14,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  orderId: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginBottom: 4 },
  orderDate: { fontSize: 12, color: Colors.light.muted },
  statusBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#4CAF50', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  itemsPreview: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  itemThumb: { width: 50, height: 50, borderRadius: 8, backgroundColor: Colors.light.secondary },
  moreIndicator: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  moreText: { fontSize: 12, fontWeight: 'bold', color: Colors.light.muted },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  itemCount: { fontSize: 14, color: Colors.light.muted },
  totalPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.light.primary },
});
