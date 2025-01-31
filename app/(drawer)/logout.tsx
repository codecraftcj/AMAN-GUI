import { Text, View, StyleSheet,TouchableOpacity,Dimensions,Image,Switch} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Database() {

    const router = useRouter();

    useEffect(() => {
      AsyncStorage.setItem("terminalAccessPoint", "")
      router.replace('/');
    }, []);
    return (
      <Text>Empty</Text>
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