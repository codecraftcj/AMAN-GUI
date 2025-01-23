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
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="devices"
        options={{
          title: 'Devices',
        }}
      />
    </Drawer>
  </GestureHandlerRootView>
   
  );
}
