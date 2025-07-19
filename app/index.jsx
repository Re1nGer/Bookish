import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { images } from '../constants';
import { PrimaryButton, SignInWithProvider } from '../components/CustomButton';
import { LocaleConfig } from 'react-native-calendars';

// there's certain problem with welcome screen on galaxy s models
// sign in link is not visible

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: "Today"
};


LocaleConfig.defaultLocale = 'en';

export default function App() {

    return (
        <SafeAreaView className="bg-transparent h-full">
                <View className="py-5 w-full flex-[.2]">
                    <Text className="font-cygrebold color-[#000000] pb-2 text-center text-[24px]">Welcome To Bookish Beasts !</Text>
                    <View className="font-cygreregular leading-[20px] text-center px-8 w-full"> 

                        <View>
                            <Text className="text-[#000000] font-cygreregular leading-[20px] text-center w-full text-[16px]">Read. Remember. Enjoy. </Text>
                        </View>
                        <View>
                            <Text className="text-[#000000] font-cygreregular leading-[20px] text-center w-full text-[16px]">Start setting up your account to begin your personolized reading journey.</Text>
                        </View>

                    </View>
                </View>
                <View className="items-center mt-8 flex-[.5]">
                    <Image source={images.welcome} resizeMode='cover' className='max-w-[185px] max-h-[202px]' />
                </View>
                <View className='items-center my-7 px-[20px] flex-[.1]'>
                    <PrimaryButton title={"Sign up"}
                        handlePress={() => router.push('(tabs)/home')}
                        containerStyles={'max-w-[353px] w-full rounded-3xl'}
                        textStyles={'text-center justify-center items-center'}
                    />
                </View>
                <View className='items-center px-[20px] flex-[.4]'>
                    <SignInWithProvider title={'Continue with Google'} containerStyles={'max-w-[353px] w-full rounded-3xl'} textStyles={'text-center ml-3'} />
                    <SignInWithProvider provider='facebook' title={'Continue with Facebook'} containerStyles={'max-w-[353px] my-[10px] w-full rounded-3xl'} textStyles={'text-center ml-3'} />
                    <SignInWithProvider provider='apple' title={'Continue with Apple'} containerStyles={'max-w-[353px] w-full rounded-3xl'} textStyles={'text-center ml-3'} />
                </View>
                <View className="w-full items-center justify-center flex-[.1]">
                    <TouchableOpacity onPress={() => router.push('(auth)/sign-in')}>
                        <Text className='font-cygreregular text-[#373737] text-[16px] text-center'>Sign In</Text>
                    </TouchableOpacity>
                </View>
            <StatusBar backgroundColor='#F7F7F7' style='dark' />
        </SafeAreaView>
    );
}