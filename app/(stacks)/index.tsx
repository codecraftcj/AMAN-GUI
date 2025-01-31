import { Text, View, TextInput,Dimensions,TouchableOpacity, StyleSheet, Image} from 'react-native';

import { useRouter } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Image as ExpoImage } from 'expo-image';
import { TerminalAccessPointContext } from '../_layout';
import { useState, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function signIn() {
  const { width, height } = Dimensions.get('window');
  const isMobile = width <= 768; // Example breakpoint for mobile devices
  const router = useRouter();
  const [terminalAccessPoint, setTerminalAccessPoint] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkTerminalAccessPoint = () => {
    const fetchData = async () => {
      try {
        console.log(terminalAccessPoint);
        const response = await fetch(terminalAccessPoint);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        AsyncStorage.setItem('terminalAccessPoint', terminalAccessPoint);
        console.log("terminal access point", terminalAccessPoint);
        router.replace('/dashboard')
        setData(result);
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false);
      }
    };
    console.log("CHECKING ACCESS POINT")
    fetchData();
  }
  return (
    <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
          <View className={isMobile ? "flex-1 bg-white": "flex-1 bg-[#032D61]"}>
          
          {isMobile ? 
          <View className=' items-center w-full h-full bg-white rounded-md'>
          <Image source={require('@/assets/images/aman-logo.png')}  className='h-[50%] w-[50%]'/>
        
          <TextInput className='bg-[#F4F4F4] rounded-[5px] h-[7.5%] w-[75%] border border-black/10 color-[#7C6F6F] pl-[2.5%] text-lg' placeholder='terminal access point' onChangeText={text=>setTerminalAccessPoint(text)}/>

          <TouchableOpacity className='justify-center items-center  bg-[#032D61] h-[7.5%] w-[30.3%] rounded-lg mt-[5%]' onPress={() => checkTerminalAccessPoint()}>
              <Text className='text-white text-lg'>
                  Access Dashboard
              </Text>
            </TouchableOpacity>
          
      </View>
          : 
          
            <View className=' items-center w-[536.76px] h-[708px] m-auto bg-white rounded-md'>
            <ExpoImage source={require('@/assets/images/aman-logo.png')}  className='h-[45%] w-[45%] object-contain mt-[5%]' />
          
            <TextInput className='bg-[#F4F4F4] rounded-[5px] h-[7.5%] w-[45%] border border-black/10 color-[#7C6F6F] pl-[2.5%] text-lg' placeholder='terminal access point' onChangeText={text=>setTerminalAccessPoint(text)}/>
            <View className='  w-[45%] h-[10%] items-center justify-center'>

    
            </View>
          
            <TouchableOpacity className='justify-center items-center  bg-[#032D61] h-[7.5%] w-[30.3%] rounded-lg mt-[5%]' onPress={() => checkTerminalAccessPoint()}>
              <Text className='text-white text-lg'>
                  Access Dashboard Web
              </Text>
            </TouchableOpacity>

            
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