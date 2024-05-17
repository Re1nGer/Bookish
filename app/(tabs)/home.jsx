import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../(auth)/firebaseConfig';
import VideoCard from '../../components/VideoCard';

const Home = () => {

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  const [latestVideos, setLatestVideos] = useState([]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllVideos();
    setRefreshing(false);
  }

  const fetchAllVideos = async () => {
    try {
      setIsLoading(true)
      const queryVideo = await getDocs(collection(db, 'videos'));
      const temp = queryVideo.docs.map((doc) => {
        return ({ key: doc.id, id: doc.id, ...doc.data() }); // Include document ID
      });
        setVideos(temp);
    } catch(error) {
      console.error(error)
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (videos.length === 0)
    fetchAllVideos();
  }, [])


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
            <SearchInput />
            <View className="w-full flex-1 pt-5">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
              <Trending />
            </View>
          </View>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        initialNumToRender={3} 
        windowSize={8}
        data={videos}
        maxToRenderPerBatch={5}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() => {
          return (
            <View className="my-6 px-4 sapce-y-6">
            <View className="justify-between item-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="font-psemibold text-2xl text-white">Dummy User</Text>
              </View>
               <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain"  />
               </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
              <Trending />
            </View>
          </View>
    );
  }}
        ListEmptyComponent={renderEmptyState}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
      />
    </SafeAreaView>
  )
}

export default Home