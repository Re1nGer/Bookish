import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import OnboardingProgress from "../../components/OnboardingProgress";
import DailyTiming from "../../components/DailyTiming";
import WheelPicker from '@quidone/react-native-wheel-picker';
import WheelPickerFeedback from '@quidone/react-native-wheel-picker-feedback';


const NeverForget = () => {


    const onChange = () => {}

    const hours = [...Array(24).keys()].map((index) => ({
        value: index,
        label: index.toString(),
    }));

    const minutes = [...Array(60).keys()].map((index) => ({
        value: index,
        label: index.toString(),
    }));

    const timeFormat = [...['AM', 'PM']].map((val, idx) => ({
        value: val,
        label: val,
    })) ;

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
            <View className="border-[2px] mb-[30px] py-[20px] border-[#6592E3] bg-white px-[23px] mx-[23px]">
                <View className="flex flex-row justify-between">
                    <View className="">
                        <Text className="text-[#000000] text-[18px] font-bold font-cygrebold leading-[22px]">Stay on track</Text>
                        <Text className="text-[#000000] text-[14px] leading-[22px] font-cygreregular">Stay on track</Text>
                    </View>
                </View>
            </View>
            <View className="items-center relative gap-5 flex-row justify-center max-h-[250px] border border-[#8A8A8A] rounded-[15px] mx-[23px]">

                <View className="absolute"></View>
                <WheelPicker
                    data={hours}
                    width={40}
                    onValueChanged={() => WheelPickerFeedback.triggerSoundAndImpact()}
                />
                <WheelPicker
                    data={minutes}
                    width={40}
                    onValueChanged={() => WheelPickerFeedback.triggerSoundAndImpact()}
                />
                <WheelPicker
                    data={timeFormat}
                    width={40}
                    onValueChanged={() => WheelPickerFeedback.triggerSoundAndImpact()}
                />
            </View>
            <TouchableOpacity
                onPress={() => router.push('/never-forget')}
                className="bg-[#6592E3] max-w-[313px] flex-1 w-full self-center mb-[30px] items-center justify-center max-h-[52px] h-full rounded-[47px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Continue</Text>
            </TouchableOpacity>
        </ScrollView>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>

}



//gotta figure out how 

export default NeverForget;