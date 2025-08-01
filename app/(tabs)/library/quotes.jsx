import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    RefreshControl,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import axios from '../../../network/axios';
import BookPageDropdown from "../../../components/BookPageDropdown";
import Feather from '@expo/vector-icons/Feather';
import ImageHandler from "../../../components/ImageHandler";
import { COLLECTION_ICON_MAP } from "../../../components/CollectionSvg";


const Quotes = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [selectedOption, setSelectedOption] = useState('Quotes');

    const [bookNotes, setBookNotes] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false)
        //TODO:refactor
        switch (option) {
            case "Notes":
                router.push('/library/notes');
                break;
            case "Quotes":
                router.push('/library/quotes')
                break;
            case "Books":
                router.push('/library')
                break;
            default:
                return

        }
    }

    const [isFilteredByBooks, setIsFilteredByBooks] = useState(true);

    const handleToggleFilterByCollections = () => {
        setIsFilteredByBooks(false);
    }

    const handleToggleFilterByBooks = () => {
        setIsFilteredByBooks(true);
    }

    const renderGifLoader = () => {
        if (isLoading) {
            return (
                <View className="items-center justify-center">
                <Image
                    source={require('../../../assets/gifs/book-loader.gif')}
                    width={150}
                    height={150}
                    className="max-h-[150px] max-w-[150px]"
                />
                <Text className="text-black text-[24px] leading-[28.8px] font-cygreregular">Wait a bit...</Text>
                </View>
            );
        }
        return null;
  };

    const fetchBookNotes = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('users/books/quotes');
            setBookNotes(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchBookNotes()
        }, [fetchBookNotes])
    );

    return <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
            <TouchableOpacity
                activeOpacity={0.7}
                className="flex-1 pt-3 flex-row"
            >
            <BookPageDropdown
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleSelect={handleSelect} 
                selectedOption={selectedOption}
            />
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-primary relative flex-1 mt-2.5 max-w-[44px] w-full items-center justify-center max-h-[44px] h-full rounded-[10px]">
                    <MaterialIcons name="filter-list" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <View className="flex-row mx-5">
            <TouchableOpacity
                onPress={handleToggleFilterByBooks}
                className={`rounded-l-[100px] border-[.5] flex-row py-2 flex-1 ${isFilteredByBooks ? 'bg-black' : 'bg-[#fff]'} items-center justify-center`}>
                { isFilteredByBooks && (
                    <Feather name="check" size={16} color="white" />
                )}
                <Text className={`${isFilteredByBooks ? 'text-[#fff]' : 'text-black'} text-sm text-center ml-2`}>By Books</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleToggleFilterByCollections}
                className={`rounded-r-[100px] flex-row border-[.5] py-2 flex-1 ${isFilteredByBooks ? 'bg-[#fff]' : 'bg-black'} items-center justify-center`}>
                { !isFilteredByBooks && (
                    <Feather name="check" size={16} color="white" />
                )}
                <Text className={`${isFilteredByBooks ? 'text-black' : 'text-[#fff]'} text-sm text-center ml-2`}>By Collections</Text>
            </TouchableOpacity>
        </View>
        { isFilteredByBooks ? (
            <FlatList
                className="mx-5 mt-7"
                data={bookNotes}
                ListEmptyComponent={renderGifLoader()}
                renderItem={({ item }) => <QuoteCard
                    key={item.id}
                    onPress={() => router.push({pathname: 'book-quotes', params: { name: item.bookName, bookId: item.id }})}
                    name={item.bookName}
                    author={item.author}
                    quotesCount={item.quotesCount}   
                    imageUrl={item.imageUrl}
                    containerStyles={'mb-4'}
                />}
            />
        ) : <NoteCollections /> }
    </SafeAreaView>
}

const QuoteCard = ({ name, author, quotesCount, imageUrl, onPress, containerStyles }) => {
    return <TouchableOpacity
        onPress={onPress}
        className={`max-w-[353px] h-[172px] w-full flex-row border border-[#727272] px-3 py-3 rounded-[15px] ${containerStyles}`}>
        <ImageHandler
            source={imageUrl ? imageUrl : images.book}
            className="max-w-[99px] max-h-[141px] w-full h-full mr-4"
            width={99}
            height={141}
        />
        <View className="w-full flex-1">
            <Text className="text-black text-[18px] font-cygrebold leading-[21.6px] max-w-[200px]" numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
            <Text className="text-black text-sm font-cygreregular leading-[16.8px] max-w-[210px]">{author}</Text>
            <View className="self-end items-end justify-end flex-1">
                <View className="bg-[#D5E3FC] w-[63px] h-[63px] items-center justify-center rounded-full">
                    <Text className="text-black text-[22px] leading-[26.4px]">{quotesCount}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
}

export default Quotes;

function splitArray(arr) {
    const midpoint = Math.ceil(arr.length / 2);
    const firstHalf = arr.slice(0, midpoint);
    const secondHalf = arr.slice(midpoint);
    return [firstHalf, secondHalf];
}

const NoteCollections = () => {

    const [firstHalfCollections, setFirstHalfCollections] = useState([]);

    const [secondHalfCollections, setSecondtHalfCollections] = useState([]);

    const fetchCollections = useCallback(async () => {
        try {
            const { data } = await axios.get('users/quote-collections');
            //console.log(data)
            const [first, second] = splitArray(data);
            //we need collections variable in case there are already selected collections
            setFirstHalfCollections(first);
            setSecondtHalfCollections(second);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchCollections()
        }, [fetchCollections])
    );

    return (
        <ScrollView className="m-5" showsVerticalScrollIndicator={false}>
            <View className="flex-row justify-between space-x-3 w-full">
                <View className="w-full flex-[.5]">
                    <NewCollection />
                    { secondHalfCollections
                        .map(item => 
                            <ExistingCollection
                                key={item.id}
                                name={item.name}
                                onSelected={() => router.push({pathname:
                                     'book-quotes', params: { name: item.name, bookId: item.bookId, collectionId: item.id, byCollection: true }})}
                                selected={item.selected}
                                notesCount={item.notesCount}
                                iconId={item.iconId}
                            />)
                    }
                </View>
                <View className="w-full flex-[.5]">
                    { firstHalfCollections
                        .map(item =>
                            <ExistingCollection
                                key={item.id}
                                onSelected={() => router.push({pathname:
                                     'book-quotes', params: { name: item.name,
                                        bookId: item.bookId, collectionId: item.id, byCollection: true }})}
                                name={item.name} 
                                selected={item.selected}
                                notesCount={item.notesCount}
                                iconId={item.iconId}
                        />) }
                </View>
            </View>
            <View className="h-20"></View>
        </ScrollView>
    );
}


const NewCollection = ({ containerStyles }) => {

    return <View className={`bg-black rounded-[20px] mb-4 justify-between p-4 max-w-[169px] flex-1 max-h-[174px] ${containerStyles}`}>
        <Text className="font-cygrebold mb-7 text-[22px] leading-[26.4px] font-bold text-[#ffffff]" numberOfLines={2} ellipsizeMode="tail">New Collection</Text>
        <TouchableOpacity
            onPress={() => router.push({pathname: '/create-quote-collection', params: { fromSelect: true }})}
            className="items-center self-end bg-[#fff] max-w-[61px] max-h-[62px] rounded-full justify-center p-4">
            <MaterialIcons name="add" size={30} />
        </TouchableOpacity>
    </View>
}

const ExistingCollection = ({ name, iconId, notesCount, onSelected, containerStyles }) => {

    const IconElement = COLLECTION_ICON_MAP[iconId];

    return (
        <TouchableOpacity
            onPress={onSelected}
            className={`bg-[#D5E3FC] relative mb-4 overflow-hidden border-[#8A8A8A] border-[.5px] rounded-[20px] justify-between p-4 h-[174px] ${containerStyles}`}>
            <Text
                className={`font-cygrebold mb-3 text-[22px] leading-[26.4px] font-bold text-[#121F16]`}
                numberOfLines={2} ellipsizeMode="tail">{name}</Text>
                { notesCount > 0 ? (
                    <View className="bg-[#EEEEEE] self-start rounded-[21px] px-2.5 py-1">
                        <Text className="text-black text-sm font-medium">{`${notesCount} books`}</Text>
                    </View>
                ) : <View className="px-2.5 py-1"></View> }
            <View
                className="items-center  self-end max-w-[61px] bottom-0 relative -right-1 -z-10 max-h-[61px] rounded-full justify-center">
                    <IconElement fill={'#6592E3'} />
            </View>
        </TouchableOpacity>
    );
}