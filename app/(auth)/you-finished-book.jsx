import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import Camera from "../../components/Camera";
import ImageHandler from "../../components/ImageHandler";
import { images } from "../../constants";
import axios from '../../network/axios';

const YouFinishedBook = () => {

    const { imageUrl, id } = useLocalSearchParams();

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [memo, setMemo] = useState('');


    const handleMemoChange = (text) => {
      setMemo(text)
    }

    const handleSave = async () => {
      try {
        const formData = new FormData();
        formData.append('memo', memo);
        formData.append('bookId', id);
        formData.append('rating', 4); // for file uploads
        
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

    const handleOpenCamera = () => {
        setCameraVisible(true);
    };

    const handleCloseCamera = () => {
        setCameraVisible(false);
    };

    const renderCamera = () => {
        return <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={type}>
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>
                {Platform.isTV ? 'Emulator Camera View' : 'Camera View'}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCloseCamera}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
              >
                <Text style={styles.buttonText}>Flip</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
    }

    if (hasPermission) {
        return renderCamera()
    }

    //when camera btn is pressed should redirect to a new screen

    return (
        <SafeAreaView className="bg-[#F7F7F7] flex-1">
            { cameraVisible ? (
                <Camera />
            ) : (
                <ScrollView
                    className="flex-1"
                >
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
                        <TouchableOpacity
                            onPress={handleOpenCamera}
                            className="w-[108px] h-[108px] rounded-full bg-primary items-center justify-center mt-7">
                            <Entypo name="camera" size={40} color="white" />
                        </TouchableOpacity>
                        <View className="flex-1 my-7 w-full min-h-[137px]">
                            <TextInput
                                placeholder="How do you feel about this book?" 
                                className="border-[#8A8A8A] p-4 justify-start border-[.5px] rounded-[20px] w-full h-full flex-1"
                                textAlignVertical="top"
                                value={memo}
                                onChangeText={handleMemoChange}
                            />
                        </View>
                    </View>
                </ScrollView>
            ) }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
});



export default YouFinishedBook;