import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import Genre from "../../components/Genre";
import { QuoteStarsIcon } from "../../components/Svg";



const CreateNote = () => {

    const [text, setText] = useState('');

    const inputRef = useRef(null);

    const [selection, setSelection] = useState({ start: 0, end: 0 });

    const [isFocused, setIsFocused] = useState(false);

    const [boldSelected, setBoldSelected] = useState(false);

    const handleSelectionChange = (event) => {
        setSelection(event.nativeEvent.selection);
    };

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

    console.log(isFocused)

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
                    className="bg-primary rounded-[30px] flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full py-2 px-4">
                        <Text className="leading-[19.2px] text-[#fff] font-cygrebold">Save</Text>
                </TouchableOpacity>
            </View>

        <ScrollView contentInsetAdjustmentBehavior="automatic" className="h-full">
            <Pressable
                onPress={() => inputRef.current?.focus()}
                className="mt-5 mx-5 relative max-h-[317px] h-full border-[#8A8A8A] rounded-[20px] border-[.5px] py-3 px-4">
                    <View className="flex-row">
                        <View className="bg-[#F8846A] max-w-[95px] mt-4 mr-2 max-h-[25px] w-full h-full justify-center items-center rounded-[13px]">
                            <Text className="text-sm text-white font-cygre semibold leading-[16.8px] text-center">Fact</Text>
                        </View>
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
    {/*         { isFocused && (
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
            <View className="mt-9 mx-5 max-h-[160px] h-full">
                <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mb-2.5">Spaced Repetition Groups</Text>
                <View className="flex-wrap p-5 border bg-black max-h-[126px] w-full h-full flex-row items-center rounded-[20px]">
                    <Genre name={'Memory Improvement'} showCloseBtn={false} containerStyles={'max-w-[200px]'} />
                </View>
            </View>

            <View className="mt-5 mx-5 max-h-[160px] h-full">
                <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mb-2.5">Collections</Text>
                <View className="flex-wrap p-5 border bg-black max-h-[126px] h-full flex-row items-center rounded-[20px]">
                    <Genre name={'Nonfiction'} showCloseBtn={false} />
                    <Genre name={'Self Help'} showCloseBtn={false} />
                    <Genre name={'Psychology'} showCloseBtn={false} />
                </View>
            </View>

            <View className="mt-5 mx-5 bg-black max-h-[160px] h-full flex-row items-center rounded-[20px]">
                <View className="mx-7">
                    <Text className="font-cygrebold leading-[19.2px] font-bold text-[#fff] max-w-[157px]">Add quotes you liked from this book</Text>
                </View>
                <QuoteStarsIcon />
            </View>
        </ScrollView>
    </SafeAreaView>
}


export default CreateNote;