import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../../theme';

type Props = {
  current: number; // 1-indexed
  total: number;
};

export default function StepProgress({ current, total }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i < current ? styles.dotDone : styles.dotPending,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  dot: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },
  dotDone: {
    backgroundColor: Colors.lime,
  },
  dotPending: {
    backgroundColor: Colors.border,
  },
});
