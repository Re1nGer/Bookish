import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from "expo-router";
import images from "../../constants/images";
import { ChainIcon } from "../../components/Svg";

const RepetitionGroupSuccess = () => {

    const { scorred, total } = useLocalSearchParams();

    return <SafeAreaView className="bg-[#F7F7F7] h-full">

            <View className="w-full mb-[60px] items-center">
                <Text className="font-bold text-[#000000] max-w-[349px] text-[24px] text-center leading-[28px] font-cygrebold">
                    That Was Impressive
                </Text>
            </View>

            <View className="px-[30px] w-full flex-1">
                <ChainIcon />
            </View>

            <View className="px-4 rounded-[15px] bg-black">
                <View>
                    <RepetitionGroupSuccess />
                </View>
                <Text className="text-white text-[14px] font-cygreregular">
                    You are on the right path! Keep practicing to strengthen this connection and ensure the info won’t be forgotten in 5 mins 
                </Text>

            </View>

            <View className="w-full flex-[1.5] justify-center items-center px-[30px]">
                <TouchableOpacity
                    onPress={() => router.push('repetition')}
                    className="bg-[#6592E3] w-full self-center mb-[11px] items-center justify-center max-h-[52px] h-full rounded-[47px]">
                    <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Back To Groups</Text>
                </TouchableOpacity>
            </View>
    </SafeAreaView>
}


export default RepetitionGroupSuccess;