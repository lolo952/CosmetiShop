import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';

const FAQ_ITEMS = [
    {
        id: '1',
        question: "Quels sont les délais de livraison ?",
        answer: "Nous livrons généralement sous 24h à 48h dans tout le Maroc."
    },
    {
        id: '2',
        question: "Comment retourner un produit ?",
        answer: "Vous disposez de 15 jours pour retourner un produit non ouvert dans son emballage d'origine."
    },
    {
        id: '3',
        question: "Les produits sont-ils originaux ?",
        answer: "Oui, tous nos produits sont 100% authentiques et proviennent directement des marques officiels."
    }
];

export default function HelpSupportScreen() {
    const router = useRouter();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Aide & Support</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contactez-nous</Text>
                    <TouchableOpacity style={styles.contactItem}>
                        <Ionicons name="mail-outline" size={24} color={Colors.light.primary} />
                        <Text style={styles.contactLabel}>Email: support@cosmetishop.ma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactItem}>
                        <Ionicons name="call-outline" size={24} color={Colors.light.primary} />
                        <Text style={styles.contactLabel}>Tél: +212 500 000 000</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.faqSection}>
                    <Text style={styles.sectionTitle}>Questions Fréquentes (FAQ)</Text>
                    {FAQ_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.faqItem}
                            onPress={() => toggleExpand(item.id)}
                        >
                            <View style={styles.faqHeader}>
                                <Text style={styles.faqQuestion}>{item.question}</Text>
                                <Ionicons
                                    name={expandedId === item.id ? "chevron-up" : "chevron-down"}
                                    size={20}
                                    color={Colors.light.muted}
                                />
                            </View>
                            {expandedId === item.id && (
                                <Text style={styles.faqAnswer}>{item.answer}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCFD',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontFamily: Platform.select({ web: 'Playfair Display', default: 'System' }),
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    content: {
        padding: 20,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: Colors.light.text,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    contactLabel: {
        fontSize: 16,
        color: Colors.light.text,
    },
    faqSection: {
        gap: 12,
    },
    faqItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.text,
        flex: 1,
        paddingRight: 10,
    },
    faqAnswer: {
        fontSize: 14,
        color: Colors.light.muted,
        marginTop: 12,
        lineHeight: 20,
    }
});
