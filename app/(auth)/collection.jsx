import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useState, useRef, useEffect, useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import axios from '../../network/axios';


const Collection = () => {

    const { name } = useLocalSearchParams();


    return (
        <SafeAreaView className="bg-[#F7F7F7] h-full max-h-full">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
                <View className="flex-row items-center mt-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-1 mr-5 max-w-[44px] w-full items-center justify-center rounded-[10px]">
                            <MaterialIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-black font-cygrebold text-[22px] font-bold">{name}</Text>
                </View>
                <TouchableOpacity
                    className="bg-primary flex-1 mt-2.5 max-w-[44px] w-full items-center justify-center max-h-[44px] h-full rounded-[10px]">
                        <Entypo name="dots-three-vertical" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export default Collection;