import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import KitchenSinkScreen from '../screens/dev/KitchenSinkScreen';
import OnboardingNavigator from './OnboardingNavigator';

export type RootStackParamList = {
  Onboarding: undefined;
  Tabs: undefined;
  KitchenSink: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  isAuthenticated: boolean;
  onOnboardingComplete: () => void;
};

export default function RootNavigator({ isAuthenticated, onOnboardingComplete }: Props) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen
              name="KitchenSink"
              component={KitchenSinkScreen}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#0A0A0A' },
                headerTintColor: '#C8FF00',
                headerTitle: 'Kitchen Sink',
                headerTitleStyle: { fontWeight: '700', fontSize: 14 },
                contentStyle: { backgroundColor: '#0A0A0A' },
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Onboarding">
            {() => <OnboardingNavigator onComplete={onOnboardingComplete} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
