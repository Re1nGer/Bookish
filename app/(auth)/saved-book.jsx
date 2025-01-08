import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import BookStatusPicker from "../../components/ReadStatusDropdown";
import SliderCounter from "../../components/SliderCounter";
import { useState, useEffect, useRef, useCallback } from "react";
import SwipeableWrapper from "../../components/SwipeableWrapper";
import CircularProgress from "../../components/CircleProgress";
import { QuoteStarsIcon } from "../../components/Svg";
import Genre from "../../components/Genre";
import { TimerIcon, NoteIcon, QuoteIcon } from "../../components/Svg";
import axios from '../../network/axios';
import ImageHandler from "../../components/ImageHandler";


//TODO: extract out into utils
const statusOptions = {
    'To Read': 0,
    'Reading': 1,
    'Finished': 2,
    'Gave Up': 3,
    'Paused': 4,
}

const statuses = [
    'To Read',
    'Reading',
    'Finished',
    'Gave Up',
    'Paused'
]

const statusName = {
    0: 'To Read',
    1: 'Reading',
    2: 'Finished',
    3: 'Gave Up',
    4: 'Paused',
}


const bookStatusToName = (status) => {
    return statusName[status]
}

const SavedBook = () => {


    const { id } = useLocalSearchParams();

    // get rid of updates with context
    //const { book } = useContext(UserContext);

    const [book, setBook] = useState({
        id: '',
        title: '',
        author: '',
        description: '',
        pageCount: 0,
        startedAt: null,
        finishedAt: null,
        currentPage,
        categories: [],
        imageUrl: '',
        status: 0,
        collections: [],
        notes: []
    })

    const {
        title,
        author,
        description,
        pageCount,
        categories,
        imageUrl,
        collections,
        startedAt,
        finishedAt,
        notes
    } = book;

    const [currentPage, setCurrentPage] = useState(book.currentPage);
    const [selectedStatus, setSelectedStatus] = useState(bookStatusToName(book.status));

    const fetchBook = useCallback(async () => {
        try {
            const { data } = await axios.get(`/users/book/${id}`);
            setBook(data)
            setCurrentPage(data.currentPage);
            setSelectedStatus(bookStatusToName(data.status))
        }
        catch(error) {
            console.log(error);
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchBook()
        }, [fetchBook])
    );


    //console.log(book)

    const getBookImage = () => {
       return imageUrl ? { uri:imageUrl } : images.bookPlaceholder  
    }

    const handleNoteRedirect = () => {
        router.push({ pathname: 'create-note', params: { id } }) //id of book to associate notes with
    }

    const handleQuoteRedirect = () => {
        router.push({ pathname: 'create-quote', params: { id } }) //id of book to associate quotes with
    }

    const updateStatus = async (status) => {
        try {
            await axios.put(`/users/book/${id}/status?statusId=${statusOptions[status]}`);
            setBook(prev => ({...prev, status: statusOptions[status]}))
            //redirect to you-finished-book screen if status is finished 
            if (status === 'Finished') {
                router.push({ pathname: 'you-finished-book', params: { imageUrl }});
            }
        } 
        catch (error) {
            console.log(error);
        }
    }

    //console.log(book)

    return <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
            <TouchableOpacity
                className="flex-1"
                onPress={() => router.back()}>
                <Image source={require('../../assets/images/left_arrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push({pathname:'edit-book', params: { id }})}
                className="bg-primary flex-1 mt-2.5 mr-2.5 max-w-[44px] w-full items-center justify-center max-h-[44px] h-full rounded-[10px]">
                    <MaterialIcons name="edit-note" size={27} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-primary flex-1 mt-2.5 max-w-[44px] w-full items-center justify-center max-h-[44px] h-full rounded-[10px]">
                    <Entypo name="dots-three-vertical" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
        <ScrollView>

            <View className="mx-5 border-[#8A8A8A] flex-row p-4 border-[.5px] rounded-[20px] max-w-[353px]">
                <ImageHandler source={getBookImage()} width={114} height={163} className="max-h-[163px] max-w-[114px] mr-5" />
{/*                 <Image source={getBookImage()} width={114} height={163} className="max-h-[163px] max-w-[114px] mr-5" /> */}
                <View className="relative">
                    <Text className="text-black text-[18px] mb-0.5 leading-[21.6px] font-cygrebold max-w-[150px]"
                        numberOfLines={1}
                        ellipsizeMode='tail'>
                            {title}
                    </Text>
                    <Text
                        className="text-black text-[12px] leading-[14.4px] font-cygreregular mb-5 max-w-[150px]"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {author}
                    </Text>
                    <BookStatusPicker
                        setSelectedStatus={setSelectedStatus}
                        selectedStatus={selectedStatus}
                        onSelect={updateStatus}
                        statusOptions={statuses}
                    />
                    <View className="flex-row justify-evenly space-x-1 mt-3">
                        <TouchableOpacity className="p-3 rounded-full bg-primary">
                            <TimerIcon />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleNoteRedirect}
                            className="p-3 rounded-full bg-primary">
                            <NoteIcon />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleQuoteRedirect}
                            className="p-3 rounded-full bg-primary">
                            <QuoteIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mx-5 mt-8 mb-5">Reading Progress</Text>
            <SwipeableWrapper showDots={true}>
                <TotalPages
                    bookId={id}
                    startedAt={startedAt}
                    totalPages={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} 
                />
                <TotalProgress
                    totalPages={pageCount}
                    currentPage={currentPage} 
                />
                <RecentSession />
            </SwipeableWrapper>

{/*             Flat list doesn't really fit in, opted in for scroll view; gotta test performance for bigger amount of notes */}

        { notes?.length > 0 && (
            <View className="flex-1">
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
                                onPress={() => router.push({pathname: 'create-note', params: { id }})}
                                className="w-[97px] bg-primary items-center justify-center max-h-[97px] h-full rounded-[20px] mr-3">
                                <Text className="text-white text-[50px] pb-3">+</Text>
                            </TouchableOpacity>
                        </View>
                        { notes.map(item =>
                            <Note key={item.id}
                            {...item}
                            containerStyles={'mr-4'} />) }
                </ScrollView>
            </View>
            ) }

            <View className="mx-5 mb-3 mt-8 flex-row justify-between">
                <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold">Quotes</Text>
                <TouchableOpacity>
                    <Text className="text-primary underline font-cygrebold leading-[19.2px]">Show more</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleQuoteRedirect}
                className="mx-5 bg-black max-h-[106px] h-full flex-row items-center rounded-[20px]">
                <View
                    className="mx-7">
                    <Text className="font-cygrebold leading-[19.2px] font-bold text-[#fff] max-w-[157px]">Add quotes you liked from this book</Text>
                </View>
                <QuoteStarsIcon />
            </TouchableOpacity>

            <View className="mt-10 mb-5 mx-5">
                <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mb-2.5">Description</Text>
                <View className="border-[#8A8A8A] border-[.5px] rounded-[20px] ">
                    <Text className="font-cygreregular leading-[19.2px] text-black px-5 py-4">
                        { description }
                    </Text>
                </View>
            </View>
            
            { categories.length > 0 ?(
                <View className="my-5 mx-5 max-h-[160px]">
                    <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mb-2.5">Genres</Text>
                    <View className="flex-wrap p-5 border bg-black max-h-[126px] h-full flex-row items-center rounded-[20px]">
                    { categories?.slice(0, 4)?.map(item =>
                         <Genre key={item.id} name={item.name} showCloseBtn={false} />) }
                    </View>
                </View>
            ) : <></> }

            { collections.length > 0 ? (
                <View className="mt-5 mb-3 mx-5 max-h-[160px]">
                    <Text className="text-black text-[22px] leading-[26.4px] font-cygrebold mb-2">Collections</Text>
                    <View className="flex-wrap p-5 border bg-black max-h-[126px] w-full h-full flex-row items-center rounded-[20px]">
    {/*                     <Genre name={'For psychology classes'} containerStyles={'max-w-[200px] w-full'} showCloseBtn={false} /> */}
                        { collections?.slice(0, 4)?.map(item =>
                            <Genre key={item.id} name={item.name} showCloseBtn={false} />) }
                    </View>
                </View>
            ) : <></> }
            <View className="h-8"></View>
        </ScrollView>
    </SafeAreaView>
}


const Note = ({ content, typeName, color, icon, createdAt, containerStyles }) => {
    return (
        <View className={`flex-row flex-1 w-full max-w-[361px] ${containerStyles}`}>
            <View className="w-full max-h-[267px] h-full border-[.5px] rounded-[20px] p-5">
                <View className="flex-row items-center mb-4">
                    <View
                        style={{backgroundColor: color}}
                        className="p-2 rounded-[13px] max-h-[40px] h-full flex-row items-center justify-center mr-2.5">
                        <Text className="text-[12px] mr-0.5">{icon}</Text>
                        <Text className="text-sm text-[#fff] font-cygresemibold leading-[16.8px]" numberOfLines={1} ellipsizeMode="tail">{typeName}</Text>
                    </View>
                    <View className="p-2 bg-[#EEEEEE] rounded-[13px] max-h-[40px] h-full">
                        <Text className="text-sm text-black font-cygresemibold leading-[16.8px]">{new Date(createdAt)?.toLocaleDateString('de-DE') ?? '30.09.2024'}</Text>
                    </View>
                </View>
                <View className="rounded-[8px] bg-[#EEEEEE] pt-3 px-4 max-w-[327px] max-h-[148px] h-full w-full">
                    <Text className="text-black font-cygreregular leading-[19.2px] font-medium">
                        {content}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const TotalProgress = ({ totalPages, currentPage }) => {

    const percentLeft = Math.round(currentPage / totalPages * 100);

    return (
        <View className="max-h-[267px] w-full items-center">
            <View className="px-6 py-5 max-w-[353px] h-[95%] bg-black rounded-[20px] w-full items-center">
                <CircularProgress size={125} progress={currentPage / totalPages * 100} />
                <Text className="text-[#fff] text-center text-[16px] mt-3 font-cygreregular max-w-[165px]">
                    {`${totalPages - currentPage} pages left or ${percentLeft}% left to finish`}
                </Text>
            </View>
        </View>
    )
}


const RecentSession = () => {

    return (
        <View className="max-h-[267px] w-full items-center">
            <View className="px-6 py-5 h-[95%] max-w-[353px] bg-black rounded-[20px] w-full items-center">
                <Text className="text-[20px] text-[#fff] font-cygrebold leading-[24px] mb-1">No Recent Sessions</Text>
                <Text className="text-[12px] text-[#fff] font-cygreregular leading-[14.4px] mb-5">Click to start reading session</Text>
                <Image source={images.noSession} width={135} height={96} className="max-w-[135px] max-h-[96px] h-full" />
            </View>
        </View>
    );

}

const TotalPages = ({ currentPage, setCurrentPage, totalPages, bookId, startedAt }) => {

    const timeoutRef = useRef(null);

    const handleReduceCounter = () => {
        const page = currentPage > 0 ? currentPage - 1 : 0;
        updatePageCount(page)
            .then(() => setCurrentPage(prev => prev > 0 ? prev - 1 : 0))
    }

    const handleAddCounter = () => {
        const page = currentPage < totalPages ? currentPage + 1 : currentPage;
        updatePageCount(page)
            .then(() => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev))
    }

    const updatePageCount = async (page) => {
        try {
            await axios.put(`users/books/${bookId}/currentPage`, { page })
        } catch (error) {
            console.log(error);
        }
    }

    const updateSliderCounter = (value) => {
        setCurrentPage(value);
        
        // Clear any pending timeouts
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        // Set new timeout
        //TODO: extract out into useDebounce hook
        timeoutRef.current = setTimeout(() => {
            updatePageCount(value)
                .then(() => {
                // Only update if the value hasn't changed during the delay
                setCurrentPage(value);
                });
        }, 900);
    }

    useEffect(() => {
        return () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    }, []);

    //console.log(startedAt)

    return (
        <View className="max-h-[267px] w-full items-center">
            <View className="px-6 py-5 h-[95%] max-w-[353px] bg-black rounded-[20px] w-full">
                <View className="flex-row justify-between">
                    <TouchableOpacity
                        onPress={handleReduceCounter}
                        className="rounded-full bg-[#8A8A8A] items-center justify-center h-[71px] w-[67px]">
                        <Text className="text-[#FFFFFF] text-[31px] font-semibold leading-[37.5px]">-</Text>
                    </TouchableOpacity>
                    <View>
                        <Text className="text-[#fff] text-center text-[60px] font-cygrebold leading-[72px]">{currentPage}</Text>
                        <Text className="text-[#fff] text-center text-[16px] font-cygrebold">{`of ${totalPages} pages`}</Text>
                        <Text className="text-[#fff] text-center text-[12px] font-cygreregular">{`${totalPages - currentPage} pages left`}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleAddCounter}
                        className="rounded-full bg-primary items-center justify-center h-[71px] w-[67px]">
                        <Text className="text-[#FFFFFF] text-[31px] font-semibold leading-[37.5px]">+</Text>
                    </TouchableOpacity>
                </View>
                <SliderCounter
                    minimumVal={1}
                    showCounter={false}
                    value={currentPage}
                    setValue={updateSliderCounter} 
                    textColor={'text-[#fff]'}
                    maxValue={totalPages}
                />
                { startedAt && (
                    <View className="items-center mr-3 flex-row justify-center">
                        <Text className="text-[#FFFFFF] font-cygrebold leading-[19.2px] mr-2.5">Started At</Text>
                        <View className="rounded-[20px] bg-primary px-3 py-1">
                            <Text className="font-cygrebold text-[12px] leading-[14.4px] font-bold text-[#fff]">{new Date(startedAt).toLocaleDateString('de-DE')}</Text>
                        </View>
                    </View>
                ) }
            </View>
        </View>
    );
}


export default SavedBook;