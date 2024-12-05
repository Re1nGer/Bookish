import { StyleSheet, Text, Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { images } from '../constants'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}>
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({})


const PrimaryButton = ({ title, handlePress, containerStyles, textStyles }) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={1}
        className={`bg-secondary min-h-[52px] justify-center items-center ${containerStyles}`}>
      <Text className={`text-white font-cygresemibold text-[18px] ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}


const SignInWithProvider = ({ provider = 'google', title, handlePress, containerStyles, textStyles }) => {

  let sourceImage = '';

  if (provider === 'google') {
    sourceImage = images.googleIcon
  } else if (provider === 'facebook') {
    sourceImage = images.faceBookIcon
  }
  else {
    sourceImage = images.appleIcon;
  }

  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-[#FFFFFF] border-[#8A8A8A] border-[1px] max-h-[52px] h-full justify-center ${containerStyles}`}>
        <View className='items-center flex-row justify-center'>
            <Image source={sourceImage} height={20} width={20} className='' />
            <Text className={`text-[#1C1C1C] font-cygresemibold text-[18px] ${textStyles}`}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}


export { CustomButton, PrimaryButton, SignInWithProvider }