import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/authSlice.js'; // Adjust the path if necessary
import { setUserDetails } from '../../Redux/userslice.js'; // Adjust the path if necessary
import * as SecureStore from 'expo-secure-store';
import { Link, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import loginicon from '../../assets/amico.png';

const SignIn = () => {
  const [emailOrPhone, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });
  const dispatch = useDispatch();
  const router = useRouter();

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  const handle = async () => {
    try {
      const response = await fetch('http://192.168.31.102:8000/restro/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await response.json();
      console.log(data);
      

      if (response.ok) {
        // Store token securely
        await SecureStore.setItemAsync('userToken', data.token);

        // Update Redux state with user details
        dispatch(loginSuccess({ token: data.token, user: data.user }));
        dispatch(setUserDetails({
          id: data.user.id,
          email: data.user.email,
          phone: data.user.phoneNo,
          name: data.user.name,
        }));

        // Navigate to home
        router.push('/home');
      } else {
        Alert.alert('Login failed', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to connect to the server. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#00bcd4' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 16 }}>Sign In</Text>
        <Image style={{ width: 200, height: 200 }} source={loginicon} />

        <View style={{ width: '100%', marginBottom: 16 }}>
          <Text style={{ color: '#ccc', marginBottom: 8 }}>Email or Phone</Text>
          <TextInput
            style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, borderColor: '#ccc', borderWidth: 1 }}
            placeholder="Enter your email or phone"
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailOrPhone}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={{ width: '100%', marginBottom: 24 }}>
          <Text style={{ color: '#ccc', marginBottom: 8 }}>Password</Text>
          <TextInput
            style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, borderColor: '#ccc', borderWidth: 1 }}
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={text => setPass(text)}
          />
        </View>

        <TouchableOpacity onPress={handle} style={{ backgroundColor: '#ffeb3b', paddingVertical: 16, borderRadius: 8, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, marginBottom: 16 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Sign In</Text>
        </TouchableOpacity>

        <Text style={{ color: '#aaa', textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link href="/Sign_up" style={{ color: '#2196f3', fontWeight: '600' }}>Sign Up</Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;
