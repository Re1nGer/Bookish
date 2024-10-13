import { View, Text, ScrollView, TextInput, Image } from 'react-native'
import { TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  router } from 'expo-router';
import Stage from '../../components/Stage';
import { icons } from '../../constants';
import useTimer from '../hooks/useTimer';


const Verification = () => {
  

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full flex-1 justify-between'>
          <View className="w-full h-full justify-between max-h-[60%] pt-[23px] items-start">
            <Text className="font-inter text-[24px] text-[#000000] font-bold px-[25px] pt-10 pb-9">Verification</Text>
            <View className="w-full h-full justify-start px-[31px] max-h-[320px]">
              <View className="w-full flex-row">
                <Stage />
                <Stage active={true} styles={'mx-[10px]'} />
                <Stage />
              </View>
              <SentTo />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const SentTo = () => {

  const [email, setEmail] = useState('')

  const inputRef = useRef(null);

  const handleEditEmail = (e) => {
    setEmail(e)
  }

  //gotta figure out how to share inserted email address

  const handleOnEditIconClick = () => {
    inputRef.current.focus();
  }

  return <View className="mt-[42px] items-center">
    <Text className="font-roboto font-medium leading-[20px] tracking-[.1px] text-[#373737] text-center">Sent To</Text>
    <View className="bg-[#EFEFEF] relative rounded-[5px] h-[36px] w-[247px] flex-row justify-between items-center px-[16px] mt-[16px]">
      <TextInput
        value={email}
        onChangeText={handleEditEmail}
        className="font-medium font-roboto text-[#777777] text-[14px] max-w-[180px]"  />
      <TouchableOpacity onPress={handleOnEditIconClick}>
        <View className='relative rounded-[5px] bg-[#D9D9D9] w-[24px] items-center justify-center h-[24px]'>
          <Image source={icons.edit} className='w-[16px] h-[16px] absolute' />
        </View>
      </TouchableOpacity>
    </View>
    <View className="mt-[50px] items-center">
      <TimeLeft />
      <DigitSellInput />
      <ResendButton />
    </View>
  </View>
}


const TimeLeft = () => {
  const { formattedTime } = useTimer(0, 25);
  return ( 
    <Text className="text-[15px] leading-[20px] tracking-[.1px] text-[#262626] font-robotoblack font-bold text-center mt-[12px]">
        {formattedTime}
    </Text>
  );
}


const ResendButton = () => {

  const { seconds, minutes } = useTimer(0, 25);

  return <>
      { seconds === 0 && minutes === 0 && (
        <TouchableOpacity className="border border-[#000000] rounded-[100px] mt-[47px] w-[327px] h-[40px] items-center justify-center">
          <Text className="text-sm leading-[20px] tracking-[.1px] font-medium font-roboto">Resend Code</Text>
        </TouchableOpacity>
      ) }
  </>
}

const DigitSell = ({ value, onFocus, isError }) => {

  return (
    <View className={`border border-[#000000] items-center justify-center mr-2 rounded-[12px] w-[50px] h-[57px] ${isError ? 'border-2 border-[#E86F68]' : ''}`}>
      <TextInput
        maxLength={1}
        value={value}
        showSoftInputOnFocus={false}
        onFocus={() => onFocus()}
        keyboardType='numeric'
        className={`text-[35px] leading-[50px] tracking-[.1px] font-roboto font-medium text-center ${isError ? 'text-[#E86F68]' : ''}`}
      />
    </View>
  );
}

const DigitSellInput = () => {

  const [verificationCode, setVerificationCode] = useState("");

  const [isVerificationCodeError, setIsVerificationCodeError] = useState(false);

  const inputRef = useRef(null);

  const focusDigitInput = () => {
    inputRef.current?.focus();
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  useEffect(() => {
      if (verificationCode.length === 4) {
        if (verificationCode === "1111") {
          setIsVerificationCodeError(false);
          router.push('/new-password');
        } else {
          setIsVerificationCodeError(true);
        }
      }
    }, [verificationCode, router]);

  return  (
      <View className="w-full mt-[24px] flex-row">
        <TextInput
          className="opacity-0 w-[1px]"
          keyboardType="numeric"
          ref={inputRef}
          maxLength={4}
          value={verificationCode}
          onChangeText={(e) => setVerificationCode(e) }
        />
        <DigitSell
          value={verificationCode.length > 0 ? verificationCode[0] : null}
          onFocus={focusDigitInput}
          isError={isVerificationCodeError}

        />
        <DigitSell
          value={verificationCode.length > 1 ? verificationCode[1] : null}
          onFocus={focusDigitInput}
          isError={isVerificationCodeError}
        />
        <DigitSell
          value={verificationCode.length > 2 ? verificationCode[2] : null} 
          onFocus={focusDigitInput}
          isError={isVerificationCodeError}
        />
        <DigitSell
          value={verificationCode.length > 3 ? verificationCode[3] : null}
          onFocus={focusDigitInput}
          isError={isVerificationCodeError}
        />
      </View>
      )
}


export default Verification;