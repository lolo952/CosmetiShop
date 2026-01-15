import React from 'react';
import { Platform, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/theme';

interface InputProps {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    style?: StyleProp<ViewStyle>;
}

export default function Input({ value, onChangeText, placeholder, label, error, style }: InputProps) {
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.light.muted}
                style={[styles.input, error && styles.inputError]}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Colors.light.text,
        backgroundColor: '#fff',
        ...Platform.select({
            web: {
                outlineStyle: 'none',
            },
        }),
    },
    inputError: {
        borderColor: Colors.light.error,
    },
    error: {
        marginTop: 4,
        fontSize: 12,
        color: Colors.light.error,
    },
});
