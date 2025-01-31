import { Drawer} from 'expo-router/drawer';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
     <Drawer>
      <Drawer.Screen
        name="dashboard"
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="control-room"
        options={{
          title: 'Control Room',
        }}
      />

      <Drawer.Screen
        name="notification"
        options={{
          title: 'Notification',
        }}
      />
      <Drawer.Screen
        name="database"
        options={{
          title: 'Database',
        }}
      />
    <Drawer.Screen
        name="logout"
        options={{
          title: 'logout',
        }}
      />
    </Drawer>

  </GestureHandlerRootView>
   
  );
}
