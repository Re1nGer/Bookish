import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { images } from "../../constants";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';


const Onboarding = () => {

    //gotta figure out text-center problem

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full justify-between mt-[37px] relative h-full">
                <View className="px-[73px]">
                    <Text className="font-bold text-center text-[28px] leading-[26px] tracking-wide font-cygrebold my-[23px]">
                        Let’s get to know each other better!
                    </Text>
                </View>
                <View className="w-full items-center max-w-[350px] self-center">
                    <Text className="max-w-[269px] w-full leading-[19.2px] px-2 text-center text-[#000000] font-cygreregular">
                        Starting with a set up of your personalized reading experience.  First, tell us your goals!
                    </Text>
                </View>
                <View className="w-full flex-1 items-center mt-[35px] z-10">

                    <Image
                        source={images.onboardingMonster}
                        className="max-w-[261px] self-center max-h-[261px] z-10" />
                </View>

                <View className="w-full z-20 items-center h-full justify-center flex-1">

                    <TouchableOpacity
                        onPress={() => router.push('/commit-to-growing')}
                        className="bg-[#6592E3] max-w-[313px] mb-[13px] w-full items-center justify-center max-h-[52px] h-full rounded-[47px]">
                        <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Start The Test</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="border border-[#000000] bg-transparent items-center justify-center max-w-[313px] w-full max-h-[52px] h-full rounded-[47px]">
                        <Text className="text-[#000000] text-[18px] leading-[22px] font-semibold">Skip For Now</Text>
                    </TouchableOpacity>

                </View>

                <Image
                    source={images.onboardingImage}
                    resizeMode='contain'
                    className="bottom-0 absolute max-h-[650px] max-w-[650px]"
                />
            </View>
        </ScrollView>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>

}


export default Onboarding;