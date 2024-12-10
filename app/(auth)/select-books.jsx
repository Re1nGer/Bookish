import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import SelectGenre from "../../components/SelectGenre";

const SelectBooks = () => {


    const handleInputTextChange = () => {}


    //fetch authors from api selecting authors from already existing books

    const [books, setBooks] = useState([
        '1984',
        'Atomic Habits',
        'The Alchemist',
        'Brain Rules',
        'The Catcher in the Rye',
        'The Great Gatsby',
        'The Power of Habit',
        'To Kill a Mockingbird',
        'Thinking, Fast and Slow',
        'Why We Sleep',
    ]);

    const [booksSelected, setBooksSelected] = useState({
        '1984': false,
        'Atomic Habits': false,
        'The Alchemist': false,
        'Brain Rules': false,
        'The Catcher in the Rye': false,
        'The Great Gatsby': false,
        'The Power of Habit': false,
        'To Kill a Mockingbird': false,
        'Thinking, Fast and Slow': false,
        'Why We Sleep': false,
    })

    const handleOnPress = (book) => {
        setBooksSelected(prev => ({...prev, [book]: !booksSelected[book]}))
    }
    
    return <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
                <View className="flex-row items-center mt-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-1 mr-5 max-w-[44px] w-full items-center justify-center rounded-[10px]">
                            <MaterialIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
{/*                     <Text className="text-black font-cygrebold text-[22px] font-bold">Create Note</Text> */}
                </View>
                <TouchableOpacity
                    className="bg-primary rounded-[30px] flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full py-2 px-4">
                        <Text className="leading-[19.2px] text-[#fff] font-cygrebold">Save</Text>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                className="mx-5 max-h-[150px]"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <Text className="text-black mt-6 text-[22px] font-cygrebold leading-[26.4px] font-bold">Choose Books</Text>
                <View className="bg-[#ffffff] mt-5 mb-7 border-[.3px] border-[#727272] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[26px] px-5">
                    <MaterialIcons name="search" color={'#1C1C1C'} size={22} />
                    <TextInput
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 pl-4 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Search a book"
                    />
                    <TouchableOpacity
                        onPress={() => handleInputTextChange('')}
                        className="rounded-full bg-[#000] p-1">
                        <MaterialIcons name='close' color={'#fff'} size={14} />
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    className="mx-5 flex-1"
                    data={books}
                    renderItem={({ item }) => <SelectGenre
                        key={item}
                        selected={booksSelected[item]}
                        text={item}
                        onPress={() => handleOnPress(item)}
                        containerStyles={'mb-3.5'}
                    />}
                />
    </SafeAreaView>

}



export default SelectBooks;