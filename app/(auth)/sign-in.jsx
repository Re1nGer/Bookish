import { View, Text, ScrollView, Image } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import {  router } from 'expo-router';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../context/UserContext';


const SignIn = () => {
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const { setUser, user } = useContext(UserContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnpress = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (!isSignedIn) {
        const userInfo = await GoogleSignin.signIn();
        const user = userInfo.user;
        console.log('signed in user', user);
        setUser(user);
        await AsyncStorage.setItem('email', user.email);
      }
      else {
        const user = await GoogleSignin.getCurrentUser();
        console.log('current user', user.user);
        setUser(user.user);
        const { user: { email } } = user;
        await AsyncStorage.setItem('email', email);
      }
      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  }, [])


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-between min-h-[50vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'  />
          <View className="justify-center pt-5 flex-col items-center gap-2">
           <Text className='text-semibold mt-10 font-semibold text-white text-xl text-center mx-4'>All it takes is one loss to start doubting yourself again</Text>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              style={{ alignSelf: 'center' }}
              onPress={handleOnpress}
            />
{/*             <View className='flex-row gap-x-2'>
              <Text className="text-lg text-gray-100 font-pregular">Don't have an account ?</Text>
              <Link href={'/sign-up'} className='text-lg font-psemibold text-secondary-100'>Sign Up</Link>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn