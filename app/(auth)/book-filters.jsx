import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useState } from "react";
import { router } from "expo-router";



const LibraryFilters = () => {

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">

            <TouchableOpacity
                onPress={() => router.back()}
                className="flex-1 mt-2.5 mr-2.5 max-w-[44px] w-full items-center justify-center rounded-[10px]">
                    <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-primary rounded-[30px] flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full py-2 px-4">
                    <Text className="leading-[19.2px] text-[#fff] font-cygrebold">Save</Text>
            </TouchableOpacity>
        </View>

        <View className="mt-7 mx-5 justify-between flex-row items-center">
            <Text className="text-black text-[24px] leading-[28.8px] font-cygrebold">
                Choose Filters
            </Text>
            <View className="flex-row">
                <Text className="underline underline-offset-3 mr-2 text-black font-cygrebold">Reset</Text>
                <TouchableOpacity className="rounded-full bg-[#000] p-1">
                    <MaterialIcons name='close' color={'#fff'} size={14} />
                </TouchableOpacity>
            </View>
        </View>

        <View className="mx-5 mt-9">
            <Text className="text-black text-[18px] leading-[21.6px] font-cygrebold mb-4">Reading Status</Text>
            <ReadingStatusRow />
        </View>

        <View className="mx-5 mt-7">
            <Text className="text-black text-[18px] leading-[21.6px] font-cygrebold mb-2.5">Authors</Text>
            <AuthorsDropdown />
        </View>

        <View className="mx-5 mt-7">
            <Text className="text-black text-[18px] leading-[21.6px] font-cygrebold mb-2.5">Categories</Text>
            <CategoryRow />
        </View>
        
        <View className="mx-5 mt-7">
            <Text className="text-black text-[18px] leading-[21.6px] font-cygrebold mb-2.5">Collections</Text>
            <CollectionRow />
        </View>

    </SafeAreaView>
}

export default LibraryFilters;



const AuthorsDropdown = () => {
    return <TouchableOpacity
        onPress={() => router.push('select-authors')}
        className="border-[#8A8A8A] border-[.5px] bg-[#fff] items-center justify-center rounded-[15px] flex-row p-3">
        <Text className="text-black font-cygreregular leading-[19.2px] mr-2.5 text-center">Choose Authors</Text>
        <MaterialIcons name="arrow-drop-down" size={20} color="black" />
    </TouchableOpacity>;
}

const CollectionRow = () => {

    const [collections] = useState(["For main essay", "Health Hacks", "For psychology"]); //fetched from api

    const [selectedCategories, setSelectedCategories] = useState({
        forMainEssay: false,
        healthHacks: false,
        forPsychology: false,
    });


    return (
        <FlatList
            horizontal
            data={collections}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, _ }) => <Status
                status={item}
                selected={selectedCategories[item]}
                onPress={() => setSelectedCategories(prev => ({...prev, [item]: !selectedCategories[item]}))}  
            />}
        />
    );


}

const CategoryRow = () => {

    const [categories] = useState(["Fiction", "Non-Fiction", "History", "Biology", "Mystery", "Novel", "Drama"]);

    const [selectedCategories, setSelectedCategories] = useState({
        fiction: false,
        nonFiction: false,
        history: false,
        biology: false,
        mystery: false,
        novel: false,
        drama: false,
    });


    return (
        <FlatList
            horizontal
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, _ }) => <Status
                status={item}
                selected={selectedCategories[item]}
                onPress={() => setSelectedCategories(prev => ({...prev, [item]: !selectedCategories[item]}))}  
            />}
        />
    );


}

const ReadingStatusRow = () => {

    const [statuses, _] = useState(["To Read", "Reading", "Done", "Gave Up", "Paused"]);

    const [selectedStatuses, setSelectedStatuses] = useState({
        toRead: false,
        reading: false,
        done: false,
        gaveUp: false,
        paused: false
    });

    return (
        <FlatList
            horizontal
            data={statuses}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, _ }) => <Status
                status={item}
                selected={selectedStatuses[item]}
                onPress={() => setSelectedStatuses(prev => ({...prev, [item]: !selectedStatuses[item]}))}  
            />}
        />
    );
}


const Status = ({ status, selected, onPress }) => {
    return <TouchableOpacity onPress={onPress} className={`${selected ? 'bg-primary' : 'bg-[#fff]'}  py-2 px-3 max-h-[40px] mr-1.5 border-[.5px] border-[#8A8A8A] rounded-[8px] justify-between items-center flex-row`}>
        { selected ? <Feather name="check" size={16} color="white" /> : <></> }
        <Text className={`${selected ? 'text-white ml-2' : 'text-black'} text-[14px] leading-[20px] font-cygrebold`}>{status}</Text>
    </TouchableOpacity>
}