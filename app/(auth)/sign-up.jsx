import { View, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContext } from '../../context/UserContext';
import FormField from '../../components/FormField';
import { PrimaryButton } from '../../components/CustomButton';
import { router } from 'expo-router';


const SignUp = () => {
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignUpClick = () => {}
  //handle sign up logic and input validation

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-between flex-1 items-center px-[20px] h-full">
          <View className="w-full items-end mt-[70px]">
            <FormField title={"Title"} placeholder={"Enter your name"} />
            <FormField title={"Email"} placeholder={"Enter your email"} otherStyles={"my-[20px]"} />
            <FormField title={"Password"}  placeholder={"Enter your password"} hintText={"* At least 8 characters long"}  />
            <PrimaryButton title={"Sign up"}
                handlePress={() => router.push('(auth)/sign-up')}
                containerStyles={'max-w-[353px] mt-4 w-full rounded-3xl'}
                textStyles={'text-center justify-center items-center'}
            />
            </View>
          <View className="items-center w-full mb-4">
            <Text className='text-base font-cygreregular text-[#373737]'>By signing up you agree, to our</Text>
            <View className="flex-row">
              <Text className="underline underline-offset-1 text-base font-cygreregular text-[#373737]">Terms of Service</Text>
              <Text className='text-base font-cygreregular text-[#373737]'> and </Text><Text className="underline underline-offset-1 text-base font-cygreregular text-[#373737]">Privacy Policy</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp