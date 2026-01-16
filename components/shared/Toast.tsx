import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/theme';

interface ToastProps {
    visible: boolean;
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onHide: () => void;
}

export default function Toast({ visible, message, type = 'success', duration = 3000, onHide }: ToastProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();

            const timer = setTimeout(() => {
                hideToast();
            }, duration);

            return () => clearTimeout(timer);
        } else {
            hideToast();
        }
    }, [visible]);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -20,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => onHide());
    };

    if (!visible) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return 'checkmark-circle';
            case 'error': return 'alert-circle';
            default: return 'information-circle';
        }
    };

    const getColor = () => {
        switch (type) {
            case 'success': return '#4CAF50';
            case 'error': return '#F44336';
            default: return Colors.light.primary;
        }
    };

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                { opacity: fadeAnim, transform: [{ translateY }] }
            ]}
        >
            <View style={[styles.toastContent, { borderLeftColor: getColor() }]}>
                <Ionicons name={getIcon() as any} size={24} color={getColor()} />
                <Text style={styles.toastText}>{message}</Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        zIndex: 9999,
        alignItems: 'center',
    },
    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
        borderLeftWidth: 4,
        minWidth: '80%',
    },
    toastText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
        flex: 1,
    },
});
