import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  router } from 'expo-router';
import FormField from '../../components/FormField';

function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email);
}


const SignIn = () => {
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSigningIn = () => {
    setHasSubmitted(true);
  }

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full flex-1 justify-between'>
          <View className="w-full h-full justify-between max-h-[60%] pt-[23px] items-start">
            <Text className="font-inter text-[24px] text-black font-bold px-[25px] pt-10 pb-8">Sign In</Text>
            <View className="w-full h-full justify-start px-[31px] max-h-[320px]">

              <FormField
                title={"Email"}
                titleStyles={"font-roboto text-[#373737] font-semibold"}
                placeholder={'Enter your email'}
                placeholderTextColor={"#777"}
                textInputStyles={'bg-[#EFEFEF] text-[12px] font-roboto font-semibold'}
                textInputContainerStyles={'bg-[#EFEFEF] rounded-[5px] border-0'}
                otherStyles={'max-h-[52px] h-full mb-[50px]'}
                handleChangeText={(e) => setForm({ ...form, email: e }) }
                value={form.email}
                error={hasSubmitted && form.email && !isValidEmail(form.email)}
              />
              <View className='w-full'>
                <FormField
                  title={"Password"}
                  titleStyles={"font-roboto text-[#373737] font-semibold"}
                  placeholder={'At least 8 characters'}
                  placeholderTextColor={"#777"}
                  textInputStyles={'bg-[#EFEFEF] text-[12px] font-roboto font-semibold'} 
                  textInputContainerStyles={'bg-[#EFEFEF] rounded-[5px] border-0'}
                  otherStyles={"max-h-[90px] h-full space-y-0"}
                  error={hasSubmitted && form.password.length < 8}
                  errorText={(hasSubmitted && form.password.length < 8) ? "Wrong password. Please try again" : ""}
                />
                <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                  <Text className='underline underline-offset-4 mt-[10px] max-h-[50px] flex-col justify-end text-[#777] text-[11px] font-medium font-roboto leading-[20px] tracking-[.1px]'>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View className="w-full items-center justify-start h-full">
              <TouchableOpacity onPress={handleSigningIn}
                className="rounded-[100px] bg-[#373737] max-w-[327px] w-full h-[40px] items-center justify-center">
                <Text className="text-sm font-roboto leading-[20px] tracking-[.1px] text-white text-center">Sign In</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View className="text-center mt-[40px] mb-[20px]">
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text className="text-base text-center font-cygreregular text-[#373737]">Don't have an account ? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn