import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    Switch,
    Linking
} from "react-native";
import { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import FormField from "../../components/FormField";
import Entypo from '@expo/vector-icons/Entypo';
import WheelPicker from '@quidone/react-native-wheel-picker';
import { PrimaryButton } from "../../components/CustomButton";
import * as Notifications from 'expo-notifications';
import RadioButton from "../../components/RadioButton";
import useSpacedRepetition from "../hooks/useSpacedRepetition";
import axios from '../../network/axios';


const AddRepetitionGroup = () => {

    const [hasNotificationPermission, setNotificationPermission] = useState(false);

    const hours = [...Array(12).keys()].map((index, val) => ({
        value: val + 1,
        label: val + 1,
    }));

    const minutes = [...Array(60).keys()].map((index, val) => ({
        value: val < 10 ? val.toString().padStart('0') : val.toString(),
        label: val < 10 ? val.toString().padStart('0') : val.toString(),
    }));

    const timeFormat = [...['AM', 'PM']].map((val, idx) => ({
        value: val,
        label: val,
    }));

    const [selectedOption, setSelectedOption] = useState('Light');

    const [hour, setHour] = useState(0);

    const [minute, setMinute] = useState(0);

    const [timeFormats, setTimeFormats] = useState("AM");

    const [groupName, setGroupName] = useState('');

    const handleNotificationTogglePermission = async () => {
        const currentPermissions = await Notifications.getPermissionsAsync();
        if (!currentPermissions.granted) {
            const newPermissions = await Notifications.requestPermissionsAsync();
            setNotificationPermission(newPermissions.granted);
        } else {
            showDisableAlert();
        }
    }

    const showDisableAlert = () => {
        Alert.alert(
            "Disable Notifications",
            "To disable notifications, please go to Settings > Bookish > Notifications and turn them off.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Open Settings", onPress: () => Linking.openSettings() }
            ]
        );
    };

    const dayOffsets = [0, 2, 7, 21, 45, 90, 180];
    const lightOffsets = [0, 2, 7, 21, 45, 90, 180]
    const standardOffsets = [0, 1, 6, 14, 30, 66, 150, 360]
    const intensiveOffsets = [0, 1, 3, 7, 15, 35, 90, 240]
    const cramItInOffsets = [0, 1, 2, 4, 7, 14, 30]

    
    const generateTimestamps = () => {
        const timestamps = [];
        
        dayOffsets.forEach(offset => {
            // Get today's date
            const today = new Date();
            
            // Add the offset days
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() + offset);
            
            // Convert 12-hour format to 24-hour format
            let hour24 = hour;
            if (timeFormat === "AM" && hour === 12) {
                hour24 = 0;
            } else if (timeFormat === "PM" && hour !== 12) {
                hour24 = hour + 12;
            }
            
            // Set the time
            targetDate.setHours(hour24, minute, 0, 0);
            
            // Generate ISO string
            const isoString = targetDate.toISOString();
            
            timestamps.push(isoString);
        });
        
        return timestamps;
    };

    const handleAddDateTime = async () => {
    }

    const handleSelectQuotesRedirect = () => {
        router.push('quote-to-connect');
    }

    const handleSelectNotesRedirect = () => {
        router.push('select-notes')
    }

    const getFiveMinutesAhead = () => {
        const now = new Date();
        const fiveMinutesLater = new Date(now.getTime() + 1 * 60 * 1000);
        return fiveMinutesLater.toISOString();
};

    const handleSave = async () => {
        console.log(generateTimestamps())
        try {
            await axios.post('users/repetition-group', {
                name: groupName,
                quoteIds: [],
                noteIds: [],
                scheduledTimes: [generateTimestamps()]
            });
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const checkPermissions = async () => {
            const permissions = await Notifications.getPermissionsAsync();
            setNotificationPermission(permissions.granted);
        };
        
        checkPermissions();
    }, [])

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
                    onPress={handleSave}
                    className="bg-primary flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                    <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View className="px-4 mb-10">
                    <FormField
                        title={'Name'}
                        value={groupName}
                        handleChangeText={(e) => setGroupName(e)}
                        placeholder={'Enter name for this group'}
                        placeholderTextColor={'#8A8A8A'}
                        textInputContainerStyles={'rounded-[15px]'}
                    />
                </View>
                <View className="px-4 max-h-[160px] mb-5">
                    <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px] mb-4">Add Quotes to repeat</Text>
                    <TouchableOpacity
                        onPress={handleSelectQuotesRedirect}
                        className="bg-[#1C1C1C] max-h-[116px] h-full items-center justify-center rounded-[20px]"> 
                        <View className="justify-center items-center">
                            <Entypo name="plus" size={54} color="white" />
                            <Text className="text-white font-cygreregular text-center">Add Quotes</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="px-4 max-h-[160px] mb-14">
                    <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px] mb-4">Add Notes to repeat</Text>
                    <TouchableOpacity
                        onPress={handleSelectNotesRedirect}
                        className="bg-[#1C1C1C] max-h-[116px] h-full items-center justify-center rounded-[20px]"> 
                        <View className="justify-center items-center">
                            <Entypo name="plus" size={54} color="white" />
                            <Text className="text-white font-cygreregular text-center">Add Notes</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="px-4 max-h-[160px] mb-2.5">
                    <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px] mb-4">Get Notified</Text>
                    <View className="border-[2px] border-[#6592E3] bg-white rounded-[13px]">
                        <View className="flex-row justify-between items-center p-5">
                            <View className="justify-center flex-1">
                                <Text className="text-secondary text-[18px] font-bold font-cygrebold leading-[21.6px]">Enable Notifications</Text>
                            </View>
                            <Switch
                                size="medium"
                                thumbColor="#ffffff" 
                                trackColor={{
                                    true: '#6592E3',
                                    false: '#767577'
                                }}
                                initialValue={hasNotificationPermission}
                                value={hasNotificationPermission}
                                containerStyles={'flex-[.2]'}
                                onValueChange={handleNotificationTogglePermission}
                            />
                        </View>
                    </View>
                </View>
                <View className="px-4 max-h-[50px] mb-7">
                    <Text className="text-black font-cygreregular leading-[19.2px]">Reviewing your notes at systematic intervals: firstly after 1 day, then 3 days, 1 week, 2 weeks etc.</Text>
                </View>
                <View className="px-4 max-h-[50px]">
                    <Text className="text-[#1C1C1C] text-[20px] font-cygrebold leading-[24px]">Repetition Mode</Text>
                </View>
                <View className="px-4 max-h-[450px] mb-7">
                    <OptionRow
                        isSelected={selectedOption === 'Light'}
                        name={'Light'}
                        desc={'Minimal commitment for soft recall'}
                        intervalDesc={'0, 2, 7, 21, 45, 90, 180'}
                        setIsSelected={() => setSelectedOption('Light')}
                    />
                    <OptionRow
                        isSelected={selectedOption === 'Standard'}
                        name={'Standard'}
                        desc={'Balanced, long-term memory'}
                        intervalDesc={'0, 1, 6, 14, 30, 66, 150, 360'}
                        setIsSelected={() => setSelectedOption('Standard')}
                    />
                    <OptionRow
                        isSelected={selectedOption === 'Intensive'}
                        name={'Intensive'}
                        desc={'Quicker ramp-up with tighter intervals'}
                        intervalDesc={'0, 1, 3, 7, 15, 35, 90, 240'}
                        setIsSelected={() => setSelectedOption('Intensive')}
                    />
                    <OptionRow
                        isSelected={selectedOption === 'Cram it in'}
                        name={'Cram it in'}
                        desc={'High-frequency reviews to force memory before an exam/talk'}
                        intervalDesc={'0, 1, 2, 4, 7, 14, 30'}
                        setIsSelected={() => setSelectedOption('Cram it in')}
                    />
                </View>
                <View className="items-center flex-1 relative gap-x-6 flex-row justify-center max-h-[250px] border border-[#8A8A8A] rounded-[15px] mx-4 mb-7">
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
                <View className="px-4 flex-row gap-2 justify-between mb-5">
                    <DayTimeSelectedChip hour={hour} minute={minute < 10 ? minute.toString().padStart('2', '0') : minute} zone={timeFormats} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default AddRepetitionGroup;


const OptionRow = ({ isSelected, setIsSelected, name, desc, intervalDesc }) => {
    return (
        <>
            <OptionCard
                isSelected={isSelected}
                setIsSelected={setIsSelected} 
                name={name}
                desc={desc}
            />
            { isSelected ? (
                <View className="flex-row items-center mt-2">
                    <Text className="text-primary font-cygrebold">Reviews on Day: </Text>
                    <Text className="text-primary font-cygreregular">{intervalDesc}</Text>
                </View>
            ) : <></> }
        </>
    )
}

const OptionCard = ({ isSelected, name, desc, setIsSelected, containerStyles }) => {

    //unknown rounding
    return <View
        className={`max-h-[88px] mt-4 w-full h-full items-center bg-[#ffffff] flex-row justify-between rounded-[15px] border ${isSelected ? 'border-[#6592E3] border-[2px]' : 'border-[#1C1C1C]'} px-[30px] ${containerStyles} `}>
            <View className="max-w-[80%]">
                <Text className={`font-semibold text-[18px] leading-[21px] font-cygrebold ${isSelected ? 'text-[#6592E3]' : 'text-[#1C1C1C]' }`}>{name}</Text>
                <Text className={`leading-[21px] ${isSelected ? 'text-[#6592E3]' : 'text-[#1C1C1C]' }`}>{desc}</Text>
            </View>
        <RadioButton
            size={42}
            selected={isSelected}
            onPress={setIsSelected}
        />
    </View>
}

const DayTimeSelectedChip = ({ hour, minute, zone }) => {


    return <View className="rounded-[5px] bg-[#121F16] h-[32px] m-1 w-full justify-between items-center px-2 py-1 flex-row">
        <Text className="text-white text-[14px] font-cygrebold mr-2 leading-[16.8px]">AT {hour}:{minute} {zone}</Text>
        <TouchableOpacity className="bg-white rounded-full p-.0.5 justify-center items-center">
            <MaterialIcons name="close" />
        </TouchableOpacity>
    </View>
}