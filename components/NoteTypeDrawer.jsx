import BookBottomDrawer from "./BottomDrawer";
import NoteType from "./NoteType";
import { Text, FlatList, TouchableOpacity } from 'react-native';


const NoteTypeDrawer = ({ 
    noteTypes,
    isNoteDrawerOpen,
    setIsNoteDrawerOpen,
    setIsNoteTypeDrawerOpen,
    setNoteTypesSelected,
    noteTypesSelected
 }) => {


    const handleChoseNoteType = (id) => {
        //update single entry, the rest set to false
        setNoteTypesSelected((prev) => {
        const resetObj = Object.fromEntries(Object.keys(prev).map(key => [key, false]));
            return {...resetObj, [id]: !prev[id]};
        });
    }

    return (
            <BookBottomDrawer
                height="55%"
                isBottomSheetOpen={isNoteDrawerOpen}
                setIsBottomSheetOpen={setIsNoteDrawerOpen}
                containerStyles={'pb-0'}
            >
                    <Text className="font-cygrebold text-[22px] mt-9 leading-[26.4px] text-center mb-5">Choose Note’s Type</Text>
                    <FlatList
                        className="w-full mx-4"
                        data={noteTypes}
                        maxToRenderPerBatch={10}
                        ListEmptyComponent={() => <Text className="text-[20px] font-cygrebold">No Note Types Yet</Text>}
                        renderItem={({ item }) =>
                            <NoteType
                                key={item.id}
                                name={item.name}
                                icon={item.icon}
                                bgColor={item.bgColor}
                                selected={noteTypesSelected[item.id]}
                                onPress={() => handleChoseNoteType(item.id)}
                            />}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setIsNoteTypeDrawerOpen(true)
                            setIsNoteDrawerOpen(false);
                        }}
                        className="bg-black mb-2 justify-center rounded-[34px] max-h-[56px] items-center w-full h-full">
                        <Text className="text-white font-cygrebold text-[18px] text-center">Add New Type</Text>
                    </TouchableOpacity>
            </BookBottomDrawer>
        );
}


export default NoteTypeDrawer;