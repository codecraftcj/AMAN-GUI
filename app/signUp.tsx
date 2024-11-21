import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { useAuth } from "../app/context/AuthContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const { register } = useAuth();

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {/* <Button title="Sign Up" onPress={() => onRegister(email, password)} /> */}
    </View>
  );
}