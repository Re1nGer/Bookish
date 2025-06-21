import React, { useEffect } from 'react'
import { Slot, Stack, SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font';
import { UserProvider } from '../context/UserContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
  "Cygre-Bold": require("../assets/fonts/Cygre-Bold.ttf"),
  "Cygre-Regular": require("../assets/fonts/Cygre-Regular.ttf"),
  "Cygre-SemiBold": require("../assets/fonts/Cygre-SemiBold.ttf"),
  "Inter": require("../assets/fonts/Inter_24pt-Bold.ttf"),
  "Roboto": require("../assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf")
});

useEffect(() => {
  if (error) throw error;

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }
}, [fontsLoaded, error]);

if (!fontsLoaded && !error) {
  return null;
}

  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  )
}

export default RootLayout