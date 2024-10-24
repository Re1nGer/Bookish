import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import OnboardingProgress from "../../components/OnboardingProgress";
import { StatusBar } from 'expo-status-bar';
import { icons } from "../../constants";


const ReasonForReading = () => {

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
            <View className="w-full px-[20px] mt-[20px]">
                <OnboardingProgress stage1={100} stage2={85} />
            </View>
            <View className="w-full mt-[65px] mb-[47px] items-center">
                <Text className="font-bold text-[#000000] max-w-[349px] text-[24px] text-center leading-[28px] px-[60px] font-cygrebold">
                    What is your reason for reading?
                </Text>
            </View>

{/*             Potentially fetching these from API */}
            <ScrollView
                className="flex-[3]"
                horizontal={false}
                showsVerticalScrollIndicator={true}
            >
                <View className="h-full items-center justify-center w-full">
                    <ReasonBlock
                        src={icons.growth}
                        styles={'mb-[14px]'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                    <ReasonBlock
                        src={icons.entertainment}
                        styles={'mb-[14px]'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                    <ReasonBlock
                        src={icons.social}
                        styles={'mb-[14px]'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                    <ReasonBlock
                        src={icons.work}
                        styles={'mb-[14px]'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                    <ReasonBlock
                        src={icons.inspiration}
                        styles={'mb-[14px]'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                    <ReasonBlock
                        src={icons.social}
                        styles={'mb-[14px]'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                    <ReasonBlock
                        src={icons.social}
                        styles={'mb-[14px]'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                </View>
            </ScrollView>
        <View className="w-full flex-[1.5] justify-center items-center">
            <TouchableOpacity
                onPress={() => router.push('/what-a-taste')}
                className="bg-[#6592E3] max-w-[313px] w-full self-center mb-[11px] items-center justify-center max-h-[52px] h-full rounded-[47px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity className="border border-[#000000] self-center bg-transparent items-center justify-center max-w-[313px] w-full max-h-[52px] h-full rounded-[47px]">
                <Text className="text-[#000000] text-[18px] leading-[22px] font-semibold">Skip For Now</Text>
            </TouchableOpacity>
        </View>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>
}


const ReasonBlock = ({ src, text, styles }) => {

    const [isSelected, setIsSelected] = useState(false);

    return <View className={`max-w-[348px] w-full border flex-row items-center rounded-[15px] border-[#8A8A8A] max-h-[60px] h-full px-8 ${styles}`}>
            <Image source={src} className="max-h-[40] max-w-[40px] self-center mr-[25px]" resizeMethod="cover" />
            <Text className="font-bold font-cygrebold leading-[19.2px] text-[#000] pr-[25px]">{text}</Text>
        </View>
}


export default ReasonForReading;