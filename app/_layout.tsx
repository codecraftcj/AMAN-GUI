import {  DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack,useRouter,useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider,useAuth } from '../app/context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(drawer)';
import SignIn from './signIn';

import SignUp from './signUp';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();



const MainLayout = () => {
  const {authState, onLogout} = useAuth();
  const router = useRouter();
  
  return(
    <ThemeProvider value={ DefaultTheme}>
      

      <Stack>
      {authState?.authenticated ?(
        <Stack.Screen name="Home" ></Stack.Screen>
        
        ):(
          <Stack.Screen name="signIn" ></Stack.Screen>
        
      )}</Stack>


      
    </ThemeProvider>
  )
}
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
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
    <AuthProvider>
      <MainLayout/>
    </AuthProvider>
  );
}
