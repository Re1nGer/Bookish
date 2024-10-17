import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';


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

const OnboardingProgress = ({ stage1 = 0, stage2 = 0 }) => {


    return <View className="flex-row w-full gap-[5px] items-center">
        <View className="rounded-full w-[26px] items-center justify-center h-[26px] bg-[#6592E3]">
            <Text className="font-bold text-[18px] leading-[18px] text-center text-white font-cygreregular">1</Text>
        </View>
        <View className="bg-[#D8E6FF] rounded-[13px] h-[12px] max-w-[156px] relative w-full">
            <View className='absolute bg-[#6592E3] h-full rounded-[13px]' style={{ width: `${stage1}%` }}></View>
        </View>
        <View className="rounded-full w-[26px] h-[26px]  items-center justify-center bg-[#6592E3]" style={{ backgroundColor: stage2 === 0 ? '#D8E6FF': '#6592E3' }}>
            <Text className="font-bold text-[18px] leading-[18px] text-center text-white font-cygreregular">2</Text>
        </View>
        <View className="bg-[#D8E6FF] rounded-[13px] max-w-[136px] h-[12px] relative w-full">
            <View className='absolute bg-[#6592E3]' style={{ width: `${stage2}%` }}></View>
        </View>
    </View>
}

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