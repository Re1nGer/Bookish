import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageHandler from '../../components/ImageHandler';
import { images } from '../../constants';


const BooksFinished = () => {

    const { date } = useLocalSearchParams();

    const newDate = new Date(date);

    const formatted = newDate.toLocaleDateString('de-DE')

    return <SafeAreaView className="flex-1 h-full bg-[#F7F7F7]">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
            <View className="flex-row flex-1">
                <TouchableOpacity
                    className="mr-4"
                    onPress={() => router.back()}>
                    <MaterialIcons name="close" size={30} />
                </TouchableOpacity>
            </View>
        </View>

        <View className="px-10 items-center justify-center mb-8">
            <Text className="text-[22px] text-black font-cygrebold">{`Books finished on ${formatted}`}</Text>
        </View>
        <View className="px-5">
            <BookCard bookImgSrc={images.book1} name={"The Power of Now"} rating={4} />
            <BookCard bookImgSrc={images.book2} name={"A Spy’s Guide To Thinking"} rating={4} />
        </View>

    </SafeAreaView>
}


const BookCard = ({ bookImgSrc, name, rating, memoImgSrc }) => {
    return <View className="bg-[#fff] border-[.3px] border-[#8A8A8A] rounded-[20px] pl-4 py-3 pr-7 flex-row mb-4">
        <View className="flex-row flex-1 gap-x-2">
            <ImageHandler source={bookImgSrc} className="max-w-[82px] max-h-[118px]" />
            <View className="gap-y-2 justify-start">
                <Text className="text-[14px] font-cygrebold text-black">{name}</Text>
                <View className="rounded-[16px] flex-row self-start border-[#121F16] border-[1px] items-center justify-center px-1 py-1.5 gap-[2px] max-w-[54px] w-full">
                    <ImageHandler source={images.filledStar} className="w-[19px] h-[20px]" />
                    <Text className="font-cygrebold leading-[14.4px] text-[12px]">{rating}</Text>
                </View>
            </View>
        </View>
        { memoImgSrc ? (
            <View className="items-center justify-center">
                <ImageHandler source={memoImgSrc} className="rounded-[80px] max-w-[80px] max-h-[80px]" />
            </View>
        ) : <></> }
    </View>
}



export default BooksFinished;