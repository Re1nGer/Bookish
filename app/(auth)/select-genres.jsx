import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import Checkbox from "../../components/Checkbox";


const genres = [
        "Adventure",
        "Business",
        "Contemporary",
        "Crime",
        "Drama",
        "History",
        "Horror",
        "Non-fiction",
        "Psychology"
    ];


const SelectGenres = () => {


    return (
        <SafeAreaView className="bg-primary h-full">
            <TouchableOpacity className="bg-[#6592E3] self-end mt-2.5 mr-5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
            </TouchableOpacity>


            <ScrollView className="px-5 mt-5">
                <Text className="text-[#1C1C1C] mt-6 text-[24px] font-cygrebold leading-[28.8px] font-bold">Select genres</Text>
                <View className="bg-[#ffffff] mt-5 mb-7 border-[.3px] border-[#727272] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[26px] px-5">
                    <MaterialIcons name="search" color={'#1C1C1C'} size={22} />
                    <TextInput
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 pl-4 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Search a book"
                    />
                    <TouchableOpacity className="rounded-full bg-[#000] p-1">
                        <MaterialIcons name='close' color={'#fff'} size={14} />
                    </TouchableOpacity>
                </View>

                <Genre
                    selected={true}
                    text={'Adventure'} 
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    text={'Art'} 
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    text={'Business'} 
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    text={'Contemporary'} 
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    text={'Crime'}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    text={'Drama'}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    text={'History'} 
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    text={'Horror'} 
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    text={'Non-fiction'}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    text={'Psychology'} 
                    containerStyles={'mb-2.5'}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

export default SelectGenres;



const Genre = ({ selected, text, containerStyles }) => {

    return <View className={`rounded-[10px] flex-row items-center max-w-[353px] max-h-[49px] w-full h-full border-[.3px] px-4 
        ${selected ? 'bg-[#121F16] text-[#ffffff]' : 'bg-[#ffffff] text-[#121F16]'} ${containerStyles}`}>
            <Checkbox
                containerStyles={'mr-3'}
                checked={selected}
            /> 
            <Text
                className={`text-[#FFFFFF] font-cygrebold leading-[19.2px] font-bold
                ${selected ? 'text-[#ffffff]' : 'text-[#121F16]'}`}>{text}</Text>
    </View>
}