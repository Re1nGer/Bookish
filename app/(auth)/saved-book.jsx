import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import BookStatusPicker from "../../components/ReadStatusDropdown";
import SliderCounter from "../../components/SliderCounter";
import { useState } from "react";
import SwipeableWrapper from "../../components/SwipeableWrapper";
import CircularProgress from "../../components/CircleProgress";
import Feather from '@expo/vector-icons/Feather';


const SavedBook = () => {

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
            <TouchableOpacity
                className="flex-1" onPress={() => router.back()}>
                <Image source={images.leftArrowIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-primary flex-1 mt-2.5 mr-2.5 max-w-[44px] w-full items-center justify-center max-h-[44px] h-full rounded-[10px]">
                    <MaterialIcons name="edit-note" size={27} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-primary flex-1 mt-2.5 max-w-[44px] w-full items-center justify-center max-h-[44px] h-full rounded-[10px]">
                    <Entypo name="dots-three-vertical" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
        <ScrollView>

            <View className="mx-5 border-[#8A8A8A] flex-row p-4 border-[.5px] rounded-[20px] max-w-[353px] max-h-[213px]">
                <Image source={images.bookPlaceholder} width={114} height={163} className="max-h-[163px] max-w-[114px] mr-5" />
                <View className="relative">
                    <Text className="text-black text-[18px] mb-0.5 leading-[21.6px] font-cygrebold">Make It Stick</Text>
                    <Text className="text-black text-[12px] leading-[14.4px] font-cygreregular mb-5">Make It Stick</Text>
                    <BookStatusPicker />
                </View>
            </View>
            <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mx-5 mt-8 mb-5">Reading Progress</Text>
            <SwipeableWrapper showDots={true}>
                <TotalPages />
                <TotalProgress />
                <RecentSession />
            </SwipeableWrapper>

            <View className="mx-5 mb-7 flex-row justify-between">
                <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold">Notes</Text>
                <TouchableOpacity>
                    <Text className="text-primary underline font-cygrebold leading-[19.2px]">Show more</Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                horizontal
                className="mx-5">
                    <TouchableOpacity className="w-[97px] bg-primary items-center justify-center h-[97px] rounded-[20px] mr-3">
                        <Text className="text-white text-[50px] pb-3">+</Text>
                    </TouchableOpacity>
                    <View className="flex-row">
                        <View className="max-w-[361px] w-full max-h-[247px] h-full border-[.5px] rounded-[20px] p-5">
                            <View className="flex-row items-center mb-4">
                                <View className="p-2 bg-primary rounded-[13px] max-h-[40px] h-full max-w-[130px] flex-row items-center justify-center mr-2.5">
                                    <Feather name="book" size={13} color="white" style={{ marginRight: 5 }} />
                                    <Text className="text-sm text-[#fff] font-cygresemibold leading-[16.8px]">Make It Stick</Text>
                                </View>
                                <View className="p-2 bg-[#EEEEEE] rounded-[13px] max-h-[40px] h-full">
                                    <Text className="text-sm text-black font-cygresemibold leading-[16.8px]">30.09.2024</Text>
                                </View>
                            </View>
                            <View className="rounded-[8px] bg-[#EEEEEE] py-3 px-4 max-w-[327px] max-h-[166px] h-full w-full">
                                <Text className="text-black font-cygreregular leading-[19.2px] font-medium">
                                    One of the key strategies discussed in Make It Stick is the value of interleaving. Unlike traditional studying, where topics or skills are practiced in blocks, interleaving involves mixing different topics or problem types within a single session. 
                                </Text>
                            </View>
                        </View>
                    </View>
            </ScrollView>
        </ScrollView>
    </SafeAreaView>
}

const TotalProgress = () => {

    const tempMaxPageCount = 336;

    const currentPage = 50;

    const percentLeft = Math.round(currentPage / tempMaxPageCount * 100);

    return (
        <View className="max-h-[267px] w-full items-center">
            <View className="px-6 py-5 max-w-[353px] h-[95%] bg-black rounded-[20px] w-full items-center">
                <CircularProgress size={125} progress={currentPage / tempMaxPageCount * 100} />
                <Text className="text-[#fff] text-center text-[16px] mt-3 font-cygreregular max-w-[165px]">
                    {`${tempMaxPageCount - currentPage} pages left or ${percentLeft}% left to finish`}
                </Text>
            </View>
        </View>
    )
}


const RecentSession = () => {

    return (
        <View className="max-h-[267px] w-full items-center">
            <View className="px-6 py-5 h-[95%] max-w-[353px] bg-black rounded-[20px] w-full items-center">
                <Text className="text-[20px] text-[#fff] font-cygrebold leading-[24px] mb-1">No Recent Sessions</Text>
                <Text className="text-[12px] text-[#fff] font-cygreregular leading-[14.4px] mb-5">Click to start reading session</Text>
                <Image source={images.noSession} width={135} height={96} className="max-w-[135px] max-h-[96px] h-full" />
            </View>
        </View>
    );

}

const TotalPages = () => {

    const [value, setValue] = useState(13);

    const handleReduceCounter = () => {
        setValue(prev => prev - 1);
    }

    const handleAddCounter = () => {
        setValue(prev => prev + 1);
    }

    const tempMaxPageCount = 336;

    return (
        <View className="max-h-[267px] w-full items-center">
            <View className="px-6 py-5 h-[95%] max-w-[353px] bg-black rounded-[20px] w-full">
                <View className="flex-row justify-between">
                    <TouchableOpacity
                        onPress={handleReduceCounter}
                        className="rounded-full bg-[#8A8A8A] items-center justify-center h-[71px] w-[67px]">
                        <Text className="text-[#FFFFFF] text-[31px] font-semibold leading-[37.5px]">-</Text>
                    </TouchableOpacity>
                    <View>
                        <Text className="text-[#fff] text-center text-[60px] font-cygrebold leading-[72px]">{value}</Text>
                        <Text className="text-[#fff] text-center text-[16px] font-cygrebold">{`of ${tempMaxPageCount} pages`}</Text>
                        <Text className="text-[#fff] text-center text-[12px] font-cygreregular">{`${tempMaxPageCount - value} pages left`}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleAddCounter}
                        className="rounded-full bg-primary items-center justify-center h-[71px] w-[67px]">
                        <Text className="text-[#FFFFFF] text-[31px] font-semibold leading-[37.5px]">+</Text>
                    </TouchableOpacity>
                </View>
                <SliderCounter
                    showCounter={false}
                    value={value}
                    setValue={setValue} 
                    textColor={'text-[#fff]'}
                    maxValue={tempMaxPageCount}
                />
                <View className="items-center mr-3 flex-row justify-center">
                    <Text className="text-[#FFFFFF] font-cygrebold leading-[19.2px] mr-2.5">Started At</Text>
                    <View className="rounded-[20px] bg-primary px-3 py-1">
                        <Text className="font-cygrebold text-[12px] leading-[14.4px] font-bold text-[#fff]">01.10.2024</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}


export default SavedBook;