import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui';
import { Colors, TextStyles, Spacing } from '../../theme';
import StepProgress from './components/StepProgress';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Notifications'>;

const NOTIFICATION_EXAMPLES = [
  { icon: '🏃', text: 'Jake just logged 5.2 miles' },
  { icon: '🎯', text: 'Your pack is 80% to the goal!' },
  { icon: '🏅', text: 'You earned the "Century" badge' },
];

export default function NotificationsScreen({ navigation }: Props) {
  const [requesting, setRequesting] = useState(false);

  const handleEnable = async () => {
    setRequesting(true);
    try {
      if (Platform.OS !== 'web') {
        await Notifications.requestPermissionsAsync();
      }
    } catch {
      // Permission failure is non-fatal
    } finally {
      setRequesting(false);
      navigation.navigate('Contacts');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <StepProgress current={4} total={5} />

        {/* Icon */}
        <View style={styles.iconSection}>
          <View style={styles.iconRing}>
            <Text style={styles.iconEmoji}>🔔</Text>
          </View>
        </View>

        <Text style={styles.title}>STAY IN{'\n'}THE LOOP</Text>

        <Text style={styles.body}>
          Get notified when your pack makes a move, when you're close to a goal, or when you earn a badge.
        </Text>

        {/* Notification preview cards */}
        <View style={styles.previews}>
          {NOTIFICATION_EXAMPLES.map((item) => (
            <View key={item.text} style={styles.previewCard}>
              <Text style={styles.previewIcon}>{item.icon}</Text>
              <Text style={styles.previewText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.ctas}>
        <Button
          label="ENABLE NOTIFICATIONS"
          onPress={handleEnable}
          loading={requesting}
          disabled={requesting}
          size="lg"
          style={styles.primaryBtn}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Contacts')}
          style={styles.skipBtn}
        >
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
    marginBottom: Spacing.base,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  previews: {
    gap: Spacing.sm,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  previewIcon: {
    fontSize: 20,
  },
  previewText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
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
