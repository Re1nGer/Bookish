import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import ImageHandler from "../../components/ImageHandler";
import { images } from "../../constants";
import axios from '../../network/axios';
import { UserContext } from "../../context/UserContext";
import { useCameraPermissions } from 'expo-camera';
import { CalendarIcon } from "../../components/Svg";

const YouFinishedBook = () => {

    const { imageUrl, id } = useLocalSearchParams();

    const [memoText, setMemoText] = useState('');

    const { memo, setMemo } = useContext(UserContext);

    const [permission, requestPermission] = useCameraPermissions();

    const handleMemoChange = (text) => {
      setMemoText(text)
    }

    const handleOpeningCamera = () => {
      requestPermission().then(j => {
        router.push('camera')
      });
    }

    const handleSave = async () => {

      try {
        const blob = memo.imageBlob;
        const formData = new FormData();
        formData.append('memo', memoText);
        formData.append('bookId', id);
         formData.append('image', {
          uri: memo.imageUri,
          type: blob.type,
          name: blob?._data?.name,
        });
        formData.append('rating', 4);
        
        await axios.post('users/books/read-events', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        router.back();

      } catch(error) {
        console.log(error);
      }
    }

    useEffect(() => {
      return () => {
        setMemo({imageUri: null, imageBlob: null});
      }
    }, []);

    return (
        <SafeAreaView className="bg-[#F7F7F7] flex-1">
          <ScrollView className="flex-1">
              <View className="max-h-[60px] items-center h-full mx-5 mb-7">
                  <View className="flex-row justify-between ites-center w-full items-center mt-2">
                      <TouchableOpacity
                          onPress={() => router.back()}
                          className="flex-1 mr-5 max-w-[44px] w-full items-center justify-center rounded-[10px]">
                              <MaterialIcons name="close" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={handleSave}
                          className="bg-primary rounded-[30px] flex-1 mt-2.5 max-w-[110px] w-full items-center justify-center max-h-[48px] h-full py-2 px-4">
                              <Text className="leading-[19.2px] text-[#fff] font-cygrebold">Save</Text>
                      </TouchableOpacity>
                  </View>
              </View>

              <View className="mx-5 mt-8 items-center flex-1">
                  <Text className="text-black font-cygrebold text-[22px] leading-[26.4px] text-center">
                  Congratulations!
                  </Text>
                  <Text className="text-black font-cygrebold text-[22px] leading-[26.4px] text-center">
                      You’ve finished the book!
                  </Text>
                  <ImageHandler
                      className="mt-7"
                      source={{uri: imageUrl}}
                      width={154}
                      height={219} 
                  />
                  <View className="flex-row gap-1 items-center my-6">
                    <ImageHandler
                        source={images.filledStar}
                        width={39}
                        height={39} 
                    />
                    <ImageHandler
                        source={images.filledStar}
                        width={39}
                        height={39} 
                    />
                    <ImageHandler
                        source={images.filledStar}
                        width={39}
                        height={39} 
                    />
                    <ImageHandler
                        source={images.filledStar}
                        width={39}
                        height={39} 
                    />
                    <ImageHandler
                        source={images.emptyStar}
                        width={39}
                        height={39} 
                    />
                  </View>
                  <View className="border-[.3px] py-5 px-4 rounded-[20px] border-[#8A8A8A] flex-row w-full justify-center my-7">
                    <ImageHandler width={70} height={99} className="max-w-[70px] max-h-[99px] mr-2.5" source={images.book1} />
                    <ImageHandler width={70} height={99} className="max-w-[70px] max-h-[99px] mr-2.5" source={images.book2} />
                    <View className="bg-[#1C1C1C] rounded-[20px] items-center justify-center flex-1">
                      <Text className="text-[22px] font-cygrebold font-bold text-[#fff]">5 more</Text>
                      <Text className="text-sm font-cygreregular text-[#fff] max-w-[90px]">To finish your monthly goal</Text>
                    </View>
                  </View>
                  <Text className="text-black font-cygrebold text-[22px] leading-[26.4px] mt-5 self-start">
                      Keep The Memory
                  </Text>
                  <Text className="text-black leading-[19.2px] self-start font-cygreregular mt-2.5">Capture this precious moment, take a photo and write some final thoughts on this book.</Text>

                  { memo.imageUri ? (
                    <ImageHandler source={memo.imageUri} className="my-6 w-[242px] h-[242px] rounded-full"
                      resizeMode='cover'
                      width={242} height={242} />
                  ) : (

                  <TouchableOpacity
                      onPress={handleOpeningCamera}
                      className="w-[108px] h-[108px] rounded-full bg-primary items-center justify-center mt-7">
                      <Entypo name="camera" size={40} color="white" />
                  </TouchableOpacity>

                  ) }
                  <View className="flex-1 my-7 w-full min-h-[137px]">
                      <TextInput
                          placeholder="How do you feel about this book?" 
                          className="border-[#8A8A8A] p-4 justify-start border-[.5px] rounded-[20px] w-full h-full flex-1"
                          textAlignVertical="top"
                          value={memoText}
                          onChangeText={handleMemoChange}
                      />
                  </View>
              </View>

            <TouchableOpacity className="bg-black px-8 flex-row justify-between my-6 items-center mx-5 rounded-[20px] max-h-[106px] py-4">
                <Text className=" font-cygrebold max-w-[98px] text-white">Share your achievement with others!</Text>
                <CalendarIcon />
            </TouchableOpacity>

          </ScrollView>
        </SafeAreaView>
    );
}

export default YouFinishedBook;