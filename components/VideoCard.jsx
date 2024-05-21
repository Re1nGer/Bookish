import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { icons } from '../constants'
import { setDoc, doc } from "firebase/firestore"; 
import { db } from '../app/(auth)/firebaseConfig';
import { Video } from 'expo-av';
import { UserContext } from '../context/UserContext';

const VideoCard = ({ title, video, thumbnail, creator, id, isSaved }) => {

    const [play, setPlay] = useState(false);

    const [isOptionOpen, setIsOptionOpen] = useState(false);

    const { user } = useContext(UserContext);

    const handleDelete = async () => {}

    const handleSave = async () => {
        try {
            await setDoc(doc(db, "saved", id), {
                userId: user?.id,
                videoId: id
            });
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <View key={id} className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-1 flex-row'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
                        <Image source={{ uri: 'https://gravatar.com/avatar/fb7ba2bc65d6d8227f4cb8328d780176?s=400&d=identicon&r=g'}} className="w-full h-full" resizeMode='contain' />
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-white font-psemibold text-sm' numberOfLines={1}>{title}</Text>
                        <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>Random Username</Text>
                    </View>
                </View>

                <TouchableOpacity className='pt-2 relative z-40'
                    onPress={() => setIsOptionOpen(!isOptionOpen)}>
                    <Image source={icons.menu} className='w-5 h-5 relative z-0' resizeMode='contain'/>
                    { isOptionOpen ? (
                        <View className='w-40 h-35 flex-col justify-start items-start gap-y-1 absolute right-0 top-10 z-20 border-[.7px] border-gray-600 bg-black-100 rounded-2xl'>
                            { isSaved ? (
                                <TouchableOpacity className='gap-x-3 h-10 flex-row items-center justify-center ml-2'>
                                    <Image source={icons.trash} className='h-4 w-4' />
                                    <Text className='text-gray-100 text-base '>Delete</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity className='gap-x-3 h-10 flex-row items-center justify-center ml-2' onPress={async () => await handleSave()}>
                                    <Image source={icons.bookmark} className='h-4 w-4' />
                                    <Text className='text-gray-100 text-base'>Save</Text>
                                </TouchableOpacity>
                            ) }
                        </View>
                    ) : null }
                </TouchableOpacity>

            </View>
            { play ? (
                <View className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'>
                    <Video source={{ uri: video }} useNativeControls className='h-full w-full rounded-xl mt-3' resizeMode='cover' />
                </View>
            ) : (
                <TouchableOpacity className='w-full h-60 rounded-xl mt-3 relative justify-center items-center z-0' activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <Image source={{ uri: thumbnail }} className='h-full w-full rounded-xl mt-3' resizeMode='cover' />
                    <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
                </TouchableOpacity> 
            ) }
        </View>
    )
}

export default VideoCard