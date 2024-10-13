import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContext } from '../../context/UserContext';
import FormField from '../../components/FormField';
import { PrimaryButton } from '../../components/CustomButton';
import { router } from 'expo-router';
import Stage from '../../components/Stage';


const NewPassword = () => {

  const [password, setNewPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleUpdate = () => {}

  return <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full flex-1 justify-between'>
          <View className="w-full h-full justify-between max-h-[60%] pt-[23px] items-start">
            <Text className="font-inter text-[24px] text-[#000000] font-bold px-[25px] pt-10 pb-9">New Password</Text>
            <View className="w-full h-full justify-start px-[31px] max-h-[320px]">
              <View className="w-full flex-row">
                <Stage />
                <Stage styles={'mx-[10px]'} />
                <Stage active={true} />
              </View>

              <View className="w-full mt-[63px]">
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

              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
}

export default NewPassword;