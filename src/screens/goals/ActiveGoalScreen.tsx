import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';
import { Avatar, Card, BadgeChip, Divider, ProgressBar } from '../../components/ui';

// ── Fake data ──────────────────────────────────────────────
const GOAL = {
  title: 'June Miles Club',
  targetMiles: 100,
  currentMiles: 67.4,
  startDate: 'Jun 1',
  endDate: 'Jun 30',
  daysRemaining: 8,
};

const MEMBERS = [
  { id: '1', name: 'Maya Chen',    miles: 21.3, avatar: null, isMe: false },
  { id: '2', name: 'Jake Torres',  miles: 18.7, avatar: null, isMe: true  },
  { id: '3', name: 'Devon Park',   miles: 14.2, avatar: null, isMe: false },
  { id: '4', name: 'Sara Okafor',  miles: 9.1,  avatar: null, isMe: false },
  { id: '5', name: 'Chris Lund',   miles: 4.1,  avatar: null, isMe: false },
];

const ACTIVITY = [
  { id: 'a1', name: 'Maya Chen',   miles: 5.2, timeAgo: '12m ago' },
  { id: 'a2', name: 'Jake Torres', miles: 3.1, timeAgo: '2h ago'  },
  { id: 'a3', name: 'Devon Park',  miles: 6.4, timeAgo: '5h ago'  },
  { id: 'a4', name: 'Sara Okafor', miles: 4.0, timeAgo: 'Yesterday' },
];
// ───────────────────────────────────────────────────────────

function AnimatedMiles({ value }: { value: number }) {
  const animVal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animVal, {
      toValue: value,
      tension: 40,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <Animated.Text style={[TextStyles.stat, styles.statNumber]}>
      {animVal.interpolate({
        inputRange: [0, value],
        outputRange: ['0.0', value.toFixed(1)],
      }) as any}
    </Animated.Text>
  );
}

function LeaderboardRow({
  rank,
  member,
  topMiles,
}: {
  rank: number;
  member: (typeof MEMBERS)[0];
  topMiles: number;
}) {
  const barWidth = useRef(new Animated.Value(0)).current;
  const pct = member.miles / topMiles;

  useEffect(() => {
    Animated.spring(barWidth, {
      toValue: pct,
      tension: 50,
      friction: 10,
      useNativeDriver: false,
      delay: rank * 80,
    }).start();
  }, [pct, rank]);

  return (
    <View style={[styles.leaderRow, member.isMe && styles.leaderRowMe]}>
      {/* Rank */}
      <Text style={[TextStyles.h3, styles.rank, rank === 1 && styles.rankFirst]}>
        {rank === 1 ? '👑' : rank}
      </Text>

      {/* Avatar */}
      <Avatar name={member.name} size={36} />

      {/* Name + bar */}
      <View style={styles.leaderInfo}>
        <View style={styles.leaderNameRow}>
          <Text style={[TextStyles.body, styles.leaderName]}>
            {member.name}
            {member.isMe && (
              <Text style={styles.youTag}>  YOU</Text>
            )}
          </Text>
          <Text style={[TextStyles.bodySmall, styles.leaderMiles]}>
            {member.miles.toFixed(1)} mi
          </Text>
        </View>
        <View style={styles.leaderBarTrack}>
          <Animated.View
            style={[
              styles.leaderBarFill,
              { width: barWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
              rank === 1 && styles.leaderBarFirst,
            ]}
          />
        </View>
      </View>
    </View>
  );
}

function ActivityRow({ item }: { item: (typeof ACTIVITY)[0] }) {
  return (
    <View style={styles.activityRow}>
      <Avatar name={item.name} size={32} />
      <View style={styles.activityText}>
        <Text style={[TextStyles.body, styles.activityLine]}>
          <Text style={styles.activityName}>{item.name.split(' ')[0]}</Text>
          {' just logged '}
          <Text style={styles.activityMiles}>{item.miles} miles 🔥</Text>
        </Text>
        <Text style={[TextStyles.caption, styles.activityTime]}>{item.timeAgo}</Text>
      </View>
    </View>
  );
}

export default function ActiveGoalScreen() {
  const milesLeft = GOAL.targetMiles - GOAL.currentMiles;
  const topMiles = MEMBERS[0].miles;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <BadgeChip label="Active" variant="lime" />
            <Text style={[TextStyles.caption, styles.dates]}>
              {GOAL.startDate} – {GOAL.endDate}
            </Text>
          </View>
          <Text style={[TextStyles.displayM, styles.goalTitle]}>{GOAL.title}</Text>
          <Text style={[TextStyles.body, styles.daysLeft]}>
            {GOAL.daysRemaining} days left
          </Text>
        </View>

        {/* ── Progress ── */}
        <Card style={styles.progressCard} accent>
          <View style={styles.progressStats}>
            <View style={styles.statBlock}>
              <AnimatedMiles value={GOAL.currentMiles} />
              <Text style={[TextStyles.label, styles.statLabel]}>miles logged</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBlock}>
              <Text style={[TextStyles.stat, styles.statNumber, styles.statMuted]}>
                {milesLeft.toFixed(1)}
              </Text>
              <Text style={[TextStyles.label, styles.statLabel]}>miles to go</Text>
            </View>
          </View>
          <View style={styles.progressBarWrapper}>
            <ProgressBar
              current={GOAL.currentMiles}
              target={GOAL.targetMiles}
              showLabel={false}
              height={10}
            />
            <View style={styles.progressPctRow}>
              <Text style={[TextStyles.caption, styles.progressPct]}>
                {((GOAL.currentMiles / GOAL.targetMiles) * 100).toFixed(0)}% complete
              </Text>
              <Text style={[TextStyles.caption, styles.progressTarget]}>
                {GOAL.targetMiles} mi goal
              </Text>
            </View>
          </View>
        </Card>

        {/* ── Leaderboard ── */}
        <View style={styles.sectionHeader}>
          <Text style={[TextStyles.h3, styles.sectionTitle]}>Leaderboard</Text>
          <Text style={[TextStyles.caption, styles.sectionSub]}>
            {MEMBERS.length} runners
          </Text>
        </View>

        <Card style={styles.leaderCard}>
          {MEMBERS.map((member, i) => (
            <View key={member.id}>
              <LeaderboardRow rank={i + 1} member={member} topMiles={topMiles} />
              {i < MEMBERS.length - 1 && <Divider spacing={Spacing.sm} />}
            </View>
          ))}
        </Card>

        {/* ── Activity feed ── */}
        <View style={styles.sectionHeader}>
          <Text style={[TextStyles.h3, styles.sectionTitle]}>Recent Activity</Text>
        </View>

        <Card style={styles.activityCard}>
          {ACTIVITY.map((item, i) => (
            <View key={item.id}>
              <ActivityRow item={item} />
              {i < ACTIVITY.length - 1 && <Divider spacing={Spacing.sm} />}
            </View>
          ))}
        </Card>

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
    marginBottom: Spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  dates: {
    color: Colors.textMuted,
  },
  goalTitle: {
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  daysLeft: {
    color: Colors.textSecondary,
  },

  // Progress card
  progressCard: {
    marginBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  progressStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statBlock: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 48,
    backgroundColor: Colors.border,
  },
  statNumber: {
    color: Colors.lime,
  },
  statMuted: {
    color: Colors.textSecondary,
  },
  statLabel: {
    color: Colors.textMuted,
  },
  progressBarWrapper: {
    gap: Spacing.xs,
  },
  progressPctRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressPct: {
    color: Colors.lime,
  },
  progressTarget: {
    color: Colors.textMuted,
  },

  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.textPrimary,
  },
  sectionSub: {
    color: Colors.textMuted,
  },

  // Leaderboard
  leaderCard: {
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: Radius.md,
  },
  leaderRowMe: {
    backgroundColor: Colors.limeSubtle,
  },
  rank: {
    color: Colors.textMuted,
    width: 24,
    textAlign: 'center',
    fontSize: 14,
  },
  rankFirst: {
    fontSize: 18,
  },
  leaderInfo: {
    flex: 1,
    gap: 6,
  },
  leaderNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  leaderName: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  youTag: {
    color: Colors.lime,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  leaderMiles: {
    color: Colors.textSecondary,
  },
  leaderBarTrack: {
    height: 4,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  leaderBarFill: {
    height: 4,
    backgroundColor: Colors.textMuted,
    borderRadius: Radius.full,
  },
  leaderBarFirst: {
    backgroundColor: Colors.lime,
  },

  // Activity
  activityCard: {
    paddingVertical: Spacing.sm,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  activityText: {
    flex: 1,
    gap: 2,
  },
  activityLine: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  activityName: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  activityMiles: {
    color: Colors.lime,
    fontWeight: '600',
  },
  activityTime: {
    color: Colors.textMuted,
  },
});
