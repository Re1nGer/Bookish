import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react'
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

  const getStageName = () => {
    if (curStage === 1) return "Forgot Password"
    if (curStage === 2) return "Verification"
    return "New Password";
  }

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full flex-1 justify-between'>
          <View className="w-full h-full justify-between max-h-[60%] pt-[23px] items-start">
            <Text className="font-inter text-[24px] text-[#000000] font-bold px-[25px] pt-10 pb-9">{getStageName()}</Text>
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
              ) : curStage === 3 ? (
                <NewPassowrd /> 
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
      <TimeLeft />
      <DigitSellInput />
      <ResendButton />
    </View>
  </View>
}


const TimeLeft = () => {
  const { formattedTime } = useTimer(0, 25);

  return <Text className="text-[15px] leading-[20px] tracking-[.1px] text-[#262626] font-robotoblack font-bold text-center mt-[12px]">{formattedTime}</Text>
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




const DigitSell = ({ value, setValue }) => {

  return (
    <View className="border border-[#000000] items-center justify-center mr-2 rounded-[12px] w-[50px] h-[57px]">
      <TextInput
        maxLength={1}
        value={value}
        //onChangeText={(e) => setValue(prev => ([...prev, e]))}
        className='text-[18px] leading-[20px] tracking-[.1px] font-roboto text-center'
      />
    </View>
  );
}

const DigitSellInput = () => {

  const [verificationCode, setVerificationCode] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])


  const callback = useCallback(() => {
    if (verificationCode.length === 4) {
      //make api call
      alert("the passsword is sent")
    }
  }, [verificationCode.length])

  callback();

  console.log(verificationCode)

  return  (
      <View className="w-full mt-[24px] flex-row">
        <TextInput
          className="opacity-0"
          keyboardType="numeric"
          ref={inputRef}
          maxLength={4}
          onChangeText={(e) => setVerificationCode(prev => [...prev, e]) }
        />
        <DigitSell
          value={verificationCode.length > 0 ? verificationCode[0][0] : null}
          //setValue={setVerificationCode}
        />
        <DigitSell
          value={verificationCode.length > 1 ? verificationCode[1][1] : null}
          //setValue={setVerificationCode}
        />
        <DigitSell
          value={verificationCode.length > 2 ? verificationCode[2][2] : null} 
          //setValue={setVerificationCode}
        />
        <DigitSell
          value={verificationCode.length > 3 ? verificationCode[3][3] : null}
          //setValue={setVerificationCode}
        />
      </View>
      )
}

const NewPassowrd = () => {

  const [password, setNewPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleUpdate = () => {}

  return <View className="w-full ">
    <FormField
      title={"Enter New Password"}
      titleStyles={"font-roboto text-[#373737] font-medium text-[14px] leading-[20px] tracking-[.1px]"}
      placeholder={'random@domain.com'}
      placeholderTextColor={"#777777"}
      textInputStyles={'bg-[#EFEFEF] text-[12px] leading-[20px] tracking-[.1px] font-roboto font-semibold'}
      textInputContainerStyles={'bg-[#EFEFEF] rounded-[5px] border-0'}
      otherStyles={'max-h-[52px] h-full mb-[50px]'}
      handleChangeText={(e) => setNewPassword(prev => ({ ...prev, oldPassword: e })) }
      value={password.oldPassword}
    />

    <FormField
      title={"Confirm New Password"}
      titleStyles={"font-roboto text-[#373737] font-medium text-[14px] leading-[20px] tracking-[.1px]"}
      placeholder={'random@domain.com'}
      placeholderTextColor={"#777777"}
      textInputStyles={'bg-[#EFEFEF] text-[12px] leading-[20px] tracking-[.1px] font-roboto font-semibold'}
      textInputContainerStyles={'bg-[#EFEFEF] rounded-[5px] border-0'}
      otherStyles={'max-h-[52px] h-full mb-[50px]'}
      handleChangeText={(e) => setNewPassword(prev => ({ ...prev, newPassword: e })) }
      value={password.newPassword}
    />

    <TouchableOpacity
      onPress={handleUpdate}
      className="rounded-[100px] bg-[#373737] max-w-[327px] w-full h-[40px] items-center justify-center">
      <Text className="text-sm font-roboto leading-[20px] tracking-[.1px] text-white text-center">Update</Text>
    </TouchableOpacity>
  </View>
}

export default ForgotPassword;