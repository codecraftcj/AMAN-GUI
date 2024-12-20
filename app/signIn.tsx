import { yupResolver } from '@hookform/resolvers/yup';
import { useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';
import { Stack,useRouter,useSegments } from 'expo-router';
import {useAuth } from '../app/context/AuthContext'
interface FormData {
  email: string;
  password: string;
}

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignIn = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { onLogin} = useAuth();
  const login = async () => {
    const result = await onLogin!(email,password);
    if (result && result.erro){
      alert(result.msg)
    }
  }

  const goToSignUp = () => {
    router.replace("/signUp",)
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text className='color-white'>Sign In</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={(text:string)=>setEmail(text)}
                  value={email}
                />
              )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#888"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={(text:string)=>setPassword(text)}
                  value={password}
                />
              )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToSignUp} className='mt-5'>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 16,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#2e2e2e',
    padding: 24,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  error: {
    color: '#ff6b6b',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SignIn;