import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, Radius } from '../../theme';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  accent?: boolean;
};

export function Card({ children, style, elevated = false, accent = false }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        accent && styles.accent,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  elevated: {
    backgroundColor: Colors.surfaceElevated,
  },
  accent: {
    borderColor: Colors.lime,
    borderWidth: 1,
  },
});
