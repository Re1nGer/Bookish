import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { images } from "../../constants";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';


const Onboarding = () => {

    //gotta figure out text-center problem

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="justify-between w-full">
                <View className="w-full mt-[37px] relative h-full">
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
                    <Image
                        source={images.onboardingMonster}
                        className="w-[261px] self-center h-[261px] mt-[35px] justify-start z-10" />

                    <View className="gap-3 w-full h-full z-20 items-center justify-start mt-[100px]">

                        <TouchableOpacity
                            onPress={() => router.push('/commit-to-growing')}
                            className="bg-[#6592E3] max-w-[313px] w-full items-center justify-center max-h-[52px] h-full rounded-[47px]">
                            <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Start The Test</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="border border-[#000000] bg-transparent items-center justify-center max-w-[313px] w-full max-h-[52px] h-full rounded-[47px]">
                            <Text className="text-[#000000] text-[18px] leading-[22px] font-semibold">Skip For Now</Text>
                        </TouchableOpacity>

                    </View>
                    <Image source={images.onboardingImage} className="bottom-14 absolute" />
                </View>
            </View>
        </ScrollView>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>

}


export default Onboarding;