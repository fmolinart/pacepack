import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.background : Colors.lime}
        />
      ) : (
        <Text style={[TextStyles.label, styles.label, styles[`label_${variant}`] as TextStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    flexDirection: 'row',
  },

  // Variants
  primary: {
    backgroundColor: Colors.lime,
  },
  secondary: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: Colors.error,
  },

  // Sizes
  size_sm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  size_md: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  size_lg: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.base,
    minHeight: 56,
  },

  // Labels per variant
  label: {
    textAlign: 'center',
  },
  label_primary: {
    color: Colors.background,
  },
  label_secondary: {
    color: Colors.textPrimary,
  },
  label_ghost: {
    color: Colors.lime,
  },
  label_danger: {
    color: Colors.textPrimary,
  },

  disabled: {
    opacity: 0.4,
  },
});
