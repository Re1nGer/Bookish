import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { getStorage, ref, uploadBytes } from "firebase/storage";

import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router'
import { app } from '../(auth)/firebaseConfig';

const Create = () => {

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    video: null,
    title: '',
    thumbnail: null,
    prompt: ''
  });

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
      };
    
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };    // this helps us get a blob

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image' ? ['image/png','image/jpg', 'image/jpeg'] : ['video/mp4', 'video/gif']
    })

    console.log(result.assets[0]);
    
    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({...form, thumbnail: result.assets[0] })
      }
      if (selectType === 'video') {
        setForm({...form, video: result.assets[0] })
      }
    }
  }

  const uploadFile = async (file) => {
    try {

      console.log(file);

      const blob = await uriToBlob(result.assets[0].uri);

      console.log(blob);

      const storage = getStorage(app);

      const storageRef = ref(storage, blob.name + blob.blobId);

      await uploadBytes(storageRef, blob);

    } catch(error) {
      console.log(error);
    }
  }

  const submit = async () => {
    if (!form.video || form.title || form.thumbnail || form.prompt) {
      Alert.alert('Please fill in all the fields');
    }
    try {

      await Promise.all([uploadFile(form.thumbnail.uri), uploadFile(form.video.uri)])

      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');

    } catch (error) {
      Alert.alert(error)
    }
    finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      });
      setUploading(false);
    }
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-white font-psemibold text-2xl'>Upload Video</Text>

        <FormField
          title={'Video Title'}
          value={form.title}
          placeholder={'Get Your Video A Catchy Title'}
          handleChangeText={(e) => setForm({...form, title: e})}
          otherStyles={'mt-10'}
        />

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video source={{uri: form.video.uri}} className='w-full h-64 rounded-2xl' useNativeControls resizeMode={ResizeMode.COVER}></Video>
            ) : <View className='h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='h-14 w-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                </View>
              </View>}
          </TouchableOpacity>
        </View>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image source={{uri: form.thumbnail.uri }} className='w-full h-64 rounded-2xl' resizeMode={'cover'}></Image>
            ) : <View className='h-16 px-4 border-2 border-black-200 flex-row space-x-2 bg-black-100 rounded-2xl justify-center items-center'>
                  <Image source={icons.upload} resizeMode='contain' className='w-5 h-5' />
                  <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>
              </View>}
          </TouchableOpacity>
        </View>

        <FormField
          title={'AI Prompt'}
          value={form.prompt}
          placeholder={'The Prompt you used to create this video'}
          handleChangeText={(e) => setForm({...form, title: e})}
          otherStyles={'mt-7'}
        />

        <CustomButton
          title={'Submit & Publish'}
          handlePress={() => {}}
          containerStyles={'mt-7'}
          isLoading={uploading}
        />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Create