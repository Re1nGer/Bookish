import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'

//never-forget is complicated component 

const AuthLayout = () => {
  return (
    <>
      <Stack>
        
{/*         Onboarding Screens */}
        <Stack.Screen name="sign-in" options={{ title: "Sign In",
            headerTitle: () => <HeaderTitle text={"Sign In"} />,
            headerTransparent: true }} />

        <Stack.Screen
          name="sign-up"
          options={{ title: "Sign Up",
            headerTitle: () => <HeaderTitle text={"Sign Up"} />,
            headerTransparent: true}} /> 

        <Stack.Screen
          name="forgot-password"
          options={{ title: "Forgot Password",
            headerTitle: () => <HeaderTitle text={"Forgot Password"} />,
            headerTransparent: true }} />

        <Stack.Screen
          name="verification"
          options={{ title: "Verification",
            headerTitle: () => <HeaderTitle text={"Verification"} />,
            headerTransparent: true }} />

        <Stack.Screen
          name="new-password"
          options={{ title: "New Password",
            headerTitle: () => <HeaderTitle text={"New Password"} />,
            headerTransparent: true }} 
        />
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

{/*         Functional Screens */}
        <Stack.Screen name="search-book" options={{ title: "", headerTransparent: true, animation: 'slide_from_bottom' }} /> 

        <Stack.Screen name="add-book" options={{ title: "", headerTransparent: true, headerShown: false, animation: 'slide_from_bottom' }} /> 

        <Stack.Screen name="select-genres" options={{ title: "", headerTransparent: true, headerShown: false,  animation: 'slide_from_bottom' }} /> 
        <Stack.Screen name="select-collections" options={{ title: "", headerTransparent: true, animation: 'slide_from_bottom' }} /> 
        <Stack.Screen name="saved-book" options={{ title: "", headerTransparent: true, headerBackVisible: false, animation: 'ios', headerShown: false }} /> 
        <Stack.Screen name="book-filters" options={{ title: "", headerTransparent: true, headerBackVisible: false, animation: 'slide_from_bottom', headerShown: false }} /> 
        <Stack.Screen name="create-note" options={{ title: "", headerTransparent: true, headerBackVisible: false, animation: 'slide_from_left', headerShown: false }} /> 
        <Stack.Screen name="quote-to-connect" options={{ title: "", headerTransparent: true, headerBackVisible: false, animation: 'slide_from_right', headerShown: false }} /> 
        <Stack.Screen name="repetition-groups" options={{ title: "", headerTransparent: true, headerBackVisible: false, animation: 'slide_from_right', headerShown: false }} /> 
        <Stack.Screen name="select-authors" options={{ title: "", headerTransparent: true, headerBackVisible: false, animation: 'slide_from_bottom', headerShown: false }} /> 

      </Stack>
      <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </>
  )
}


export default AuthLayout


const HeaderTitle = ({ text }) => {
  return <Text className="font-cygrebold text-black font-bold text-[24px]">{text}</Text>
}