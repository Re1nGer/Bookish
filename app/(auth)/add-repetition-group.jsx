import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import Switch from "../../components/Switch";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import FormField from "../../components/FormField";
import Entypo from '@expo/vector-icons/Entypo';


const AddRepetitionGroup = () => {

    return (
        <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
                <TouchableOpacity
                    className="mr-4"
                    onPress={() => router.back()}>
                    <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-black font-cygrebold flex-1 text-[22px] font-bold">Create Group</Text>
                <TouchableOpacity
                    className="bg-primary flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                    <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
                </TouchableOpacity>
            </View>
            <View className="px-4 mb-10">
                <FormField
                    title={'Name'}
                    placeholder={'Enter name for this group'}
                    placeholderTextColor={'#8A8A8A'}
                    textInputContainerStyles={'rounded-[15px]'}
                />
            </View>
            <View className="px-4 max-h-[160px] mb-5">
                <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px] mb-4">Add Quotes to repeat</Text>
                <TouchableOpacity className="bg-[#1C1C1C] max-h-[116px] h-full items-center justify-center rounded-[20px]"> 
                    <View className="justify-center items-center">
                        <Entypo name="plus" size={54} color="white" />
                        <Text className="text-white font-cygreregular text-center">Add Quotes</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="px-4 max-h-[160px] mb-14">
                <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px] mb-4">Add Notes to repeat</Text>
                <TouchableOpacity className="bg-[#1C1C1C] max-h-[116px] h-full items-center justify-center rounded-[20px]"> 
                    <View className="justify-center items-center">
                        <Entypo name="plus" size={54} color="white" />
                        <Text className="text-white font-cygreregular text-center">Add Notes</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="px-4 max-h-[160px] mb-2.5">
                <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px] mb-4">When To Repeat</Text>
                <View className="border-[2px] border-[#6592E3] bg-white rounded-[13px]">
                    <View className="flex-row justify-between items-center p-5">
                        <View className="justify-center flex-1">
                            <Text className="text-secondary text-[18px] font-bold font-cygrebold leading-[21.6px]">Enable Notifications</Text>
                        </View>
                        <Switch
                            size="medium"
                            activeColor="#6592E3"
                            inactiveColor="#767577" 
                            thumbColor="#ffffff" 
                            containerStyles={'flex-[.2]'}
                        />
                    </View>
                </View>
            </View>
            <View className="px-4">
                <Text className="text-black font-cygreregular leading-[19.2px]">Reviewing your notes at systematic intervals: firstly after 1 day, then 3 days, 1 week, 2 weeks etc.</Text>
            </View>
        </SafeAreaView>
    );
}


export default AddRepetitionGroup;