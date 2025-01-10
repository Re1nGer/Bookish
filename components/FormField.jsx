import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useState } from 'react';
import { icons } from '../constants';
import React from 'react'

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    titleStyles,
    textInputStyles,
    textInputContainerStyles,
    placeholderTextColor,
    otherStyles,
    error,
    errorText,
    hintText,
    maxLength,
    ...rest
  }) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyles}`}>
      <Text className={`text-base font-cygresemibold text-[#1C1C1C] text-[18px] mb-1 ${titleStyles}`}>{title}</Text>
      <View className={`border w-full px-4 py-3 h-14 bg-white border-[#8A8A8A] rounded-xl items-center flex-row ${textInputContainerStyles} ${error ? 'border-red border-2' : ''}`}>
        <TextInput
          autoCapitalize='none'
          className={`flex-1 bg-white font-cygreregular h-full justify-center items-center text-base max-h-[54px] ${textInputStyles}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ?? "#49454F"}
          maxLength={maxLength}
          onChangeText={handleChangeText}
          secureTextEntry={title.includes('Password') && !showPassword}
         />
         {title.includes('Password') && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
{/*             <EyeIconOpen color={ error ? '#DF4E37' : '#777777'} /> */}
            <Image source={showPassword ? icons.eye : icons.eyeHide} className={'w-6 h-6'} resizeMode='contain' />
          </TouchableOpacity>
         ) }
      </View>
      { (hintText && !error) ? <Text className='font-cygrebold text-[12px] max-h-[40px] h-full text-[#777777]'>{hintText}</Text> : <></> }
      { (error && errorText) ? <Text className='font-cygrebold max-h-[20px] text-[12px] text-red'>{errorText}</Text> : <></> }
    </View>
  )
}

export default FormField;

const styles = StyleSheet.create({})