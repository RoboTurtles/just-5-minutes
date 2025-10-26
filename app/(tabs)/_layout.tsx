import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CalendarDaysIcon, PencilSquareIcon } from 'react-native-heroicons/solid';
import { UserDataProvider } from '../task-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserDataProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Discoverer',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="new-task"
          options={{
            title: 'New Habit',
            tabBarIcon: ({ color }) => <PencilSquareIcon color={color} width={28} height={28} />,
          }}
        />
        <Tabs.Screen
          name="view-tasks"
          options={{
            title: 'Upcoming',
            tabBarIcon: ({ color }) => <CalendarDaysIcon color={color} width={28} height={28} />,
          }}
        />
      </Tabs>
    </UserDataProvider>
  );
}
