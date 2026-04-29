import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import KitchenSinkScreen from '../screens/dev/KitchenSinkScreen';

export type RootStackParamList = {
  Tabs: undefined;
  KitchenSink: undefined;
  // Onboarding screens added in Phase 2
  // Goal detail / recap screens added in Phase 3
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#0A0A0A' },
        }}
      >
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen
          name="KitchenSink"
          component={KitchenSinkScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#0A0A0A' },
            headerTintColor: '#C8FF00',
            headerTitle: 'Kitchen Sink',
            headerTitleStyle: {
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: 14,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
