import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import { useMemo, useState, useEffect, useRef } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import CardSwipe from "../../components/CardSwipe";
import axios from '../../network/axios'
import AntDesign from '@expo/vector-icons/AntDesign';



const Revise = () => {

    const { groupName, groupId } = useLocalSearchParams();

    //const [progress, setProgress] = useState(30);

    const [toRevise, setToRevise] = useState(0);

    const [toRem, setToRem] = useState(0);

    const [cardCount, setCardCount] = useState(5);

    const [currentSwipingIndex, setCurrentSwipingIndex] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [groups, setGroups] = useState([{ title: '' }]);

    const progress = ((currentSwipingIndex) / cardCount) * 100;

    const countRef = useRef(0);

    const handleSwipeLeft = () => {
        setCurrentIndex((prev) => (prev + 1) % cardCount);
        setCurrentSwipingIndex(prev => prev + 1);
        setToRevise(prev => prev + 1);
    };

    const handleSwipeRight = () => {
        setCurrentIndex((prev) => (prev + 1) % cardCount);
        setCurrentSwipingIndex(prev => prev + 1);
        setToRem(prev => prev + 1);
        countRef.current+=1;
    };

    const fetchGroupNotesAndQuotes = async () => {
        try {
            const { data } = await axios.get(`users/repetition-group/${groupId}`);
            setCardCount(data.length);
            setGroups(data.map(item => ({ id: item.id, title: item.bookName, description: item.text })));
        } catch(error) {
            console.log(error);
        }
    }

    const handleQuit = () => {
        Alert.alert(
            "Are you sure",
            "Do you really want to leave without finishing the repetition?",
            [
                {
                    text: "Continue",
                    style: "default"
                },
                { 
                    text: "Leave", 
                    onPress: () => router.back(),
                    style: "destructive" // This will make it red on iOS
                }
            ]
        );

    }

    useEffect(() => {
        fetchGroupNotesAndQuotes();
    }, []);

    useEffect(() => {
        if (cardCount > 0 && currentSwipingIndex === cardCount) {
            router.replace({ pathname: 'repetition-group-success', params: { scorred: countRef.current, total: cardCount } })
        }
    }, [currentSwipingIndex, cardCount]);

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

            <View className="bg-[#D8E6FF] rounded-[13px] h-[7px] relative w-full">
                <View className='absolute bg-[#6592E3] h-full rounded-[13px]' style={{ width: `${progress}%` }}></View>
            </View>

            <View className="items-center mb-12">
                <Text className="text-[#646464] text-[14px] font-cygreregular">{`${currentSwipingIndex} / ${cardCount}`}</Text>
            </View>

            <View className="justify-between w-full flex-row mb-12">
                <View className="max-w-[62px] max-h-[43px] rounded-r-[9px] bg-[#FFBBAB] w-full h-full py-2 items-center justify-center">
                    <Text className="text-white text-[18px] text-center">{toRevise}</Text>
                </View>
                <View className="max-w-[62px] max-h-[43px] rounded-l-[9px] bg-teal-600/40 w-full h-full py-2 items-center justify-center">
                    <Text className="text-white text-[18px] text-center">{toRem}</Text>
                </View>
            </View>
            <View className="items-center flex-1">
                <CardSwipe data={groups[currentIndex]}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight} 
                />
            </View>
            <View className="m-6">
                <TouchableOpacity
                    onPress={handleQuit}
                >
                    <AntDesign name="back" size={31} color="black" />
                </TouchableOpacity>
            </View>

    </SafeAreaView>
}




export default Revise;