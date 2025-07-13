import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageHandler from '../../components/ImageHandler';
import { images } from '../../constants';
import axios from '../../network/axios';


const BooksFinished = () => {

    const { date } = useLocalSearchParams();

    const newDate = new Date(date);

    const formatted = newDate.toLocaleDateString('de-DE')

    const [events, setEvents] = useState([]);
    //console.log(date);

    const getReadEvents = async () => {
        try {
            const { data } = await axios.get(`users/read-events?day=${newDate.toISOString()}`);
            console.log(data);
            setEvents(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReadEvents();
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

        <View className="px-10 items-center justify-center mb-8">
            <Text className="text-[22px] text-black font-cygrebold">{`Books finished on ${formatted}`}</Text>
        </View>
        <FlatList
            data={events}
            className="px-5"
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, _ }) => 
                <BookCard
                    key={item.id}
                    bookImgSrc={item.imageUrl}
                    name={item.bookName}
                    rating={4}
                    memoImgSrc={item.imageId ? `http://10.0.2.2:5085/users/memo/image/${item.imageId}` : null}
                /> }
        />
    </SafeAreaView>
}


const BookCard = ({ bookImgSrc, name, rating, memoImgSrc }) => {
    console.log(memoImgSrc);
    return <TouchableOpacity
        onPress={() => router.push('book-memory')}
        className="bg-[#fff] border-[.3px] border-[#8A8A8A] justify-between rounded-[20px] pl-4 py-3 pr-7 flex-row flex-1 mb-4">
        <View className="flex-row gap-x-2">
            <ImageHandler source={bookImgSrc} className="max-w-[82px] max-h-[118px]" width={82} height={118} resizeMode='contain' />
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
                <ImageHandler source={memoImgSrc} className="rounded-full max-w-[80px] max-h-[80px]" width={80} height={80} resizeMode='cover' />
            </View>
        ) : <></> }
    </TouchableOpacity>
}



export default BooksFinished;