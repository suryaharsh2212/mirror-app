import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import usbimg from '../assets/usb.jpeg';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
  
      <View className="absolute top-0 w-full  p-5 shadow-md z-10" style={{backgroundColor:"#4E4376"}}>
        <Text className="text-white text-3xl mt-16 font-bold text-center">
          Welcome to Reflectify
        </Text>
      </View>

    
      <View className="absolute top-32 w-full flex justify-center items-center p-6">
        <Text className="text-gray-700 text-base font-medium text-center p-6 mt-4">
          Please connect your Phone and Laptop via USB before proceeding.
        </Text>

      
        <View className=" h-36 w-full mt-4  flex justify-center items-center">
          <Image
            source={usbimg}
            resizeMode="contain"
            style={{ width: '80%', height: '80%' }} // Adjust the image size to fit inside the circle
          />
        </View>
      </View>

      {/* Scan Button */}
      <View className="flex-1 justify-center items-center px-4 mt-40">
        <TouchableOpacity
          className="bg-gray-700 py-4 px-8 rounded-full shadow-lg"
          onPress={() => router.push('/scan')}
        >
          <Text className="text-white text-base font-semibold">Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
