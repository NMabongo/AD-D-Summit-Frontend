import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarStyle: { display: 'none' },
        }} />
      <Tabs.Screen
        name="registrationScreen"
        options={{
          title: 'Register',
          tabBarStyle: { display: 'none' },
        }} />
      <Tabs.Screen
        name="registrationAttendanceConfirmation"
        options={{
          title: 'registrationAttendanceConfirmation',
          tabBarStyle: { display: 'none' },
        }} />
        <Tabs.Screen
        name="registrationTransportationConfirmation"
        options={{
          title: 'registrationTransportationConfirmation',
          tabBarStyle: { display: 'none' },
        }} />
        <Tabs.Screen
        name="contactUs"
        options={{
          title: 'Contact Us',
          tabBarStyle: { display: 'none' },
        }} />
        <Tabs.Screen
        name="mindful"
        options={{
          title: 'mindful',
          tabBarStyle: { display: 'none' },
        }} />
        <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarStyle: { display: 'none' },
        }} />
      <Tabs.Screen
        name="agenda"
        options={{
          title: 'Agenda',
          tabBarStyle: { display: 'none' },
        }} />
      <Tabs.Screen
        name="featuredSpeakers"
        options={{
          title: 'Speakers',
          tabBarStyle: { display: 'none' },
        }} />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarStyle: { display: 'none' },
        }} />
      <Tabs.Screen
        name="speaker-bio"
        options={{
          title: 'Speaker Bio',
          tabBarStyle: { display: 'none' },
        }} />
      <Tabs.Screen
        name="mindfulnessActivity"
        options={{
          title: 'Mindfulness Activity',
          tabBarStyle: { display: 'none' },
        }} />
        <Tabs.Screen
        name="breakoutRoom"
        options={{
          title: 'breakoutRoom',
          tabBarStyle: { display: 'none' },
        }} />
    </Tabs>
  );
}