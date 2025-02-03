import { Text, View, StyleSheet,TouchableOpacity,Dimensions,Image,ActivityIndicator } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Index() {

    const { width, height } = Dimensions.get('window');
    const isMobile = width <= 768; // Example breakpoint for mobile devices
    const router = useRouter();
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [terminalAccessPoint, setTerminalAccessPoint] = useState("");
    const getTerminalAccessPoint  = async (): Promise<string | null> => {
      try {
        const accessPoint = await AsyncStorage.getItem("terminalAccessPoint");

      return accessPoint ? accessPoint : null;
      } catch(e) { 
        console.log(e)
        return null;
      }}
      
    useEffect(() => {
      getTerminalAccessPoint().then((value) => {setTerminalAccessPoint(value ?? "")});
    }, []);

    const getData = async () => {
      try {
        console.log(terminalAccessPoint + "/get-jobs")
        const response = await fetch(terminalAccessPoint + "get-jobs");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log

        setData(result);
      }catch(err){

      }
    }
    
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
      <View className={isMobile ? "flex-1 bg-white": "flex-1 bg-[#032D61]"}>
      
      {isMobile ? 
      <View className=' items-center w-[42%] h-[80%] m-auto bg-white rounded-md'>
      <Image source={require('@/assets/images/aman-logo.png')} style={styles.image}  className='mt-[10%]'/>
      <Text>{terminalAccessPoint}</Text>
      <TouchableOpacity
        onPress={() => getData()}
        activeOpacity={0.7}
      >
        <Text>Test Data</Text>

      </TouchableOpacity>
      {/* <View style={{ padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      ) : (
        <Text>{JSON.stringify(data.message, null, 2)}</Text>
      )}
    </View> */}
  
    </View>
      : 
      
      <View className=' items-center w-[536.76px] h-[708px] m-auto bg-white rounded-md'>
        <Text>Hello, user!</Text>
        <Text>Select system</Text>
        <Text>Water quality parameters: Great</Text>
        <Text>Expand to view average water quality paramaters for current system</Text>
        <Text>Battery Charge Percentages for devices</Text>
        <Text>Alerts column</Text>
        <Text> How are we doing graphs?</Text>
        <Text>{terminalAccessPoint}</Text>
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