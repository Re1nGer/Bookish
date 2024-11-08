import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { images } from "../../constants";
import { useRef, useEffect, useState } from "react";


const books = [
    {
        id: 1,
        name: 'Make It Stick',
        author: 'Peter C. Brown, Mark A. McDaniel, Henry L. Roediger III',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/564a53ace4b0ef1eb2daff41/1524810192099-QZZKCRPMM2D2692XHZZG/Cover+Make+it+Stick.jpg',
        rating: '4.7'
    },
    {
        id: 2,
        name: 'How To Make People Like You',
        author: 'Nicholas Boothman',
        imageUrl: 'https://static.get-headway.com/26c0862c647c47ff976e-15e219a88c400c.jpg',
        rating: '4.2'
    },
    {
        id: 3,
        name: 'Make Time',
        author: 'Jake Knapp, John Zeratsky',
        imageUrl: 'https://makeheadway.com/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F181188%2F7da008b650%2F5a0967c6a1744c5594aa-15d4416181eab4.jpg&w=750&q=75',
        rating: '4.5'
    }
];


const SearchBook = () => {

    const inputRef = useRef();

    const [text, setText] = useState('');

    const [data, setData] = useState([]);

    const handleInputTextChange = (text) => {
        //update input state
        //make api call to fetch books
        //throttle to avoid extra requests
        setText(text);
        setData(books.filter(item => item.name.includes(text)))
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <View className="pt-16 mx-5">
            <Text className="text-[#2B2B2B] text-[24px] font-cygrebold leading-[28.8px] mb-5">Search a Book!</Text>
            <View className="bg-[#ffffff] mb-12 border border-[#6592E3] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[26px] px-5">
                <MaterialIcons name="search" color={'#6592E3'} size={22} />
                <TextInput
                    ref={inputRef}
                    value={text}
                    onChangeText={handleInputTextChange}
                    className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 pl-4 text-[#000000] leading-[16.8px] text-sm"
                    placeholder="Search a book"
                />
                <TouchableOpacity className="rounded-full bg-[#000] p-1">
                    <MaterialIcons name='close' color={'#fff'} size={14} />
                </TouchableOpacity>
            </View>

{/*             Probably should add some animated effects upon refreshing */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={(bookItem) => <BookResult {...bookItem.item} key={bookItem.item.id} />}
                ListEmptyComponent={() => 
                    <View className="mt-12 items-center">
                        <Image source={images.searchBookImage} width={299} height={171} className="w-[299px] h-[171px]" resizeMode="contain" />
                    </View>
                }
                refreshControl={<RefreshControl onRefresh={() => console.log('refreshing')} refreshing={false} />}
            />
        </View>
    </SafeAreaView>
}


export default SearchBook;


const BookResult = ({name, author, imageUrl, rating}) => {
    return <View className="max-w-[353px] p-3 w-full  mb-2 rounded-[15px] max-h-[132px] border-[.3px] bg-[#ffffff] border-[#727272] flex-row">
        <View className="max-w-[78px] max-h-[111px] mr-4">
            <Image
                source={{ uri: imageUrl }}
                width={78}
                height={111}
                resizeMode="contain"
                className="rounded-[6px]"
            />
        </View>
        <View>
            <Text className="text-[#1C1C1C] text-[18px] leading-[21.6px] font-cygrebold max-w-[216px]">{name}</Text>
            <Text className="mb-5 text-[#1C1C1C] leading-[14.4px] font-cygreregular max-w-[85%]">{author}</Text>
            <View className="max-w-[56px] max-h-[21px] w-full h-full flex-row p-1 bg-[#6C97E4] rounded-[15px] justify-center items-center">
                <MaterialIcons name="star" color={'#fff'} />
                <Text className="leading-[14.4px] font-cygrebold text-[12px] text-[#ffffff]">{rating}</Text>
            </View>
        </View>
    </View>
}

