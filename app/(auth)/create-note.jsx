import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useRef, useEffect, useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Genre from "../../components/Genre";
import { QuoteStarsIcon } from "../../components/Svg";
import BookBottomDrawer from "../../components/BottomDrawer";
import Fontisto from '@expo/vector-icons/Fontisto';
import FormField from '../../components/FormField';
import { UserContext } from "../../context/UserContext";
import QuoteCard from "../../components/QuoteCard";
import { Alert } from 'react-native';
import axios from '../../network/axios';



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

            setNoteTypesSelected(noteTypesSelected);

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNoteTypes();
    }, [])

    useEffect(() => {
        inputRef.current?.focus();

        return () => {
            setNote({
                groups: [],
                quote: null,
                text: ''
            });
        }
    }, [])


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



const NoteTypeDrawer = ({ 
    noteTypes,
    isNoteDrawerOpen,
    setIsNoteDrawerOpen,
    setIsNoteTypeDrawerOpen,
    setNoteTypesSelected,
    noteTypesSelected
 }) => {


    const handleChoseNoteType = (id) => {
        //update single entry, the rest set to false
        setNoteTypesSelected((prev) => {
        const resetObj = Object.fromEntries(Object.keys(prev).map(key => [key, false]));
            return {...resetObj, [id]: !prev[id]};
        });
    }

    return (
            <BookBottomDrawer
                height="55%"
                isBottomSheetOpen={isNoteDrawerOpen}
                setIsBottomSheetOpen={setIsNoteDrawerOpen}
                containerStyles={'pb-0 flex-1'}
            >
                    <Text className="font-cygrebold text-[22px] mt-9 leading-[26.4px] text-center mb-5">Choose Note’s Type</Text>
                    <FlatList
                        className="w-full mx-4 flex-1"
                        data={noteTypes}
                        ListEmptyComponent={() => <Text className="text-[20px] font-cygrebold">No Note Types Yet</Text>}
                        renderItem={({ item }) =>
                            <NoteType
                                key={item.id}
                                name={item.name}
                                icon={item.icon}
                                bgColor={item.bgColor}
                                selected={noteTypesSelected[item.id]}
                                onPress={() => handleChoseNoteType(item.id)}
                            />}
                    />
                    <TouchableOpacity
                        onPress={() => setIsNoteTypeDrawerOpen(true)}
                        className="bg-black mb-2 justify-center rounded-[34px] max-h-[56px] items-center w-full h-full">
                        <Text className="text-white font-cygrebold text-[18px] text-center">Add New Type</Text>
                    </TouchableOpacity>
            </BookBottomDrawer>
        );
}

const NoteType = ({ name, icon, bgColor, selected, onPress }) => {
    return (
        <TouchableOpacity
                onPress={onPress}
                style={{backgroundColor: bgColor}}
                className={`mt-2 flex-row justify-start pl-6 flex-1 mb-2 rounded-[15px] h-[56px] items-center ${selected ? 'border-black border' : ''}`}>
            <Text className="text-[20px]">{icon}</Text>
            <Text className="text-white pl-9 font-cygrebold text-[18px]">{name}</Text>
        </TouchableOpacity>
    );
}

const CreateNoteTypeDrawer = ({ isNoteTypeDrawerOpen, setIsNoteTypeDrawerOpen }) => {

    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [error, setError] = useState({ icon: '' });

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

    const getColorHesh = (color) => {
        switch(color) {
            case 'black':
                return '#000';
            case 'orange':
                return '#F8846A';
            case 'lightYellow':
                return '#FFCA57';
            case 'brightYellow':
                return '#FFF946';
            case 'green':
                return '#1BBA3B';
            case 'blue':
                return '#4D81E0';
            case 'violet':
                return '#633EE9';
            case 'pink':
                return '#F473C0';
            case 'turquoise':
               return '#7AD4DE';
            case 'red':
               return '#9D1414';
            case 'brown':
                return '#6F3416';
            case 'oliveGreen':
                return '#65875A';
            default:
                return '#fff';
        }
    }

    const getColor = () => {
        return Object.keys(colors).find(key => colors[key] === true);
    }

    const handleSaveNoteType = async () => {
        console.log(getColorHesh(getColor()), name, icon)
        try {
            await axios.post('users/note/type', {
                color: getColorHesh(getColor()),
                name: name,
                icon: icon
            });
            setIsNoteTypeDrawerOpen(false);
        } catch(error) {
            console.log(error);
        }
    }

    const handleNameChange = (name) => {
        setName(name);
    }

    const handleIconChange = (iconArg) => {
        if (isLetter(iconArg.at(-1))) {
            //emoji takes up 2 letter spaces, so we should should take into account for two letter case
            setIconError('input should be an icon')
        } 
        else {
            setIconError('')
        }
        setIcon(iconArg);
    }

    const getIconError = () => {
        return error['icon']
    }

    const setIconError = (error) => {
        setError(prev => ({...prev, icon: error}));
    }

    const isLetter = (char) => {
        return /^\p{L}$/u.test(char);
    };

    const ColorButton = ({ color, borderColor, bgColor }) => (
        <TouchableOpacity
            onPress={() => setColors(() => ({...defaultColors, [color]: !colors[color]}))}
            className={`border-[2px] rounded-[6px] w-[29px] h-[28px] mr-5`}
            style={{ backgroundColor: colors[color] ? bgColor : '', borderColor: borderColor }}
        />
    );

    return (
        <BookBottomDrawer
                height="80%"
                isBottomSheetOpen={isNoteTypeDrawerOpen}
                setIsBottomSheetOpen={setIsNoteTypeDrawerOpen}
                containerStyles={'pb-0'}
            >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text className="font-cygrebold text-[22px] mt-9 leading-[26.4px] text-center">
                            Create New Type
                        </Text>

                        <View className="my-6 rounded-[20px] justify-center border-[.5px] px-9 py-4">
                            <View className="flex-row mb-6">
                                <ColorButton color="black" borderColor="#000" bgColor="#000" />
                                <ColorButton color="orange" borderColor="#F8846A" bgColor="#F8846A" />
                                <ColorButton color="lightYellow" borderColor="#FFCA57" bgColor="#FFCA57" />
                                <ColorButton color="brightYellow" borderColor="#FFF946" bgColor="#FFF946" />
                                <ColorButton color="green" borderColor="#1BBA3B" bgColor="#1BBA3B" />
                                <ColorButton color="blue" borderColor="#4D81E0" bgColor="#4D81E0" />
                            </View>
                            <View className="flex-row">
                                <ColorButton color="violet" borderColor="#633EE9" bgColor="#633EE9" />
                                <ColorButton color="pink" borderColor="#F473C0" bgColor="#F473C0" />
                                <ColorButton color="turquoise" borderColor="#7AD4DE" bgColor="#7AD4DE" />
                                <ColorButton color="red" borderColor="#9D1414" bgColor="#9D1414" />
                                <ColorButton color="brown" borderColor="#6F3416" bgColor="#6F3416" />
                                <ColorButton color="oliveGreen" borderColor="#65875A" bgColor="#65875A" />
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <FormField
                                value={name}
                                handleChangeText={handleNameChange}
                                title={'Name'}
                                placeholder={'Enter name for this type'}   
                                otherStyles={'mb-5'}
                            />
                            <FormField
                                value={icon}
                                maxLength={2}
                                handleChangeText={handleIconChange}
                                title={'Icon'}
                                placeholder={'Enter emoji for this type'}   
                                otherStyles={'mb-5'}
                                error={getIconError()}
                                errorText={getIconError()}
                            />
                        </View>
                    </View>
                </ScrollView>

                <View style={{ padding: 16 }}>
                    <TouchableOpacity
                        onPress={handleSaveNoteType} 
                        className="bg-black justify-center rounded-[34px] h-[56px] items-center w-full"
                    >
                        <Text className="text-white font-cygrebold text-[18px] text-center">
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </BookBottomDrawer>
    );
}