import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { Collection1Icon } from "../../components/Svg";
import { router } from "expo-router";



const SelectCollections = () => {


    //when fetching the collection it has to be ordered in backend and then split in two here


    return <SafeAreaView className="bg-[#F7F7F7] h-full relative">

            <TouchableOpacity className="bg-primary self-end mt-2.5 mr-5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
            </TouchableOpacity>

            <View className="px-5 mt-5 flex-[.3]">
                <Text className="text-black mt-6 text-[24px] font-cygrebold leading-[28.8px] font-bold">Select collections</Text>
                <View className="bg-[#ffffff] mt-5 mb-7 border-[.3px] border-[#727272] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[26px] px-5">
                    <MaterialIcons name="search" color={'#1C1C1C'} size={22} />
                    <TextInput
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 pl-4 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Search"
                    />
                    <TouchableOpacity className="rounded-full bg-[#000] p-1">
                        <MaterialIcons name='close' color={'#fff'} size={14} />
                    </TouchableOpacity>
                </View>
            </View>


            <ScrollView className="px-5 flex-1">
                <View className="flex-row">
                    <View className="w-full flex-[.5]">
                        <NewCollection containerStyles={'mr-2.5'} />
                        <ExistingCollection name={'For art classes'} />
                        <ExistingCollection name={'For art classes'} />
                        <ExistingCollection name={'For art classes'} />
                        <ExistingCollection name={'For art classes'} />
                    </View>
                    <View className="w-full flex-[.5]">
                        <ExistingCollection name={'For art classes'} />
                        <ExistingCollection name={'For art classes'} />
                        <ExistingCollection name={'For art classes'} />
                        <ExistingCollection name={'For art classes'} />
                    </View>
                </View>

            </ScrollView>
    </SafeAreaView>
}


export default SelectCollections;


const NewCollection = ({ containerStyles }) => {
    return <View className={`bg-primary rounded-[20px] mb-5 flex-[.3] justify-between p-4 max-w-[169px] w-full max-h-[174px] h-full ${containerStyles}`}>
        <Text className="font-cygrebold text-[22px] leading-[26.4px] max-w-[105px] font-bold text-[#ffffff]">New Collection</Text>
        <TouchableOpacity
            onPress={() => router.push('create-collection')}
            className="items-center self-end bg-[#fff] max-w-[61px] max-h-[62px] rounded-full justify-center p-4">
            <MaterialIcons name="add" size={30} />
        </TouchableOpacity>
    </View>
}


const ExistingCollection = ({ name, containerStyles }) => {

    return (
        <View className={`bg-[#ffffff] border-[.5px] mb-5 border-[#8A8A8A] rounded-[20px] justify-between p-4 max-w-[169px] w-full max-h-[174px] h-full ${containerStyles}`}>
            <Text className="font-cygrebold text-[22px] leading-[26.4px] max-w-[105px] font-bold text-[#121F16]">{name}</Text>
            <TouchableOpacity
                className="items-center self-end bg-[#ffffff] max-w-[61px] relative -z-10 max-h-[62px] rounded-full justify-center p-4">
                <Collection1Icon />
            </TouchableOpacity>
        </View>
    );

}