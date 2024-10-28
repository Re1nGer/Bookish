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

            <View className="w-full mt-[65px] mb-[27px] items-center flex-[.4]">

                <Text className="font-bold text-[#000000] max-w-[349px] text-[24px] text-center leading-[28px] px-[60px] font-cygrebold">
                    What is your reason for reading?
                </Text>

            </View>

{/*             Potentially fetching these from API */}

            <ScrollView
                className="h-full flex-[2]"
                contentContainerStyle={{maxHeight: '450px' }}
                horizontal={false}
                showsVerticalScrollIndicator={true}
            >
                    <ReasonBlock
                        src={icons.growth}
                        styles={'mb-[14px] self-center'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                    <ReasonBlock
                        src={icons.social}
                        styles={'mb-[14px] self-center'}
                        text={'Social & Connection'}
                    />
                    <ReasonBlock
                        src={icons.work}
                        styles={'mb-[14px] pr-12 self-center'}
                        text={'Professional Development'}
                    />
                    <ReasonBlock
                        src={icons.inspiration}
                        styles={'mb-[14px] self-center'}
                        text={'Inspiration & Motivation'}
                    />
                    <ReasonBlock
                        src={icons.social}
                        styles={'mb-[14px] self-center'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                    <ReasonBlock
                        src={icons.social}
                        styles={'mb-[14px] self-center'}
                        text={'Personal Growth & Self-Improvement'}
                    />
                    <ReasonBlock
                        src={icons.social}
                        styles={'mb-[14px] self-center'}
                        text={'Personal Growth & Self-Improvement'}
                    />
            </ScrollView>
        <View className="w-full flex-1 justify-center items-center">
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
            <Image source={src} className="max-h-[40] max-w-[40px] self-center mr-9" resizeMethod="cover" />
            <View className="w-52">
                <Text className="font-bold font-cygrebold leading-[19.2px] text-[#000] flex-wrap">{text}</Text>
            </View>
        </View>
}


export default ReasonForReading;