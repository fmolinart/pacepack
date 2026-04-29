import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';
import ActiveGoalScreen from './ActiveGoalScreen';

type Tab = 'active' | 'upcoming' | 'past';

export default function GoalsScreen() {
  const [tab, setTab] = useState<Tab>('active');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[TextStyles.h1, styles.title]}>Goals</Text>
      </View>

      {/* Segmented control */}
      <View style={styles.segmentWrapper}>
        <View style={styles.segment}>
          {(['active', 'upcoming', 'past'] as Tab[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.segmentTab, tab === t && styles.segmentTabActive]}
              onPress={() => setTab(t)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  TextStyles.label,
                  styles.segmentLabel,
                  tab === t ? styles.segmentLabelActive : styles.segmentLabelInactive,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      {tab === 'active' ? (
        <ActiveGoalScreen />
      ) : (
        <View style={styles.empty}>
          <Text style={[TextStyles.h2, styles.emptyTitle]}>
            {tab === 'upcoming' ? 'No upcoming goals' : 'No past goals'}
          </Text>
          <Text style={[TextStyles.body, styles.emptyText]}>
            {tab === 'upcoming'
              ? 'Create a goal to challenge your pack.'
              : 'Completed and failed goals will appear here.'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
  },
  segmentWrapper: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 3,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.sm,
  },
  segmentTabActive: {
    backgroundColor: Colors.lime,
  },
  segmentLabel: {
    letterSpacing: 0.8,
  },
  segmentLabelActive: {
    color: Colors.background,
  },
  segmentLabelInactive: {
    color: Colors.textMuted,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    gap: Spacing.sm,
  },
  emptyTitle: {
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
