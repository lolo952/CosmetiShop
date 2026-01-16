/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#6B2E2E', // Deep Maroon - Main text
    background: '#FFFCFD', // Almost white pink - Main background
    primary: '#D48C95', // Muted Rose - Primary buttons/links
    secondary: '#F8DBE0', // Pale Pink - Secondary backgrounds
    surface: '#FFF0F5', // Lavender Blush - Card backgrounds
    accent: '#EA9AB2', // Soft Pink - Accents
    muted: '#A87C7C', // Dusty Pink - Muted text
    border: '#E8D0D6', // Pinkish Border
    error: '#D32F2F',
    tint: '#D48C95',
    icon: '#8A5A5A', // Brownish/Maroon for icons
    tabIconDefault: '#BC8F8F',
    tabIconSelected: '#D48C95',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    primary: '#F06292',
    secondary: '#3C2F2F',
    surface: '#1E1E1E',
    accent: '#FF80AB',
    muted: '#9BA1A6',
    border: '#333333',
    error: '#EF5350',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
