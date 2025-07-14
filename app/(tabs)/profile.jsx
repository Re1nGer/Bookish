import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRef, useState, useCallback, useContext } from "react";
import { router } from "expo-router";
import axios from '../../network/axios';
import { UserContext } from "../../context/UserContext";
import BookPageDropdown from "../../components/BookPageDropdown";
import ImageHandler from "../../components/ImageHandler";
import { PremiumBenefitsIcon, QuestionMarkIcon } from "../../components/Svg";
import { RepetitionGroupIcon } from "../../components/Svg";


const Profile = () => {

    return (
        <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-1 pt-3 flex-row"
                >
                    <Text className="font-cygrebold text-[24px] leading-[28.8px] text-[#121F16]">Profile</Text>
                </TouchableOpacity>
            </View>
            <View className="mx-5">
                <TouchableOpacity
                    onPress={() => router.push('special-offer')}
                    className="bg-[#1C1C1C] mb-6 max-h-[120px] h-full rounded-[20px] border-[.3px] border-[#8A8A8A] flex-row justify-between px-6 items-center">
                    <View className="py-4 max-w-[70%]">
                        <Text className="font-cygrebold leading-[19.2px] text-white text-[18px]">Enjoy Premium Benefits!</Text>
                        <Text className="text-[12px] font-cygreregular text-white max-w-[175px]">Enlarge your knowledge with the price of a cup of coffee.</Text>
                    </View>
                    <View className="mt-2.5">
                        <PremiumBenefitsIcon />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export default Profile;