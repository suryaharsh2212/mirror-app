import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const SignUp = () => {
  const [loadingstate,setLoadingState]=useState(true)
  return (
    <SafeAreaView className="flex-1 justify-center  px-6 bg-gray-900">

      <View  className=" flex items-center">
      <Image
       source={{uri:"https://cdn-icons-png.flaticon.com/128/15707/15707749.png"}}
       className=" w-[100px] h-[100px]  rounded mb-3" 
        resizeMode="cover"
      />
      </View>

   
      <View className="mb-4">
        <Text className="text-gray-100 mb-2">Phone Number</Text>
        <TextInput 
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-300"
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>

   
      <View className="mb-4">
        <Text className="text-gray-100 mb-2">Email</Text>
        <TextInput 
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-300"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>


      <View className="mb-6">
        <Text className="text-gray-100 mb-2">Password</Text>
        <TextInput 
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-300"
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

     
      <TouchableOpacity className="bg-yellow-600 py-4 rounded-lg mb-4 shadow-lg">
        <Text className="text-white text-center text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-600">
        Already have an account? 
        <Link href='/Login' className="text-blue-600 font-semibold">
        
        {loadingstate?
        <View className="text-white">
         <ActivityIndicator color={"red"}  style={{}}/></View>
       
        :
        <> Sign In</>
        }
        </Link>
      </Text>
      <StatusBar backgroundColor='black' translucent />
    </SafeAreaView>
  );
};

export default SignUp;


