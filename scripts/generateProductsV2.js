// scripts/generateProductsV2.js
const fs = require('fs');
const path = require('path');

const categoryData = {
    'Soins': {
        titles: ['Huile de Nuit Régénérante', 'Crème Hydratante 24h', 'Eau Micellaire Purifiante', 'Contour des Yeux Anti-Fatigue', 'Sérum Éclat'],
        images: ['huile_de_nuit.jpg', 'creme_hydratante.jpg', 'eau_micellaire.webp', 'contour_des_yeux.avif', 'contour_des_yeux2.jpg']
    },
    'Maquillage': {
        titles: ['Anti-Cernes Haute Couvrance', 'Eyeliner Précision Noir', 'Palette Yeux Nude Harmony', 'Poudre Libre Fixatrice', 'Rouge à Lèvres Matte Luxe'],
        images: ['anticerne.avif', 'eyeliner.jpg', 'palette.jpg', 'poudre.avif', 'rouge_a_levre.avif']
    },
    'Parfums': {
        titles: ['Eau de Parfum Kayali', 'Eau de Parfum Miss Dior', 'Eau de Parfum Prada', 'Eau de Parfum Valentino', 'Eau de Parfum YSL'],
        images: ['parfum_kayali.jpg', 'parfum_miss_dior.jpg', 'parfum_prada.webp', 'parfum_valentino.jpg', 'parfum_ysl.jpg']
    },
    'Corps': {
        titles: ['Lotion Corps Raffermissante', 'Beurre Corporel Karité', 'Crème Mains Réparatrice', 'Lait Corps Hydratant Amande', 'Gant d\'Exfoliation Soie'],
        images: ['lotion_corps_raffermissante.webp', 'beurre_karite.webp', 'creme_main_hydratante.jpg', 'lait_corps_hydratant.webp', 'gant_exfoliant.jpg']
    },
    'Cheveux': {
        titles: ['Huile Gisou Cheveux', 'Huile Nuxe Cheveux', 'Masque Capillaire Réparateur', 'Shampooing Nuxe', 'Shampooing Ouai'],
        images: ['huile_gisou_cheveux.webp', 'huile_nuxe_cheveux.avif', 'masque_capillaire.jpg', 'shampoo_nuxe.webp', 'shampoo_ouai.avif']
    },
    'Accessoires': {
        titles: ['Éponge Maquillage Blender', 'Miroir de Poche YSL', 'Miroir de Poche', 'Recourbe-Cils Ergonomique', 'Brosse à Cheveux Pneumatique'],
        images: ['beauty_blender_sponge.jpg', 'miroir_de_poche_ysl.jpg', 'miroir_de_poche.jpg', 'recourbe_cils.webp', 'brosse_cheveux.webp']
    }
};

const brands = ['Luminé', 'Aqua Pure', 'Glamour', 'Botanica', 'Clear Skin', 'Essencia', 'Pureté'];

function randomItem(arr) {
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

function randomBadge() {
    const badges = [
        { label: '-20%', variant: 'sale' },
        { label: 'Nouveau', variant: 'new' },
        { label: 'Populaire', variant: 'hot' },
        null, null, null
    ];
    return randomItem(badges);
}

const products = [];
let globalId = 1;

Object.entries(categoryData).forEach(([category, data]) => {
    // We have exactly 5 images and 5 titles per category.
    for (let i = 0; i < 5; i++) {
        const title = data.titles[i];
        const imageFile = data.images[i];
        const brand = randomItem(brands);
        const badge = randomBadge();
        const price = parseFloat(randomPrice());

        products.push({
            id: globalId.toString(),
            title: title,
            brand,
            price,
            originalPrice: (badge && badge.variant === 'sale') ? parseFloat((price * 1.25).toFixed(2)) : undefined,
            rating: parseFloat(randomRating()),
            reviews: randomReviews(),
            category,
            // Placeholder for require call
            image: `__REQUIRE_START__../assets/images/${imageFile}__REQUIRE_END__`,
            ...(badge ? { badge } : {}),
            description: `Un produit d'excellence de la gamme ${category} par ${brand}. ${title} est conçu pour répondre à vos besoins beauté les plus exigeants.`,
        });
        globalId++;
    }
});

let productsJson = JSON.stringify(products, null, 2);
// Replace placeholders with actual require calls
productsJson = productsJson.replace(/"__REQUIRE_START__(.*?)__REQUIRE_END__"/g, 'require("$1")');

const outputLines = [];
outputLines.push("import { Product } from '../types/product';");
outputLines.push('');
outputLines.push('export const PRODUCTS: Product[] = ' + productsJson + ';');
outputLines.push('');
outputLines.push('export const CATEGORIES = ' + JSON.stringify(['Tous', ...Object.keys(categoryData)], null, 2) + ';');
outputLines.push('');

const targetPath = path.join(__dirname, '..', 'constants', 'products.ts');
fs.writeFileSync(targetPath, outputLines.join('\n'), { encoding: 'utf8' });
console.log(`Generated ${products.length} products to ${targetPath}`);
