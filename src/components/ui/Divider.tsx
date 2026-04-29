import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';

type DividerProps = {
  vertical?: boolean;
  spacing?: number;
};

export function Divider({ vertical = false, spacing = Spacing.base }: DividerProps) {
  if (vertical) {
    return (
      <View
        style={[styles.vertical, { marginHorizontal: spacing }]}
      />
    );
  }
  return (
    <View
      style={[styles.horizontal, { marginVertical: spacing }]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: Colors.border,
  },
  vertical: {
    width: 1,
    backgroundColor: Colors.border,
  },
});
