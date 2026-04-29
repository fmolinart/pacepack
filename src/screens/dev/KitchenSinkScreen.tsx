import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';
import { Button, Card, Avatar, ProgressBar, BadgeChip, Divider } from '../../components/ui';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={[TextStyles.label, styles.sectionLabel]}>{title}</Text>
      {children}
    </View>
  );
}

export default function KitchenSinkScreen() {
  const [loadingBtn, setLoadingBtn] = useState(false);

  function handleLoadingDemo() {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 2000);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[TextStyles.h1, styles.pageTitle]}>Kitchen Sink</Text>
        <Text style={[TextStyles.body, styles.pageSubtitle]}>Design system preview</Text>

        <Divider spacing={Spacing.lg} />

        {/* ── Typography ── */}
        <Section title="Typography">
          <Card>
            <View style={styles.typeList}>
              <Text style={[TextStyles.displayL, { color: Colors.lime }]}>Display L</Text>
              <Text style={[TextStyles.displayM, { color: Colors.textPrimary }]}>Display M</Text>
              <Text style={[TextStyles.h1, { color: Colors.textPrimary }]}>Heading 1</Text>
              <Text style={[TextStyles.h2, { color: Colors.textPrimary }]}>Heading 2</Text>
              <Text style={[TextStyles.h3, { color: Colors.textPrimary }]}>Heading 3</Text>
              <Text style={[TextStyles.label, { color: Colors.textSecondary }]}>Label / Overline</Text>
              <Text style={[TextStyles.bodyLarge, { color: Colors.textPrimary }]}>Body Large — The pack is counting on you.</Text>
              <Text style={[TextStyles.body, { color: Colors.textSecondary }]}>Body — Every mile counts toward the goal.</Text>
              <Text style={[TextStyles.bodySmall, { color: Colors.textMuted }]}>Body Small — 12m ago · 5.2 miles logged</Text>
              <Text style={[TextStyles.stat, { color: Colors.lime }]}>67.4</Text>
              <Text style={[TextStyles.caption, { color: Colors.textMuted }]}>CAPTION · MILES LOGGED</Text>
            </View>
          </Card>
        </Section>

        {/* ── Colors ── */}
        <Section title="Color Palette">
          <Card>
            <View style={styles.swatchGrid}>
              {[
                { label: 'Lime',       color: Colors.lime },
                { label: 'Lime Sub',   color: Colors.limeSubtle },
                { label: 'BG',         color: Colors.background },
                { label: 'Surface',    color: Colors.surface },
                { label: 'Elevated',   color: Colors.surfaceElevated },
                { label: 'Border',     color: Colors.border },
                { label: 'Primary',    color: Colors.textPrimary },
                { label: 'Secondary',  color: Colors.textSecondary },
                { label: 'Muted',      color: Colors.textMuted },
                { label: 'Success',    color: Colors.success },
                { label: 'Warning',    color: Colors.warning },
                { label: 'Error',      color: Colors.error },
              ].map(({ label, color }) => (
                <View key={label} style={styles.swatch}>
                  <View style={[styles.swatchColor, { backgroundColor: color, borderWidth: color === Colors.background ? 1 : 0, borderColor: Colors.border }]} />
                  <Text style={[TextStyles.caption, styles.swatchLabel]}>{label}</Text>
                </View>
              ))}
            </View>
          </Card>
        </Section>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <Card style={styles.btnGrid}>
            <Button label="Primary" onPress={() => {}} variant="primary" size="lg" style={styles.fullWidth} />
            <Button label="Secondary" onPress={() => {}} variant="secondary" size="lg" style={styles.fullWidth} />
            <Button label="Ghost" onPress={() => {}} variant="ghost" size="lg" style={styles.fullWidth} />
            <Button label="Danger" onPress={() => {}} variant="danger" size="md" style={styles.fullWidth} />
            <View style={styles.btnRow}>
              <Button label="Small" onPress={() => {}} size="sm" />
              <Button label="Medium" onPress={() => {}} size="md" />
              <Button label="Large" onPress={() => {}} size="lg" />
            </View>
            <Button label="Loading…" onPress={handleLoadingDemo} loading={loadingBtn} style={styles.fullWidth} />
            <Button label="Disabled" onPress={() => {}} disabled style={styles.fullWidth} />
          </Card>
        </Section>

        {/* ── Cards ── */}
        <Section title="Cards">
          <View style={styles.cardList}>
            <Card>
              <Text style={[TextStyles.h3, { color: Colors.textPrimary }]}>Default Card</Text>
              <Text style={[TextStyles.body, { color: Colors.textSecondary }]}>Standard surface with border.</Text>
            </Card>
            <Card elevated>
              <Text style={[TextStyles.h3, { color: Colors.textPrimary }]}>Elevated Card</Text>
              <Text style={[TextStyles.body, { color: Colors.textSecondary }]}>Higher surface background.</Text>
            </Card>
            <Card accent>
              <Text style={[TextStyles.h3, { color: Colors.lime }]}>Accent Card</Text>
              <Text style={[TextStyles.body, { color: Colors.textSecondary }]}>Lime border — used for active/highlighted states.</Text>
            </Card>
          </View>
        </Section>

        {/* ── Avatars ── */}
        <Section title="Avatars">
          <Card>
            <View style={styles.avatarRow}>
              {[
                { name: 'Maya Chen',   size: 56 },
                { name: 'Jake Torres', size: 48 },
                { name: 'Devon Park',  size: 40 },
                { name: 'Sara Okafor', size: 32 },
                { name: 'Chris Lund',  size: 24 },
              ].map(({ name, size }) => (
                <Avatar key={name} name={name} size={size} />
              ))}
            </View>
            <Text style={[TextStyles.caption, styles.avatarNote]}>
              Initials fallback — color derived from name
            </Text>
          </Card>
        </Section>

        {/* ── Progress Bars ── */}
        <Section title="Progress Bar">
          <Card style={styles.progressList}>
            <View>
              <Text style={[TextStyles.caption, styles.progressLabel]}>67% — Active goal</Text>
              <ProgressBar current={67.4} target={100} height={10} />
            </View>
            <View>
              <Text style={[TextStyles.caption, styles.progressLabel]}>88% — Near completion</Text>
              <ProgressBar current={44.1} target={50} height={8} />
            </View>
            <View>
              <Text style={[TextStyles.caption, styles.progressLabel]}>100% — Completed</Text>
              <ProgressBar current={100} target={100} height={8} showLabel={false} />
            </View>
            <View>
              <Text style={[TextStyles.caption, styles.progressLabel]}>12% — Just started</Text>
              <ProgressBar current={12} target={100} height={6} showLabel={false} />
            </View>
          </Card>
        </Section>

        {/* ── Badge Chips ── */}
        <Section title="Badge Chips">
          <Card>
            <View style={styles.chipRow}>
              <BadgeChip label="Active" variant="lime" />
              <BadgeChip label="Completed" variant="success" />
              <BadgeChip label="Closing In" variant="warning" />
              <BadgeChip label="Failed" variant="error" />
              <BadgeChip label="Upcoming" variant="neutral" />
            </View>
          </Card>
        </Section>

        <View style={{ height: Spacing.xxxl }} />
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
  pageTitle: {
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  pageSubtitle: {
    color: Colors.textSecondary,
  },

  section: {
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  sectionLabel: {
    color: Colors.textMuted,
  },

  typeList: {
    gap: Spacing.sm,
  },

  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  swatch: {
    alignItems: 'center',
    gap: 4,
    width: 56,
  },
  swatchColor: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
  },
  swatchLabel: {
    color: Colors.textMuted,
    textAlign: 'center',
  },

  btnGrid: {
    gap: Spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  btnRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },

  cardList: {
    gap: Spacing.sm,
  },

  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  avatarNote: {
    color: Colors.textMuted,
  },

  progressList: {
    gap: Spacing.lg,
  },
  progressLabel: {
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
});
