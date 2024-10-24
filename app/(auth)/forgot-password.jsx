import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  router } from 'expo-router';
import FormField from '../../components/FormField';
import Stage from '../../components/Stage';
import { UserContext } from '../../context/UserContext';
import axios from '../../network/axios';

const ForgotPassword = () => {
  
  const { recoveryEmail, setRecoveryEmail } = useContext(UserContext);

  const sendEmail = async () => {
    try {
      await axios.post('/forgot-password', { email: recoveryEmail });
      router.push('/verification')
    }
    catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    await sendEmail();
  }


  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full flex-1 justify-between'>
          <View className="w-full h-full justify-between max-h-[60%] pt-[23px] items-start">
            <Text className="font-inter text-[24px] text-[#000000] font-bold px-[25px] pt-10 pb-9">Forgot Password</Text>
            <View className="w-full h-full justify-start px-[31px] max-h-[320px]">
              <View className="flex-row items-center justify-center">
                <Stage active={true} />
                <Stage styles={'mx-[10px]'} />
                <Stage />
              </View>
              <View className="mt-[75px] h-fit">
                <FormField
                  title={"Enter Email Address"}
                  titleStyles={"font-roboto text-[#373737] font-medium text-[14px] leading-[20px] tracking-[.1px]"}
                  placeholder={'random@domain.com'}
                  placeholderTextColor={"#777777"}
                  textInputStyles={'bg-[#EFEFEF] text-[12px] leading-[20px] tracking-[.1px] font-roboto font-semibold'}
                  textInputContainerStyles={'bg-[#EFEFEF] rounded-[5px] border-0'}
                  otherStyles={'max-h-[52px] h-full mb-[50px]'}
                  handleChangeText={(e) => setRecoveryEmail(e) }
                  value={recoveryEmail}
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="rounded-[100px] bg-[#373737] max-w-[327px] w-full h-[40px] items-center justify-center">
                  <Text className="text-sm font-roboto leading-[20px] tracking-[.1px] text-white text-center">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}




export default ForgotPassword;