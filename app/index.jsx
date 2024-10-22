import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { images } from '../constants';
import { PrimaryButton, SignInWithProvider } from '../components/CustomButton';

/* GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '691662689785-pngqudprjbmp2hpl4navnjdull1hrndv.apps.googleusercontent.com'
}); */

// there's certain problem with welcome screen on galaxy s models
// sign in link is not visible

export default function App() {

    return (
        <SafeAreaView className="bg-[#F7F7F7] h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="py-[20px] w-full">
                    <Text className="font-cygrebold color-[#000000] pb-2 text-center text-[24px]">Welcome To Bookish Beasts !</Text>
                    <View className="font-cygreregular space-y-0 leading-[20px] text-center px-[50px] w-full"> 

                        <View>
                            <Text className="text-[#000000] font-cygreregular leading-[20px] text-center w-full text-[16px]">Read. Remember. Enjoy. </Text>
                        </View>
                        <View>
                            <Text className="text-[#000000] font-cygreregular leading-[20px] text-center w-full text-[16px]">Start setting up your account to begin your personolized reading journey.</Text>
                        </View>

                    </View>
                </View>
                <View className="items-center">
                    <Image source={images.welcome} resizeMode='contain' className='max-w-[185px] max-h-[202px]' />
                </View>
                <View className='items-center mb-[28px] mt-[33px] px-[20px]'>
                    <PrimaryButton title={"Sign up"}
                        handlePress={() => router.push('(auth)/sign-up')}
                        containerStyles={'max-w-[353px] w-full rounded-3xl'}
                        textStyles={'text-center justify-center items-center'}
                    />
                </View>
                <View className='items-center px-[20px]'>
                    <SignInWithProvider title={'Continue with Google'} containerStyles={'max-w-[353px] w-full rounded-3xl'} textStyles={'text-center ml-3'} />
                    <SignInWithProvider provider='facebook' title={'Continue with Facebook'} containerStyles={'max-w-[353px] my-[10px] w-full rounded-3xl'} textStyles={'text-center ml-3'} />
                    <SignInWithProvider provider='apple' title={'Continue with Apple'} containerStyles={'max-w-[353px] w-full rounded-3xl'} textStyles={'text-center ml-3'} />
                </View>
                <View className="w-full flex-1 items-center justify-center">
                    <TouchableOpacity onPress={() => router.push('(auth)/sign-in')}>
                        <Text className='font-cygreregular text-[#373737] text-[16px] text-center'>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#F7F7F7' style='dark' />
        </SafeAreaView>
    );
}