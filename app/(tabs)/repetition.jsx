import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    RefreshControl,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRef, useState, useCallback, useContext } from "react";
import { router, useFocusEffect } from "expo-router";
import axios from '../../network/axios';
import { UserContext } from "../../context/UserContext";
import BookPageDropdown from "../../components/BookPageDropdown";
import ImageHandler from "../../components/ImageHandler";
import { QuestionMarkIcon } from "../../components/Svg";
import { RepetitionGroupIcon } from "../../components/Svg";


const Repetition = () => {

    return (
        <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-1 pt-3 flex-row"
                >
                    <Text className="font-cygrebold text-[24px] leading-[28.8px] text-[#121F16]">Spaced Repetition</Text>
                </TouchableOpacity>
            </View>
            <View className="mx-5">
                <View className="bg-[#1C1C1C] mb-6 max-h-[106px] h-full rounded-[20px] border-[.3px] border-[#8A8A8A] flex-row justify-between px-6 items-center">
                    <View className="py-4 max-w-[60%]">
                        <Text className="font-cygrebold leading-[19.2px] text-white">Spaced Repetition Technique</Text>
                        <Text className="text-[12px] font-cygreregular text-white">Tap to see how and why it works</Text>
                    </View>
                    <View className="mt-2.5">
                        <QuestionMarkIcon />
                    </View>
                </View>
                <ScrollView className="flex-1">
                    <View className="flex-row w-full">
                        <View className="w-full flex-[.5]">
                            <NewGroup />
                            <ExistingGroup name={"Self Development"}
                                containerStyles={'my-4'} 
                            />
                        </View>
                        <View className="w-full flex-[.5]">
                            <ExistingGroup name={"Anatomy Midterm"} />
                            <ExistingGroup name={"For Business Ideas"}
                                containerStyles={'my-4'} 
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const NewGroup = () => {

    return <View className="rounded-[17px] flex-row rounded-br-[44px] bg-black max-w-[171px] w-full h-[114px] p-4">
        <Text className="font-cygrebold max-w-[83px] text-[18px] text-[#fff] leading-[21.6px]">Add new group</Text>
        <TouchableOpacity
            onPress={() => router.push('add-repetition-group')}
            className="items-center self-end flex-1 justify-center">
                <View className="bg-[#fff] max-w-[50px] max-h-[50px] items-center justify-center w-full h-full rounded-full ">
                    <MaterialIcons name="add" size={30} color={'black'} />
                </View>
        </TouchableOpacity>
    </View>
}

const ExistingGroup = ({ name, cardsAmount, selected, onSelect, containerStyles }) => {

    const breakTitleIfNecessaryAndRender = () => {
        if (name && name.length >= 15) {
            const firstSpaceIndex = name.indexOf(' ');
            
            if (firstSpaceIndex === -1) {
                // No space found, return as single line
                return <Text className="font-cygrebold bg-[#F7F7F7] px-2 py-1 text-[18px] rounded-[15px] text-black text-center leading-[17.2px]">{name}</Text>
            }
            
            const firstPart = name.substring(0, firstSpaceIndex);
            const remainingPart = name.substring(firstSpaceIndex + 1);
            
            if (remainingPart.length > 15) {
                // Need to break the remaining part as well
                const secondSpaceIndex = remainingPart.indexOf(' ');
                
                if (secondSpaceIndex === -1) {
                    // No second space, just split into two parts
                    return [
                        <Text 
                            key={firstPart}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="font-cygrebold self-start bg-[#F7F7F7] px-2 py-1 text-[18px] rounded-[15px] text-black leading-[17.2px]"
                        >
                            {firstPart}
                        </Text>,
                        <Text 
                            key={remainingPart}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="font-cygrebold self-start bg-[#F7F7F7] px-2 py-1 text-[18px] rounded-[15px] text-black leading-[17.2px]"
                        >
                            {remainingPart}
                        </Text>
                    ];
                } else {
                    // Split remaining part at first space
                    const secondPart = remainingPart.substring(0, secondSpaceIndex);
                    const thirdPart = remainingPart.substring(secondSpaceIndex + 1);
                    
                    return [
                        <Text 
                            key={firstPart}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="font-cygrebold self-start bg-[#F7F7F7] px-2 py-1 text-[18px] rounded-[15px] text-black leading-[17.2px]"
                        >
                            {firstPart}
                        </Text>,
                        <Text 
                            key={secondPart + thirdPart}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="font-cygrebold self-start bg-[#F7F7F7] px-2 py-1 text-[18px] rounded-[15px] text-black leading-[17.2px]"
                        >
                            {secondPart} {thirdPart}
                        </Text>
                    ];
                }
            } else {
                // Remaining part is 15 characters or less, keep together
                return [
                    <Text 
                        key={firstPart}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="font-cygrebold self-start bg-[#F7F7F7] px-2 py-1 text-[18px] rounded-[15px] text-black leading-[17.2px]"
                    >
                        {firstPart}
                    </Text>,
                    <Text 
                        key={remainingPart}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="font-cygrebold self-start bg-[#F7F7F7] px-2 py-1 text-[18px] rounded-[15px] text-black leading-[17.2px]"
                    >
                        {remainingPart}
                    </Text>
                ];
            }
        }
        
        return <Text className="font-cygrebold bg-[#F7F7F7] px-2 py-1 text-[18px] rounded-[15px] text-black text-center leading-[17.2px]">{name}</Text>
    }

    return <View
            className={`rounded-[17px] overflow-hidden relative bg-[#F8846A] max-w-[171px] w-full h-[114px] px-4 pt-5 pb-2 ${containerStyles}`}>
        <View className="mb-2 flex-wrap">
            {breakTitleIfNecessaryAndRender()}
        </View>
        <View
            className="items-end self-end bg-[#F7F7F7] rounded-[21px]">
                <Text className="px-2.5 py-1 text-[12px] font-medium">20 cards</Text>
        </View>
        <View className="absolute right-0 -z-10">
            <RepetitionGroupIcon />
        </View>
    </View>
}

export default Repetition;