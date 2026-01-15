import { useEffect, useState } from 'react';
import { firestoreService } from '../services/firestoreService';
import { Product } from '../types/product';

/**
 * Hook to fetch products from Firestore with loading and error states.
 */
export function useFirestoreProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const refresh = async () => {
        setLoading(true);
        try {
            const data = await firestoreService.getProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erreur inconnue'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    return { products, loading, error, refresh };
}

/**
 * Hook to fetch a single product from Firestore by ID.
 */
export function useFirestoreProduct(id: string | string[] | undefined) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!id || typeof id !== 'string') {
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await firestoreService.getProductById(id);
                setProduct(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Erreur inconnue'));
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
}
