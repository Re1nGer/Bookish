import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useState } from 'react';
import { icons } from '../constants';
import React from 'react'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, error, errorText, hintText, ...rest}) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-cygresemibold text-[#1C1C1C] text-[18px]">{title}</Text>
      <View className={`border w-full h-14 px-4 bg-white border-[#8A8A8A] rounded-xl items-center flex-row ${error ? 'border-[#DF2626]' : ''}`}>
        <TextInput
          className={`flex-1 bg-white font-cygreregular text-base max-h-[54px]`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#49454F"}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
         />
         {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={showPassword ? icons.eye : icons.eyeHide} className={'w-6 h-6'} resizeMode='contain' />
          </TouchableOpacity>
         ) }
      </View>
      { (hintText && !error) ? <Text className='font-cygreregular max-h-[90px] text-[12px] h-full text-[#777777]'>{hintText}</Text> : <></> }
    </View>
  )
}

export default FormField;

const styles = StyleSheet.create({})