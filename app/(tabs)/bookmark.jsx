import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '../../components/VideoCard';
import EmptyState from '../../components/EmptyState';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';

const Bookmark = () => {

  const [savedVideos, setSavedVideos] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {}

  const fetchSavedVideos = async () => {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSavedVideos();
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
            <View className="justify-start item-start flex-row mb-6">
              <View>
                <Text className="font-psemibold text-2xl text-white">Saved Videos</Text>
              </View>
            </View>
            <SearchInput  />
      </View>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={savedVideos}
        //maxToRenderPerBatch={5}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
      />
    </SafeAreaView>
  )
}

export default Bookmark