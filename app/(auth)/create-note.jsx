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
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Genre from "../../components/Genre";
import { QuoteStarsIcon } from "../../components/Svg";
import BookBottomDrawer from "../../components/BottomDrawer";
import Fontisto from '@expo/vector-icons/Fontisto';
import { UserContext } from "../../context/UserContext";
import QuoteCard from "../../components/QuoteCard";
import { Alert } from 'react-native';
import axios from '../../network/axios';
import DefaultNoteType from "../../components/DefaultNoteType";
import NoteTypeDrawer from "../../components/NoteTypeDrawer";
import CreateNoteTypeDrawer from "../../components/CreateNoteTypeDrawer";





const CreateNote = () => {

    const [text, setText] = useState('');

    const inputRef = useRef(null);

    const { id } = useLocalSearchParams();

    const [selection, setSelection] = useState({ start: 0, end: 0 });

    const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

    const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);

    const [isNoteTypeDrawerOpen, setIsNoteTypeDrawerOpen] = useState(false);

    const [noteTypes, setNoteTypes] = useState([]);

    const [noteTypesSelected, setNoteTypesSelected] = useState({});

    const { note, setNote } = useContext(UserContext);

    const handleSelectionChange = (event) => {
        setSelection(event.nativeEvent.selection);
    };

    const getSelectedNoteTypeId = () => {
        return Object.keys(noteTypesSelected).find(id => noteTypesSelected[id] === true);
    }

    const getDefaultNoteType = useCallback(() => {
        const noteTypeId = parseInt(getSelectedNoteTypeId());
        return noteTypes.find(item => item.id === noteTypeId); //noteTypeId is string whereas item.id is number
    }, [noteTypes, getSelectedNoteTypeId])


    const handleQuoteDelete = () => {
        Alert.alert(
            "Delete Quote",
            "Are you sure you want to delete this quote? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "Delete", 
                    onPress: () => {
                        setNote(prev => ({...prev, quote: null}));
                    },
                    style: "destructive" // This will make it red on iOS
                }
            ]
        );
    }

    const handleSaveNote = async () => {
        try {
            await axios.post(`books/${id}/note`, {
                content: text,
                typeId: getSelectedNoteTypeId(),
                //TODO: to add collections ids, quoteId, repetition groups id
            });
            router.back();
        } catch (error) {
            console.log(error);
        }
    }

    const fetchNoteTypes = async () => {
        try {
            const { data } = await axios.get('users/note/type');
            setNoteTypes(data);

            //#[{id: bool}]
            const noteTypesSelected =
                Object.fromEntries(data.map(item => [item.id, false]));

            markFirstAsSelected(noteTypesSelected);

            setNoteTypesSelected(noteTypesSelected);

        } catch(error) {
            console.log(error);
        }
    }

    const markFirstAsSelected = (noteTypes) =>  {
        const firstKey = Object.keys(noteTypes)[0];
        if (Object.hasOwn(noteTypes, firstKey)) {
            noteTypes[firstKey] = true;
        }
    }

    useEffect(() => {
        fetchNoteTypes();
    }, [isNoteTypeDrawerOpen]);

    useEffect(() => {
        inputRef.current?.focus();

        return () => {
            setNote({
                groups: [],
                quote: null,
                text: ''
            });
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
                    <Text className="text-black font-cygrebold text-[22px] font-bold">Create Note</Text>
                </View>
                <TouchableOpacity
                    onPress={async () => await handleSaveNote()}
                    className="bg-primary rounded-[30px] flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full py-2 px-4">
                        <Text className="leading-[19.2px] text-[#fff] font-cygrebold">Save</Text>
                </TouchableOpacity>
            </View>
            <BookBottomDrawer
                isBottomSheetOpen={isQuoteDrawerOpen}
                setIsBottomSheetOpen={setIsQuoteDrawerOpen}>
                    <Text className="font-cygrebold text-[22px] leading-[26.4px] text-center">Connect Quote</Text>
                    <TouchableOpacity className="bg-black mt-7 flex-row justify-start pl-6 rounded-[15px] mb-2 max-h-[56px] items-center h-full w-full">
                        <Fontisto name="quote-a-left" size={20} color="white" />
                        <Text className="text-white pl-9 font-cygrebold text-[18px]">New</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setIsNoteTypeDrawerOpen(false);
                            router.push('quote-to-connect');
                        }}
                        className="bg-black flex-row justify-start pl-6 rounded-[15px] max-h-[56px] items-center w-full h-full">
                        <Fontisto name="quote-a-right" size={20} color="white" />
                        <Text className="text-white pl-9 font-cygrebold text-[18px]">Old</Text>
                    </TouchableOpacity>
            </BookBottomDrawer>
            <NoteTypeDrawer
                noteTypes={noteTypes}
                setNoteTypes={setNoteTypes} 
                isNoteDrawerOpen={isNoteDrawerOpen}
                setIsNoteDrawerOpen={setIsNoteDrawerOpen}
                setIsNoteTypeDrawerOpen={setIsNoteTypeDrawerOpen}
                setNoteTypesSelected={setNoteTypesSelected}
                noteTypesSelected={noteTypesSelected}
            />
            <CreateNoteTypeDrawer
                isNoteTypeDrawerOpen={isNoteTypeDrawerOpen}
                setIsNoteTypeDrawerOpen={setIsNoteTypeDrawerOpen}
            />
            <ScrollView>
                <Pressable
                    onPress={() => inputRef.current?.focus()}
                    className="mt-5 mx-5 relative h-[317px] border-[#8A8A8A] rounded-[20px] border-[.5px] py-3 px-4">
                        <View className="flex-row">
                            <DefaultNoteType
                                onPress={() => setIsNoteDrawerOpen(true)}
                                bgColor={getDefaultNoteType()?.bgColor ?? '#000'}
                                text={getDefaultNoteType()?.name ?? 'default'}
                            />
                            <View className="bg-[#E6E6E6] max-w-[95px] mt-4 max-h-[25px] w-full h-full justify-center items-center rounded-[13px]">
                                <Text className="text-sm text-white font-cygre semibold leading-[16.8px] text-center">{new Date().toLocaleDateString('de-DE')}</Text>
                            </View>
                        </View>
                    <TextInput
                        value={text}
                        placeholder="Enter your note here"
                        ref={inputRef}
                        onChangeText={(e) => setText(e)}
                        multiline
                        className="py-4 w-full max-h-[317px]"
                        onSelectionChange={handleSelectionChange}
                        selection={selection}
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

                <View className="mx-5 mt-5">
                    <Text className="text-whtie text-[22px] leading-[26.4px] font-cygrebold">Quote</Text>
                </View>

                { note.quote ? (
                    <View className="mx-5 mt-6">
                        <QuoteCard
                            text={note.quote.text}
                            book={note.quote.book}
                            showRadioButton={false}  
                            onDeleteButtonPress={handleQuoteDelete}
                        />
                    </View>
                    ) : (
                    <TouchableOpacity
                        onPress={() => setIsQuoteDrawerOpen(true)}
                        className="my-2.5 mx-5 max-h-[106px] bg-black h-full flex-row items-center rounded-[20px]">
                        <View className="mx-7">
                            <Text className="font-cygrebold leading-[19.2px] font-bold text-[#fff] max-w-[157px]">Is this note related to some quote?</Text>
                        </View>
                        <QuoteStarsIcon />
                    </TouchableOpacity>
                )}
            <View className="h-[50px]"></View>
            </ScrollView>
    </SafeAreaView>
}


export default CreateNote;



