import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

//never-forget is complicated component 

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ title: "", headerTransparent: true }} />
        <Stack.Screen name="sign-up" options={{ title: "Sign Up", headerTransparent: true}} /> 
        <Stack.Screen name="forgot-password" options={{ title: "", headerTransparent: true }} />
        <Stack.Screen name="verification" options={{ title: "", headerTransparent: true }} />
        <Stack.Screen name="new-password" options={{ title: "", headerTransparent: true }} />
        <Stack.Screen name="password-success" options={{ title: "", headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ title: "", headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="set-strike" options={{ title: "", headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="keep-strike" options={{ title: "", headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="commit-to-growing" options={{ title: "", headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="never-forget" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="set-books" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="sounds-promising" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="topics-interested" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="people-interested" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="books-interested" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="reason-for-reading" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="what-a-taste" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="commitment" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="preparing-plan" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
        <Stack.Screen name="special-offer" options={{ title: "", headerBackVisible: false, headerShown: false }} /> 
      </Stack>
      <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </>
  )
}


export default AuthLayout