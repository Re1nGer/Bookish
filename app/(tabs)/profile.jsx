import { useLocalSearchParams } from 'expo-router'
import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState';
import { collection, query, onSnapshot, where, limit  } from "firebase/firestore"; 
import { db } from '../(auth)/firebaseConfig';
import VideoCard from '../../components/VideoCard';
import SearchInput from '../../components/SearchInput';
import { UserContext } from '../../context/UserContext';

const Profile = () => {
  const { query: q } = useLocalSearchParams();

  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserContext);

  console.log(user);

  const onRefresh = () => {}

  const searchPosts = async () => {
    try {
      onSnapshot(query(collection(db, 'videos'),
        where('createdBy', '==', user?.id), limit(5)), (snapshot) => {
        const temp = snapshot.docs.map((doc) => {
          return ({ key: doc.id, id: doc.id, ...doc.data() }); // Include document ID
        });
        setPosts(temp);
      });
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
    return <EmptyState title={"No Videos Found"} subtitle={`No videos found for the query: ${q}`} />
  }

  const renderListHeader = () => {
    return (
      <View className="my-6 px-4">
        <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
        <Text className="font-psemibold text-2xl text-white">{q}</Text>
        <View  className='mt-6 mb-8'>
          <SearchInput initialQuery={q} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={false} />}
      />
    </SafeAreaView>
  )
}

export default Profile