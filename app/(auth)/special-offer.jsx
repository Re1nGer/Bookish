import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { router } from "expo-router";
import { useState } from "react";
import images from "../../constants/images";
import { MaterialIcons } from '@expo/vector-icons';
import RadioButton from "../../components/RadioButton";



const SpecialOffer = () => {

    const [selectedComponent, setSelectedComponent] = useState('A'); 

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <View className="items-start mt-6 px-[20px]">
            <MaterialIcons name={'close'} size={24} />
        </View>
        <View className="items-center flex-[.7]">
            <Text className="text-center text-[#1C1C1C] font-bold font-cygrebold text-[80px] leading-[98px]">20%</Text>
            <Image source={images.specialOffer} />
            <View>
                <Text className="text-[#000000] max-w-[328px] font-bold font-cygrebold text-[20px] leading-[24px] text-center">
                    Special Offer!
                </Text>
                <Text className="text-[#000000] max-w-[328px] font-bold font-cygrebold text-[20px] leading-[24px] text-center">
                    Enjoy Premium Benefits.
                </Text>

            </View>
        </View>
{/*         Potentially fetch these values from flag features */}
        <View className="w-full items-center mt-16 mb-8 flex-[.6]">
            <OfferCardWithDiscount
                isSelected={selectedComponent === 'A'}
                setIsSelected={() => setSelectedComponent('A')} 
                containerStyles={'mb-[15px]'}
            />
            <OfferCard
                isSelected={selectedComponent === 'B'}
                setIsSelected={() => setSelectedComponent('B')} 
            />
        </View>

        <View className="w-full items-center justify-center mb-3 flex-row flex-[.1]">
            <OptionButton text={'Help'} containerStyles={'mr-[10px]'}/>
            <OptionButton text={'Switch User'} containerStyles={'max-w-[98px] mr-[10px]'} />
            <OptionButton text={'Restore'} />
        </View>

        <View className="items-center w-full mb-8 flex-[.1]">
            <Text className='text-[12px] font-cygreregular text-[##1C1C1C]'>By continuing, you agree to</Text>
            <View className="flex-row">
                <Text className="text-[12px] font-cygrebold text-[#1C1C1C]">Terms of Service</Text>
                <Text className='text-[12px] font-cygreregular text-[#1C1C1C]'> and </Text><Text className="text-[12px] font-cygrebold text-[#1C1C1C]">Privacy Policy</Text>
            </View>
        </View>

        <View className="w-full flex-[.2] justify-center items-center px-[16px]">
            <TouchableOpacity
                onPress={() => router.push('/special-offer')}
                className="bg-[#6592E3] w-full self-center mb-[11px] items-center justify-center max-h-[71px] h-full rounded-[47px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Subscribe Now</Text>
                <Text className="text-[#FEFEFC] text-[14px] leading-[16.8px] font-cygreregular">30.99€/year</Text>
            </TouchableOpacity>
        </View>

        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>
}


const OptionButton = ({ text, containerStyles }) => {
    return <TouchableOpacity className={`max-w-[72px] max-h-[27px] w-full h-full items-center justify-center rounded-[13px] bg-[#E9E9E9] ${containerStyles}`}>
        <Text className="text-[#1C1C1C] font-cygreregular text-sm">{text}</Text>
    </TouchableOpacity>
}



const OfferCard = ({ isSelected, setIsSelected, containerStyles }) => {

    //unknown rounding
    return <View
        className={`max-w-[353px] max-h-[88px] w-full h-full items-center bg-[#ffffff] flex-row justify-between rounded-[15px] border ${isSelected ? 'border-[#6592E3] border-[2px]' : 'border-[#1C1C1C]'} px-[30px] ${containerStyles} `}>
        <Text className="font-semibold text-[18px] leading-[21px] font-cygrebold">3.49 €/month</Text>
        <RadioButton
            size={42}
            selected={isSelected}
            onPress={setIsSelected}
        />
    </View>
}


const OfferCardWithDiscount = ({ isSelected, setIsSelected, containerStyles }) => {

    return <View
            className={`max-w-[353px] max-h-[88px] relaitve w-full h-full items-center bg-[#ffffff] flex-row justify-between rounded-[15px] border  ${isSelected ? 'border-[#6592E3] border-[2px]' : 'border-[#1C1C1C]'}  px-[30px] ${containerStyles}`}>
        <View className="absolute h-[25px] w-[121px] bg-[#6592E3] rounded-[13px] items-center justify-center right-4 -top-3">
            <Text className="text-[#ffffff] text-sm font-cygreregular text-center leading-[16.8px]">20% discount </Text>
        </View>
        <View>
            <Text className={`font-semibold text-[18px] leading-[21px] font-cygrebold ${isSelected ? 'text-[#6592E3]' : 'text-[#1C1C1C]' } `}>30.99€/year</Text>
            <Text className={`text-[14px] leading-[16.8px] font-cygrebold line-through ${isSelected ? 'text-[#6592E3]' : 'text-[#1C1C1C]'}`}>40.99€/year</Text>
        </View>
        <RadioButton
            size={42}
            selected={isSelected}
            onPress={setIsSelected}
        />
    </View>
}


export default SpecialOffer;