import { View, Text, ScrollView, Image } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import {  router } from 'expo-router';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../context/UserContext';


const ForgotPassword = () => {
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  return (
    <SafeAreaView className="bg-[#F7F7F7] h-full">
      <ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPassword