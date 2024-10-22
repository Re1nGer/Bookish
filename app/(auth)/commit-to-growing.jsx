import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import OnboardingProgress from "../../components/OnboardingProgress";
import DailyTiming from "../../components/DailyTiming";



const CommitToGrowing = () => {

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full px-[20px] mt-[20px]">
                <OnboardingProgress />
            </View>
            <View className="w-full mt-[77px] mb-[48px] items-center">
                <Text className="font-bold text-[#000000] max-w-[229px] text-[24px] text-center leading-[23px] font-cygrebold">
                    Commit to growing !
                </Text>
            </View>
            <View className="items-center flex-1 mx-[23px]">
                <DailyTiming times={"7-day strike"} level="Promising" styles={"mb-[14px]"} />
                <DailyTiming times={"14-day strike"} level="Determined" styles={"mb-[14px]"} />
                <DailyTiming times={"30-day strike"} level="Impressive" styles={"mb-[14px]"} />
                <DailyTiming times={"50-day strike"} level="Unstoppable" />
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


export default CommitToGrowing;