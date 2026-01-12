import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/theme';
import Section from './Section';

export default function Footer() {
    return (
        <View style={styles.footer}>
            <Section style={styles.section}>
                <View style={styles.grid}>
                    {/* Brand Column */}
                    <View style={styles.column}>
                        <Text style={styles.logo}>Cosmeti<Text style={styles.logoPink}>Shop</Text></Text>
                        <Text style={styles.description}>
                            Votre destination beauté pour des cosmétiques de qualité premium.
                        </Text>
                        <View style={styles.socials}>
                            {['logo-instagram', 'logo-facebook', 'logo-twitter', 'logo-youtube'].map((icon) => (
                                <TouchableOpacity key={icon} style={styles.socialIcon}>
                                    {/* @ts-ignore */}
                                    <Ionicons name={icon} size={18} color={Colors.light.muted} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Links Columns */}
                    <View style={styles.linksWrapper}>
                        <View style={styles.column}>
                            <Text style={styles.heading}>Boutique</Text>
                            {['Tous les produits', 'Nouveautés', 'Best-sellers', 'Promotions'].map(link => (
                                <TouchableOpacity key={link}><Text style={styles.link}>{link}</Text></TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.column}>
                            <Text style={styles.heading}>Informations</Text>
                            {['À propos', 'Nos engagements', 'Blog beauté', 'Contact'].map(link => (
                                <TouchableOpacity key={link}><Text style={styles.link}>{link}</Text></TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.column}>
                            <Text style={styles.heading}>Aide</Text>
                            {['FAQ', 'Livraison', 'Retours', 'Suivi commande'].map(link => (
                                <TouchableOpacity key={link}><Text style={styles.link}>{link}</Text></TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={styles.bottomBar}>
                    <Text style={styles.copyright}>© 2026 CosmetiShop. Tous droits réservés.</Text>
                    <View style={styles.legalLinks}>
                        <Text style={styles.legalLink}>Confidentialité</Text>
                        <Text style={styles.legalLink}>CGV</Text>
                        <Text style={styles.legalLink}>Cookies</Text>
                    </View>
                </View>
            </Section>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#FAFAFA',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    section: {
        backgroundColor: '#FAFAFA',
        paddingVertical: 60,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 40,
    },
    column: {
        flex: 1,
        minWidth: 200,
    },
    linksWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 40,
        flex: 2,
        minWidth: 300,
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.primary,
        marginBottom: 16,
    },
    logoPink: {
        color: Colors.light.primary,
    },
    description: {
        color: Colors.light.muted,
        lineHeight: 24,
        marginBottom: 24,
    },
    socials: {
        flexDirection: 'row',
        gap: 12,
    },
    socialIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.light.text,
        fontFamily: 'serif',
    },
    link: {
        color: Colors.light.muted,
        marginBottom: 12,
        fontSize: 14,
    },
    bottomBar: {
        marginTop: 60,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
    },
    copyright: {
        color: Colors.light.muted,
        fontSize: 12,
    },
    legalLinks: {
        flexDirection: 'row',
        gap: 24,
    },
    legalLink: {
        color: Colors.light.muted,
        fontSize: 12,
    },
});
