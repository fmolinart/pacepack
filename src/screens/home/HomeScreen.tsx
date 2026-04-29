import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';
import { Card, BadgeChip, ProgressBar, Avatar } from '../../components/ui';

// ── Fake data ───────────────────────────────────────────────
const ACTIVE_GOALS = [
  {
    id: '1',
    title: 'June Miles Club',
    targetMiles: 100,
    currentMiles: 67.4,
    daysRemaining: 8,
    members: [
      { id: '1', name: 'Maya Chen' },
      { id: '2', name: 'Jake Torres' },
      { id: '3', name: 'Devon Park' },
      { id: '4', name: 'Sara Okafor' },
      { id: '5', name: 'Chris Lund' },
    ],
    latestActivity: { name: 'Maya Chen', miles: 5.2, timeAgo: '12m ago' },
  },
  {
    id: '2',
    title: 'Weekend Warriors',
    targetMiles: 50,
    currentMiles: 44.1,
    daysRemaining: 2,
    members: [
      { id: '2', name: 'Jake Torres' },
      { id: '6', name: 'Priya Nair' },
      { id: '7', name: 'Marcus Webb' },
    ],
    latestActivity: { name: 'Priya Nair', miles: 3.8, timeAgo: '1h ago' },
  },
];
// ───────────────────────────────────────────────────────────

function GoalCard({ goal }: { goal: (typeof ACTIVE_GOALS)[0] }) {
  const milesLeft = goal.targetMiles - goal.currentMiles;
  const pct = (goal.currentMiles / goal.targetMiles) * 100;
  const isClose = goal.daysRemaining <= 3;

  return (
    <TouchableOpacity activeOpacity={0.85}>
      <Card style={styles.goalCard} accent={isClose}>
        {/* Top row */}
        <View style={styles.cardTop}>
          <BadgeChip label={isClose ? '🔥 Closing In' : 'Active'} variant={isClose ? 'warning' : 'lime'} />
          <Text style={[TextStyles.caption, styles.daysLeft]}>
            {goal.daysRemaining}d left
          </Text>
        </View>

        {/* Title */}
        <Text style={[TextStyles.h2, styles.cardTitle]}>{goal.title}</Text>

        {/* Progress */}
        <ProgressBar
          current={goal.currentMiles}
          target={goal.targetMiles}
          showLabel={false}
          height={6}
        />

        {/* Miles row */}
        <View style={styles.milesRow}>
          <Text style={[TextStyles.bodySmall, styles.milesLogged]}>
            <Text style={styles.milesAccent}>{goal.currentMiles.toFixed(1)}</Text>
            {' / '}
            {goal.targetMiles} mi
          </Text>
          <Text style={[TextStyles.bodySmall, styles.milesLeft]}>
            {milesLeft.toFixed(1)} mi to go
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.cardDivider} />

        {/* Members + activity */}
        <View style={styles.cardBottom}>
          {/* Avatar stack */}
          <View style={styles.avatarStack}>
            {goal.members.slice(0, 4).map((m, i) => (
              <View key={m.id} style={[styles.avatarWrap, { marginLeft: i === 0 ? 0 : -10 }]}>
                <Avatar name={m.name} size={28} />
              </View>
            ))}
            {goal.members.length > 4 && (
              <View style={[styles.avatarWrap, styles.avatarOverflow, { marginLeft: -10 }]}>
                <Text style={styles.overflowText}>+{goal.members.length - 4}</Text>
              </View>
            )}
          </View>

          {/* Latest activity */}
          <Text style={[TextStyles.caption, styles.activitySnippet]} numberOfLines={1}>
            {goal.latestActivity.name.split(' ')[0]} ran {goal.latestActivity.miles}mi · {goal.latestActivity.timeAgo}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[TextStyles.label, styles.greeting]}>Good morning</Text>
            <Text style={[TextStyles.h1, styles.title]}>Your Pack</Text>
          </View>
          <Avatar name="Jake Torres" size={40} />
        </View>

        {/* Summary strip */}
        <View style={styles.summaryStrip}>
          <View style={styles.summaryItem}>
            <Text style={[TextStyles.h2, styles.summaryNum]}>2</Text>
            <Text style={[TextStyles.caption, styles.summaryLabel]}>Active Goals</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[TextStyles.h2, styles.summaryNum]}>111.5</Text>
            <Text style={[TextStyles.caption, styles.summaryLabel]}>Miles Logged</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[TextStyles.h2, styles.summaryNum]}>7</Text>
            <Text style={[TextStyles.caption, styles.summaryLabel]}>Pack Members</Text>
          </View>
        </View>

        {/* Goal cards */}
        <View style={styles.sectionHeader}>
          <Text style={[TextStyles.h3, styles.sectionTitle]}>Active Goals</Text>
        </View>

        <View style={styles.goalList}>
          {ACTIVE_GOALS.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </View>

        <View style={{ height: Spacing.xxl }} />
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

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    color: Colors.textMuted,
    marginBottom: 2,
  },
  title: {
    color: Colors.textPrimary,
  },

  // Summary strip
  summaryStrip: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.xl,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  summaryNum: {
    color: Colors.lime,
  },
  summaryLabel: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },

  // Section header
  sectionHeader: {
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.textPrimary,
  },

  // Goal list
  goalList: {
    gap: Spacing.md,
  },

  // Goal card
  goalCard: {
    gap: Spacing.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  daysLeft: {
    color: Colors.textMuted,
  },
  cardTitle: {
    color: Colors.textPrimary,
  },
  milesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  milesLogged: {
    color: Colors.textSecondary,
  },
  milesAccent: {
    color: Colors.lime,
    fontWeight: '600',
  },
  milesLeft: {
    color: Colors.textMuted,
  },
  cardDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  avatarOverflow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.surface,
  },
  overflowText: {
    color: Colors.textSecondary,
    fontSize: 9,
    fontWeight: '700',
  },
  activitySnippet: {
    color: Colors.textMuted,
    flex: 1,
    textAlign: 'right',
    marginLeft: Spacing.sm,
  },
});
