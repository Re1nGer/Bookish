import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  router } from 'expo-router';
import FormField from '../../components/FormField';
import axios from '../../network/axios';


const SignIn = () => {
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState("");

  const handleSigningIn = async () => {
    await login();
  }

  const login = async () => {
    try {
      const { data } = await axios.post('/login', { email: form.email, password: form.password })
      axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
      //console.log(data);
      router.push('/onboarding');
    } catch (error) {
      if (error.response.data) {

        if (error.response.data?.error?.email) {
          Alert.alert("Ooooooops....", "This email isn't already signed!", [
              {
                text: 'Try Again',
                onPress: () => console.log('Cancel pressed'),
                style: 'cancel'
              },
              {
                text: 'Sign up',
                onPress: () => router.push("/sign-up"),
              },
            ],
            {
              cancelable: true,  // Android only - allows tap outside to dismiss
              onDismiss: () => console.log('Alert dismissed')  // iOS only
            }
          );
          return;
        }
        setErrors(error.response.data?.error)
      }
      console.log(error.response.data?.error);
    }
  }

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full flex-1 justify-between'>
          <View className="w-full h-full justify-between max-h-[60%] pt-[23px] items-start">
            <View className="px-[25px] pt-10 pb-8"></View>
            <View className="w-full h-full justify-start px-[31px] max-h-[320px]">

              <FormField
                title={"Email"}
                titleStyles={"font-cygrebold text-black font-semibold"}
                placeholder={'Enter your email'}
                placeholderTextColor={"#777"}
                textInputStyles={'bg-[#EFEFEF] text-[12px] font-roboto font-semibold'}
                textInputContainerStyles={'bg-[#EFEFEF] rounded-[5px] border-0'}
                otherStyles={'max-h-[52px] h-full mb-[50px]'}
                handleChangeText={(e) => setForm({ ...form, email: e }) }
                value={form.email}
                error={errors !== ""}
              />
              <View className='w-full'>
                <FormField
                  title={"Password"}
                  titleStyles={"font-cygrebold text-black font-semibold"}
                  placeholder={'At least 8 characters'}
                  placeholderTextColor={"#777"}
                  textInputStyles={'bg-[#EFEFEF] text-[12px] font-roboto font-semibold'} 
                  textInputContainerStyles={'bg-[#EFEFEF] rounded-[5px] border-0'}
                  otherStyles={"max-h-[90px] h-full space-y-0"}
                  handleChangeText={e => setForm({...form, password: e})}
                  error={errors !== ''}
                  errorText={errors}
                />
                <TouchableOpacity onPress={() => router.push("/forgot-password")} className="mt-3">
                  <Text className='max-h-[50px] flex-col justify-end text-[#777] text-[11px] font-medium font-cygrebold leading-[20px]'>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View className="w-full items-center justify-start h-full">
              <TouchableOpacity onPress={handleSigningIn}
                className="rounded-[100px] bg-primary max-w-[327px] w-full h-[40px] items-center justify-center">
                <Text className="text-sm font-cygrebold leading-[20px] text-white text-center">Sign In</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View className="text-center mt-[40px] mb-[20px]">
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text className="text-base text-center font-cygreregular text-[#373737]">Don't have an account?
                {" "}
               <Text className="underline underline-offset-4 text-base text-center font-cygreregular text-[#373737]">Sign Up</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn