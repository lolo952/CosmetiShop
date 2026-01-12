import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/theme';

type BadgeVariant = 'sale' | 'new' | 'default';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    style?: ViewStyle;
}

export default function Badge({ label, variant = 'default', style }: BadgeProps) {
    const backgroundColor =
        variant === 'sale'
            ? Colors.light.error // Red for sale
            : variant === 'new'
                ? Colors.light.accent // Pink for new
                : Colors.light.muted; // Gray for default

    return (
        <View style={[styles.container, { backgroundColor }, style]}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    text: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
