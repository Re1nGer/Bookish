import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import OnboardingProgress from "../../components/OnboardingProgress";


const SetStrike = () => {

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full px-[20px] mt-[20px]">
                <OnboardingProgress />
            </View>
            <View className="w-full mt-[77px] mb-[48px] items-center">
                <Text className="font-bold max-w-[165px] text-[24px] text-center leading-[23px] font-cygrebold">
                    Set your daily goal on timing
                </Text>
            </View>
            <View className="items-center flex-1">
                <DailyTiming times={"20 min/day"} level="Easy" styles={"mb-[14px]"} />
                <DailyTiming times={"30 min/day"} level="Common" styles={"mb-[14px]"} />
                <DailyTiming times={"45 min/day"} level="Serious" styles={"mb-[14px]"} />
                <DailyTiming times={"1 hour/day"} level="Intensive" />
            </View>
            <TouchableOpacity
                onPress={() => router.push('/keep-strike')}
                className="bg-[#6592E3] max-w-[313px] w-full self-center mb-[30px] items-center justify-center max-h-[52px] h-full rounded-[47px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Continue</Text>
            </TouchableOpacity>
        </ScrollView>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>

}



//gotta figure out how 
const DailyTiming = ({ times, level, styles, selected }) => {

    return <TouchableOpacity
        className={`max-w-[348px] w-full bg-[#FFFFFF] border-[.9px] rounded-[15px] border-[#8A8A8A] justify-center max-h-[60px] h-full ${styles}`}>
        <View className="flex-row">
            <View className="ml-[27px] justify-center">
                <Text className="text-[#000000] text-[16px] leading-[19.2px] font-bold">{times}</Text>
            </View>
            <View className="ml-[140px]">
                <Text className="text-[#6592E3] font-medium font-cygreregular leading-[16.8px] text-[14px]">{level}</Text>
            </View>
        </View>
    </TouchableOpacity>
}

export default SetStrike;