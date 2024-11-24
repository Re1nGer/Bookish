import { View, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField';
import { PrimaryButton } from '../../components/CustomButton';
import { router } from 'expo-router';
import axios from '../../network/axios';


const SignUp = () => {
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSignUpClick = async () => {
    const { name, email, password } = form;
    await registerUser(email, name, password);
  }

  const registerUser = async (email, username, password) => {
    try {

      await axios.post('/users', {
        email,
        username,
        password
      });

      router.push("onboarding");
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data) //could be a bit more simplified
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        //gotta handle something went wrong case
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-between flex-1 items-center px-[20px] h-full">
          <View className="w-full items-end mt-[70px]">

            <FormField
              title={"Name"}
              placeholder={"Enter your name"} 
              textInputContainerStyles={'border-[.5px]'}
              handleChangeText={e => setForm(prev => ({...prev, name: e}))}
            />

            <FormField
              title={"Email"}
              placeholder={"Enter your email"}
              otherStyles={"my-[20px]"} 
              textInputContainerStyles={'border-[.5px]'}
              handleChangeText={e => setForm(prev => ({...prev, email: e}))}
              error={errors.email}
              errorText={errors.email}
            />

            <FormField
              title={"Password"}
              placeholder={"Enter your password"}
              hintText={"* At least 8 characters long"}  
              textInputContainerStyles={'border-[.5px]'}
              handleChangeText={e => setForm(prev => ({...prev, password: e}))}
              error={errors.password}
              errorText={errors.password}
            />

            <PrimaryButton title={"Sign up"}
                handlePress={handleSignUpClick}
                containerStyles={'mx-[20px] self-center mt-4 w-full rounded-3xl max-h-[65px]'}
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



const Modal = () => {}

//need this to handle the case with duplicate users