import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui';
import { Colors, TextStyles, Spacing } from '../../theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background accent dots */}
      <View style={styles.accentDot1} />
      <View style={styles.accentDot2} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Logo / brand mark */}
        <View style={styles.logoSection}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>P</Text>
          </View>
        </View>

        {/* Hero text */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>PACE{'\n'}PACK</Text>
          <Text style={styles.tagline}>
            Run together.{'\n'}Go further.
          </Text>
        </View>

        {/* Descriptor pills */}
        <View style={styles.pills}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>🏃 Group goals</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>📊 Live leaderboard</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>🏅 Badges</Text>
          </View>
        </View>
      </Animated.View>

      {/* CTAs */}
      <Animated.View style={[styles.ctas, { opacity: fadeAnim }]}>
        <Button
          label="GET STARTED"
          onPress={() => navigation.navigate('SignUp')}
          variant="primary"
          size="lg"
          style={styles.primaryBtn}
        />
        <Button
          label="SIGN IN"
          onPress={() => navigation.navigate('SignIn')}
          variant="ghost"
          size="lg"
          style={styles.ghostBtn}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  accentDot1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.lime,
    opacity: 0.04,
    top: -80,
    right: -80,
  },
  accentDot2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.lime,
    opacity: 0.03,
    bottom: height * 0.25,
    left: -60,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'center',
  },
  logoSection: {
    marginBottom: Spacing.xxl,
  },
  logoMark: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: {
    fontSize: 32,
    fontFamily: 'BarlowCondensed_900Black',
    color: Colors.background,
    lineHeight: 36,
  },
  heroSection: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...TextStyles.displayL,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  tagline: {
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    lineHeight: 28,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  pill: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  pillText: {
    fontFamily: 'Inter_400Regular',
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
  ghostBtn: {
    width: '100%',
  },
});
