import { View, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContext } from '../../context/UserContext';
import FormField from '../../components/FormField';
import { PrimaryButton } from '../../components/CustomButton';
import { router } from 'expo-router';
import axios from 'axios';


const SignUp = () => {
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [hasError, setHasError] = useState(false);

  const handleSignUpClick = async () => {
    const { name, email, password } = form;
    await registerUser(email, name, password);
  }

  const registerUser = async (email, username, password) => {
    try {

      await axios.post('http://192.168.1.31:9645/users', {
        email,
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Axios automatically throws for non-2xx status codes,
      // so if we get here, the request was successful
      router.push("onboarding");
    } catch (error) {
      setHasError(true);
      console.log(error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    }
  };
  //handle sign up logic and input validation

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-between flex-1 items-center px-[20px] h-full">
          <View className="w-full items-end mt-[70px]">

            <FormField
              title={"Title"}
              placeholder={"Enter your name"} 
              handleChangeText={e => setForm(prev => ({...prev, name: e}))}
            />

            <FormField
              title={"Email"}
              placeholder={"Enter your email"}
              otherStyles={"my-[20px]"} 
              handleChangeText={e => setForm(prev => ({...prev, email: e}))}
              error={hasError}
              errorText={"Invalid email format. Please try again."}
            />

            <FormField
              title={"Password"}
              placeholder={"Enter your password"}
              hintText={"* At least 8 characters long"}  
              handleChangeText={e => setForm(prev => ({...prev, password: e}))}
              error={hasError}
              errorText={"Password should have at least 8 characters."}
            />

            <PrimaryButton title={"Sign up"}
                handlePress={handleSignUpClick}
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