import { useLocalSearchParams } from 'expo-router'

import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import EmptyState from '../../components/EmptyState';
import { collection, getDocs, query, onSnapshot, where, limit  } from "firebase/firestore"; 
import { db } from '../(auth)/firebaseConfig';
import VideoCard from '../../components/VideoCard';

const Search = () => {

  const { query: q } = useLocalSearchParams();
  const [posts, setPosts] = useState([]);

  const onRefresh = () => {}

  const searchPosts = async () => {
    try {
      onSnapshot(query(collection(db, 'videos'), where('title', '==', q), limit(5)), (snapshot) => {
        console.log(snapshot, q)
        const temp = snapshot.docs.map((doc) => {
          return ({ key: doc.id, id: doc.id, ...doc.data() }); // Include document ID
        });
        setPosts(temp);
      })


    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    searchPosts();
  }, [q]);

  const renderItem = ({ item }) => {
    return <VideoCard key={item.id} {...item} />
  }

  const renderEmptyState = () => {
    return <EmptyState title={"No Videos Found"} subtitle={"Be the first one to make a video"} />
  }

  const renderListHeader = () => {
    return (
      <View className="my-6 px-4 sapce-y-6">
            <View className="justify-between item-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="font-psemibold text-2xl text-white">JsMastery</Text>
              </View>
               <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain"  />
               </View>
            </View>
      </View>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <Text className='text-3xl text-white'>{q}</Text>
      <FlatList
        data={posts}
        //maxToRenderPerBatch={5}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={false} />}
      />
    </SafeAreaView>
  )
}

export default Search