import React from 'react';
import { Slot, Stack } from 'expo-router';

const AuthLayout = () => {
 

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName='/SignUp'>
      <Stack.Screen name='Sign_up'></Stack.Screen>
      <Stack.Screen name='Login'></Stack.Screen>
    </Stack>
  );
};

export default AuthLayout;
