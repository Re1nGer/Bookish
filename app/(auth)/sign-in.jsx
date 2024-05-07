import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [request, response, prompt] = Google.useAuthRequest({
    androidClientId: "691662689785-0sfivp0t331l64r3h8avkoq57uo0g2um.apps.googleusercontent.com"
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {

    try {
      const docRef = await addDoc(collection(db, "test"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'  />
          <Text className='text-semibold mt-10 font-semibold text-white text-2xl'>Log In to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})} 
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})} 
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={() => prompt()}
            containerStyles={'mt-7'}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account ?</Text>
            <Link href={'/sign-up'} className='text-lg font-psemibold text-secondary-100'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn