import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    style?: ViewStyle;
    textStyle?: TextStyle;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
    iconLeft,
    iconRight,
    disabled,
    loading,
}: ButtonProps) {
    const backgroundColor = disabled
        ? Colors.light.muted
        : variant === 'primary'
            ? Colors.light.primary
            : variant === 'secondary'
                ? Colors.light.secondary
                : 'transparent';

    const textColor = disabled
        ? '#FFF'
        : variant === 'primary'
            ? '#FFF'
            : variant === 'secondary'
                ? Colors.light.primary
                : variant === 'outline'
                    ? Colors.light.primary
                    : Colors.light.text;

    const borderStyle =
        variant === 'outline'
            ? { borderWidth: 1, borderColor: Colors.light.primary }
            : {};

    const buttonContent = (
        <>
            {iconLeft && <>{iconLeft}</>}
            <Text style={[styles.text, { color: textColor }, textStyle]}>
                {title}
            </Text>
            {iconRight && <>{iconRight}</>}
        </>
    );

    if (variant === 'primary' && !disabled && !loading) {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                style={style} // Apply external style to TouchableOpacity
            >
                <LinearGradient
                    colors={['#D98895', '#E59AA6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.button]} // Apply base button styles to gradient
                >
                    {loading ? (
                        <ActivityIndicator color={textColor} />
                    ) : (
                        buttonContent
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                { backgroundColor },
                borderStyle,
                style,
                disabled && styles.disabled,
            ]}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                buttonContent
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12, // More squared rounded corners
        gap: 8,
        minHeight: 48,
        ...Platform.select({
            web: {
                cursor: 'pointer',
                transition: '0.2s',
            },
        }),
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.6,
    },
});
