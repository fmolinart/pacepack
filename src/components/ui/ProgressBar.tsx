import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';

type ProgressBarProps = {
  current: number;
  target: number;
  showLabel?: boolean;
  height?: number;
  animated?: boolean;
};

export function ProgressBar({
  current,
  target,
  showLabel = true,
  height = 8,
  animated = true,
}: ProgressBarProps) {
  const pct = Math.min(current / target, 1);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.spring(animatedWidth, {
        toValue: pct,
        tension: 60,
        friction: 10,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(pct);
    }
  }, [pct, animated]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.wrapper}>
      {showLabel && (
        <View style={styles.labelRow}>
          <Text style={[TextStyles.bodySmall, styles.currentLabel]}>
            {current.toFixed(1)} mi
          </Text>
          <Text style={[TextStyles.bodySmall, styles.targetLabel]}>
            {target.toFixed(0)} mi
          </Text>
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <Animated.View
          style={[
            styles.fill,
            { height, width: widthInterpolated },
            pct >= 1 && styles.fillComplete,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.xs,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentLabel: {
    color: Colors.lime,
    fontWeight: '600',
  },
  targetLabel: {
    color: Colors.textSecondary,
  },
  track: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: Colors.lime,
    borderRadius: Radius.full,
  },
  fillComplete: {
    backgroundColor: Colors.success,
  },
});
