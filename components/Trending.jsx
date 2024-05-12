import { Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { collection, getDocs, limit, onSnapshot, query } from "firebase/firestore"; 
import * as Animatable from 'react-native-animatable';
import { db } from '../app/(auth)/firebaseConfig';

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendItem = ({activeItem, item}) => {
    const [play, setPlay] = useState(false);
    return (
        <Animatable.View className='mr-5' animation={activeItem === item.id ? zoomIn : zoomOut} duration={500}>
            { play ? (
                <Text className='text-white'>Playing</Text>
            ) : <TouchableOpacity className='justify-center items-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
                <ImageBackground source={{ uri: item.thumbnail }} className='w-52 h-72 rounded-[32px] my-5 overflow-hidden shadow-lg shadow-black/40' resizeMode='cover' />
            </TouchableOpacity> }
        </Animatable.View>
    )
}

const Trending = () => {

  const [latestVideos, setLatestVideos] = useState([]);

  const fetchLatestVideos = useCallback(async () => {
    try {
        onSnapshot(query(collection(db, 'videos'), limit(4)), (snapshot) => {
        const temp = snapshot.docs.map((doc) => {
            return ({ key: doc.id, id: doc.id, ...doc.data() }); // Include document ID
        });
        setLatestVideos(temp);
    });
    } catch(error) {
      //Alert.error(error);
      console.log(error)
    }
  }, [])


    useEffect(() => {
        if (latestVideos.length === 0)
        fetchLatestVideos();
    }, []);

    //console.log(latestVideos)

    const [activeItem, setActiveItem] = useState(latestVideos[0]);

    return (
        <FlatList
            data={latestVideos}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TrendItem activeItem={activeItem} item={item} />
            )}
            horizontal
        />
    )
}

export default Trending