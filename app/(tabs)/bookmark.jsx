import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../(auth)/firebaseConfig';
import { getDocs, collection, where, doc, onSnapshot, query } from 'firebase/firestore';
import VideoCard from '../../components/VideoCard';
import EmptyState from '../../components/EmptyState';
import SearchInput from '../../components/SearchInput';
import { UserContext } from '../../context/UserContext';

const Bookmark = () => {

  const [savedVideos, setSavedVideos] = useState({});

  const [videos, setVideos] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const { user } = useContext(UserContext);

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchSavedVideos();
    setRefreshing(false)
  }

  const fetchSavedVideos = async () => {
    try {
      onSnapshot(query(collection(db, 'saved'), where('userId', '==', user?.id)), snapshot => {
        let tempObj = {};
        snapshot.docs.forEach((doc) => {
          tempObj[doc.data().videoId.trim()] = doc.data()
        });
        setSavedVideos(tempObj);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAllVideos = async () => {
    try {
      const queryVideo = await getDocs(collection(db, 'videos'));
      const temp = queryVideo.docs.map((doc) => {
        return ({ id: doc.id, ...doc.data() }); // Include document ID
      });
      const saved = temp.filter(item => item.id in savedVideos);
      setVideos(saved);
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchSavedVideos();
  }, [])

  useEffect(() => {
    fetchAllVideos();
  }, [savedVideos])

  const renderItem = ({ item }) => {
    if (item.id in savedVideos) return <VideoCard key={item.id} {...item} isSaved={true} />
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
        <SearchInput />
      </View>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={<RefreshControl
           onRefresh={onRefresh}
           refreshing={refreshing}
        />}
      />
    </SafeAreaView>
  )
}

export default Bookmark