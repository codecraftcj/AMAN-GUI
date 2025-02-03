import { Text, View, StyleSheet,TouchableOpacity,Dimensions,Image,Switch} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import React, {useState, useEffect} from 'react';
import WaterParametersTable from '@/components/WaterParametersTable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Database() {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { width, height } = Dimensions.get('window');
    const [terminalAccessPoint, setTerminalAccessPoint] = useState("");
    const isMobile = width <= 768; // Example breakpoint for mobile devices
    const router = useRouter();
    const getTerminalAccessPoint  = async (): Promise<string | null> => {
      try {
        const accessPoint = await AsyncStorage.getItem("terminalAccessPoint");

      return accessPoint ? accessPoint : null;
      } catch(e) { 
        console.log(e)
        return null;
      }
    }

    useEffect(() => {
      getTerminalAccessPoint().then((value) => {setTerminalAccessPoint(value ?? "")});
    }, []);
    return (

      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
      <View className={isMobile ? "flex-1 bg-white": "flex-1 bg-[#032D61]"}>
      {isMobile ? 
      <WaterParametersTable />
      : 
      
      <View className=' items-center w-[536.76px] h-[708px] m-auto bg-white rounded-md'>
      <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        
      </View>
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