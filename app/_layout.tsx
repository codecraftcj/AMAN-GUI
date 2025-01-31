import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect,useState,createContext,SetStateAction,Dispatch} from 'react';
import 'react-native-reanimated';
import '../global.css'

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

interface TerminalAccessPointContextType {
  terminalAccessPoint: string;
  setTerminalAccessPoint: Dispatch<SetStateAction<string>>;
}
export const TerminalAccessPointContext = createContext<TerminalAccessPointContextType>(
  {
    terminalAccessPoint: '',
    setTerminalAccessPoint: () => {},
  }
)
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [terminalAccessPoint, setTerminalAccessPoint] = useState('');
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <TerminalAccessPointContext.Provider value={{ terminalAccessPoint, setTerminalAccessPoint }}> 
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(stacks)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }}/>
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </TerminalAccessPointContext.Provider>
  );
}
