// scripts/generateProducts.js
const fs = require('fs');
const path = require('path');

const categories = ['Soins', 'Maquillage', 'Parfums', 'Corps', 'Cheveux'];
const brands = ['Luminé', 'Aqua Pure', 'Glamour', 'Botanica', 'Clear Skin'];
const titles = [
    'Sérum Vitamine C Éclat Radieux',
    'Crème Hydratante Intensive 24h',
    'Huile Précieuse Rose Musquée',
    'Masque Peel-Off Charbon Détox',
    'Rouge à Lèvres Velvet Matte',
    'Palette Yeux Nude Harmony',
    'Lait Corps Hydratant Amande',
    'Gommage Sucre et Coco',
    'Eau de Parfum Nuit Étoilée',
    'Serum Anti-Âge Retinol',
    'Fond de Teint Lumineux',
    'Crème Mains Réparatrice',
    'Shampooing Nourrissant Argan',
    'Masque Hydratation Intense',
];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomPrice() {
    return (Math.round((Math.random() * 900 + 50) * 100) / 100).toFixed(2);
}
function randomRating() {
    return (Math.round((Math.random() * 1 + 4) * 10) / 10).toFixed(1);
}
function randomReviews() {
    return Math.floor(Math.random() * 1000);
}
function randomImage(id) {
    return `https://picsum.photos/seed/${id}/600/400`;
}
function randomBadge() {
    const badges = [
        { label: '-20%', variant: 'sale' },
        { label: 'Nouveau', variant: 'new' },
        { label: 'Populaire', variant: 'hot' },
        null,
    ];
    return randomItem(badges);
}

const products = [];
for (let i = 1; i <= 100; i++) {
    const title = randomItem(titles);
    const brand = randomItem(brands);
    const category = randomItem(categories);
    const badge = randomBadge();
    const price = parseFloat(randomPrice());
    const originalPrice = badge ? parseFloat((price * 1.2).toFixed(2)) : undefined;
    const product = {
        id: i.toString(),
        title,
        brand,
        price,
        ...(originalPrice && { originalPrice }),
        rating: parseFloat(randomRating()),
        reviews: randomReviews(),
        category,
        image: { uri: randomImage(i) },
        description: `Generated product ${i} - ${title} by ${brand}`,
    };
    if (badge) product.badge = badge;
    products.push(product);
}

const outputLines = [];
outputLines.push("import { Product } from '../types/product';");
outputLines.push('');
outputLines.push('export const PRODUCTS: Product[] = ' + JSON.stringify(products, null, 2) + ';');
outputLines.push('');
outputLines.push('export const CATEGORIES = ' + JSON.stringify(['Tous', ...categories], null, 2) + ';');
outputLines.push('');

const targetPath = path.join(__dirname, '..', 'constants', 'products.ts');
fs.writeFileSync(targetPath, outputLines.join('\n'), { encoding: 'utf8' });
console.log('Generated 100 products to', targetPath);
