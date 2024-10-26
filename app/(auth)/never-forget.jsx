import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import OnboardingProgress from "../../components/OnboardingProgress";
import WheelPicker from '@quidone/react-native-wheel-picker';
import WheelPickerFeedback from '@quidone/react-native-wheel-picker-feedback';
import Switch from "../../components/Switch";


const NeverForget = () => {


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
    }));

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full px-[20px] mt-[20px]">
                <OnboardingProgress stage1={56} />
            </View>
            <View className="w-full mt-[50px] mb-[38px] items-center">
                <Text className="font-bold max-w-[165px] text-[24px] text-center leading-[23px] font-cygrebold">
                    Never Forget
                </Text>
            </View>
            <View className="border-[2px] mb-[45px] py-[15px] justify-end h-full flex-1 border-[#6592E3] max-h-[80px] bg-white px-[23px] mx-[23px] rounded-[13px]">
                <View className="flex flex-row justify-between items-center">
                    <View>
                        <Text className="text-[#000000] text-[18px] font-bold font-cygrebold leading-[21.6px]">Stay on track</Text>
                        <Text className="text-[#000000] text-[14px] leading-[20px] font-cygreregular">Never miss your daily reading goal!</Text>
                    </View>
                    <Switch
                        size="medium"
                        activeColor="#6592E3"
                        inactiveColor="#767577" 
                        thumbColor="#ffffff" 
                    />
                </View>
            </View>
            <View className="items-center relative gap-6 flex-row justify-center max-h-[247px] border border-[#8A8A8A] rounded-[15px] mx-[23px]">
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
            <View className="w-full flex-1 justify-end">
                <TouchableOpacity
                    onPress={() => router.push('/set-books')}
                    className="bg-[#6592E3] max-w-[313px] flex-1 w-full self-center mt-[30px] mb-[11px] items-center justify-center max-h-[52px] h-full rounded-[47px]">
                    <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border border-[#000000] mb-[28px] self-center bg-transparent items-center justify-center max-w-[313px] w-full max-h-[52px] h-full rounded-[47px]">
                    <Text className="text-[#000000] text-[18px] leading-[22px] font-semibold">Skip For Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>

}



//gotta figure out how 

export default NeverForget;