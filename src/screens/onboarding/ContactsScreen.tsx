import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Contacts from 'expo-contacts';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';
import { useCompleteOnboarding } from '../../context/OnboardingContext';
import StepProgress from './components/StepProgress';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Contacts'>;

const MOCK_FRIENDS = [
  { initials: 'JT', color: '#6366F1', name: 'Jake Torres' },
  { initials: 'MC', color: '#EC4899', name: 'Maya Chen' },
  { initials: 'DP', color: '#F59E0B', name: 'Devon Park' },
];

export default function ContactsScreen({ navigation }: Props) {
  const [requesting, setRequesting] = useState(false);
  const completeOnboarding = useCompleteOnboarding();

  const handleAllow = async () => {
    setRequesting(true);
    try {
      await Contacts.requestPermissionsAsync();
    } catch {
      // Permission failure is non-fatal
    } finally {
      setRequesting(false);
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <StepProgress current={5} total={5} />

        {/* Icon */}
        <View style={styles.iconSection}>
          <View style={styles.iconRing}>
            <Text style={styles.iconEmoji}>👥</Text>
          </View>
        </View>

        <Text style={styles.title}>FIND YOUR{'\n'}FRIENDS</Text>
        <Text style={styles.subtitle}>ON PACEPACK</Text>

        <Text style={styles.body}>
          See which of your contacts are already running with PacePack and invite the rest to join your pack.
        </Text>

        {/* Mock friend avatars */}
        <View style={styles.friendsPreview}>
          <Text style={styles.friendsLabel}>Already running</Text>
          <View style={styles.friendsRow}>
            {MOCK_FRIENDS.map((friend) => (
              <View key={friend.initials} style={styles.friendItem}>
                <View style={[styles.friendAvatar, { backgroundColor: friend.color }]}>
                  <Text style={styles.friendInitials}>{friend.initials}</Text>
                </View>
                <Text style={styles.friendName}>{friend.name.split(' ')[0]}</Text>
              </View>
            ))}
            <View style={styles.friendItem}>
              <View style={[styles.friendAvatar, styles.moreBubble]}>
                <Text style={styles.moreText}>+12</Text>
              </View>
              <Text style={styles.friendName}>more</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ctas}>
        <Button
          label="ALLOW CONTACTS"
          onPress={handleAllow}
          loading={requesting}
          disabled={requesting}
          size="lg"
          style={styles.primaryBtn}
        />
        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
  },
  iconSection: {
    marginBottom: Spacing.xxl,
    marginTop: Spacing.lg,
  },
  iconRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 40,
  },
  title: {
    ...TextStyles.displayM,
    color: Colors.textPrimary,
    marginBottom: 0,
  },
  subtitle: {
    fontFamily: 'BarlowCondensed_700Bold',
    fontSize: 40,
    lineHeight: 44,
    textTransform: 'uppercase',
    color: Colors.lime,
    marginBottom: Spacing.base,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  friendsPreview: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  friendsLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
  },
  friendsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  friendItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  friendAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendInitials: {
    fontFamily: 'BarlowCondensed_700Bold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  friendName: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.textSecondary,
  },
  moreBubble: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  moreText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  ctas: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  primaryBtn: {
    width: '100%',
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  skipText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
