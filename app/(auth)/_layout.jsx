import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ title: "", headerTransparent: true }} />
        <Stack.Screen name="sign-up" options={{ title: "Sign Up", headerTransparent: true}} /> 
        <Stack.Screen name="forgot-password" options={{ title: "", headerTransparent: true }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }}/>
      </Stack>
      <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </>
  )
}


export default AuthLayout