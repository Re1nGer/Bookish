import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import OnboardingProgress from "../../components/OnboardingProgress";
import DailyTiming from "../../components/DailyTiming";
import { useState } from "react";


const SetStrike = () => {

    const [days, setDays] = useState({
        20: false,
        30: false,
        45: false,
        1: false,
    });

    const defaultMinutes = {
        20: false,
        30: false,
        45: false,
        1: false,
    };

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full px-[20px] mt-[20px]">
                <OnboardingProgress stage1={40} />
            </View>
            <View className="w-full mt-[77px] mb-[48px] items-center">
                <Text className="font-bold max-w-[165px] text-[24px] text-center leading-[23px] font-cygrebold">
                    Set your daily goal on timing
                </Text>
            </View>
            <View className="items-center flex-1 mx-[23px]">
                <DailyTiming
                    times={"20 min/day"}
                    level="Easy"
                    styles={"mb-[14px]"} 
                    selected={days[20]}
                    onPress={() => setDays((_) => ({...defaultMinutes, 20: true}))}
                />
                <DailyTiming 
                    times={"30 min/day"}
                    level="Common"
                    styles={"mb-[14px]"} 
                    selected={days[30]}
                    onPress={() => setDays((_) => ({...defaultMinutes, 30: true}))}
                />
                <DailyTiming
                    times={"45 min/day"}
                    level="Serious"
                    styles={"mb-[14px]"} 
                    selected={days[45]}
                    onPress={() => setDays((_) => ({...defaultMinutes, 45: true}))}
                />
                <DailyTiming
                    times={"1 hour/day"}
                    level="Intensive" 
                    selected={days[1]}
                    onPress={() => setDays((_) => ({...defaultMinutes, 1: true}))}
                />
            </View>
            <TouchableOpacity
                onPress={() => router.push('/never-forget')}
                className="bg-[#6592E3] max-w-[313px] w-full self-center mb-[30px] items-center justify-center max-h-[52px] h-full rounded-[47px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Continue</Text>
            </TouchableOpacity>
        </ScrollView>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>

}



//gotta figure out how 

export default SetStrike;