import { Text, View, StyleSheet,TextInput,Button } from 'react-native';
import { Link } from 'expo-router'; 
import { Image } from 'expo-image';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
const PlaceholderImage = require('@/assets/images/aman-logo.png');

export default function signIn() {
  return (
    <View >
      <Image source={PlaceholderImage} style={styles.image} />
      <Text className='bg-red-300'>
        Username
      </Text>
      <TextInput
      placeholder="username"
      >
      </TextInput>
      <Text>
        Password
      </Text>
      <TextInput
      placeholder="password"
      >
      </TextInput>

      <Text> remember me</Text>


    </View>
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