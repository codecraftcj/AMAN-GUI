import { Text, View, StyleSheet,TouchableOpacity,Dimensions,Image} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


export default function Index() {

    const { width, height } = Dimensions.get('window');
    const isMobile = width <= 768; // Example breakpoint for mobile devices
    const router = useRouter();

    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
      <View className={isMobile ? "flex-1 bg-white": "flex-1 bg-[#032D61]"}>
      
      {isMobile ? 
      <View className=' items-center w-[42%] h-[80%] m-auto bg-white rounded-md'>
      <Image source={require('@/assets/images/aman-logo.png')} style={styles.image}  className='mt-[10%]'/>
    
        <TouchableOpacity className='justify-center items-center  bg-[#032D61] h-[10%] w-[120%] mt-[10%] rounded-3xl' onPress={() => router.push('/')}>
            <Text className='text-white text-lg'>
                Drawer Devices
            </Text>
        </TouchableOpacity>
  
    </View>
      : 
      
      <View className=' items-center w-[536.76px] h-[708px] m-auto bg-white rounded-md'>
    </View>}

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