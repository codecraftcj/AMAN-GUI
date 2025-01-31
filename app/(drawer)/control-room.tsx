import { Text, View, StyleSheet,TouchableOpacity,Dimensions,Image} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


export default function Index() {

    const { width, height } = Dimensions.get('window');
    const isMobile = width <= 768; // Example breakpoint for mobile devices
    const router = useRouter();

    // @To do: Control Room Page Design
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
      <View className={isMobile ? "flex-1 bg-white": "flex-1 bg-[#032D61]"}>
      
      {isMobile ? 
      
      : 
      
      
      }

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
    },
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
  });