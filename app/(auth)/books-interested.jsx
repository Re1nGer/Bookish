import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import OnboardingProgress from "../../components/OnboardingProgress";
import { StatusBar } from 'expo-status-bar';
import { images } from "../../constants";


const BooksInterested = () => {

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
            <View className="w-full px-[20px] mt-[20px]">
                <OnboardingProgress stage1={100} stage2={70} />
            </View>
            <View className="w-full mt-[65px] mb-[47px] items-center">
                <Text className="font-bold text-[#000000] max-w-[349px] text-[24px] text-center leading-[28px] px-[40px] font-cygrebold">
                    Choose the books that seem interesting:
                </Text>
            </View>

{/*             Potentially fetching these from API */}
            <ScrollView
                className="flex-[3]"
                horizontal={false}
                showsVerticalScrollIndicator={true}
            >
                <View className="flex-row justify-center flex-[3] max-h-[80%] gap-[10px]">
                    <View className="gap-[9px]">
                        <BookImage
                            src={images.book}
                            styles={'mb-[19px]'}
                        />
                        <BookImage
                            src={images.book}
                            styles={'mb-[19px]'}
                        />
                        <BookImage
                            src={images.book}
                        />
                    </View>
                    <View className="gap-[9px]">
                        <BookImage
                            src={images.book}
                            styles={'mb-[19px]'}
                        />
                        <BookImage
                            src={images.book}
                            styles={'mb-[19px]'}
                        />
                        <BookImage
                            src={images.book}
                        />
                    </View>
                    <View className="gap-[9px]">
                        <BookImage
                            src={images.book}
                            styles={'mb-[19px]'}
                        />
                        <BookImage
                            src={images.book}
                            styles={'mb-[19px]'}
                        />
                        <BookImage
                            src={images.book}
                        />
                    </View>
                </View>
            </ScrollView>
        <View className="w-full flex-[1.5] justify-center items-center">
            <TouchableOpacity
                onPress={() => router.push('/reason-for-reading')}
                className="bg-[#6592E3] max-w-[313px] w-full self-center mb-[11px] items-center justify-center max-h-[52px] h-full rounded-[47px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity className="border border-[#000000] self-center bg-transparent items-center justify-center max-w-[313px] w-full max-h-[52px] h-full rounded-[47px]">
                <Text className="text-[#000000] text-[18px] leading-[22px] font-semibold">Skip For Now</Text>
            </TouchableOpacity>
        </View>
        <StatusBar backgroundColor='#F7F7F7' style='dark' />
    </SafeAreaView>
}


const BookImage = ({ src, styles }) => {

    const [isSelected, setIsSelected] = useState(false);

    return <TouchableOpacity
            activeOpacity={.7}
            onPress={() => setIsSelected(!isSelected)}
            className={`max-w-[111px] max-h-[149px] relative ${styles}`}>
            { isSelected ? 
                ( <View className="h-full w-full bg-[#00000080] absolute opacity-50 z-20 rounded-[10px]"></View> )
                : <></>
            }
            <Image source={images.bookSelected}
                className={`absolute h-full w-full max-w-[70px] max-h-[70px] left-[18%] top-[25%] ${isSelected ? 'z-20' : ''}`} />
            <View className="w-full h-full">
                <Image source={src} className="rounded-[10px] z-10 max-h-[149px] max-w-[111px]" resizeMethod="cover" />
            </View>
        </TouchableOpacity>
}


export default BooksInterested;