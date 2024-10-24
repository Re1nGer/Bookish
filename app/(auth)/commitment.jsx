import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from "expo-router";


const Commitment = () => {

  const handleBiometricPrompt = async () => {
    try {

        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        const isFaceId = types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
    
        // Set appropriate message based on device and platform
        const promptMessage = Platform.OS === 'ios'
        ? isFaceId 
            ? 'Use Face ID to seal your commitment'
            : 'Use Touch ID to seal your commitment'
        : 'Use fingerprint to seal your commitment';

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: promptMessage,
        disableDeviceFallback: false,
        cancelLabel: 'Cancel'
      });

      if (result.success) {
        router.push("/commitment")
      }
    } catch (error) {
      console.log('Authentication error:', error);
    }
  };


    return <SafeAreaView className="bg-[#F7F7F7] h-full">
            <View className="px-[23px] flex-[2] self-center mt-6 py-[28px] bg-[#FFFFFF] border border-[#8A8A8A] max-h-[272px] max-w-[353px] mb-4 rounded-[15px]">
                <Text className="text-[#000] text-[22px] font-bold font-cygrebold leading-[26.4px]">Commitment  Pact</Text>
                <Text className="text-[#000] font-cygreregular leading-[19.2px] mt-[16px]">I, Kateryna, commit to making reading a meaningful part of my life. I promise to carve out time for books, whether it’s a few pages a day or long sessions lost in stories.</Text>
                <Text className="text-[#000] font-cygreregular leading-[19.2px] mt-4">
                    Through this pact, I embrace reading not just as a habit, but as a path to growth, relaxation, and discovery.
                </Text>
            </View>
            <View className="w-full flex-[3]">
                <Text className="text-[22px] ml-[20px] leading-[26.4px] font-bold font-cygrebold text-left mb-[14px]">My Goals</Text>
                <View className="w-full flex-row mb-[15px] justify-center">
                    <View className="bg-[#6592E3] items-center mr-3 max-w-[171px] w-full justify-center rounded-[14px] px-[32px] py-[23px]">
                        <Text className="text-[50px] text-[#fff] font-bold leading-[60px]">34</Text>
                        <Text className="text-[#fff] font-bold font-cygrebold">books in 2025</Text>
                    </View>
                    <View className="bg-black items-center justify-center rounded-[14px] max-w-[171px] px-[32px] py-[23px]">
                        <Text className="text-[50px] text-[#fff] font-bold leading-[60px]">30</Text>
                        <Text className="text-[#fff] font-bold font-cygrebold text-center">minutes/day on reading</Text>
                    </View>
                </View>
                <View className="max-w-[353px] self-center border max-h-[88px] rounded-[15px] border-[#8A8A8A] bg-[#fff] p-4">
                    <Text className="text-[#000] font-bold font-cygrebold leading-[19.2px]">To explore books on topics: Mindset, Biology, Art, Habits, Self-Help, History.</Text>
                </View>
            </View>
                
            <View className="w-full items-center flex-[2] h-full">
                <Text className="text-[#000] font-cygrebold my-4">Tap To Commit</Text>
                <TouchableOpacity
                    onPress={() => handleBiometricPrompt()}
                    className="bg-[#6592E3] justify-center rounded-full items-center max-w-[110px] w-full h-full  max-h-[110px]">
                    <MaterialIcons 
                        name={'fingerprint'} 
                        size={76} 
                        color="#FFFFFF" 
                    />
                </TouchableOpacity>
            </View>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>
}


export default Commitment;