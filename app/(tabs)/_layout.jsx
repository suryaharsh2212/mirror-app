import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import {icons} from "../../constants"
import {Tabs,Redirect} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
const TabIcon=({icon,color,name,focused})=>{
    return (
        <View className="gap-1  justify-center items-center" >
            <Image 
             source={icon}
             resizeMode='contain'
             tintColor={color}
             className="w-6 h-6"
            />
            <Text className="" >{name}</Text>
        </View>
    )
}
const Layout = () => {
  return (
    <>
    <Tabs
    
     screenOptions={
        {
            tabBarShowLabel:false,
            tabBarActiveTintColor:'#FFA001',
            tabBarInactiveTintColor:'#CDCDE0',
            headerShown:false
           
            
        }
     }
    >
        <Tabs.Screen
        name='home'
        options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({color,focused})=>(
             <TabIcon 
               icon={icons.home}
               color={color}
               name="home"
               focused={focused}
             />
            )


        }}
        >

        </Tabs.Screen>
        <Tabs.Screen
        name='bookmark'
        options={{
            title:'Bookmark',
            headerShown:false,
            tabBarIcon:({color,focused})=>(
             <TabIcon 
               icon={icons.bookmark}
               color={color}
               name="Bookmark"
               focused={focused}
             />
            )


        }}
        >

        </Tabs.Screen>
        <Tabs.Screen
        name='create'
        options={{
            title:'profile',
            headerShown:false,
            tabBarIcon:({color,focused})=>(
             <TabIcon 
               icon={icons.profile}
               color={color}
               name="Profile"
               focused={focused}
             />
            )


        }}
        >

        </Tabs.Screen>
        <Tabs.Screen
        name='profile'
        options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({color,focused})=>(
             <TabIcon 
               icon={icons.home}
               color={color}
               name="home"
               focused={focused}
             />
            )


        }}
        >

        </Tabs.Screen>
    </Tabs>
    <StatusBar />
    </>
  )
}

export default Layout

const styles = StyleSheet.create({})