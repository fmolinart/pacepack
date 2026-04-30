import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, BarlowCondensed_700Bold, BarlowCondensed_900Black, BarlowCondensed_500Medium } from '@expo-google-fonts/barlow-condensed';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { supabase } from './src/lib/supabase';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/theme';

type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated';

const ONBOARDING_KEY = 'onboarding_complete';

export default function App() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

  const [fontsLoaded] = useFonts({
    BarlowCondensed_700Bold,
    BarlowCondensed_900Black,
    BarlowCondensed_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const onboardingDone = await AsyncStorage.getItem(ONBOARDING_KEY);
      setAuthStatus(session && onboardingDone ? 'authenticated' : 'unauthenticated');
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        setAuthStatus('unauthenticated');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setAuthStatus('authenticated');
  }, []);

  if (!fontsLoaded || authStatus === 'loading') {
    return <View style={styles.splash} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootNavigator
        isAuthenticated={authStatus === 'authenticated'}
        onOnboardingComplete={completeOnboarding}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
