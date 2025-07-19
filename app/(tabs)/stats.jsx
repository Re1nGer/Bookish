import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatisticsIcon, Statistics2Icon } from "../../components/Svg";
import { BarChart } from "react-native-gifted-charts";
import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";

const screenWidth = Dimensions.get('window').width;

const Statistics = () => {
    // Original data values
    const originalData = [0, 0, 0, 76, 30, 62, 0];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const timeData = [0, 55, 70, 0, 50, 30, 50, 0];

    const timeLabels = ['2', '9', '16', '23', '30', '2'];

    // Format data for Gifted Charts
    const barData = originalData.map((value, index) => ({
        value: value,
        label: labels[index],
        frontColor: '#6592E3',
        spacing: 2,
        labelWidth: 40,
        labelTextStyle: {
            color: '#000',
            fontSize: 12,
        },
        topLabelComponent: () => value > 0 ? (
            <Text style={{
                color: '#000',
                fontSize: 12,
                fontWeight: '600',
                textAlign: 'center'
            }}>
                {value}
            </Text>
        ) : null,
    }));

    const timeBarData = timeData.map((value, index) => ({
        value: value,
        label: labels[index],
        frontColor: '#6592E3',
        spacing: 2,
        labelWidth: 40,
        labelTextStyle: {
            color: '#000',
            fontSize: 12,
        },
        topLabelComponent: () => value > 0 ? (
            <Text style={{
                color: '#000',
                fontSize: 12,
                fontWeight: '600',
                textAlign: 'center'
            }}>
                {value}
            </Text>
        ) : null,
    }));

    const [isPagesReadOpen, setIsPagesReadOpen] = useState(false);
    const [isHoursReadOpen, setIsHoursReadOpen] = useState(false);
    const [isBooksReadOpen, setIsBooksReadOpen] = useState(false);
    const [quotesCount, setQuotesCount] = useState(0);
    const [notesCount, setNotesCount] = useState(0);
    const [isTopReadOpen, setIsTopReadOpen] = useState(false);

    return (
        <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-1 pt-3 flex-row"
                >
                    <Text className="font-cygrebold text-[24px] leading-[28.8px] text-[#121F16]">Statistics</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View className="mx-5 mb-4 max-h-[110px]">
                    <View className="bg-[#1C1C1C] mb-6 max-h-[106px] h-full rounded-[20px] border-[.3px] border-[#8A8A8A] flex-row justify-between px-6 items-center">
                        <View className="py-4 max-w-[60%]">
                            <Text className="font-cygrebold leading-[19.2px] text-white">Set your daily Reading Goal</Text>
                        </View>
                        <View className="mt-2.5">
                            <StatisticsIcon />
                        </View>
                    </View>
                </View>
                
                <View className="mx-5 mb-7 max-h-[110px]">
                    <View className="bg-[#1C1C1C] mb-6 max-h-[106px] h-full rounded-[20px] border-[.3px] border-[#8A8A8A] flex-row-reverse justify-between px-6 items-center">
                        <View className="py-4 max-w-[40%]">
                            <Text className="font-cygrebold leading-[19.2px] text-white text-[18px]">Set your 2025 Reading Goals</Text>
                        </View>
                        <View className="mt-2.5">
                            <Statistics2Icon />
                        </View>
                    </View>
                </View>
                
                <View className="px-5 mb-5">
                    <View style={styles.chartContainer}>
                        <View className="flex-row justify-between">
                            <View className="flex-row">
                                <Text className="text-[18px] mr-1.5 font-cygreregular">You've read</Text>
                                <Text className="text-[18px] text-primary font-cygrebold">168 pages</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsPagesReadOpen(!isPagesReadOpen)}>
                                <MaterialIcons name="arrow-drop-up" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row">
                            <Feather name="arrow-up-right" size={24} color="#5EBAB9" />
                            <Text className="text-[#5EBAB9] text-[14px]">32 pages</Text>
                        </View>
                        <BarChart
                            data={isPagesReadOpen ? barData : []}
                            width={screenWidth - 120}
                            height={isPagesReadOpen ? 250 : 0}
                            barWidth={35}
                            spacing={15}
                            roundedBottom={false}
                            scrollAnimation
                            hideRules={false}
                            xAxisThickness={0}
                            yAxisThickness={0}
                            yAxisColor="rgba(101, 146, 227, 0.29)"
                            yAxisLabelTexts={['0', '25', '50', '75', '100']}
                            maxValue={100}
                            noOfSections={4}
                            yAxisLabelWidth={40}
                            rulesLength={screenWidth - 120}
                            rulesColor="rgba(101, 146, 227, 0.29)"
                            rulesThickness={1}
                            showReferenceLine1={false}
                            showReferenceLine2={false}
                            showReferenceLine3={false}
                            backgroundColor="#ffffff"
                            isAnimated={true}
                            animationDuration={300}
                            yAxisTextStyle={{
                                color: '#000',
                                fontSize: 12,
                            }}
                            showValuesAsTopLabel={false}
                            topLabelTextStyle={{
                                color: '#000',
                                fontSize: 12,
                                fontWeight: '600',
                            }}
                        />
                    </View>
                </View>
                <View className="px-5 mb-5">
                    <View style={styles.chartContainer}>
                        <View className="flex-row justify-between">
                            <View className="flex-row">
                                <Text className="text-[18px] mr-1.5 font-cygreregular">You've read for</Text>
                                <Text className="text-[18px] text-primary font-cygrebold">3h 55m</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsHoursReadOpen(!isHoursReadOpen)}>
                                <MaterialIcons name="arrow-drop-up" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row">
                            <Feather name="arrow-up-right" size={24} color="#5EBAB9" />
                            <Text className="text-[#5EBAB9] text-[14px]">47 m</Text>
                        </View>
                        <BarChart
                            data={isHoursReadOpen ? timeBarData : []}
                            width={screenWidth - 120}
                            height={isHoursReadOpen ? 250 : 0}
                            barWidth={35}
                            spacing={15}
                            roundedBottom={false}
                            scrollAnimation
                            hideRules={false}
                            xAxisThickness={0}
                            yAxisThickness={0}
                            yAxisColor="rgba(101, 146, 227, 0.29)"
                            yAxisLabelTexts={['0', '25', '50', '75', '100']}
                            maxValue={100}
                            noOfSections={4}
                            yAxisLabelWidth={40}
                            rulesLength={screenWidth - 120}
                            rulesColor="rgba(101, 146, 227, 0.29)"
                            rulesThickness={1}
                            showReferenceLine1={false}
                            showReferenceLine2={false}
                            showReferenceLine3={false}
                            backgroundColor="#ffffff"
                            isAnimated={true}
                            animationDuration={300}
                            yAxisTextStyle={{
                                color: '#000',
                                fontSize: 12,
                            }}
                            showValuesAsTopLabel={false}
                            topLabelTextStyle={{
                                color: '#000',
                                fontSize: 12,
                                fontWeight: '600',
                            }}
                        />
                    </View>
                </View>
                <View className="px-5 mb-5">
                    <View style={styles.chartContainer}>
                        <View className="flex-row justify-between">
                            <View className="flex-row">
                                <Text className="text-[18px] mr-1.5 font-cygreregular">You've finished</Text>
                                <Text className="text-[18px] text-black font-cygrebold">1 book</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsBooksReadOpen(!isBooksReadOpen)}>
                                <MaterialIcons name="arrow-drop-up" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row">
                            <Feather name="arrow-up-right" size={24} color="#5EBAB9" />
                            <Text className="text-[#5EBAB9] text-[14px]">1 book</Text>
                        </View>
                        <BarChart
                            data={isBooksReadOpen ? barData : []}
                            width={screenWidth - 120}
                            height={isBooksReadOpen ? 250 : 0}
                            barWidth={35}
                            spacing={15}
                            roundedBottom={false}
                            scrollAnimation
                            hideRules={false}
                            xAxisThickness={0}
                            yAxisThickness={0}
                            yAxisColor="rgba(101, 146, 227, 0.29)"
                            yAxisLabelTexts={['0', '25', '50', '75', '100']}
                            maxValue={100}
                            noOfSections={4}
                            yAxisLabelWidth={40}
                            rulesLength={screenWidth - 120}
                            rulesColor="rgba(101, 146, 227, 0.29)"
                            rulesThickness={1}
                            showReferenceLine1={false}
                            showReferenceLine2={false}
                            showReferenceLine3={false}
                            backgroundColor="#ffffff"
                            isAnimated={true}
                            animationDuration={300}
                            yAxisTextStyle={{
                                color: '#000',
                                fontSize: 12,
                            }}
                            showValuesAsTopLabel={false}
                            topLabelTextStyle={{
                                color: '#000',
                                fontSize: 12,
                                fontWeight: '600',
                            }}
                        />
                    </View>
                </View>
                <View className="px-5 mb-5 flex-row justify-between">
                    <View className="rounded-[20px] max-w-[176px] h-[105px] flex-1 bg-primary items-center justify-center">
                        <Text className="text-white font-cygrebold">Quotes Saved</Text>
                        <Text className="text-white text-[34px] font-cygrebold">{quotesCount}</Text>
                    </View>
                    <View className="rounded-[20px] max-w-[176px] h-[105px] flex-1 bg-[#D5E3FC] items-center justify-center">
                        <Text className="text-[#1D192B] font-cygrebold">Notes Saved</Text>
                        <Text className="text-[#1D192B] text-[34px] font-cygrebold">{notesCount}</Text>
                    </View>
                </View>
                <View className="px-5 mb-5">
                    <View style={styles.chartContainer}>
                        <View className="flex-row justify-between mb-4">
                            <View className="">
                                <Text className="text-[18px] mr-1.5 font-cygreregular">Your top categories were</Text>
                                <Text className="text-[18px] text-primary font-cygrebold">Psychology, Fantasy</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsTopReadOpen(!isTopReadOpen)}>
                                <MaterialIcons name="arrow-drop-up" size={30} />
                            </TouchableOpacity>
                        </View>
                        { isTopReadOpen ?  
                            <>
                                <View>
                                    <Text className="text-[14px] pl-1">Psychology</Text>
                                    <View className="flex-row items-center justify-between">
                                        <View className="bg-[#D8E6FF] rounded-[13px] h-[8px] relative flex-[.9] w-full">
                                            <View className='absolute bg-[#6592E3] h-full rounded-[13px]' style={{ width: `${100}%` }}></View>
                                        </View>
                                        <Text className="text-[14px] flex-[.2] text-right">1 book</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-[14px] pl-1">Fantasy</Text>
                                    <View className="flex-row items-center justify-between">
                                        <View className="bg-[#D8E6FF] rounded-[13px] h-[8px] relative flex-[.9] w-full">
                                            <View className='absolute bg-[#6592E3] h-full rounded-[13px]' style={{ width: `${100}%` }}></View>
                                        </View>
                                        <Text className="text-[14px] flex-[.2] text-right">2 book</Text>
                                    </View>
                                </View>
                            </> : <></>
                        }
                    </View>
                </View>

                <View className="px-5 mb-12">
                    <View style={styles.chartContainer}>
                        <View className="flex-row justify-between mb-4">
                            <View className="">
                                <Text className="text-[18px] mr-1.5 font-cygreregular">Your top authors were</Text>
                                <Text className="text-[18px] text-primary font-cygrebold">Daniel Kahneman, Neil Gaiman</Text>
                            </View>
                            <TouchableOpacity>
                                <MaterialIcons name="arrow-drop-up" size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    chartContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 1
    }
});

export default Statistics;