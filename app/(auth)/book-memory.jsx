import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ImageHandler from '../../components/ImageHandler';
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { PrimaryButton } from '../../components/CustomButton';


const BookMemory = () => {

    const { bookId } = useLocalSearchParams();

    const [book, setBook] = useState({
        title: 'Make It Stick',
        author: 'Peter C. Brown, Mark A. McDaniel',
        startedAt: '25.09.2024',
        finishedAt: '30.09.2024',
        memo: 'This was an exciting journey, have boost my memory. Will re-read soon. Hope this time will remember more ',
        rating: '4',
        memoId: ''
    });

    useEffect(() => {

    }, []);

    return <SafeAreaView className="flex-1 h-full bg-[#F7F7F7]">
        <View className="max-h-[60px] justify-start items-center flex-row h-full mx-5 mb-7">
            <View className="flex-row">
                <TouchableOpacity
                    className="mr-5"
                    onPress={() => router.back()}>
                    <MaterialIcons name="close" size={30} />
                </TouchableOpacity>
            </View>
            <Text
                className="font-cygrebold text-[#1C1C1C] text-[22px] leading-[26.4px]">Memory: {book.title}</Text>
        </View>

        <View className="mx-5 border-[#8A8A8A] flex-row p-4 border-[.5px] rounded-[20px] max-w-[353px]">
            <ImageHandler source={images.book1} width={114} height={163} className="max-h-[163px] max-w-[114px] mr-5" />
            <View className="relative">
                <Text className="text-black text-[18px] mb-0.5 leading-[21.6px] font-cygrebold max-w-[150px]"
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                        {book.title}
                </Text>
                <Text
                    className="text-black text-[12px] leading-[14.4px] font-cygreregular mb-5 max-w-[150px]"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {book.author}
                </Text>
                <View className="bg-[#1C1C1C] rounded-[13px] items-center justify-center">
                    <Text className="font-cygrebold text-[12px] leading-[14.4px] text-white py-1 px-3">{`${book.startedAt} - ${book.finishedAt}`}</Text>
                </View>
                <View className="justify-end flex-1">
                    <PrimaryButton
                        title={'Read Again'}
                        containerStyles={'rounded-[30px] items-center justify-center max-h-[48px]'}
                        textStyles={'font-cygrebold text-[18px] leading-[21.6px]'}/>
                </View>
            </View>
        </View>
    </SafeAreaView>
}



export default BookMemory;