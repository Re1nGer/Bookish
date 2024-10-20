import { View, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router';
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState';
import { collection, query, onSnapshot, where, limit  } from "firebase/firestore"; 
import {  db } from '../(auth)/firebaseConfig';
import VideoCard from '../../components/VideoCard';
import { UserContext } from '../../context/UserContext';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = () => {
  const [posts, setPosts] = useState([]);

  const { user, setUser } = useContext(UserContext);

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

  const handleLogout = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      //await GoogleSignin.clearCachedAccessToken();
      //await GoogleSignin.revokeAccess();
      await AsyncStorage.clear();
      //router.push('sign-in');
      //router.push('sign-in');

      // a hack to clear router history to prevent logged out users from going back
      router.dismissAll();
      router.replace('/sign-in')

      setUser({})
    }
    catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    searchPosts();
  }, []);

  const renderItem = ({ item }) => {
    return <VideoCard key={item.id} {...item} showOptions={false} />
  }

  const renderEmptyState = () => {
    return <EmptyState title={"No Videos Found"} subtitle={`No videos found created by you `} />
  }

  const renderListHeader = () => {
    return (
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity className='w-full items-end mb-10' onPress={handleLogout}>
          <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
        </TouchableOpacity>
        <View className='w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center'>
          <Image source={{ uri: user?.photo }} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover' />
        </View>
        <InfoBox
            title={user.name}
            containerStyles={'mt-5'}
            titleStyles={'text-lg'}
         />
        <View className='mt-5 flex-row'>
          <InfoBox
            title={posts.length || 0}
            subtitle='Posts'
            containerStyles={'mr-10'}
            titleStyles={'text-xl'}
           />
          <InfoBox
            title={'1.2k'}
            titleStyles={'text-xl'}
            subtitle='Followers'
           />
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