import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const VideoCard = ({ title, video, thumbnail, creator, id }) => {


    const [play, setPlay] = useState(false);

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

                <View className='pt-2'>
                    <Image source={icons.menu} className='w-5 h-5' resizeMode='contain'/>
                </View>
            </View>
            { play ? (
                <Text className='text-white'>Playing</Text>
            ) : (
                <TouchableOpacity className='w-full h-60 rounded-xl mt-3 relative justify-center items-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/react-native-test-a8948.appspot.com/o/120409_r22060_g2048.webp?alt=media&token=14bacc71-004e-4d3f-97ac-ce1ea16d50bd' }} className='h-full w-full rounded-xl mt-3' resizeMode='cover' />
                    <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
                </TouchableOpacity> 
            ) }
        </View>
    )
}

export default VideoCard