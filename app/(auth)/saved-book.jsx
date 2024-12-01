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


const SavedBook = () => {

    const [value, setValue] = useState(13);

    const handleReduceCounter = () => {
        setValue(prev => prev - 1);
    }

    const handleAddCounter = () => {
        setValue(prev => prev + 1);
    }

    const tempMaxPageCount = 336;

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
            <View className="max-h-[227px] w-full items-center">
                <View className="px-6 py-5 max-w-[353px] bg-black rounded-[20px] w-full">
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
        </ScrollView>
    </SafeAreaView>
}


export default SavedBook;