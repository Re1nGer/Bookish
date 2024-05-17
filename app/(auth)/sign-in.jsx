import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
import { db } from './firebaseConfig';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '691662689785-pngqudprjbmp2hpl4navnjdull1hrndv.apps.googleusercontent.com'
});

const SignIn = () => {
  

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
  } catch (error) {
    console.error(error);
  }
};


  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveUser = async (email, name) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        name: name
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const userExistsWith = async (email) => {
    const usersRef = query(collection(db, "users"), where("email", "==", email));
    try {
      const querySnapshot = await getDocs(usersRef);
      
      if (!querySnapshot.empty) {
        return true;
      } 
      return false;
    } catch (error) {
      console.error("Error checking if user exists:", error);
      throw error; // Propagate the error
    }
  }

  const handleEmailSignIn = async () => {
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push('/home');
      console.log(user)
    } catch(error) {
      console.log(error)
    }
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'  />
          <Text className='text-semibold mt-10 font-semibold text-white text-2xl'>Log In to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})} 
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})} 
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={async () => await handleEmailSignIn()}
            containerStyles={'mt-7'}
            isLoading={isSubmitting}
          />
          <Text className="font-pmedium text-base text-center text-gray-100 my-3">Or</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            style={{ alignSelf: 'center' }}
            onPress={async () => {
              try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                const { user: { email, name } } = userInfo;
                if (!userExistsWith(email)) {
                  await saveUser(email, name);
                }
                router.push('/home');
                await AsyncStorage.setItem('email', email);
              } catch (error) {
                console.error(error);
              }
            }}
           />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account ?</Text>
            <Link href={'/sign-up'} className='text-lg font-psemibold text-secondary-100'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn