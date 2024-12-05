import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRef, useState } from "react";
import { router } from "expo-router";


const Library = () => {

    const [text, setText] = useState('');

    const inputRef = useRef(null);

    const handleCloseBtn = () => {}


    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
            <TouchableOpacity
                activeOpacity={0.7}
                className="flex-1 pt-3 flex-row"
            >
                <Text className="text-black text-[24px] leading-[28.8px] font-cygrebold font-bold">{"Books"}</Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-primary flex-1 mt-2.5 mr-2.5 max-w-[44px] w-full items-center justify-center max-h-[44px] h-full rounded-[10px]">
                    <Entypo name="plus" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push('book-filters')}
                className="bg-primary flex-1 mt-2.5 max-w-[44px] w-full items-center justify-center max-h-[44px] h-full rounded-[10px]">
                    <MaterialIcons name="filter-list" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <ScrollView>
            <View className="mx-5 max-h-[50px]">
                <View className="bg-[#ffffff] mb-12 border border-[#49454F] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[26px] px-5">
                    <MaterialIcons name="search" color={'#49454F'} size={22} />
                    <TextInput
                        ref={inputRef}
                        value={text}
                        onChangeText={(e) => setText(e)}
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 pl-4 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Search a book"
                    />
                    <TouchableOpacity onPress={handleCloseBtn} className="rounded-full bg-[#000] p-1">
                        <MaterialIcons name='close' color={'#fff'} size={14} />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="mx-5 flex-row mt-5">
                <BookStatBox
                    statName={'To Read'}
                    count={0}
                    containerStyles={'mr-2'} 
                />
                <BookStatBox
                    statName={'Reading'}
                    count={2}
                    containerStyles={'mr-2'} 
                />
                <BookStatBox
                    statName={'Finished'}
                    count={3}
                />
            </View>
            <View className="mx-5 my-7">
                <BookStatus
                    name={'Make It Stick'}
                    author={'Peter C. Brown, Mark A. McDaniel'}
                    tag={'For psychology classes'}
                    progress={'65'} 
                    containerStyles={'mb-4'}
                />
                <BookStatus
                    name={'Make It Stick'}
                    author={'Peter C. Brown, Mark A. McDaniel'}
                    tag={'For psychology classes'}
                    progress={'65'} 
                    containerStyles={'mb-4'}
                />
                <BookStatus
                    name={'Make It Stick'}
                    author={'Peter C. Brown, Mark A. McDaniel'}
                    tag={'For psychology classes'}
                    progress={'65'} 
                    containerStyles={'mb-4'}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
}


const BookStatBox = ({ statName, count, containerStyles }) => {
    return <View className={`bg-[#121F16] rounded-[15px] max-w-[112px] items-center w-full max-h-[83px] h-full ${containerStyles}`}>
        <Text className="text-[14px] font-cygrebold leading-[16.8px] font-bold text-[#fff] my-4">{statName}</Text>
        <View className="bg-primary rounded-[22px] justify-center items-center max-w-[38px] w-full mb-5">
            <Text className="text-[14px] leading-[16.8px] font-cygreregular p-1 text-[#fff]">{count}</Text>
        </View>
    </View>
}


const BookStatus = ({ name, author, progress, tag, containerStyles }) => {
    return <View className={`max-w-[353px] max-h-[172px] w-full h-full flex-row border border-[#727272] px-3 py-4 rounded-[15px] ${containerStyles}`}>
        <Image
            source={images.book}
            className="max-w-[99px] max-h-[141px] w-full h-full mr-4"
            width={99}
            height={141}
        />
        <View>
            <Text className="text-black text-[18px] font-cygrebold leading-[21.6px]">{name}</Text>
            <Text className="text-black text-sm font-cygreregular leading-[16.8px] max-w-[210px]">{author}</Text>
            <Text className="text-primary text-right text-[12px] leading-[14.4px] mt-2">{`${progress}%`}</Text>
            <View className="relative max-w-[195px] w-full max-h-[13px] h-full bg-[#EEEEEE] mb-7 rounded-[15px]">
                <View className={`absolute h-full bg-primary rounded-[15px]`} style={{ width: `${progress}%` }}></View>
            </View>
            <View className="bg-primary rounded-[5px] max-h-[28px] py-1 px-2 max-w-[176px]">
                <Text className="text-[14px] leading-[16.8px] font-cygreregular text-[#fff]">{tag}</Text>
            </View>
        </View>
    </View>
}

export default Library;