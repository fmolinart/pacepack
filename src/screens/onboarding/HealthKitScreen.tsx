import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui';
import { Colors, TextStyles, Spacing, Radius } from '../../theme';
import StepProgress from './components/StepProgress';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'HealthKit'>;

// HealthKit integration via react-native-health requires a custom dev build.
// This screen captures user intent; actual data permissions are granted in Phase 4
// when the app is built with the native HealthKit module.
export default function HealthKitScreen({ navigation }: Props) {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    // Simulate brief processing; real HealthKit permission request in Phase 4
    await new Promise(resolve => setTimeout(resolve, 600));
    setConnected(true);
    setConnecting(false);
    setTimeout(() => navigation.navigate('Notifications'), 500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <StepProgress current={3} total={5} />

        {/* Icon */}
        <View style={styles.iconSection}>
          <View style={styles.iconRing}>
            <View style={styles.iconInner}>
              <Text style={styles.iconEmoji}>❤️</Text>
            </View>
          </View>
          {connected && (
            <View style={styles.connectedBadge}>
              <Text style={styles.connectedBadgeText}>✓</Text>
            </View>
          )}
        </View>

        {/* Copy */}
        <Text style={styles.title}>CONNECT{'\n'}APPLE HEALTH</Text>

        <Text style={styles.body}>
          PacePack reads your runs from Apple Health. Every mile you log — from Apple Watch,
          Nike Run Club, Garmin, or any app — counts automatically toward your pack's goal.
        </Text>

        {/* Feature list */}
        <View style={styles.features}>
          {[
            { icon: '🏃', text: 'Automatic run sync' },
            { icon: '⌚', text: 'Apple Watch support' },
            { icon: '🔒', text: 'Read-only access' },
          ].map((item) => (
            <View key={item.text} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{item.icon}</Text>
              <Text style={styles.featureText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.ctas}>
        <Button
          label={connected ? '✓ CONNECTED' : 'CONNECT APPLE HEALTH'}
          onPress={handleConnect}
          loading={connecting}
          disabled={connecting || connected}
          size="lg"
          style={styles.primaryBtn}
        />
        <Text style={styles.required}>Required to track your miles</Text>
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
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: Spacing.xxl,
    marginTop: Spacing.lg,
  },
  iconRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FF2D55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 32,
  },
  connectedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  connectedBadgeText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontFamily: 'Inter_700Bold',
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
  features: {
    gap: Spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureIcon: {
    fontSize: 20,
    width: 32,
    textAlign: 'center',
  },
  featureText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
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
  required: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
