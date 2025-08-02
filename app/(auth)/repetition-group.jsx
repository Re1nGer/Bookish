import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useMemo, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import CardSwipe from "../../components/CardSwipe";
import axios from '../../network/axios';
import { PrimaryButton } from "../../components/CustomButton";



const RepetitionGroup = () => {

    const { groupName, groupId } = useLocalSearchParams();

    //const [progress, setProgress] = useState(30);

    const [cardCount, setCardCount] = useState(0);


    const [currentIndex, setCurrentIndex] = useState(0);

    const [groups, setGroups] = useState([{ title: '' }]);

    const cards = [
        { id: 1, title: 'Card 1', description: 'Swipe left or right!' },
        { id: 2, title: 'Card 2', description: 'Try swiping this card' },
        { id: 3, title: 'Card 3', description: 'Another card to swipe' },
        { id: 4, title: 'Card 4', description: 'Keep swiping!' },
        { id: 5, title: 'Card 5', description: 'Last card' },
    ];

    const progress = ((currentIndex) / cardCount) * 100;

    const handleSwipeLeft = () => {
        setCurrentIndex((prev) => (prev + 1) % cardCount);
    };

    const handleSwipeRight = () => {
        setCurrentIndex((prev) => prev > 0 ? (prev - 1) : cardCount - 1);
    };

    const fetchGroupNotesAndQuotes = async () => {
        try {
            const { data } = await axios.get(`users/repetition-group/${groupId}`);
            console.log(data)
            setCardCount(data.length);
            setGroups(data.map(item => ({ id: item.id, title: item.bookName, description: item.text })));
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGroupNotesAndQuotes();
    }, []);

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-4">
                <View className="flex-row items-center mt-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-1 mr-5 max-w-[44px] w-full items-center justify-center rounded-[10px]">
                            <MaterialIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-black font-cygrebold text-[22px] font-bold">{groupName}</Text>
                </View>
                <TouchableOpacity
                    className="bg-primary rounded-[10px] flex-1 mt-2.5 max-w-[44px] items-center justify-center max-h-[44px] h-full">
                        <Entypo name="shuffle" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View className="bg-[#D8E6FF] rounded-[13px] h-[7px] relative w-full mb-12">
                <View className='absolute bg-[#6592E3] h-full rounded-[13px]' style={{ width: `${progress}%` }}></View>
            </View>

            <View className="items-center mb-4">
                <CardSwipe
                    data={groups[currentIndex]}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight} 
                    visualFeedBack={false}
                />
            </View>
            <View className="items-center flex-1">
                <Text className="text-[#646464] text-[18px] font-cygrebold">{`${currentIndex + 1} / ${cardCount}`}</Text>
            </View>
            <View className="mx-5">
                <PrimaryButton containerStyles={'min-h-[48px] rounded-[30px] mb-4'} title={'Repeat Group'} textStyles={'text-[16px]'} />
            </View>
    </SafeAreaView>
}




export default RepetitionGroup;