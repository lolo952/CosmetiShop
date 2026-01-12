import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface SectionProps {
    children: React.ReactNode;
    style?: ViewStyle;
    maxWidth?: number;
}

export default function Section({ children, style, maxWidth = 1200 }: SectionProps) {
    return (
        <View style={[styles.wrapper, style]}>
            <View style={[styles.container, { maxWidth }]}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
        // backgroundColor: Colors.light.background, // Removed to allow gradient to show
    },
    container: {
        width: '100%',
    },
});
