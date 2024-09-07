import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const user=useSelector((state)=>state.user)
  console.log(user);
  
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Hello !{user.name}</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})