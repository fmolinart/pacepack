import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';

type BadgeChipProps = {
  label: string;
  variant?: 'lime' | 'success' | 'warning' | 'error' | 'neutral';
  style?: ViewStyle;
};

export function BadgeChip({ label, variant = 'neutral', style }: BadgeChipProps) {
  return (
    <View style={[styles.chip, styles[variant], style]}>
      <Text style={[TextStyles.caption, styles.text, styles[`text_${variant}`] as any]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontWeight: '700',
  },

  lime: { backgroundColor: Colors.limeSubtle },
  success: { backgroundColor: 'rgba(34,197,94,0.15)' },
  warning: { backgroundColor: 'rgba(245,158,11,0.15)' },
  error: { backgroundColor: 'rgba(239,68,68,0.15)' },
  neutral: { backgroundColor: Colors.surfaceElevated },

  text_lime: { color: Colors.lime },
  text_success: { color: Colors.success },
  text_warning: { color: Colors.warning },
  text_error: { color: Colors.error },
  text_neutral: { color: Colors.textSecondary },
});
