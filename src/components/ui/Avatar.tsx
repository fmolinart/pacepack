import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, TextStyles, Radius } from '../../theme';

type AvatarProps = {
  uri?: string | null;
  name?: string;
  size?: number;
};

function getInitials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Deterministic color from name
function getAvatarColor(name?: string): string {
  const palette = [
    '#7C3AED', '#DB2777', '#059669', '#D97706',
    '#2563EB', '#DC2626', '#0891B2', '#65A30D',
  ];
  if (!name) return palette[0];
  const idx = name.charCodeAt(0) % palette.length;
  return palette[idx];
}

export function Avatar({ uri, name, size = 40 }: AvatarProps) {
  const initials = getInitials(name);
  const bgColor = getAvatarColor(name);

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor },
      ]}
    >
      <Text
        style={[
          TextStyles.label,
          styles.initials,
          { fontSize: size * 0.35 },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
