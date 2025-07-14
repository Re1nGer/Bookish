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
import {
    PremiumBenefitsIcon,
    ReadingTravelerIcon,
    StarShooterIcon,
    StartWriterIcon,
    BeastCollectionIcon
} from "../../components/Svg";


const Profile = () => {

    return (
        <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
            <ScrollView className="flex-1">
                <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-1 pt-3 flex-row"
                    >
                        <Text className="font-cygrebold text-[24px] leading-[28.8px] text-[#121F16]">Profile</Text>
                    </TouchableOpacity>
                </View>
                <View className="mx-5 mb-7 max-h-[150px]">
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

                <View className="ml-5 max-h-[200px] mb-8">
                    <Text className="text-black text-[20px] font-cygrebold mb-4">Achievements</Text>
                    <ScrollView horizontal>
                        <View className="mr-3 items-center">
                            <ReadingTravelerIcon />
                            <Text className="text-black">Reading traveler</Text>
                        </View>
                        <View className="mr-3 items-center">
                            <StartWriterIcon />
                            <Text className="text-black">Start Writer</Text>
                        </View>
                        <View className="items-center">
                            <StarShooterIcon />
                            <Text className="text-black">Reading traveler</Text>
                        </View>
                    </ScrollView>
                </View>

                <View className="mx-5 mb-7 max-h-[106x]">
                    <TouchableOpacity className="bg-primary max-h-[106px] items-center px-7 flex-row border-[#8A8A8A] py-5 justify-between rounded-[20px] border-[.3px]">
                        <Text className="text-[18px] font-cygrebold text-white max-w-[164px]">Your Bookish Beasts Collection</Text>
                        <View className="items-end h-full">
                            <BeastCollectionIcon />
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="mx-5 max-h-[200px]">
                    <Text className="text-black text-[20px] font-cygrebold mb-4">Settings</Text>
                </View>

                <View className="mx-5 px-7 py-5 rounded-[15px] border-[.5px] border-[#8A8A8A] max-h-[168px] bg-white h-[300px] mb-4">
                    <Text className="text-[18px] font-cygrebold mb-2">General</Text>
                    <Setting name={'Notification Settings'} />
                    <Setting name={'Manage Recommendations'} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const Setting = ({ Icon, name, className }) => {
    return <TouchableOpacity className={`flex-row items-center mb-2`}>
        <MaterialIcons name="notifications" size={24} color="black" />
        <View className="border-b-[#EDEDED] border-b-2 py-2 flex-row flex-1 ml-5 justify-between">
            <Text className="text-[14px] font-cygreregular">{name}</Text>
            <View className="rotate-180">
                <MaterialIcons name="arrow-back-ios-new" className="-rotate-180" size={18} color="black" />
            </View>
        </View>
    </TouchableOpacity>
}


export default Profile;