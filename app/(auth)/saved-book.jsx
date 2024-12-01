import {
    TextInput,
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


const SavedBook = () => {

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5">
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
        </ScrollView>
    </SafeAreaView>
}


export default SavedBook;