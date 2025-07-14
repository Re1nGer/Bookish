import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import { useMemo, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import CardSwipe from "../../components/CardSwipe";



const Revise = () => {

    const { groupName } = useLocalSearchParams();

    //const [progress, setProgress] = useState(30);

    const [toRevise, setToRevise] = useState(0);

    const [toRem, setToRem] = useState(0);

    const [cardCount, setCardCount] = useState(5);

    const [currentSwipingIndex, setCurrentSwipingIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const cards = [
        { id: 1, title: 'Card 1', description: 'Swipe left or right!' },
        { id: 2, title: 'Card 2', description: 'Try swiping this card' },
        { id: 3, title: 'Card 3', description: 'Another card to swipe' },
        { id: 4, title: 'Card 4', description: 'Keep swiping!' },
        { id: 5, title: 'Card 5', description: 'Last card' },
    ];

    const progress = ((currentSwipingIndex) / cardCount) * 100;

    const handleSwipeLeft = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setCurrentSwipingIndex(prev => prev + 1);
        setToRevise(prev => prev + 1);
    };

    const handleSwipeRight = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setCurrentSwipingIndex(prev => prev + 1);
        setToRem(prev => prev + 1);
    };

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-4">
                <View className="flex-row items-center mt-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-1 mr-5 max-w-[44px] w-full items-center justify-center rounded-[10px]">
                            <MaterialIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-black font-cygrebold text-[22px] font-bold">Self Development</Text>
                </View>
                <TouchableOpacity
                    className="bg-primary rounded-[10px] flex-1 mt-2.5 max-w-[44px] items-center justify-center max-h-[44px] h-full">
                        <Entypo name="shuffle" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View className="bg-[#D8E6FF] rounded-[13px] h-[7px] relative w-full mb-12">
                <View className='absolute bg-[#6592E3] h-full rounded-[13px]' style={{ width: `${progress}%` }}></View>
            </View>

            <View className="justify-between w-full flex-row mb-12">
                <View className="max-w-[62px] max-h-[43px] rounded-r-[9px] bg-[#FFBBAB] w-full h-full py-2 items-center justify-center">
                    <Text className="text-white text-[18px] text-center">{toRevise}</Text>
                </View>
                <View className="max-w-[62px] max-h-[43px] rounded-l-[9px] bg-teal-600/40 w-full h-full py-2 items-center justify-center">
                    <Text className="text-white text-[18px] text-center">{toRem}</Text>
                </View>
            </View>
            <View className="items-center">
                <CardSwipe data={cards[currentIndex]}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight} 
                />
            </View>

    </SafeAreaView>
}




export default Revise;