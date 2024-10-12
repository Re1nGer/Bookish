import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  router } from 'expo-router';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../context/UserContext';
import { icons } from '../../constants';
import FormField from '../../components/FormField';
import useTimer from '../hooks/useTimer';


const ForgotPassword = () => {
  
  const [curStage, setCurStage] = useState(1);

  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    setCurStage(prev => prev + 1);
  }

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full flex-1 justify-between'>
          <View className="w-full h-full justify-between max-h-[60%] pt-[23px] items-start">
            <Text className="font-inter text-[24px] text-[#000000] font-bold px-[25px] pt-10 pb-9">{curStage !== 1 ? "Verification" : "Forgot Password"}</Text>
            <View className="w-full h-full justify-start px-[31px] max-h-[320px]">
              <View className="w-full flex-row">
                <Stage active={curStage === 1} />
                <Stage active={curStage === 2} styles={'mx-[10px]'} />
                <Stage active={curStage === 3} />
              </View>
              { curStage === 1 ? (
                <View className="mt-[75px] h-fit">
                  <FormField
                    title={"Enter Email Address"}
                    titleStyles={"font-roboto text-[#373737] font-medium text-[14px] leading-[20px] tracking-[.1px]"}
                    placeholder={'random@domain.com'}
                    placeholderTextColor={"#777777"}
                    textInputStyles={'bg-[#EFEFEF] text-[12px] leading-[20px] tracking-[.1px] font-roboto font-semibold'}
                    textInputContainerStyles={'bg-[#EFEFEF] rounded-[5px] border-0'}
                    otherStyles={'max-h-[52px] h-full mb-[50px]'}
                    handleChangeText={(e) => setEmail(e) }
                    value={email}
                  />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="rounded-[100px] bg-[#373737] max-w-[327px] w-full h-[40px] items-center justify-center">
                    <Text className="text-sm font-roboto leading-[20px] tracking-[.1px] text-white text-center">Submit</Text>
                  </TouchableOpacity>
                </View>
              ) : curStage === 2 ? (
                <SentTo email={email} setEmail={setEmail} />
              ) : <></> }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const Stage = ({ active = false, styles }) => {
  return <View className={`bg-[#D9D9D9] rounded-[13px] ${active ? 'bg-[#787878]' : ''} w-[102px] h-[8px] ${styles}`}></View>
}

//perhaps we could encapsulate it into separate view
const SentTo = ({ email, setEmail }) => {

  const inputRef = useRef(null);

  const { formattedTime, seconds, minutes } = useTimer(0, 25);

  const handleEditEmail = (e) => {
    setEmail(e)
  }

  const isEmailEditable = useRef(false)

  const handleOnEditIconClick = () => {
    isEmailEditable.current = true;
    inputRef.current.focus();
  }

  return <View className="mt-[42px] items-center">
    <Text className="font-roboto font-medium leading-[20px] tracking-[.1px] text-[#373737] text-center">Sent To</Text>
    <View className="bg-[#EFEFEF] relative rounded-[5px] h-[36px] w-[247px] flex-row justify-between items-center px-[16px] mt-[16px]">
      <TextInput
        ref={inputRef}
        value={email}
        onBlur={() => {isEmailEditable.current = false}}
        onChangeText={handleEditEmail}
        className="font-medium font-roboto text-[#777777] text-[14px] max-w-[180px]"  />
      <TouchableOpacity onPress={handleOnEditIconClick}>
        <View className='relative rounded-[5px] bg-[#D9D9D9] w-[24px] items-center justify-center h-[24px]'>
          <Image source={icons.edit} className='w-[16px] h-[16px] absolute' />
        </View>
      </TouchableOpacity>
    </View>
    <View className="mt-[50px] items-center">
      <Text className="text-[20px] leading-[20px] tracking-[.1px] text-[#373737] font-robotoblack">Enter Verification Code</Text>
      <Text className="text-[15px] leading-[20px] tracking-[.1px] text-[#262626] font-robotoblack font-bold text-center mt-[12px]">{formattedTime}</Text>
      <View className="w-full mt-[24px] flex-row">
        <DigitSell />
        <DigitSell />
        <DigitSell />
        <DigitSell />
      </View>
      { seconds === 0 && minutes === 0 && (
        <TouchableOpacity className="border border-[#000000] rounded-[100px] mt-[47px] w-[327px] h-[40px] items-center justify-center">
          <Text className="text-sm leading-[20px] tracking-[.1px] font-medium font-roboto">Resend Code</Text>
        </TouchableOpacity>
      ) }
    </View>
  </View>
}


const DigitSell = ({ value }) => {
   return <View className="border border-[#000000] items-center justify-center mr-2 rounded-[12px] w-[50px] h-[57px]">
    <TextInput maxLength={1} value={value} className='text-[18px] leading-[20px] tracking-[.1px] font-roboto text-center' />
  </View>
}

export default ForgotPassword;