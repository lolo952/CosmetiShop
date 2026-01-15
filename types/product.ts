export type Category = 'Soins' | 'Maquillage' | 'Parfums' | 'Corps' | 'Cheveux' | 'Accessoires' | 'Tous';

export interface ProductBadge {
    label: string;
    variant: 'sale' | 'new' | 'hot';
}

export interface Product {
    id: string;
    title: string;
    brand: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: any;
    secondaryImage?: any;
    category: Category;
    description?: string;
    badge?: ProductBadge;
}
