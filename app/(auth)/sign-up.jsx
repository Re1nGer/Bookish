import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import { Link } from 'expo-router';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {

  const [form, setForm] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSignUp = async () => {
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(auth, form.email, form.password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'  />
          <Text className='text-semibold mt-10 font-semibold text-white text-2xl'>Sign Up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})} 
            otherStyles="mt-10"
          />
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
            title="Sign Up"
            handlePress={() => handleEmailSignUp()}
            containerStyles={'mt-7'}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account ?</Text>
            <Link href={'/sign-in'} className='text-lg font-psemibold text-secondary-100'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp