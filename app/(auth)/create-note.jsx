import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import Genre from "../../components/Genre";
import { QuoteStarsIcon } from "../../components/Svg";
import BookBottomDrawer from "../../components/BottomDrawer";
import Fontisto from '@expo/vector-icons/Fontisto';
import FormField from '../../components/FormField';



const defaultColors = {
    black: false,
    orange: false,
    lightYellow: false,
    brightYellow: false,
    green: false,
    blue: false,
    violet: false,
    pink: false,
    turquoise: false,
    red: false,
    brown: false,
    oliveGreen: false
}


const CreateNote = () => {

    const [text, setText] = useState('');

    const inputRef = useRef(null);

    const [selection, setSelection] = useState({ start: 0, end: 0 });

    const [isFocused, setIsFocused] = useState(false);

    const [boldSelected, setBoldSelected] = useState(false);

    const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

    const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);

    const [isNoteTypeDrawerOpen, setIsNoteTypeDrawerOpen] = useState(false);

    const handleSelectionChange = (event) => {
        setSelection(event.nativeEvent.selection);
    };

    const [colors, setColors] = useState({
        black: true,
        orange: false,
        lightYellow: false,
        brightYellow: false,
        green: false,
        blue: false,
        violet: false,
        pink: false,
        turquoise: false,
        red: false,
        brown: false,
        oliveGreen: false
    });

    const FormatButton = ({ icon, onPress, label, containerStyles }) => (
        <TouchableOpacity 
            className={`bg-[#2B2B2B] rounded-[7px] p-2 ${containerStyles}`}
            onPress={onPress}
            accessibilityLabel={label}
        >
            <MaterialIcons name={icon} size={24} color="#fff" />
        </TouchableOpacity>
    );

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    const handleBoldPress = () => {

        setBoldSelected(prev => !prev);

        const { start, end } = selection;
        
        // If text is selected, wrap it in bold syntax
        if (start !== end) {

        const selectedText = text.slice(start, end);

        const newText = 
            text.slice(0, start) + 
            `**${selectedText}**` + 
            text.slice(end);
        
        setText(newText);

        } else {
            // If no text is selected, insert bold markers and place cursor between them
            const newText = 
                text.slice(0, start) + 
                '****' + 
                text.slice(end);
            
            setText(newText);
            // Move cursor between asterisks
            setSelection({ start: start + 2, end: start + 2 });
        }
    };

    return <SafeAreaView className="bg-[#F7F7F7] h-full max-h-full">
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
                    <TouchableOpacity className="bg-black flex-row justify-start pl-6 rounded-[15px] max-h-[56px] items-center w-full h-full">
                        <Fontisto name="quote-a-right" size={20} color="white" />
                        <Text className="text-white pl-9 font-cygrebold text-[18px]">Old</Text>
                    </TouchableOpacity>
            </BookBottomDrawer>
            <BookBottomDrawer
                height="55%"
                isBottomSheetOpen={isNoteDrawerOpen}
                setIsBottomSheetOpen={setIsNoteDrawerOpen}
                containerStyles={'pb-0'}
            >
                    <Text className="font-cygrebold text-[22px] mt-9 leading-[26.4px] text-center">Choose Note’s Type</Text>
                    <TouchableOpacity className="bg-[#519999] mt-7 flex-row justify-start pl-6 rounded-[15px] mb-2 max-h-[56px] items-center h-full w-full">
                        <Fontisto name="quote-a-left" size={20} color="white" />
                        <Text className="text-white pl-9 font-cygrebold text-[18px]">Thought</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#03679A] flex-row justify-start pl-6 rounded-[15px] mb-2 max-h-[56px] items-center w-full h-full">
                        <Fontisto name="quote-a-right" size={20} color="white" />
                        <Text className="text-white pl-9 font-cygrebold text-[18px]">Question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#EEB63C] flex-row justify-start pl-6 rounded-[15px] mb-2 max-h-[56px] items-center w-full h-full">
                        <Fontisto name="quote-a-right" size={20} color="white" />
                        <Text className="text-white pl-9 font-cygrebold text-[18px]">Summary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#F8846A] flex-1 flex-row justify-start mb-10 pl-6 rounded-[15px] max-h-[56px] items-center w-full h-full">
                        <Fontisto name="quote-a-right" size={20} color="white" />
                        <Text className="text-white pl-9 font-cygrebold text-[18px]">Fact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsNoteTypeDrawerOpen(true)}
                        className="bg-black mb-2 justify-center rounded-[34px] max-h-[56px] items-center w-full h-full">
                        <Text className="text-white font-cygrebold text-[18px] text-center">Add New Type</Text>
                    </TouchableOpacity>
            </BookBottomDrawer>
            <BookBottomDrawer
                height="80%"
                isBottomSheetOpen={isNoteTypeDrawerOpen}
                setIsBottomSheetOpen={setIsNoteTypeDrawerOpen}
                containerStyles={'pb-0'}
            >
                    <KeyboardAvoidingView
                        className="w-full"
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                    <Text className="font-cygrebold text-[22px] mt-9 leading-[26.4px] text-center">Create New Type</Text>

                    <View className="my-6 rounded-[20px] justify-center border-[.5px] px-9 max-h-[137px] h-full">
                        <View className="flex-row mb-6">
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, black: !colors["black"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#000] mr-5 ${colors["black"] ? 'bg-[#000]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, orange: !colors["orange"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#F8846A] mr-5 ${colors["orange"] ? 'bg-[#F8846A]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, lightYellow: !colors["lightYellow"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#FFCA57] mr-5 ${colors["lightYellow"] ? 'bg-[#FFCA57]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, brightYellow: !colors["brightYellow"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#FFF946] mr-5 ${colors["brightYellow"] ? 'bg-[#FFF946]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, green: !colors["green"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#1BBA3B] mr-5 ${colors["green"] ? 'bg-[#1BBA3B]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, blue: !colors["blue"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#4D81E0] mr-5 ${colors["blue"] ? 'bg-[#4D81E0]' : ''}`}></TouchableOpacity>
                        </View>
                        <View className="flex-row">
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, violet: !colors["violet"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#633EE9] mr-5 ${colors["violet"] ? 'bg-[#633EE9]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, pink: !colors["pink"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#F473C0] mr-5 ${colors["pink"] ? 'bg-[#F473C0]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, turquoise: !colors["turquoise"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#7AD4DE] mr-5 ${colors["turquoise"] ? 'bg-[#7AD4DE]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, red: !colors["red"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#9D1414] mr-5 ${colors["red"] ? 'bg-[#9D1414]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, brown: !colors["brown"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#6F3416] mr-5 ${colors["brown"] ? 'bg-[#6F3416]' : ''}`}></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setColors(_ => ({...defaultColors, oliveGreen: !colors["oliveGreen"]}))}
                                className={`border-[2px] rounded-[6px] w-[29px] h-[28px] border-[#65875A] mr-5 ${colors["oliveGreen"] ? 'bg-[#65875A]' : ''}`}></TouchableOpacity>
                        </View>
                    </View>
                        <FormField
                            title={'Name'}
                            placeholder={'Enter name for this type'}   
                            otherStyles={'mb-5'}
                        />
                        <FormField
                            title={'Icon'}
                            placeholder={'Enter emoji for this type'}   
                            otherStyles={'flex-1'}
                        />
                    </KeyboardAvoidingView>
                    <TouchableOpacity className="bg-black mb-4 justify-center rounded-[34px] max-h-[56px] items-center w-full h-full">
                        <Text className="text-white font-cygrebold text-[18px] text-center">Save</Text>
                    </TouchableOpacity>
            </BookBottomDrawer>
            <ScrollView>
                <Pressable
                    onPress={() => inputRef.current?.focus()}
                    className="mt-5 mx-5 relative h-[317px] border-[#8A8A8A] rounded-[20px] border-[.5px] py-3 px-4">
                        <View className="flex-row">
                            <TouchableOpacity
                                onPress={() => setIsNoteDrawerOpen(true)}
                                className="bg-[#F8846A] max-w-[95px] mt-4 mr-2 max-h-[25px] w-full h-full justify-center items-center rounded-[13px]">
                                <Text className="text-sm text-white font-cygre semibold leading-[16.8px] text-center">Fact</Text>
                            </TouchableOpacity>
                            <View className="bg-[#E6E6E6] max-w-[95px] mt-4 max-h-[25px] w-full h-full justify-center items-center rounded-[13px]">
                                <Text className="text-sm text-white font-cygre semibold leading-[16.8px] text-center">{new Date().toLocaleDateString('de-DE')}</Text>
                            </View>
                        </View>
                    <TextInput
                        value={text}
                        placeholder="Enter your note here"
                        ref={inputRef}
                        onChangeText={(e) => setText(e)}
                        onBlur={() => setIsFocused(false)}
                        onFocus={() => setIsFocused(true)}
                        multiline
                        className="py-4 w-full max-h-[317px]"
                        onSelectionChange={handleSelectionChange}
                        selection={selection}
                    />
                </Pressable>
    {/*             { isFocused && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        className="mx-5 my-5 absolute bottom-0"
                    >
                        <FormatButton 
                            icon="format-bold" 
                            onPress={handleBoldPress}
                            label="Bold"
                            containerStyles={'mr-2.5'}
                        />
                        <FormatButton 
                            icon="format-italic" 
                            label="Italic"
                            containerStyles={'mr-2.5'}
                        />
                        <FormatButton 
                            icon="format-list-bulleted" 
                            label="Bullet list"
                            containerStyles={'mr-2.5'}
                        />
                        <FormatButton 
                            icon="format-list-numbered" 
                            label="Numbered list"
                            containerStyles={'mr-2.5'}
                        />
                        <FormatButton 
                            icon="link" 
                            label="Link"
                            containerStyles={'mr-2.5'}
                        />
                        <FormatButton 
                            icon="title" 
                            label="Heading"
                            containerStyles={'mr-2.5'}
                        />
                        <FormatButton 
                            icon="format-quote" 
                            label="Quote"
                            containerStyles={'mr-2.5'}
                        />
                        <FormatButton 
                            icon="title" 
                            label="Heading"
                            containerStyles={'mr-2.5'}
                        />
                        <FormatButton 
                            icon="format-quote" 
                            label="Quote"
                            containerStyles={'mr-2.5'}
                        />
                    </ScrollView>
                ) } */}
                <View className="mt-9 mx-5 max-h-[160px]">
                    <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mb-2.5">Spaced Repetition Groups</Text>
                    <View className="flex-wrap p-5 border bg-black max-h-[126px] w-full h-full flex-row items-center rounded-[20px]">
                        <Genre name={'Memory Improvement'} showCloseBtn={false} containerStyles={'max-w-[200px]'} />
                    </View>
                </View>

                <View className="mt-5 mx-5 max-h-[160px]">
                    <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mb-2.5">Collections</Text>
                    <View className="flex-wrap p-5 border bg-black max-h-[126px] h-full flex-row items-center rounded-[20px]">
                        <Genre name={'For psychology classes'} showCloseBtn={false} containerStyles={'max-w-[200px]'} />
                    </View>
                </View>

                <View className="mx-5 mt-5">
                    <Text className="text-whtie text-[22px] leading-[26.4px] font-cygrebold">Quote</Text>
                </View>
                <Pressable
                    onPress={() => setIsQuoteDrawerOpen(true)}
                    className="my-2.5 mx-5 max-h-[106px] bg-black h-full flex-row items-center rounded-[20px]">
                    <View className="mx-7">
                        <Text className="font-cygrebold leading-[19.2px] font-bold text-[#fff] max-w-[157px]">Is this note related to some quote?</Text>
                    </View>
                    <QuoteStarsIcon />
                </Pressable>
            <View className="h-[50px]"></View>
            </ScrollView>
    </SafeAreaView>
}


export default CreateNote;