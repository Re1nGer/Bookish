import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import RadioButton from "../../components/RadioButton";



const QuoteToConnect = () => {

    const [text, setText] = useState('')

    const handleInputTextChange = () => {}

    return (
        <SafeAreaView className="bg-[#F7F7F7] flex-1">
            <View className="max-h-[60px] items-center h-full mx-5 mb-7">
                <View className="flex-row justify-between ites-center w-full items-center mt-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-1 mr-5 max-w-[44px] w-full items-center justify-center rounded-[10px]">
                            <MaterialIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-primary rounded-[30px] flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full py-2 px-4">
                            <Text className="leading-[19.2px] text-[#fff] font-cygrebold">Save</Text>
                    </TouchableOpacity>
                </View>
{/*                 <Text className="text-black mx-5 font-cygrebold text-[22px] leading-[26.4px] mt-6">Select quote to connect</Text> */}
            </View>
            <KeyboardAvoidingView
                className="mx-5 max-h-[150px] flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <Text className="text-black mt-6 text-[22px] font-cygrebold leading-[26.4px] font-bold">Select quote to connect</Text>
                <View className="bg-[#ffffff] mt-5 mb-7 border-[.3px] border-[#727272] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[26px] px-5">
                    <MaterialIcons name="search" color={'#1C1C1C'} size={22} />
                    <TextInput
                        onChangeText={handleInputTextChange}
                        value={text}
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 pl-4 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="search"
                    />
                    <TouchableOpacity
                        onPress={() => handleInputTextChange('')}
                        className="rounded-full bg-[#000] p-1">
                        <MaterialIcons name='close' color={'#fff'} size={14} />
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            <ScrollView contentInsetAdjustmentBehavior="automatic" className="mx-5 flex-1">
                <QuoteCard containerStyles={'mb-4'} />
                <QuoteCard containerStyles={'mb-4'} />
                <QuoteCard containerStyles={'mb-4'} />
                <QuoteCard containerStyles={'mb-4'} />
                <QuoteCard containerStyles={'mb-4'} />
                <QuoteCard containerStyles={'mb-4'} />
                <QuoteCard containerStyles={'mb-4 flex-1'} />
            </ScrollView>
        </SafeAreaView>
    );
}


const QuoteCard = ({ containerStyles }) => {

    return <View className={`border-[#8A8A8A] py-5 px-4 border-[.5px] max-h-[189px] rounded-[20px] ${containerStyles}`}>
        <View className="flex-row justify-between items-center mb-4">
            <View className="bg-[#6592E3] px-4 py-1 rounded-[13px] flex-row items-center">
                <MaterialIcons name="book" color={'white'} />
                <Text className="text-[#FFFFFF] text-sm leading-[16.8px] ml-1">Make It Stick</Text>
            </View>
            <RadioButton selected={true} />
        </View>
        <View className="py-3 px-4 rounded-[8px] bg-[#EEEEEE] w-full max-h-[109px]">
            <Text className="text-black font-cygresemibold leading-[19.2px]">Trying to solve a problem before being taught the solution leads to better learning, even when errors are made in the attempt.</Text>
        </View>
    </View>
}



export default QuoteToConnect;