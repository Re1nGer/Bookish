import { View, ScrollView, Text } from 'react-native'
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

  return <View className="w-full mt-[63px]">
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

export default NewPassword;