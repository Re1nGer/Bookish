import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { router } from "expo-router";
import { useState } from "react";
import images from "../../constants/images";
import { MaterialIcons } from '@expo/vector-icons';
import RadioButton from "../../components/RadioButton";



const SpecialOffer = () => {

    const [offerState, setOfferState] = useState({
        offerCost: '30.99€/year',
        offerOption: 'A'
    });

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <ScrollView>
            <View className="items-start mt-6 px-[20px]">
                <MaterialIcons name={'close'} size={24} />
            </View>
            <View className="items-center">
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
            <View className="w-full items-center mt-16 mb-8 max-h-[200px]">
                <OfferCardWithDiscount
                    isSelected={offerState.offerOption === 'A'}
                    setIsSelected={() => setOfferState({ offerCost: '30.99€/year', offerOption: 'A' })} 
                    containerStyles={'mb-[15px]'}
                />
                <OfferCard
                    isSelected={offerState.offerOption === 'B'}
                    setIsSelected={() => setOfferState({ offerCost: '3.49 €/month', offerOption: 'B' })} 
                />
            </View>

            <View className="w-full items-center justify-center mb-3 flex-row">
                <OptionButton text={'Help'} containerStyles={'mr-[10px]'}/>
                <OptionButton text={'Switch User'} containerStyles={'max-w-[98px] mr-[10px]'} />
                <OptionButton text={'Restore'} />
            </View>

            <View className="items-center w-full">
                <Text className='text-[12px] font-cygreregular text-[##1C1C1C]'>By continuing, you agree to</Text>
                <View className="flex-row">
                    <Text className="text-[12px] font-cygrebold text-[#1C1C1C]">Terms of Service</Text>
                    <Text className='text-[12px] font-cygreregular text-[#1C1C1C]'> and </Text><Text className="text-[12px] font-cygrebold text-[#1C1C1C]">Privacy Policy</Text>
                </View>
            </View>

            <View className="mt-8 mb-5">
                <Text className="text-[#000000] text-[24px] mb-5 font-bold leading-[28.8px] font-cygrebold text-center">Why You Need It?</Text>
                <View className="px-5">
                    <PremiumBenefit
                        title={'No Ads'}
                        description={'No need to watch ads anymore.'}
                        icon={'no-adult-content'}
                        containerStyles={'mb-6'}
                    />
                    <PremiumBenefit
                        title={'Unlimited Books'}
                        description={'Add more than 15 books. No more restrictions.'}
                        descriptionStyles={'max-w-[200px]'}
                        icon={'menu-book'}
                        containerStyles={'mb-6'}
                    />
                    <PremiumBenefit
                        title={'More Statistics'}
                        description={'Get access to more advanced statistics and your Year Wrap Up.'}
                        icon={'pie-chart'}
                        containerStyles={'mb-6'}
                        descriptionStyles={'max-w-[250px]'}
                    />
                    <PremiumBenefit
                        title={'Read and collect'}
                        description={'Keep your strike and collect interesting creatures.'}
                        icon={'bug-report'}
                        containerStyles={'mb-6'}
                        descriptionStyles={'max-w-[250px]'}
                    />
                    <PremiumBenefit
                        title={'Personalized Experience'}я
                        description={'Unlock full reading plan and journeys specifically for your needs and goals.'}
                        icon={'my-library-books'}
                        descriptionStyles={'max-w-[280px] mb-6'}
                    />
                </View>
                <View className="mx-auto max-w-[353px] border relative justify-between flex-row rounded-[30px] border-[#fff] bg-[#fff] z-20  max-h-[137px] w-full h-full">

{/*                     <View className="absolute left-8 h-[137px] rounded-[80px] w-[160px] bg-[#fff]"></View> */}
                    <View className="absolute bg-[#C1D7FF] -z-10 right-0 h-[137px] rounded-r-[30px] flex-row w-[200px]"></View>
                    
                    <View className="z-10 justify-center pl-[17px]">
                        <Text className="text-[22px] font-cygrebold leading-[22.44px] max-w-[88px]">Treat Yourself</Text>
                        <Text className="leading-[19.2px] font-cygreregular">Try 7-day free trial!</Text>
                    </View>

                    <View className="justify-center items-end justify-self-end mr-6">
                        <Image source={images.specialOfferMonster} className="max-w-[131px] max-h-[121px]" width={131} height={121} />
                    </View>
                </View>
            </View>
        </ScrollView>
        <View className="w-full max-h-[100px] justify-center items-center px-[16px]">
            <TouchableOpacity
                onPress={() => router.push('/special-offer')}
                className="bg-[#6592E3] w-full self-center mb-[11px] items-center justify-center max-h-[71px] h-full rounded-[47px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Subscribe Now</Text>
                <Text className="text-[#FEFEFC] text-[14px] leading-[16.8px] font-cygreregular">{offerState.offerCost}</Text>
            </TouchableOpacity>
        </View>

        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>
}


const OptionButton = ({ text, containerStyles }) => {
    return <TouchableOpacity className={`max-w-[72px] h-[30px] w-full items-center justify-center rounded-[13px] bg-[#E9E9E9] ${containerStyles}`}>
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

const PremiumBenefit = ({ title, description, icon, containerStyles, descriptionStyles }) => {
    return <View className={`flex-row ${containerStyles}`}>
        <View className="bg-[#6592E3] items-center justify-center h-full w-full rounded-[10px] max-w-[46px] max-h-[45px]">
            <MaterialIcons
                name={icon}
                size={27}
                color="white" />
        </View>
        <View className="ml-5">
            <Text className="text-[#000000] mb-1 font-bold font-cygrebold text-[18px] leading-[21.6px] text-left">{title}</Text>
            <Text className={`text-[#000000] font-cygreregular text-[16px] leading-[19.2px] text-left ${descriptionStyles}`}>{description}</Text>
        </View>
    </View>;
}
