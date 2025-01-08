import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from "react-native";

import { useContext, useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { CollectionsIcon } from "../../components/Svg";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import axios from "../../network/axios";
import { UserContext } from "../../context/UserContext";
import { images } from "../../constants";
import Genre from "../../components/Genre";
import StatusBtn from "../../components/StatusBtn";
import FormField from "../../components/FormField";
import ImageHandler from "../../components/ImageHandler";


const statusMap = {
    'toRead': 0,
    'reading': 1,
    'finished': 2,
    'gaveUp': 3,
    'paused': 4
};

const bookStatusToInt = (status) => {

  // Return the integer value or -1 if status is not found
  return statusMap[status] ?? 0;
};

const defaultBook = {
    id: '',
    volumeInfo: {
        title: '',
        authors: [],
        description: '',
        pageCount: 0,
        categories: [],
        status: "",
        imageLinks: {
            thumbnail: ''
        }
    },
    collections: []
}
const defaultStatuses = {
    toRead: false,
    reading: false,
    finished: false,
    gaveUp: false,
    paused: false
}

const AddBook = () => {

    const { id } = useLocalSearchParams();

    console.log(id)

    const navigator = useNavigation();

    const [status, setStatus] = useState({
        toRead: true,
        reading: false,
        finished: false,
        gaveUp: false,
        paused: false
    });
    
    const [errors, setErrors] = useState({
        author: false,
        title: false,
    });

    const { genres, book, setBook, setGenres } = useContext(UserContext);

    const { collections } = book;

    const getGenres = () => {
        return Object.keys(genres).filter(genre => genres[genre]);
    }

    const getStatus = () => {
        const statuses = Object.keys(status).filter(s => status[s] === true);
        return statuses[0];
    }

    const getCollections = () => {
        return collections?.map(item => item.id);
    }

    const fetchBook = async () => {
        try {
            console.log('fire')
            const { data } = await axios.get(`/book/${id}`);
            setBook(data)
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id && book.id === '') {
            fetchBook();
        }

        //clear all book states
        return () => {
            setStatus(defaultStatuses);
            setGenres({})
            setBook(defaultBook);
        }
    }, [id]);


    const addBook = async () => {

        const { title, authors, description, pageCount, categories, imageLinks } = book.volumeInfo;


        if (!title) {
            setErrors(prev => ({...prev, title: true}))
        }
        if (!authors) {
            setErrors(prev => ({...prev, author: true}))
        }

        if (!title || !authors) return;

        try {
            const body = {
                title,
                authors,
                description,
                totalPages: pageCount,
                categories: categories, //add getGenres() from a separate screen
                status: bookStatusToInt(getStatus()), // have to handle adding a new status 
                imageUrl: imageLinks?.thumbnail,
                collectionIds: getCollections()
            }
            const { data } =  await axios.post('/book', body);
            navigator.replace('saved-book', { id:data.id })
            console.log("success")
        } catch(error) {
            console.log(error);
            //send an error code to check for specific errors
            Alert.alert(
                "Oooops...",
                "Looks like you already have that book in the library :)",
                [
                    {
                        text: "Okay!",
                        style: "cancel"
                    }
                ]
            );
        }
    }

    const handleDescriptionUpdate = (text) => {
        setBook(prev => ({...prev, volumeInfo: {
            ...prev.volumeInfo,
            description: text
        } }));
    }

    const handleAuthorUpdate = (text) => {
        setBook(prev => ({...prev, volumeInfo: {
            ...prev.volumeInfo,
            authors: [text]
        } }));
    }

    const handleTitleUpdate = (text) => {
        setBook(prev => ({...prev, volumeInfo: {
            ...prev.volumeInfo,
            title: text
        } }));
    }

    const handleGenresRemove = (name) => {
        setBook(prev => ({...prev, volumeInfo: {
            ...prev.volumeInfo,
            categories: prev.volumeInfo.categories.filter(item => item !== name)
        }}));
    }

    const handleCollectionsRemove = (id) => {
        setBook(prev => ({...prev, 
            collections: prev.collections.filter(item => item.id !== id)
        }));
    }


    return <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5">
            <TouchableOpacity
                className="flex-1" onPress={() => router.back()}>
                <Image source={require('../../assets/images/left_arrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={async () => await addBook()}//async () => await addBook()}
                className="bg-primary flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
            </TouchableOpacity>
        </View>
        <ScrollView className="px-5 mt-5" contentInsetAdjustmentBehavior="automatic">
            <Text className="text-black mt-6 text-[24px] font-cygrebold leading-[28.8px] font-bold">Add Book</Text>
{/*             <Image
                source={{ uri: book.volumeInfo?.imageLinks?.thumbnail }}
                width={134}
                height={191}
                className="self-center mt-6 rounded-[6px]"
                resizeMode="contain" 
            /> */}
            <ImageHandler
                source={book.volumeInfo?.imageLinks?.thumbnail}
                width={134}
                height={191}
                className="self-center mt-6 rounded-[6px]"
                resizeMode="contain" 
            />
            <View className="mb-3">
                <FormField
                    title={"Title"}
                    placeholder={"Enter Title"} 
                    textInputContainerStyles={'border-[.5px] max-h-[45px]'}
                    textInputStyles={'bg-[#ffffff] font-cygreregular justify-center items-center flex-1 text-[#000000] leading-[16.8px] text-sm'}
                    handleChangeText={handleTitleUpdate}
                    value={book.volumeInfo.title}
                    error={errors.title}
                    errorText={"Title cannot be empty"}
                />
            </View>
            <View className="mb-6">
                <FormField
                    title={"Author"}
                    placeholder={"Enter Author"} 
                    textInputContainerStyles={'border-[.5px] max-h-[45px]'}
                    textInputStyles={'bg-[#ffffff] font-cygreregular justify-center items-center flex-1 text-[#000000] leading-[16.8px] text-sm'}
                    handleChangeText={handleAuthorUpdate}
                    value={book.volumeInfo.authors?.join(',')}
                    error={errors.author}
                    errorText={"Author cannot be empty"}
                />
            </View>
            <View className="max-h-[180px]">
                <Text className="text-black mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Description</Text>
                <View className="bg-[#ffffff] mb-9 border-[.5px] border-[#8A8A8A] items-center max-h-[145px] h-full flex-row justify-between w-full rounded-[15px] px-5">
                    <TextInput
                        textAlignVertical="top"
                        multiline={true}
                        className="bg-[#ffffff] pt-4 h-full font-cygreregular justify-center items-center flex-1 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Description"
                        value={book.volumeInfo?.description}
                        onChangeText={handleDescriptionUpdate}
                    />
                </View>
            </View>
            <View className="mt-6 flex-1">
                <Text className="text-black mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Page Count</Text>
                <View className="bg-[#ffffff] mb-9 border-[.5px] border-[#8A8A8A] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[15px] px-5">
                    <TextInput
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Page Count"
                        value={book.volumeInfo?.pageCount?.toString() === "0" ? "" : book.volumeInfo?.pageCount?.toString()}
                    />
                </View>
            </View>
            <View className="mt-6">
                <Text className="text-black mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Status</Text>

                <View className="flex-row">
                    <StatusBtn text={'To Read'}
                        selected={status['toRead']}
                        containerStyles={'mr-2.5'}
                        onPress={() => setStatus(_ => ({defaultStatuses, toRead: true}))}
                    />
                    <StatusBtn
                        selected={status['reading']}
                        text={'Reading'}
                        containerStyles={'mr-2.5'} 
                        onPress={() => setStatus(_ => ({defaultStatuses, reading: true}))}
                    />
                    <StatusBtn
                        selected={status['finished']}
                        text={'Finished'} 
                        onPress={() => setStatus(_ => ({defaultStatuses, finished: true}))}
                    />
                </View>
                <View className="flex-row justify-center">
                    <StatusBtn
                        selected={status['gaveUp']}
                        text={'Gave Up'}
                        containerStyles={'mr-2.5 mt-3'} 
                        onPress={() => setStatus(_ => ({defaultStatuses, gaveUp: true}))}
                    />
                    <StatusBtn
                        selected={status['paused']}
                        text={'Paused'}
                        containerStyles={'mt-3'} 
                        onPress={() => setStatus(_ => ({defaultStatuses, paused: true}))}
                    />
                </View>
            </View>

            <View className="my-6 flex-1">
                <Text className="text-black mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Genres</Text>
                <View className="p-4 min-h-[116px] flex-row justify-between rounded-[20px] bg-black">
                    <View className="flex-wrap flex-row flex-1 items-start">
                        { book.volumeInfo.categories.map(item =>
                             <Genre
                                key={item}
                                name={item}
                                showCloseBtn={true}
                                handleRemove={handleGenresRemove}
                            />) }
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/select-genres')}
                        className="items-center flex-1 self-center bg-[#fff] max-w-[61px] max-h-[62px] rounded-full justify-center p-4">
                        <MaterialIcons name="add" size={30} />
                    </TouchableOpacity>
                </View>
            </View>


            <View className="my-6 flex-1">
                <Text className="text-black mb-2.5 text-[18px] font-cygrebold leading-[21.6px]">Collections</Text>
                { collections ? (
                    <View className="min-h-[116px] p-4 flex-row justify-between rounded-[20px] bg-black">
                        <View className="flex-wrap flex-row flex-1 items-start">
                            { collections.map(item =>
                                <Collection
                                    id={item.id}
                                    key={item.id}
                                    name={item.name}
                                    showCloseBtn={true}
                                    containerStyles={'max-w-full'} 
                                    handleRemove={handleCollectionsRemove}
                                />) }
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push('select-collections')}
                            className="items-center flex-1 self-center bg-[#fff] max-w-[61px] max-h-[62px] rounded-full justify-center p-4">
                            <MaterialIcons name="add" size={30} />
                        </TouchableOpacity>
                    </View>
                ) : (
                <TouchableOpacity
                    onPress={() => router.push('select-collections')}
                    className="max-h-[116px] overflow-hidden h-full pl-8 pr-4 flex-row justify-between rounded-[20px] bg-black">
                    <Text className="text-[#ffffff] max-w-[136px] font-cygrebold self-center text-sm leading-[16.8px] font-bold">Add book to your personal collections</Text>
                    <View className="self-start h-full -mt-3">
                        <CollectionsIcon />
                    </View>
                </TouchableOpacity>
                ) }
            </View>
            <View className="h-4"></View>
        </ScrollView>
    </SafeAreaView>
}

const Collection = ({ id, name, showCloseBtn, handleRemove, containerStyles }) => {

    return <View className={`py-2 px-1 mr-2 mb-2 max-w-[116px] bg-primary flex-row items-center justify-between rounded-[5px] ${containerStyles}`}>
        <Text className="text-[#FFFFFF] font-cygrebold leading-[16.8px] text-sm px-1" numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
        { showCloseBtn ? (
            <TouchableOpacity
                onPress={() => handleRemove(id)}
                className="rounded-full bg-[#fff] items-center ml-1 mr-2.5 justify-center w-[16px] h-[16px]">
                <MaterialIcons name='close' color={'#6592E3'} size={8} />
            </TouchableOpacity>
        ) : <></> }
    </View>
}

export default AddBook;