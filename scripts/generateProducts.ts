// scripts/generateProducts.ts
import { writeFileSync } from 'fs';
import { join } from 'path';

const categoryData: Record<string, string[]> = {
    'Soins': [
        'Sérum Vitamine C Éclat', 'Crème Hydratante 24h', 'Masque Argile Détox', 'Nettoyant Moussant Doux',
        'Sérum Acide Hyaluronique', 'Gel-Crème Apaisant', 'Exfoliant Visage AHA', 'Baume Lèvres Nourrissant',
        'Contour des Yeux Anti-Fatigue', 'Eau Micellaire Purifiante', 'Huile de Nuit Régénérante', 'Masque Tissu Hydratant'
    ],
    'Maquillage': [
        'Rouge à Lèvres Matte Luxe', 'Palette Yeux Nude', 'Fond de Teint Lumineux', 'Mascara Volume Intense',
        'Eyeliner Précision Noir', 'Anti-Cernes Haute Couvrance', 'Blush Poudre Rose Givré', 'Poudre Libre Fixatrice',
        'Gloss Brillance Miroir', 'Crayon Sourcils Précision', 'Base de Teint Lissante', 'Palette Contour & Highlight'
    ],
    'Parfums': [
        'Eau de Parfum Nuit Étoilée', 'Brume Parfumée Vanille', 'Eau de Toilette Fleur d\'Oranger', 'Extrait de Parfum Absolu',
        'Brume Corporelle Fraîcheur', 'Parfum Solide Musc Blanc', 'Eau de Parfum Rose Sauvage', 'Elixir Précieux Ambré',
        'Eau de Cologne Classique', 'Brume de Cheveux Parfumée', 'Coffret Découverte Fragrances', 'Eau de Parfum Iris Intense'
    ],
    'Corps': [
        'Lait Corps Hydratant Amande', 'Gommage Sucre et Coco', 'Beurre Corporel Karité', 'Huile Sèche Scintillante',
        'Crème Mains Réparatrice', 'Gel Douche Rafraîchissant', 'Déodorant Fraîcheur Naturelle', 'Crème Pieds Adoucissante',
        'Brume Corporelle Energisante', 'Lotion Corps Raffermissante', 'Gant d\'Exfoliation Soie', 'Savon Artisanal Olive'
    ],
    'Cheveux': [
        'Shampooing Nourrissant Argan', 'Après-Shampooing Démêlant', 'Masque Capillaire Réparateur', 'Sérum Pointes Abîmées',
        'Shampooing Sec Volumateur', 'Huile Capillaire Protectrice', 'Lotion Anti-Chute Bio', 'Crème de Coiffage Boucles',
        'Shampooing Purifiant Argile', 'Spray Brillance Instantanée', 'Traitement Cuir Chevelu', 'Mousse Coiffante Volume'
    ],
    'Accessoires': [
        'Kit de Pinceaux Professionnels', 'Éponge Maquillage Blender', 'Miroir de Poche LED', 'Trousse de Toilette Velours',
        'Recourbe-Cils Ergonomique', 'Pince à Épiler Précision', 'Brosse à Cheveux Pneumatique', 'Set de Cotons Réutilisables',
        'Nettoyeur de Pinceaux', 'Organizer de Maquillage', 'Bandeau de Soin Visage', 'Rouleau de Massage Quartz'
    ]
};

const brands = ['Luminé', 'Aqua Pure', 'Glamour', 'Botanica', 'Clear Skin', 'Essencia', 'Pureté'];

function randomItem(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice() {
    return (Math.round((Math.random() * 800 + 40) * 100) / 100).toFixed(2);
}

function randomRating() {
    return (Math.round((Math.random() * 1 + 4) * 10) / 10).toFixed(1);
}

function randomReviews() {
    return Math.floor(Math.random() * 1000);
}

function randomImage(id: number) {
    return `https://picsum.photos/seed/${id}/600/400`;
}

function randomBadge() {
    const badges = [
        { label: '-20%', variant: 'sale' },
        { label: 'Nouveau', variant: 'new' },
        { label: 'Populaire', variant: 'hot' },
        null, null, null // More nulls to reduce frequency
    ];
    return randomItem(badges);
}

const products = [] as any[];
let globalId = 1;

Object.entries(categoryData).forEach(([category, titles]) => {
    for (let i = 1; i <= 30; i++) {
        const title = randomItem(titles);
        const brand = randomItem(brands);
        const badge = randomBadge();
        const price = parseFloat(randomPrice());

        products.push({
            id: globalId.toString(),
            title: `${title} - ${i}`, // Add index for uniqueness
            brand,
            price,
            originalPrice: badge?.variant === 'sale' ? parseFloat((price * 1.25).toFixed(2)) : undefined,
            rating: parseFloat(randomRating()),
            reviews: randomReviews(),
            category,
            image: { uri: randomImage(globalId) },
            ...(badge ? { badge } : {}),
            description: `Un produit d'excellence de la gamme ${category} par ${brand}. ${title} est conçu pour répondre à vos besoins beauté les plus exigeants.`,
        });
        globalId++;
    }
});

const output = `import { Product } from '../types/product';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n\nexport const CATEGORIES = ${JSON.stringify(['Tous', ...Object.keys(categoryData)], null, 2)};\n`;

const targetPath = join(__dirname, '..', 'constants', 'products.ts');
writeFileSync(targetPath, output, { encoding: 'utf8' });
console.log(`Generated ${products.length} products to`, targetPath);
