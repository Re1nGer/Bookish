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
import { useState } from "react";


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

    const [states, setStates] = useState({
        adventures: false,
        business: false,
        contemporary: false,
        crime: false,
        drama: false,
        history: false,
        horror: false,
        nonFiction: false,
        psychology: false
    });

    const handleOnPress = (name) => {
        setStates(prev => ({...prev, [name]: !prev[name]}))
    }

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
                    selected={states["adventures"]}
                    text={'Adventure'} 
                    onPress={() => handleOnPress("adventures")}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    selected={states["art"]}
                    text={'Art'} 
                    onPress={() => handleOnPress("art")}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    selected={states["business"]}
                    text={'Business'} 
                    onPress={() => handleOnPress("business")}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    selected={states["contemporary"]}
                    text={'Contemporary'} 
                    onPress={() => handleOnPress("contemporary")}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    selected={states["crime"]}
                    text={'Crime'}
                    onPress={() => handleOnPress("crime")}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    selected={states["drama"]}
                    text={'Drama'}
                    onPress={() => handleOnPress("drama")}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    selected={states["history"]}
                    text={'History'} 
                    onPress={() => handleOnPress("history")}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    selected={states["horror"]}
                    text={'Horror'} 
                    onPress={() => handleOnPress("horror")}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    selected={states["nonFiction"]}
                    text={'Non-fiction'}
                    onPress={() => handleOnPress("nonFiction")}
                    containerStyles={'mb-2.5'}
                />
                <Genre
                    selected={states["psychology"]}
                    text={'Psychology'} 
                    onPress={() => handleOnPress("psychology")}
                    containerStyles={'mb-10'}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

export default SelectGenres;



const Genre = ({ selected, text, onPress, containerStyles }) => {

    return <View className={`rounded-[10px] flex-row items-center max-w-[353px] h-[49px] w-full border-[.3px] px-4 
        ${selected ? 'bg-[#121F16] text-[#ffffff]' : 'bg-[#ffffff] text-[#121F16]'} ${containerStyles}`}>
            <Checkbox
                containerStyles={'mr-3'}
                checked={selected}
                onPress={onPress}
            /> 
            <Text
                className={`text-[#FFFFFF] font-cygrebold leading-[19.2px] font-bold
                ${selected ? 'text-[#ffffff]' : 'text-[#121F16]'}`}>{text}</Text>
    </View>
}