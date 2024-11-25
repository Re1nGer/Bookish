import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";

import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { CollectionsIcon } from "../../components/Svg";
import { router, useLocalSearchParams } from "expo-router";
import axios from "../../network/axios";

const AddBook = () => {

    const { id } = useLocalSearchParams();

    const [book, setBook] = useState({
        id: '',
        volumeInfo: {
            title: '',
            authors: [],
            description: '',
            pageCount: 0,
            categories: [],
            imageLinks: {
                thumbnail: ''
            }
        }
    });

    const fetchBook = async () => {
        try {
            const { data } = await axios.get(`/book/${id}`);
            setBook(data)
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBook();
    }, []);


    return <SafeAreaView className="bg-[#F7F7F7] h-full">
            <TouchableOpacity className="bg-[#6592E3] self-end mt-2.5 mr-5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
            </TouchableOpacity>
        <ScrollView className="px-5 mt-5">
            <Text className="text-[#1C1C1C] mt-6 text-[24px] font-cygrebold leading-[28.8px] font-bold">Add Book</Text>
            <Image
                source={{ uri: book.volumeInfo?.imageLinks?.thumbnail }}
                width={134}
                height={191}
                className="self-center mt-6 rounded-[6px]"
                resizeMode="contain" 
            />
            <View className="mt-3 max-h-[100px]">
                <Text className="text-[#1C1C1C] mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Title</Text>
                <View className="bg-[#ffffff] mb-9 border-[.5px] border-[#8A8A8A] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[15px] px-5">
                    <TextInput
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Make it stick"
                        value={book.volumeInfo.title}
                    />
                </View>
            </View>
            <View className="max-h-[100px]">
                <Text className="text-[#1C1C1C] mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Author</Text>
                <View className="bg-[#ffffff] mb-9 border-[.5px] border-[#8A8A8A] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[15px] px-5">
                    <TextInput
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Make it stick"
                        value={book.volumeInfo?.authors?.join(',')}
                    />
                </View>
            </View>
            <View className="max-h-[180px]">
                <Text className="text-[#1C1C1C] mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Description</Text>
                <View className="bg-[#ffffff] mb-9 border-[.5px] border-[#8A8A8A] items-center max-h-[145px] h-full flex-row justify-between w-full rounded-[15px] px-5">
                    <TextInput
                        textAlignVertical="top"
                        multiline={true}
                        className="bg-[#ffffff] pt-4 h-full font-cygreregular justify-center items-center flex-1 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Make it stick"
                        value={book.volumeInfo?.description}
                    />
                </View>
            </View>
            <View className="max-h-[100px] mt-6">
                <Text className="text-[#1C1C1C] mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Page Count</Text>
                <View className="bg-[#ffffff] mb-9 border-[.5px] border-[#8A8A8A] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[15px] px-5">
                    <TextInput
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Page Count"
                        readOnly
                        value={book.volumeInfo?.pageCount?.toString()}
                    />
                </View>
            </View>
            <View className="max-h-[160px] mt-6">
                <Text className="text-[#1C1C1C] mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Status</Text>
{/*                 gotta figure out how to handle selected buttons */}

                <View className="flex-row">
                    <StatusBtn text={'To Read'} selected={true} containerStyles={'mr-2.5'} />
                    <StatusBtn text={'Reading'} containerStyles={'mr-2.5'} />
                    <StatusBtn text={'Finished'} />
                </View>
                <View className="flex-row justify-center">
                    <StatusBtn text={'Gave Up'} containerStyles={'mr-2.5 mt-3'} />
                    <StatusBtn text={'Paused'} containerStyles={'mt-3'} />
                </View>
            </View>

            <View className="my-6 max-h-[130px]">
                <Text className="text-[#1C1C1C] mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Genres</Text>
                <View className="max-h-[116px] h-full p-4 flex-row justify-between rounded-[20px] bg-[#1C1C1C]">
                    <View className="flex-wrap flex-row flex-1 items-start">
                        { book.volumeInfo.categories?.slice(0, 3).map(item => <Genre key={item} name={item} />) }
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/select-genres')}
                        className="items-center flex-1 self-center bg-[#fff] max-w-[61px] max-h-[62px] rounded-full justify-center p-4">
                        <MaterialIcons name="add" size={30} />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="mt-6 max-h-[180px]">
                <Text className="text-[#1C1C1C] mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Collections</Text>
                <TouchableOpacity
                    onPress={() => router.push('select-collections')}
                    className="max-h-[116px] h-full pl-8 pr-4 flex-row justify-between rounded-[20px] bg-[#1C1C1C]">
                    <Text className="text-[#ffffff] max-w-[136px] font-cygrebold self-center text-sm leading-[16.8px] font-bold">Add book to your personal collections</Text>
                    <View className="self-start h-full -mt-3">
                        <CollectionsIcon />
                    </View>
                </TouchableOpacity>
            </View>

        </ScrollView>
    </SafeAreaView>
}

export default AddBook;


const Genre = ({ name, containerStyles }) => {

    return <View className={`py-2 px-1 mr-2 mb-2 max-w-[116px] bg-[#6592E3] flex-row items-center justify-between rounded-[5px] ${containerStyles}`}>
        <Text className="text-[#FFFFFF] font-cygrebold leading-[16.8px] text-sm px-1" numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
        <TouchableOpacity className="rounded-full bg-[#fff] items-center justify-center w-[16px] h-[16px]">
            <MaterialIcons name='close' color={'#6592E3'} size={8} />
        </TouchableOpacity>
    </View>
}

const StatusBtn = ({ selected, text, containerStyles }) => {
    return <TouchableOpacity className={`rounded-[15px] justify-center items-center max-w-[106px] h-[38px] w-full border-[.5px] border-[#8A8A8A] ${selected ? 'bg-[#6C97E4]' : 'bg-[#ffffff]'} ${containerStyles}`}>
        <Text className={`leading-[16.8px] text-center font-cygrebold text-sm ${selected ? 'text-[#ffffff]' : 'text-[#1C1C1C]'}`}>{text}</Text>
    </TouchableOpacity>
}