import { Product } from '../types/product';

export const PRODUCTS: Product[] = [
    {
        "id": "1",
        "title": "Huile de Nuit Régénérante",
        "brand": "Essencia",
        "price": 158.18,
        "originalPrice": 197.73,
        "rating": 4.5,
        "reviews": 888,
        "category": "Soins",
        "image": require("../assets/images/huile_de_nuit.jpg"),
        "badge": {
            "label": "-20%",
            "variant": "sale"
        },
        "description": "Un produit d'excellence de la gamme Soins par Essencia. Huile de Nuit Régénérante est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "2",
        "title": "Crème Hydratante 24h",
        "brand": "Clear Skin",
        "price": 322.17,
        "rating": 4.7,
        "reviews": 242,
        "category": "Soins",
        "image": require("../assets/images/creme_hydratante.jpg"),
        "description": "Un produit d'excellence de la gamme Soins par Clear Skin. Crème Hydratante 24h est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "3",
        "title": "Eau Micellaire Purifiante",
        "brand": "Clear Skin",
        "price": 161.14,
        "rating": 4.5,
        "reviews": 834,
        "category": "Soins",
        "image": require("../assets/images/eau_micellaire.webp"),
        "description": "Un produit d'excellence de la gamme Soins par Clear Skin. Eau Micellaire Purifiante est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "4",
        "title": "Contour des Yeux Anti-Fatigue",
        "brand": "Essencia",
        "price": 362.39,
        "rating": 4.9,
        "reviews": 528,
        "category": "Soins",
        "image": require("../assets/images/contour_des_yeux.avif"),
        "description": "Un produit d'excellence de la gamme Soins par Essencia. Contour des Yeux Anti-Fatigue est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "5",
        "title": "Sérum Éclat",
        "brand": "Glamour",
        "price": 733.63,
        "rating": 4.8,
        "reviews": 604,
        "category": "Soins",
        "image": require("../assets/images/contour_des_yeux2.jpg"),
        "badge": {
            "label": "Populaire",
            "variant": "hot"
        },
        "description": "Un produit d'excellence de la gamme Soins par Glamour. Sérum Éclat est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "6",
        "title": "Anti-Cernes Haute Couvrance",
        "brand": "Essencia",
        "price": 454.06,
        "rating": 4.4,
        "reviews": 0,
        "category": "Maquillage",
        "image": require("../assets/images/anticerne.avif"),
        "badge": {
            "label": "Nouveau",
            "variant": "new"
        },
        "description": "Un produit d'excellence de la gamme Maquillage par Essencia. Anti-Cernes Haute Couvrance est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "7",
        "title": "Eyeliner Précision Noir",
        "brand": "Glamour",
        "price": 101.25,
        "rating": 4.1,
        "reviews": 766,
        "category": "Maquillage",
        "image": require("../assets/images/eyeliner.jpg"),
        "description": "Un produit d'excellence de la gamme Maquillage par Glamour. Eyeliner Précision Noir est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "8",
        "title": "Palette Yeux Nude Harmony",
        "brand": "Clear Skin",
        "price": 162.13,
        "rating": 4.3,
        "reviews": 843,
        "category": "Maquillage",
        "image": require("../assets/images/palette.jpg"),
        "description": "Un produit d'excellence de la gamme Maquillage par Clear Skin. Palette Yeux Nude Harmony est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "9",
        "title": "Poudre Libre Fixatrice",
        "brand": "Luminé",
        "price": 803.81,
        "rating": 4.5,
        "reviews": 491,
        "category": "Maquillage",
        "image": require("../assets/images/poudre.avif"),
        "description": "Un produit d'excellence de la gamme Maquillage par Luminé. Poudre Libre Fixatrice est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "10",
        "title": "Rouge à Lèvres Matte Luxe",
        "brand": "Clear Skin",
        "price": 605.74,
        "rating": 4,
        "reviews": 277,
        "category": "Maquillage",
        "image": require("../assets/images/rouge_a_levre.avif"),
        "description": "Un produit d'excellence de la gamme Maquillage par Clear Skin. Rouge à Lèvres Matte Luxe est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "11",
        "title": "Eau de Parfum Kayali",
        "brand": "Pureté",
        "price": 592.85,
        "rating": 4.6,
        "reviews": 806,
        "category": "Parfums",
        "image": require("../assets/images/parfum_kayali.jpg"),
        "description": "Un produit d'excellence de la gamme Parfums par Pureté. Eau de Parfum Kayali est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "12",
        "title": "Eau de Parfum Miss Dior",
        "brand": "Luminé",
        "price": 106.26,
        "rating": 4.5,
        "reviews": 384,
        "category": "Parfums",
        "image": require("../assets/images/parfum_miss_dior.jpg"),
        "description": "Un produit d'excellence de la gamme Parfums par Luminé. Eau de Parfum Miss Dior est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "13",
        "title": "Eau de Parfum Prada",
        "brand": "Botanica",
        "price": 80.54,
        "rating": 4.1,
        "reviews": 685,
        "category": "Parfums",
        "image": require("../assets/images/parfum_prada.webp"),
        "description": "Un produit d'excellence de la gamme Parfums par Botanica. Eau de Parfum Prada est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "14",
        "title": "Eau de Parfum Valentino",
        "brand": "Aqua Pure",
        "price": 413.16,
        "originalPrice": 516.45,
        "rating": 4.5,
        "reviews": 864,
        "category": "Parfums",
        "image": require("../assets/images/parfum_valentino.jpg"),
        "badge": {
            "label": "-20%",
            "variant": "sale"
        },
        "description": "Un produit d'excellence de la gamme Parfums par Aqua Pure. Eau de Parfum Valentino est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "15",
        "title": "Eau de Parfum YSL",
        "brand": "Pureté",
        "price": 590.5,
        "rating": 4.1,
        "reviews": 395,
        "category": "Parfums",
        "image": require("../assets/images/parfum_ysl.jpg"),
        "description": "Un produit d'excellence de la gamme Parfums par Pureté. Eau de Parfum YSL est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "16",
        "title": "Lotion Corps Raffermissante",
        "brand": "Clear Skin",
        "price": 341.64,
        "rating": 4.9,
        "reviews": 84,
        "category": "Corps",
        "image": require("../assets/images/lotion_corps_raffermissante.webp"),
        "description": "Un produit d'excellence de la gamme Corps par Clear Skin. Lotion Corps Raffermissante est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "17",
        "title": "Beurre Corporel Karité",
        "brand": "Pureté",
        "price": 64.57,
        "rating": 4.5,
        "reviews": 40,
        "category": "Corps",
        "image": require("../assets/images/beurre_karite.webp"),
        "badge": {
            "label": "Nouveau",
            "variant": "new"
        },
        "description": "Un produit d'excellence de la gamme Corps par Pureté. Beurre Corporel Karité est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "18",
        "title": "Crème Mains Réparatrice",
        "brand": "Glamour",
        "price": 374.29,
        "originalPrice": 467.86,
        "rating": 4.5,
        "reviews": 30,
        "category": "Corps",
        "image": require("../assets/images/creme_main_hydratante.jpg"),
        "badge": {
            "label": "-20%",
            "variant": "sale"
        },
        "description": "Un produit d'excellence de la gamme Corps par Glamour. Crème Mains Réparatrice est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "19",
        "title": "Lait Corps Hydratant Amande",
        "brand": "Pureté",
        "price": 769.43,
        "rating": 4.7,
        "reviews": 990,
        "category": "Corps",
        "image": require("../assets/images/lait_corps_hydratant.webp"),
        "description": "Un produit d'excellence de la gamme Corps par Pureté. Lait Corps Hydratant Amande est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "20",
        "title": "Gant d'Exfoliation Soie",
        "brand": "Botanica",
        "price": 163.43,
        "rating": 4.1,
        "reviews": 305,
        "category": "Corps",
        "image": require("../assets/images/gant_exfoliant.jpg"),
        "description": "Un produit d'excellence de la gamme Corps par Botanica. Gant d'Exfoliation Soie est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "21",
        "title": "Huile Gisou Cheveux",
        "brand": "Luminé",
        "price": 737.06,
        "rating": 4.2,
        "reviews": 844,
        "category": "Cheveux",
        "image": require("../assets/images/huile_gisou_cheveux.webp"),
        "badge": {
            "label": "Populaire",
            "variant": "hot"
        },
        "description": "Un produit d'excellence de la gamme Cheveux par Luminé. Huile Gisou Cheveux est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "22",
        "title": "Huile Nuxe Cheveux",
        "brand": "Luminé",
        "price": 209.47,
        "rating": 4.9,
        "reviews": 496,
        "category": "Cheveux",
        "image": require("../assets/images/huile_nuxe_cheveux.avif"),
        "badge": {
            "label": "Populaire",
            "variant": "hot"
        },
        "description": "Un produit d'excellence de la gamme Cheveux par Luminé. Huile Nuxe Cheveux est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "23",
        "title": "Masque Capillaire Réparateur",
        "brand": "Glamour",
        "price": 649.92,
        "rating": 4.6,
        "reviews": 777,
        "category": "Cheveux",
        "image": require("../assets/images/masque_capillaire.jpg"),
        "description": "Un produit d'excellence de la gamme Cheveux par Glamour. Masque Capillaire Réparateur est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "24",
        "title": "Shampooing Nuxe",
        "brand": "Aqua Pure",
        "price": 700.5,
        "originalPrice": 875.63,
        "rating": 4.3,
        "reviews": 169,
        "category": "Cheveux",
        "image": require("../assets/images/shampoo_nuxe.webp"),
        "badge": {
            "label": "-20%",
            "variant": "sale"
        },
        "description": "Un produit d'excellence de la gamme Cheveux par Aqua Pure. Shampooing Nuxe est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "25",
        "title": "Shampooing Ouai",
        "brand": "Essencia",
        "price": 260.71,
        "rating": 4,
        "reviews": 203,
        "category": "Cheveux",
        "image": require("../assets/images/shampoo_ouai.avif"),
        "description": "Un produit d'excellence de la gamme Cheveux par Essencia. Shampooing Ouai est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "26",
        "title": "Éponge Maquillage Blender",
        "brand": "Pureté",
        "price": 162.61,
        "rating": 4,
        "reviews": 244,
        "category": "Accessoires",
        "image": require("../assets/images/beauty_blender_sponge.jpg"),
        "badge": {
            "label": "Populaire",
            "variant": "hot"
        },
        "description": "Un produit d'excellence de la gamme Accessoires par Pureté. Éponge Maquillage Blender est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "27",
        "title": "Miroir de Poche YSL",
        "brand": "Luminé",
        "price": 772.71,
        "rating": 4.6,
        "reviews": 84,
        "category": "Accessoires",
        "image": require("../assets/images/miroir_de_poche_ysl.jpg"),
        "badge": {
            "label": "Populaire",
            "variant": "hot"
        },
        "description": "Un produit d'excellence de la gamme Accessoires par Luminé. Miroir de Poche YSL est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "28",
        "title": "Miroir de Poche",
        "brand": "Glamour",
        "price": 671.32,
        "originalPrice": 839.15,
        "rating": 5,
        "reviews": 861,
        "category": "Accessoires",
        "image": require("../assets/images/miroir_de_poche.jpg"),
        "badge": {
            "label": "-20%",
            "variant": "sale"
        },
        "description": "Un produit d'excellence de la gamme Accessoires par Glamour. Miroir de Poche est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "29",
        "title": "Recourbe-Cils Ergonomique",
        "brand": "Glamour",
        "price": 237.87,
        "rating": 5,
        "reviews": 560,
        "category": "Accessoires",
        "image": require("../assets/images/recourbe_cils.webp"),
        "badge": {
            "label": "Nouveau",
            "variant": "new"
        },
        "description": "Un produit d'excellence de la gamme Accessoires par Glamour. Recourbe-Cils Ergonomique est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "30",
        "title": "Brosse à Cheveux Pneumatique",
        "brand": "Pureté",
        "price": 415.92,
        "rating": 4.1,
        "reviews": 407,
        "category": "Accessoires",
        "image": require("../assets/images/brosse_cheveux.webp"),
        "badge": {
            "label": "Nouveau",
            "variant": "new"
        },
        "description": "Un produit d'excellence de la gamme Accessoires par Pureté. Brosse à Cheveux Pneumatique est conçu pour répondre à vos besoins beauté les plus exigeants."
    },
    {
        "id": "n1",
        "title": "Brume Parfumée Fleur d'Oranger",
        "brand": "Oasis",
        "price": 245.0,
        "rating": 4.9,
        "reviews": 42,
        "category": "Parfums",
        "image": require("../assets/images/Brume Parfumée Fleur d'Oranger.webp"),
        "description": "Une brume légère et envoûtante qui capture l'essence délicate des fleurs d'oranger du Maroc. Parfaite pour une sensation de fraîcheur tout au long de la journée.",
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n2",
        "title": "Palette Regard Intense",
        "brand": "Glamour",
        "price": 420.0,
        "rating": 4.7,
        "reviews": 86,
        "category": "Maquillage",
        "image": require("../assets/images/Palette Regard Intense.webp"),
        "description": "12 teintes hautement pigmentées allant du mat soyeux au métallisé scintillant. Créez des looks de jour comme de soirée avec une tenue irréprochable.",
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n3",
        "title": "Huile de Nuit Réparatrice",
        "brand": "Botanica",
        "price": 380.0,
        "rating": 4.8,
        "reviews": 24,
        "category": "Soins",
        "image": require("../assets/images/Huile de Nuit Réparatrice.webp"),
        "description": "Un mélange précieux d'huiles essentielles biologiques conçu pour régénérer votre peau pendant votre sommeil. Réveillez-vous avec un teint radieux et reposé.",
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n4",
        "title": "Sérum Éclat Vitamine C",
        "brand": "Lumière",
        "price": 295.0,
        "rating": 4.6,
        "reviews": 58,
        "category": "Soins",
        "image": require("../assets/images/Sérum Éclat Vitamine C.avif"),
        "description": "Boostez l'éclat de votre peau avec notre sérum concentré en Vitamine C pure. Réduit visiblement les taches brunes et unifie le grain de peau.",
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n5",
        "title": "Baume à Lèvres Karité",
        "brand": "Naturel",
        "price": 85.0,
        "rating": 4.5,
        "reviews": 120,
        "category": "Soins",
        "image": require("../assets/images/Baume à Lèvres Karité.avif"),
        "description": "Une protection intense pour vos lèvres avec du beurre de karité pur. Hydratation longue durée et fini non collant.",
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n6",
        "title": "Eau de Parfum \"Mystère\"",
        "brand": "Aura",
        "price": 850.0,
        "rating": 4.9,
        "reviews": 12,
        "category": "Parfums",
        "image": { "uri": "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800" },
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n7",
        "title": "Crème Mains Velours",
        "brand": "Soie",
        "price": 110.0,
        "rating": 4.7,
        "reviews": 45,
        "category": "Soins",
        "image": require("../assets/images/Crème Mains Velours.jpg"),
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n8",
        "title": "Gommage Corps Sable Fin",
        "brand": "Rivage",
        "price": 190.0,
        "rating": 4.6,
        "reviews": 32,
        "category": "Corps",
        "image": require("../assets/images/Gommage Corps Sable Fin.webp"),
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n9",
        "title": "Mascara Volume Infini",
        "brand": "LashUp",
        "price": 165.0,
        "rating": 4.8,
        "reviews": 210,
        "category": "Maquillage",
        "image": require("../assets/images/Mascara Volume Infini.jpg"),
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n10",
        "title": "Brume Cheveux Soyeux",
        "brand": "Vague",
        "price": 210.0,
        "rating": 4.4,
        "reviews": 18,
        "category": "Cheveux",
        "image": require("../assets/images/Brume Cheveux Soyeux.avif"),
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n11",
        "title": "Correcteur Teint Parfait",
        "brand": "Nuance",
        "price": 185.0,
        "rating": 4.7,
        "reviews": 67,
        "category": "Maquillage",
        "image": require("../assets/images/Correcteur Teint Parfait.webp"),
        "badge": { "label": "Nouveau", "variant": "new" }
    },
    {
        "id": "n12",
        "title": "Gel Douche Agrumes Frais",
        "brand": "Pure",
        "price": 95.0,
        "rating": 4.5,
        "reviews": 88,
        "category": "Corps",
        "image": require("../assets/images/Gel Douche Agrumes Frais.webp"),
        "badge": { "label": "Nouveau", "variant": "new" }
    }
];

export const CATEGORIES = [
    "Tous",
    "Soins",
    "Maquillage",
    "Parfums",
    "Corps",
    "Cheveux",
    "Accessoires"
];
