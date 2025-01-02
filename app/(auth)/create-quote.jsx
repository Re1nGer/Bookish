import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useRef, useEffect, useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Genre from "../../components/Genre";
import { UserContext } from "../../context/UserContext";
import { Alert } from 'react-native';
import axios from '../../network/axios';
import BookBottomDrawer from "../../components/BottomDrawer";
import Fontisto from '@expo/vector-icons/Fontisto';


const CreateQuote = () => {

    const [text, setText] = useState('');

    const inputRef = useRef(null);

    const { id } = useLocalSearchParams();

    const { quote, setQuote } = useContext(UserContext);

    const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

    const handleQuoteDrawerOpen = () => {
        setIsQuoteDrawerOpen(prev => !prev);
    }

    const handleNoteDelete = (noteId) => {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "Delete", 
                    onPress: () => {
                        setQuote(prev => ({...prev, notes:
                             prev.notes.filter(item => item.id !== noteId)}));
                    },
                    style: "destructive" // This will make it red on iOS
                }
            ]
        );
    }

    const getNoteIds = () => {
        return quote.notes.map(item => item.id);
    }

    const handleSaveQuote = async () => {
        try {
            await axios.post(`books/${id}/quote`, {
                content: text,
                noteIds: getNoteIds()
                //TODO: to add collections ids, quoteId, repetition groups id
            });
            router.back();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        inputRef.current?.focus();

        return () => {
            setQuote(prev => ({...prev,
                notes: [],
                collectionIds: [],
                repetitionGroupIds: []
            }));
        }
    }, []);


    return <SafeAreaView className="bg-[#F7F7F7] h-full">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
                <View className="flex-row items-center mt-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-1 mr-5 max-w-[44px] w-full items-center justify-center rounded-[10px]">
                            <MaterialIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-black font-cygrebold text-[22px] font-bold">Create Quote</Text>
                </View>
                <TouchableOpacity
                    onPress={async () => await handleSaveQuote()}
                    className="bg-primary rounded-[30px] flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full py-2 px-4">
                        <Text className="leading-[19.2px] text-[#fff] font-cygrebold">Save</Text>
                </TouchableOpacity>
            </View>
            <AddNoteDrawer
                setIsQuoteDrawerOpen={setIsQuoteDrawerOpen}
                isQuoteDrawerOpen={isQuoteDrawerOpen} 
                bookId={id}
            />
            <ScrollView>
                <Pressable
                    onPress={() => inputRef.current?.focus()}
                    className="mt-5 mx-5 relative h-[317px] border-[#8A8A8A] rounded-[20px] border-[.5px] py-3 px-4">
                    <TextInput
                        value={text}
                        placeholder="Enter your quote"
                        ref={inputRef}
                        onChangeText={(e) => setText(e)}
                        multiline
                        className="py-4 w-full max-h-[317px]"
                    />
                </Pressable>
                <View className="mt-9 mx-5 max-h-[160px]">
                    <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mb-2.5">Spaced Repetition Groups</Text>
                    <View className="p-5 border bg-black max-h-[126px] w-full h-full justify-between flex-row items-center rounded-[20px]">
                        <View className="flex-wrap flex-row justify-start self-start flex-1">
                            <Genre name={'Memory Improvement'} showCloseBtn containerStyles={'max-w-[200px]'} />
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push('repetition-groups')}
                            className="items-center flex-1 self-center bg-[#fff] max-w-[61px] max-h-[62px] rounded-full justify-center p-4">
                            <MaterialIcons name="add" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-5 mx-5 max-h-[160px]">
                    <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mb-2.5">Collections</Text>
                    <View className="flex-wrap p-5 border bg-black max-h-[126px] h-full flex-row items-center rounded-[20px]">
                        <View className="flex-wrap flex-row justify-start self-start flex-1">
                            <Genre name={'For psychology classes'} showCloseBtn containerStyles={'max-w-[200px]'} />
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push('select-collections')}
                            className="items-center flex-1 self-center bg-[#fff] max-w-[61px] max-h-[62px] rounded-full justify-center p-4">
                            <MaterialIcons name="add" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

            { quote.notes?.length > 0 ? (
                <View className="flex-1 my-2.5">
                    <View className="mx-5 mb-7 mt-10 flex-row justify-between">
                        <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold">Notes</Text>
                        <TouchableOpacity>
                            <Text className="text-primary underline font-cygrebold leading-[19.2px]">Show more</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView 
                        showsHorizontalScrollIndicator={false}
                        className="mx-5 max-h-[250px]"
                        contentInsetAdjustmentBehavior="automatic"
                        initialNumToRender={10}
                        horizontal>
                            <View className="flex-1">
                                <TouchableOpacity
                                    onPress={() => router.push({pathname: 'select-notes', params: { id }})}
                                    className="w-[97px] bg-primary items-center justify-center max-h-[97px] h-full rounded-[20px] mr-3">
                                    <Text className="text-white text-[50px] pb-3">+</Text>
                                </TouchableOpacity>
                            </View>
                            { quote.notes.map(item =>
                                <Note key={item.id}
                                {...item}
                                onDeleteButtonPress={handleNoteDelete}
                                containerStyles={'mr-4'} />) }
                    </ScrollView>
                </View>
                ) : (
                    <View className="flex-1">
                        <View className="mx-5 mt-5">
                            <Text className="text-whtie text-[22px] leading-[26.4px] font-cygrebold">Notes</Text>
                        </View>

                        <TouchableOpacity
                            onPress={handleQuoteDrawerOpen}
                            className="my-2.5 mx-5 h-[97px] flex-1 bg-primary items-center justify-center rounded-[11px]">
                            <MaterialIcons name="add" size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                ) }


{/*             <View className="h-[50px]"></View> */}
            </ScrollView>
    </SafeAreaView>
}





export default CreateQuote;

const Note = ({ id, text, noteTypeName, noteTypeColor, onDeleteButtonPress, noteTypeIcon, createdAt, containerStyles }) => {
    return (
        <View className={`flex-row flex-1 w-full max-w-[361px] ${containerStyles}`}>
            <View className="w-full max-h-[267px] h-full border-[.5px] rounded-[20px] p-5">
                <View className="flex-row items-center mb-4">
                    <View
                        style={{backgroundColor: noteTypeColor}}
                        className="p-2 rounded-[13px] max-h-[40px] h-full flex-row items-center justify-center mr-2.5">
                        <Text className="text-[12px] mr-0.5">{noteTypeIcon}</Text>
                        <Text className="text-sm text-[#fff] font-cygresemibold leading-[16.8px]" numberOfLines={1} ellipsizeMode="tail">{noteTypeName}</Text>
                    </View>
                    <View className="p-2 bg-[#EEEEEE] rounded-[13px] max-h-[40px] h-full">
                        <Text className="text-sm text-black font-cygresemibold leading-[16.8px]">{new Date(createdAt)
                        .toLocaleDateString('de-DE')}</Text>
                    </View>
                    <View className="flex-1 items-end">
                        <TouchableOpacity
                            onPress={() => onDeleteButtonPress(id)}
                            className="bg-black rounded-full p-2 ">
                                <MaterialIcons name="delete" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="rounded-[8px] bg-[#EEEEEE] pt-3 px-4 max-w-[327px] max-h-[148px] h-full w-full">
                    <Text className="text-black font-cygreregular leading-[19.2px] font-medium">
                        {text}
                    </Text>
                </View>
            </View>
        </View>
    );
}


const AddNoteDrawer = ({ isQuoteDrawerOpen, setIsQuoteDrawerOpen, bookId }) => {

    return (
        <BookBottomDrawer
            isBottomSheetOpen={isQuoteDrawerOpen}
            setIsBottomSheetOpen={setIsQuoteDrawerOpen}>
                <Text className="font-cygrebold text-[22px] leading-[26.4px] text-left">Add</Text>
                <TouchableOpacity
                    onPress={() => {
                        setIsQuoteDrawerOpen(false)
                        router.push({ pathname: 'select-notes', params: { id: bookId }});
                    }}
                    className="bg-black mt-7 flex-row justify-start pl-6 rounded-[15px] mb-2 max-h-[56px] items-center h-full w-full">
                    <Fontisto name="quote-a-left" size={20} color="white" />
                    <Text className="text-white pl-9 font-cygrebold text-[18px]">Existing Note</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setIsQuoteDrawerOpen(false);
                        router.push({ pathname: 'create-note', params: { id: bookId }});
                    }}
                    className="bg-black flex-row justify-start pl-6 rounded-[15px] max-h-[56px] items-center w-full h-full">
                        <Fontisto name="quote-a-right" size={20} color="white" />
                        <Text className="text-white pl-9 font-cygrebold text-[18px]">New Note</Text>
                </TouchableOpacity>
        </BookBottomDrawer>
    );
}



