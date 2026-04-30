import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingContext } from '../context/OnboardingContext';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import SignUpScreen from '../screens/onboarding/SignUpScreen';
import SignInScreen from '../screens/onboarding/SignInScreen';
import ProfilePhotoScreen from '../screens/onboarding/ProfilePhotoScreen';
import HealthKitScreen from '../screens/onboarding/HealthKitScreen';
import NotificationsScreen from '../screens/onboarding/NotificationsScreen';
import ContactsScreen from '../screens/onboarding/ContactsScreen';

export type OnboardingStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ProfilePhoto: undefined;
  HealthKit: undefined;
  Notifications: undefined;
  Contacts: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

type Props = {
  onComplete: () => void;
};

export default function OnboardingNavigator({ onComplete }: Props) {
  return (
    <OnboardingContext.Provider value={{ completeOnboarding: onComplete }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#0A0A0A' },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ProfilePhoto" component={ProfilePhotoScreen} />
        <Stack.Screen name="HealthKit" component={HealthKitScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
      </Stack.Navigator>
    </OnboardingContext.Provider>
  );
}
