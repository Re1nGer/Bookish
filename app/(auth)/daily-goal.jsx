import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';


const DailyGoal = () => {



    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5">
            <TouchableOpacity
                className="mr-4"
                onPress={() => router.back()}>
                <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-black font-cygrebold flex-1 text-[22px] font-bold">Daily Goal</Text>
            <TouchableOpacity
                className="bg-primary flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}



export default DailyGoal;