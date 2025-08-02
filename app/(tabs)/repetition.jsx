import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useCallback, useEffect } from "react";
import { router } from "expo-router";
import axios from '../../network/axios';
import { UserContext } from "../../context/UserContext";
import { QuestionMarkIcon } from "../../components/Svg";
import { COLLECTION_ICON_MAP, COLOR_MAP } from "../../components/CollectionSvg";

function splitArray(arr) {
    const midpoint = Math.ceil(arr.length / 2);
    const firstHalf = arr.slice(0, midpoint);
    const secondHalf = arr.slice(midpoint);
    return [firstHalf, secondHalf];
}

const Repetition = () => {

    const [firstHalfCollections, setFirstHalfCollections] = useState([]);

    const [secondHalfCollections, setSecondtHalfCollections] = useState([]);

    const fetchCollections = useCallback(async () => {
        try {
            const { data } = await axios.get('users/repetition-groups');
            console.log(data);
            const [first, second] = splitArray(data);
            setFirstHalfCollections(first);
            setSecondtHalfCollections(second);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        fetchCollections();
    }, [])

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
            <View className="mx-5 flex-1">
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
                    <View className="flex-row justify-between w-full">
                        <View className="w-full flex-[.5]">
                            <NewGroup />
                            { secondHalfCollections.map(item => 
                                <ExistingGroup
                                    key={item.id}
                                    name={item.name}
                                    cardsCount={item.cardCount}
                                    iconId={item.iconId}
                                    colorId={item.colorId}
                            />) }
                        </View>
                        <View className="w-full flex-[.5]">
                            { firstHalfCollections.map(item =>
                            <ExistingGroup
                                key={item.id}
                                name={item.name} 
                                cardsCount={item.cardCount}
                                iconId={item.iconId}
                                colorId={item.colorId}
                            />) }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const NewGroup = () => {

    return <View className="rounded-[17px] flex-row rounded-br-[44px] mb-4 bg-black max-w-[171px] w-full h-[114px] p-4">
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

const ExistingGroup = ({ name, cardsCount, iconId, colorId, onPress, containerStyles }) => {

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

    const IconElement = COLLECTION_ICON_MAP[iconId];

    return <TouchableOpacity
                onPress={onPress}
                style={{ backgroundColor: COLOR_MAP[colorId] }}
                className={`rounded-[17px] overflow-hidden justify-between relative max-w-[171px] w-full h-[114px] mb-4 p-4 ${containerStyles}`}
            >

            <View className="mb-2">
                <Text className="font-cygrebold self-start bg-[#F7F7F7] px-2 py-1 text-[18px] rounded-[15px] text-black leading-[17.2px]">
                    {name}
                </Text>
            </View>

            { cardsCount ? (
                <View className="items-end self-end mt-3 bg-[#F7F7F7] rounded-[21px]">
                    <Text className="px-2.5 py-1 text-[12px] font-medium">{`${cardsCount} cards`}</Text>
                </View>
            ) : <></> }

            <View className="items-center self-end max-w-[61px] absolute -z-10 rounded-full justify-center">
                <IconElement />
            </View>

    </TouchableOpacity>
}

export default Repetition;