import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';


const BookMemory = () => {


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

    </SafeAreaView>
}



export default BookMemory;