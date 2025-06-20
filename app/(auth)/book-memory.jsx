import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ImageHandler from '../../components/ImageHandler';
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';


const BookMemory = () => {

    const { bookId } = useLocalSearchParams();

    const [book, setBook] = useState({
        title: '',
        author: '',
        startedAt: '',
        finishedAt: '',
        memo: '',
        rating: '',
        memoId: ''
    });

    useEffect(() => {

    }, []);

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

        <View className="mx-5 border-[#8A8A8A] flex-row p-4 border-[.5px] rounded-[20px] max-w-[353px]">
            <ImageHandler source={getBookImage()} width={114} height={163} className="max-h-[163px] max-w-[114px] mr-5" />
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
            </View>
        </View>
    </SafeAreaView>
}



export default BookMemory;