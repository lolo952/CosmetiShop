import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Category, Product } from '../types/product';

const COLLECTION_NAME = 'products';

export const firestoreService = {
    /**
     * Fetch all products from the Firestore collection
     */
    async getProducts(): Promise<Product[]> {
        const productsRef = collection(db, COLLECTION_NAME);
        const q = query(productsRef); // You can add orderBy('name') if needed
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => this.mapDocumentToProduct(doc.id, doc.data()));
    },

    /**
     * Fetch a single product by its Firestore ID
     */
    async getProductById(id: string): Promise<Product | null> {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return this.mapDocumentToProduct(docSnap.id, docSnap.data());
        }
        return null;
    },

    /**
     * Maps Firestore document data to the Product interface.
     * Handles the fields 'image', 'name', 'price', 'stock' as seen in console.
     */
    mapDocumentToProduct(id: string, data: any): Product {
        return {
            id: id,
            title: data.name || 'Produit sans nom',
            brand: data.brand || 'CosmetiShop',
            price: typeof data.price === 'number' ? data.price : parseFloat(data.price || 0),
            originalPrice: data.originalPrice,
            rating: data.rating || 4.5,
            reviews: data.reviews || 0,
            // If image is a string URL, we use { uri: ... }
            image: typeof data.image === 'string' ? { uri: data.image } : data.image,
            secondaryImage: typeof data.secondaryImage === 'string' ? { uri: data.secondaryImage } : data.secondaryImage,
            category: (data.category as Category) || 'Tous',
            description: data.description || "Un produit d'exception sélectionné par CosmetiShop pour sa qualité et son efficacité.",
            badge: data.badge,
            // Support for the 'stock' field visible in your image
            stock: data.stock,
        } as Product & { stock?: number };
    }
};
