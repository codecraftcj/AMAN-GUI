import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack,useRouter,useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider,useAuth } from '../app/context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


const MainLayout = () => {
  const {authState, onLogout} = useAuth();
  const router = useRouter();

  useEffect(()=>{
    if(authState?.authenticated){
        router.replace('/(drawer)/Home')
    }else{
      router.replace('/signIn');
    }
  })
  return(
    <ThemeProvider value={ DefaultTheme}>

      {authState?.authenticated ?<Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> : 
      <Stack>
        <Stack.Screen  name="signIn"/>
      </Stack>}
      <StatusBar style="auto" />

      
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
