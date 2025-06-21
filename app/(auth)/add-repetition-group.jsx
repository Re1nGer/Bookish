import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    StyleSheet
} from "react-native";
import Switch from "../../components/Switch";
import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import FormField from "../../components/FormField";
import Entypo from '@expo/vector-icons/Entypo';
import { Calendar } from 'react-native-calendars';
import WheelPicker from '@quidone/react-native-wheel-picker';
import { PrimaryButton } from "../../components/CustomButton";


const AddRepetitionGroup = () => {

    const theme = {
      dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    }

    const hours = [...Array(12).keys()].map((index, val) => ({
        value: val,
        label: val,
    }));

    const minutes = [...Array(60).keys()].map((index, val) => ({
        value: val < 10 ? val.toString().padStart('0') : val.toString(),
        label: val < 10 ? val.toString().padStart('0') : val.toString(),
    }));

    const timeFormat = [...['AM', 'PM']].map((val, idx) => ({
        value: val,
        label: val,
    }));

    const [hour, setHour] = useState(0);

    const [minute, setMinute] = useState(0);

    const [timeFormats, setTimeFormats] = useState("AM");

    return (
        <SafeAreaView className="bg-[#F7F7F7] h-full flex-1">
            <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-7">
                <TouchableOpacity
                    className="mr-4"
                    onPress={() => router.back()}>
                    <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-black font-cygrebold flex-1 text-[22px] font-bold">Create Group</Text>
                <TouchableOpacity
                    className="bg-primary flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                    <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View className="px-4 mb-10">
                    <FormField
                        title={'Name'}
                        placeholder={'Enter name for this group'}
                        placeholderTextColor={'#8A8A8A'}
                        textInputContainerStyles={'rounded-[15px]'}
                    />
                </View>
                <View className="px-4 max-h-[160px] mb-5">
                    <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px] mb-4">Add Quotes to repeat</Text>
                    <TouchableOpacity className="bg-[#1C1C1C] max-h-[116px] h-full items-center justify-center rounded-[20px]"> 
                        <View className="justify-center items-center">
                            <Entypo name="plus" size={54} color="white" />
                            <Text className="text-white font-cygreregular text-center">Add Quotes</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="px-4 max-h-[160px] mb-14">
                    <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px] mb-4">Add Notes to repeat</Text>
                    <TouchableOpacity className="bg-[#1C1C1C] max-h-[116px] h-full items-center justify-center rounded-[20px]"> 
                        <View className="justify-center items-center">
                            <Entypo name="plus" size={54} color="white" />
                            <Text className="text-white font-cygreregular text-center">Add Notes</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="px-4 max-h-[160px] mb-2.5">
                    <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px] mb-4">When To Repeat</Text>
                    <View className="border-[2px] border-[#6592E3] bg-white rounded-[13px]">
                        <View className="flex-row justify-between items-center p-5">
                            <View className="justify-center flex-1">
                                <Text className="text-secondary text-[18px] font-bold font-cygrebold leading-[21.6px]">Enable Notifications</Text>
                            </View>
                            <Switch
                                size="medium"
                                activeColor="#6592E3"
                                inactiveColor="#767577" 
                                thumbColor="#ffffff" 
                                containerStyles={'flex-[.2]'}
                            />
                        </View>
                    </View>
                </View>
                <View className="px-4 max-h-[50px] mb-7">
                    <Text className="text-black font-cygreregular leading-[19.2px]">Reviewing your notes at systematic intervals: firstly after 1 day, then 3 days, 1 week, 2 weeks etc.</Text>
                </View>
                <View className="px-4 max-h-[450px] mb-10">
                    <Calendar
                        theme={theme}
                        enableSwipeMonths
                        headerStyle={styles.headerStyle}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        style={styles.calendar}
                        dayComponent={DayComponent}
                        hideExtraDays
                        showSixWeeks={false}
                    />
                </View>
                <View className="items-center flex-1 relative gap-6 flex-row justify-center max-h-[250px] border border-[#8A8A8A] rounded-[15px] mx-4 mb-7">
                    <WheelPicker
                        value={hour}
                        onValueChanged={(v) => setHour(v.item.value)}
                        data={hours}
                        width={40}
                    />
                    <WheelPicker
                        data={minutes}
                        value={minute}
                        onValueChanged={(v) => setMinute(v.item.value)}
                        width={40}
                    />
                    <WheelPicker
                        value={timeFormats}
                        onValueChanged={(v) => setTimeFormats(v.item.value)}
                        data={timeFormat}
                        width={40}
                    />
                </View>
                <View className="px-4 mb-8">
                    <PrimaryButton title={'Add Time'} containerStyles={'rounded-[47px]'} />
                </View>
                <View className="px-4 flex-row justify-between mb-5">
                    <View>
                        <DayTimeSelectedChip />
                        <DayTimeSelectedChip />
                        <DayTimeSelectedChip />
                    </View>
                    <View>
                        <DayTimeSelectedChip />
                        <DayTimeSelectedChip />
                        <DayTimeSelectedChip />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default AddRepetitionGroup;


const DayTimeSelectedChip = () => {


    return <View className="rounded-[5px] bg-[#121F16] h-[32px] m-1 w-[175px] justify-between items-center px-2 py-1 flex-row">
        <Text className="text-white text-[14px] font-cygrebold leading-[16.8px]">28.08 AT 8:00 PM</Text>
        <TouchableOpacity className="bg-white rounded-full p-.0.5 justify-center items-center">
            <MaterialIcons name="close" />
        </TouchableOpacity>
    </View>
}

const DayComponent = ({ date, state, marking, onPress, ...rest }) => {

    const isSelected = state === 'today';

    return (
      <TouchableOpacity className='relative h-[45px]'>
        <View className={isSelected ? "w-[30px] h-[30px] rounded-full bg-black justify-center": ""}>
          <Text className={`text-center ${isSelected ? 'text-white' : ''}`}>
            {date.day}
          </Text>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 20,
    borderColor: '#8A8A8A',
    borderWidth: 0.3,
    maxHeight: 450
  },
  headerStyle: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    tintColor: "transparent",
    width: "100%",
  }
});