import { TextStyle } from 'react-native';

// Font families — loaded via @expo-google-fonts
export const Fonts = {
  heading: 'BarlowCondensed_700Bold',
  headingBlack: 'BarlowCondensed_900Black',
  headingMedium: 'BarlowCondensed_500Medium',
  body: 'Inter_400Regular',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

// Fallback system fonts used before custom fonts load
export const FontsFallback = {
  heading: 'System',
  headingBlack: 'System',
  headingMedium: 'System',
  body: 'System',
  bodySemiBold: 'System',
  bodyBold: 'System',
} as const;

export const TextStyles = {
  displayXL: {
    fontFamily: Fonts.headingBlack,
    fontSize: 72,
    lineHeight: 72,
    letterSpacing: -1,
    textTransform: 'uppercase',
  } as TextStyle,

  displayL: {
    fontFamily: Fonts.headingBlack,
    fontSize: 56,
    lineHeight: 56,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  } as TextStyle,

  displayM: {
    fontFamily: Fonts.heading,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  } as TextStyle,

  h1: {
    fontFamily: Fonts.heading,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  } as TextStyle,

  h2: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  } as TextStyle,

  h3: {
    fontFamily: Fonts.heading,
    fontSize: 18,
    lineHeight: 22,
    textTransform: 'uppercase',
  } as TextStyle,

  label: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  } as TextStyle,

  bodyLarge: {
    fontFamily: Fonts.body,
    fontSize: 17,
    lineHeight: 24,
  } as TextStyle,

  body: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 22,
  } as TextStyle,

  bodySmall: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 18,
  } as TextStyle,

  caption: {
    fontFamily: Fonts.body,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.3,
  } as TextStyle,

  stat: {
    fontFamily: Fonts.headingBlack,
    fontSize: 48,
    lineHeight: 52,
    textTransform: 'uppercase',
  } as TextStyle,
} as const;
