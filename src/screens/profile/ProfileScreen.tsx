import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';
import { Avatar, Card, Divider } from '../../components/ui';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[TextStyles.h1, styles.title]}>Profile</Text>

        {/* Profile card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Avatar name="Jake Torres" size={64} />
            <View style={styles.profileInfo}>
              <Text style={[TextStyles.h2, styles.profileName]}>Jake Torres</Text>
              <Text style={[TextStyles.body, styles.profileEmail]}>jake@example.com</Text>
              <Text style={[TextStyles.caption, styles.memberSince]}>Member since Apr 2026</Text>
            </View>
          </View>
        </Card>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { value: '34.2', label: 'Lifetime Miles' },
            { value: '3', label: 'Goals Joined' },
            { value: '1', label: 'Completed' },
          ].map(({ value, label }) => (
            <Card key={label} style={styles.statCard}>
              <Text style={[TextStyles.h2, styles.statValue]}>{value}</Text>
              <Text style={[TextStyles.caption, styles.statLabel]}>{label}</Text>
            </Card>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.sectionHeader}>
          <Text style={[TextStyles.h3, styles.sectionTitle]}>Settings</Text>
        </View>
        <Card>
          {[
            { icon: '🍎', label: 'Apple Health', value: 'Connected' },
            { icon: '🔔', label: 'Notifications', value: 'On' },
            { icon: '👤', label: 'Account', value: '' },
          ].map(({ icon, label, value }, i, arr) => (
            <View key={label}>
              <TouchableOpacity style={styles.settingsRow} activeOpacity={0.7}>
                <Text style={styles.settingsIcon}>{icon}</Text>
                <Text style={[TextStyles.body, styles.settingsLabel]}>{label}</Text>
                <Text style={[TextStyles.body, styles.settingsValue]}>{value}</Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              {i < arr.length - 1 && <Divider spacing={0} />}
            </View>
          ))}
        </Card>

        {/* Dev tools */}
        <View style={styles.sectionHeader}>
          <Text style={[TextStyles.h3, styles.sectionTitle]}>Dev Tools</Text>
        </View>
        <Card>
          <TouchableOpacity
            style={styles.settingsRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('KitchenSink')}
          >
            <Text style={styles.settingsIcon}>🎨</Text>
            <Text style={[TextStyles.body, styles.settingsLabel]}>Kitchen Sink</Text>
            <Text style={[TextStyles.body, styles.settingsValue]}>Design system</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
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
  title: {
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  profileCard: {
    marginBottom: Spacing.md,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  profileInfo: {
    flex: 1,
    gap: 3,
  },
  profileName: {
    color: Colors.textPrimary,
  },
  profileEmail: {
    color: Colors.textSecondary,
  },
  memberSince: {
    color: Colors.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: Spacing.md,
  },
  statValue: {
    color: Colors.lime,
  },
  statLabel: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
  sectionHeader: {
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.textPrimary,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  settingsIcon: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },
  settingsLabel: {
    flex: 1,
    color: Colors.textPrimary,
  },
  settingsValue: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  chevron: {
    color: Colors.textMuted,
    fontSize: 20,
    lineHeight: 22,
  },
});
