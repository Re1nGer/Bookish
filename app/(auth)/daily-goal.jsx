import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    TextInput,
    Switch,
    Linking
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import * as Notifications from 'expo-notifications';
import { PrimaryButton } from "../../components/CustomButton";
import WheelPicker from '@quidone/react-native-wheel-picker';


const DailyGoal = () => {
    
    const [goal, setGoal] = useState('Pages');

    const handleGoalTypePage = () => setGoal('Pages');

    const handleGoalTypeTime = () => setGoal('Time');

    const handleHourInputChange = () => {}

    const handleMinuteInputChange = () => {}

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

    const [hour, setHour] = useState(0);

    const [minute, setMinute] = useState(0);

    const [timeFormats, setTimeFormats] = useState("AM");

    const [hasNotificationPermission, setNotificationPermission] = useState(false);

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

    useEffect(() => {
        const checkPermissions = async () => {
            const permissions = await Notifications.getPermissionsAsync();
            setNotificationPermission(permissions.granted);
        };
        
        checkPermissions();
    }, [])

    return <SafeAreaView className="bg-[#F7F7F7] h-full">
        <View className="max-h-[60px] justify-between items-center flex-row h-full mx-5 mb-8">
            <TouchableOpacity
                className="mr-4"
                onPress={() => router.back()}>
                <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-black font-cygrebold flex-1 text-[22px] font-bold">Daily Goal</Text>
            <TouchableOpacity
                className="bg-primary flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full rounded-[30px]">
                <Text className="text-[#FEFEFC] text-[18px] leading-[22px] font-semibold">Save</Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
            <View className="mx-5 mb-4">
                <Text className="text-[#121F16] text-[18px] font-cygrebold mb-2">Type of goal</Text>
                <View className="flex-row">
                    <GoalType goal={'Pages'} selected={goal == 'Pages'} onPress={handleGoalTypePage} />
                    <GoalType goal={'Time'} selected={goal === 'Time'} onPress={handleGoalTypeTime} />
                </View>
            </View>
            <View className="mx-5 flex-row">
                <View className="flex-1 max-w-[155px] mr-4">
                    <Text className='text-[#121F16] text-[14px]'>Hours</Text>
                    <View className="border-[.5px] border-[#8A8A8A] rounded-[15px] max-w-[155px] mb-7">
                        <TextInput
                            keyboardType='numeric'
                            onChangeText={handleHourInputChange}
                            className="px-10 py-3 text-black leading-[19.2px] font-cygreregular" 
                        />
                    </View>
                </View>

                <View className="flex-1 max-w-[155px]">
                    <Text className='text-[#121F16] text-[14px]'>Minutes</Text>
                    <View className="border-[.5px] border-[#8A8A8A] rounded-[15px] max-w-[155px] mb-7">
                        <TextInput
                            keyboardType='numeric'
                            onChangeText={handleMinuteInputChange}
                            className="px-10 py-3 text-black leading-[19.2px] font-cygreregular" 
                        />
                    </View>
                </View>
            </View>
            <View className="mx-5 mb-5">
                <Text className="text-[#121F16] text-[18px] font-cygrebold mb-2">Set reminder</Text>
                    <View className="border-[2px] border-[#6592E3] bg-white rounded-[13px] max-h-[72px]">
                        <View className="flex-row justify-between items-center p-3">
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

            <View className="mx-5 mb-5">
                <PrimaryButton title={'Another One'}
                    containerStyles={'rounded-[47px] max-h-[60px] flex-1'}
                    textStyles={'text-[16px]'} />
            </View>

            <View className="items-center relative gap-x-5 flex-row justify-center max-h-[250px] border border-[#8A8A8A] rounded-[15px] mx-5 mb-7">
                <WheelPicker
                    style={{position: 'relative' }}
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
            
            <View className="mx-5 flex-row mb-5 flex-wrap">
                <DayTimeSelectedChip time={'8:00 AM'} />
                <DayTimeSelectedChip time={'8:00 PM'} />
            </View>
        </ScrollView>
    </SafeAreaView>
}

const GoalType = ({ goal, selected, onPress }) => {
    return <TouchableOpacity onPress={onPress} className={`${selected ? 'bg-primary' : 'bg-[#fff]'}  py-2 px-3 max-h-[40px] mr-1.5 border-[.5px] border-[#8A8A8A] rounded-[8px] justify-between items-center flex-row`}>
        { selected ? <Feather name="check" size={16} color="white" /> : <></> }
        <Text className={`${selected ? 'text-white ml-2' : 'text-black'} text-[14px] leading-[20px] font-cygrebold`}>{goal}</Text>
    </TouchableOpacity>
}
const DayTimeSelectedChip = ({ time }) => {


    return <View className="rounded-[5px] bg-[#121F16] h-[32px] m-1 w-full max-w-[111px] justify-between items-center px-2 py-1 flex-row">
        <Text className="text-white text-[14px] font-cygrebold mr-2 leading-[16.8px]">{time}</Text>
        <TouchableOpacity className="bg-white rounded-full p-.0.5 justify-center items-center">
            <MaterialIcons name="close" />
        </TouchableOpacity>
    </View>
}


export default DailyGoal;