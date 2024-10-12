import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { images } from '../constants';
import { PrimaryButton, SignInButton } from '../components/CustomButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '691662689785-pngqudprjbmp2hpl4navnjdull1hrndv.apps.googleusercontent.com'
});

export default function App() {

    return (
        <SafeAreaView className="bg-[#F7F7F7] h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="py-[40px] w-full">
                    <Text className="font-cygrebold color-[#000000] pb-2 text-center text-[24px]">Welcome To Bookish Beasts !</Text>
                    <Text className="font-cygreregular space-y-0 leading-[120%] text-center px-[80px] text-[16px]"> 
                            <Text className="p-[15px] color-[#000000] font-cygreregular leading-[120%] text-center text-[16px]">Read. Remember. Enjoy.</Text>
                            {" "}
                        Start setting up your account to begin your personolized reading journey.
                        </Text>
                </View>
                <View className="items-center">
                    <Image source={images.welcome} resizeMode='contain' className='w-[185px] h-[202px]' />
                </View>
                <View className='items-center mb-[28px] mt-[33px]'>
                    <PrimaryButton title={"Sign up"}
                        handlePress={() => router.push('(auth)/sign-up')}
                        containerStyles={'max-w-[353px] w-full rounded-3xl'}
                        textStyles={'text-center justify-center items-center'}
                    />
                </View>
                <View className='items-center'>
                    <SignInButton title={'Continue with Google'} containerStyles={'max-w-[353px] w-full rounded-3xl'} textStyles={'text-center ml-3'} />
                    <SignInButton provider='facebook' title={'Continue with Facebook'} containerStyles={'max-w-[353px] my-[10px] w-full rounded-3xl'} textStyles={'text-center ml-3'} />
                    <SignInButton provider='apple' title={'Continue with Apple'} containerStyles={'max-w-[353px] w-full rounded-3xl'} textStyles={'text-center ml-3'} />
                </View>
                <Text className='font-cygreregular text-[#373737] text-[16px] pt-[28px] mb-[30px] text-center'>Sign In</Text>
            </ScrollView>
            <StatusBar backgroundColor='#F7F7F7' style='dark' />
        </SafeAreaView>
    );
}