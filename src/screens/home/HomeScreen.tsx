import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextStyles, Spacing } from '../../theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[TextStyles.h1, styles.title]}>Your Pack</Text>
          <Text style={[TextStyles.body, styles.subtitle]}>Active goals feed</Text>
        </View>

        <View style={styles.emptyState}>
          <Text style={[TextStyles.displayM, styles.emptyIcon]}>🏃</Text>
          <Text style={[TextStyles.h2, styles.emptyTitle]}>No active goals</Text>
          <Text style={[TextStyles.body, styles.emptyText]}>
            Create a goal and invite your pack to get started.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.base,
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  title: {
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: Colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.section,
    gap: Spacing.md,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyTitle: {
    color: Colors.textPrimary,
  },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
});
