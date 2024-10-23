import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import OnboardingProgress from "../../components/OnboardingProgress";
import { StatusBar } from 'expo-status-bar';
import { images } from "../../constants";


const TopicsInterested = () => {

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full px-[20px] mt-[20px]">
                <OnboardingProgress stage1={100} stage2={25} />
            </View>
            <View className="w-full my-10 items-center">
                <Text className="font-bold text-[#000000] max-w-[349px] text-[24px] text-center leading-[28px] px-[40px] font-cygrebold">
                    Choose areas you are interested in:
                </Text>
            </View>

{/*             Potentially fetching these from API */}

            <View className="flex-row justify-center flex-[3] gap-[10px]">
                <View className="gap-[9px]">
                    <Block name={'Fiction'} styles={'mb-[9px]'} />
                    <Block name={'Habits'} styles={'mb-[9px]'} />
                    <Block name={'Self-Help'} styles={'mb-[9px]'} />
                    <Block name={'Mystery'} styles={'mb-[9px]'} />
                    <Block name={'Space'} />
                </View>
                <View className="gap-[9px]">
                    <Block name={'Non-Fiction'} styles={'mb-[9px]'} />
                    <Block name={'Mindset'} styles={'mb-[9px]'} />
                    <Block name={'Personal Finance'} styles={'mb-[9px]'} />
                    <Block name={'Nutrition'} styles={'mb-[9px]'} />
                    <Block name={'Art'} />
                </View>
                <View className="gap-[9px]">
                    <Block name={'History'} styles={'mb-[9px]'} />
                    <Block name={'Sci-Fi'} styles={'mb-[9px]'} />
                    <Block name={'Biology'} styles={'mb-[9px]'} />
                    <Block name={'Romance'} styles={'mb-[9px]'} />
                    <Block name={'Romance'} />
                </View>
            </View>

            <View className="w-full flex-1">
                <TouchableOpacity
                    onPress={() => router.push('/sounds-promising')}
                    className="bg-[#6592E3] max-w-[313px] w-full self-center mb-[11px] items-center justify-center max-h-[52px] h-full rounded-[47px]">
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



const Block = ({ name, selected, styles }) => {

    return <View className={`border-[0.9px] border-[#8A8A8A] items-center justify-center max-w-[111px] w-full max-h-[62px] h-full rounded-[8px] ${styles}`}>
        <Text className="font-cygrebold font-medium text-[16px] text-center text-[#000] px-[10px] leading-[19.2px]">{name}</Text>
    </View>
}


export default TopicsInterested;