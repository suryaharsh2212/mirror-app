import { ScrollView, Text, View, Image, TouchableOpacity, Alert, ImageBackground,StyleSheet } from 'react-native';
import React from 'react';

const Bookmark = () => {
  const data = [
    { id: 1, title: 'Arizona', image: "https://images.unsplash.com/photo-1548602088-9d12a4f9c10f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: 'Card 2', image: "https://images.unsplash.com/photo-1549778399-f94fd24d4697?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: 'Card 3', image: "https://images.unsplash.com/photo-1515674744565-0d7112cd179a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTZ8fHxlbnwwfHx8fHw%3D" }, 
    { id: 4, title: 'Card 1', image: "https://images.unsplash.com/photo-1548602088-9d12a4f9c10f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, title: 'Card 1', image: "https://images.unsplash.com/photo-1548602088-9d12a4f9c10f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, title: 'Card 1', image: "https://images.unsplash.com/photo-1548602088-9d12a4f9c10f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D" },



  ];

  const handle = () => {
    Alert.alert(
      "Button Pressed",
      "You have pressed the button!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };
  return (
    <View>
      <Text>Bookmark pa</Text>
     
      <ScrollView>
        {data.map(item => (
          <View key={item.id} className="bg-white rounded-lg p-4 mb-4 shadow">
            <Image 
              source={{ uri: item.image }}  // Corrected
              className="w-full h-56 rounded mb-3" 
              resizeMode="cover" 
            />
             <Text className="text-lg text-center p-3  font-bold text-gray-800">{item.title}</Text> 
           
            <TouchableOpacity onPress={handle} className="bg-gray-200 p-2 rounded-3xl">
              <Text className="text-center text-black">Click me</Text>
            </TouchableOpacity>
           
          </View>
        ))}
      </ScrollView>

    </View>
  );
};


export default Bookmark;
