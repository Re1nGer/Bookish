import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { router } from "expo-router";


const PreparingPlan = () => {




    return <SafeAreaView className="bg-[#F7F7F7] h-full">

            <View className="w-full mt-[65px] mb-[47px] items-center">
                <Text className="font-bold text-[#000000] max-w-[349px] text-[24px] text-center leading-[28px] px-[33px] font-cygrebold">
                    Preparing your personal reading experience...
                </Text>
            </View>

{/*             Potentially fetching these from API */}


        <View className="w-full flex-[1.5] justify-end items-center">
            <TouchableOpacity
                onPress={() => router.push('/what-a-taste')}
                className="bg-[#6592E3] max-w-[313px] w-full self-center mb-[11px] items-center justify-center max-h-[52px] h-full rounded-[47px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save Plan and Continue</Text>
            </TouchableOpacity>
        </View>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>
}


export default PreparingPlan;