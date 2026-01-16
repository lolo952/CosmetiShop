import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    containerStyle?: StyleProp<ViewStyle>;
}

export default function Input({
    label,
    error,
    icon,
    style,
    containerStyle,
    ...props
}: InputProps) {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                error ? styles.inputError : null,
                style as ViewStyle
            ]}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={Colors.light.muted}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    placeholderTextColor={Colors.light.muted}
                    style={styles.input}
                    {...props}
                />
            </View>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: Colors.light.text,
        ...Platform.select({
            web: {
                outlineStyle: 'none',
            } as any,
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
