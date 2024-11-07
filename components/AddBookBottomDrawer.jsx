import {
    Modal,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Pressable,
} from "react-native";

import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";

const AddBookBottomDrawer = ({ isBottomSheetOpen, setIsBottomSheetOpen }) => {

    const windowHeight = Dimensions.get('window').height;


    // Function to open the bottom sheet 
    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    // Function to close the bottom sheet
    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };


    return <Modal
            animationType="slide"
            transparent={true}
            visible={isBottomSheetOpen}
            onRequestClose={handleOpenBottomSheet}>
                <Pressable
                    onPress={handleCloseBottomSheet}
                    className="absolute h-full w-full z-0 bg-[#3D3D3D61] opacity-[38]"
                ></Pressable>
                <View className="rounded-t-[30px] p-4 z-10" style={[styles.bottomSheet, { height: windowHeight * 0.3 }]}>
                    <Text className="text-[#000000] mb-6 font-cygrebold text-[22px] leading-[26.4px]">Add a Book</Text>
                    <TouchableOpacity
                        onPress={() => router.push("(auth)/search-book")}
                        className="rounded-[15px] bg-[#1C1C1C] max-h-[56px] w-full h-full flex-row items-center px-7 max-w-[360px] mb-2">
                        <MaterialIcons name='search' size={25} color={'#fff'} />
                        <Text className="text-[#FEFEFC] font-cygrebold leading-[19.2px] ml-6">Add By Search</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="rounded-[15px] bg-[#1C1C1C] max-h-[56px] w-full h-full flex-row items-center px-7 max-w-[360px] mb-2">
                        <MaterialIcons name='keyboard' size={25} color={'#fff'} />
                        <Text className="text-[#FEFEFC] font-cygrebold leading-[19.2px] ml-6">Add Manually</Text>
                    </TouchableOpacity>
                </View>
        </Modal>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 23,
        paddingHorizontal: 25,
        bottom: 0,
    },
});


export default AddBookBottomDrawer;




