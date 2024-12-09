import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { Collection1Icon } from "../../components/Svg";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import axios from '../../network/axios';


function splitArray(arr) {
    const midpoint = Math.ceil(arr.length / 2);
    const firstHalf = arr.slice(0, midpoint);
    const secondHalf = arr.slice(midpoint);
    return [firstHalf, secondHalf];
}


const SelectCollections = () => {


    //when fetching the collection it has to be ordered in backend and then split in two here

    const [firstHalfCollections, setFirstHalfCollections] = useState([]);

    const [secondHalfCollections, setSecondtHalfCollections] = useState([]);

    const fetchCollections = async () => {
        try {
            const { data } = await axios.get('users/collections');
            const [first, second] = splitArray(data);
            const firstMapped = first.map(item => ({...item, selected: false})); //probably wiser to receiver from backed selected false
            const secondMapped = second.map(item => ({...item, selected: false}));
            setFirstHalfCollections(firstMapped);
            setSecondtHalfCollections(secondMapped);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFirstHalfSelection = (selectedId) => {
        setFirstHalfCollections(prev => 
            prev.map(c => 
                c.id === selectedId
                    ? { ...c, selected: !c.selected }
                    : {...c}
            )
        );
    };

    const handleSecondHalfSelection = (selectedId) => {
        setSecondtHalfCollections(prev => 
            prev.map(c => 
                c.id === selectedId
                    ? { ...c, selected: !c.selected }
                    : {...c}
            )
        );
    };

    const handleSave = () => {}

    useEffect(() => {
        fetchCollections();
    }, []);

    //console.log(firstHalfCollections, secondHalfCollections);

    return <SafeAreaView className="bg-[#F7F7F7] relative flex-1">

            <TouchableOpacity className="bg-primary self-end mt-2.5 mr-5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
            </TouchableOpacity>

            <View className="px-5 mt-5 max-h-[150px]">
                <Text className="text-black mt-6 text-[24px] font-cygrebold leading-[28.8px] font-bold">Select collections</Text>
                <View className="bg-[#ffffff] mt-5 mb-7 border-[.3px] border-[#727272] items-center max-h-[43px] h-full flex-row justify-between w-full rounded-[26px] px-5">
                    <MaterialIcons name="search" color={'#1C1C1C'} size={22} />
                    <TextInput
                        className="bg-[#ffffff] font-cygreregular justify-center items-center flex-1 pl-4 text-[#000000] leading-[16.8px] text-sm"
                        placeholder="Search"
                    />
                    <TouchableOpacity className="rounded-full bg-[#000] p-1">
                        <MaterialIcons name='close' color={'#fff'} size={14} />
                    </TouchableOpacity>
                </View>
            </View>


            <ScrollView className="px-5 flex-1">
                <View className="flex-row  w-full">
                    <View className="w-full flex-[.5]">
                        <NewCollection />
                        { secondHalfCollections.map(item => 
                            <ExistingCollection
                                name={item.name}
                                onSelected={() => handleSecondHalfSelection(item.id)}
                                selected={item.selected}
                        />) }
                    </View>
                    <View className="w-full flex-[.5]">
                        { firstHalfCollections.map(item => <ExistingCollection
                            onSelected={() => handleFirstHalfSelection(item.id)}
                            name={item.name} 
                            selected={item.selected}
                        />) }
                    </View>
                </View>

            </ScrollView>
    </SafeAreaView>
}


export default SelectCollections;


const NewCollection = ({ containerStyles }) => {

    return <View className={`bg-primary rounded-[20px] mb-5 justify-between p-4 max-w-[169px] w-full max-h-[174px] ${containerStyles}`}>
        <Text className="font-cygrebold mb-7 text-[22px] leading-[26.4px] max-w-[105px] font-bold text-[#ffffff]">New Collection</Text>
        <TouchableOpacity
            onPress={() => router.push('/create-collection')}
            className="items-center self-end bg-[#fff] max-w-[61px] max-h-[62px] rounded-full justify-center p-4">
            <MaterialIcons name="add" size={30} />
        </TouchableOpacity>
    </View>
}


const ExistingCollection = ({ name, selected, onSelected, containerStyles }) => {

    //push to collection with the name (it should be unique)
    return (
        <TouchableOpacity
            onPress={onSelected}
            className={`rounded-lg ${selected ? 'bg-[#1C1C1C2B] p-[10px] mb-9' : 'bg-transparent'} max-h-[200px]`}>
            <View
                className={`bg-[#ffffff] border-[#8A8A8A] border-[.5px] rounded-[20px] justify-between p-4 ${selected ? 'max-w-[155px] max-h-[160px]': 'max-w-[169px] max-h-[174px]'}  w-full h-full ${containerStyles}`}>
                <Text className="font-cygrebold mb-7 text-[22px] leading-[26.4px] max-w-[105px] font-bold text-[#121F16]">{name}</Text>
                <View
                    className="items-center self-end bg-[#ffffff] max-w-[61px] relative -z-10 max-h-[62px] rounded-full justify-center p-4">
                    <Collection1Icon />
                </View>
            </View>
        </TouchableOpacity>
    );

}