import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, TextStyles, Spacing } from '../theme';

import HomeScreen from '../screens/home/HomeScreen';
import GoalsScreen from '../screens/goals/GoalsScreen';
import FriendsScreen from '../screens/friends/FriendsScreen';
import BadgesScreen from '../screens/badges/BadgesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  focused: boolean;
  label: string;
  icon: string;
};

function TabIcon({ focused, label, icon }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.tabIconText, focused && styles.tabIconFocused]}>{icon}</Text>
      <Text
        style={[
          TextStyles.caption,
          styles.tabLabel,
          focused ? styles.tabLabelFocused : styles.tabLabelDefault,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Home" icon="🏠" />
          ),
        }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Goals" icon="🎯" />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Friends" icon="👥" />
          ),
        }}
      />
      <Tab.Screen
        name="Badges"
        component={BadgesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Badges" icon="🏅" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Profile" icon="⚡" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopColor: Colors.tabBarBorder,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    gap: 3,
  },
  tabIconText: {
    fontSize: 22,
    opacity: 0.4,
  },
  tabIconFocused: {
    opacity: 1,
  },
  tabLabel: {
    letterSpacing: 0.8,
  },
  tabLabelDefault: {
    color: Colors.textMuted,
  },
  tabLabelFocused: {
    color: Colors.lime,
  },
});
