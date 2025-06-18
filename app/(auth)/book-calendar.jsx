import React, { useState, Fragment, useCallback, useMemo, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import axios from '../../network/axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { images } from '../../constants';
import ImageHandler from '../../components/ImageHandler';

const INITIAL_DATE = '2025-04-08';


const DayComponent = ({ date, state, marking, onPress, ...rest }) => {

    const isSelected = state === 'today';
    console.log(marking?.imageUrls && marking?.imageUrls)
    //array of read books at the day

    return (
      <TouchableOpacity onPress={() => onPress(date)} className='relative h-[80px]'>
        <View className={isSelected ? "w-[30px] h-[30px] rounded-full bg-black justify-center": ""}>
          <Text className={`text-center ${isSelected ? 'text-white' : ''}`}>
            {date.day}
          </Text>
        </View>
        { marking?.imageUrls && (
          <ScrollView>
            { marking.imageUrls.map(item => <ImageHandler
                key={item}
                id={item}
                className={`max-w-[37px] flex-1 ${isSelected ? 'mt-1' : ''} max-h-[53px]`}
                height={53}
                width={37}
                source={images.book1}
                resizeMode='cover'
            />) }
          </ScrollView>
/*           <Image
            className={`max-w-[37px] ${isSelected ? 'mt-1' : ''} max-h-[53px]`}
            height={53}
            width={37}
            source={images.book1}
            resizeMode='cover'
          /> */
        ) }
      </TouchableOpacity>
    )
}


const BookCalendar = () => {

    const [selected, setSelected] = useState(INITIAL_DATE);

    const [markedDates, setMarkedDates] = useState({
      '2025-06-06': {selected: true, marked: true, selectedColor: 'blue', imageUrl: 'awdw'},
    });

    const handleDayPress = (day) => {
      setSelected(day.dateString);
/*       setMarkedDates({
        [day.dateString]: {
          selected: true,
          selectedColor: '#5E60CE',
        }
      }); */
    };


    const getReadEvents = async () => {
      try {
        const { data } = await axios.get(`users/read-events?date=${new Date().toISOString()}`);
        console.log(data)
        const result = data.reduce((acc, item) => {
        const dateKey = new Date(item.finishedAt).toISOString().split('T')[0];
          if (acc[dateKey]) {
            acc[dateKey].imageUrls.push(item.imageUrl);
          } else {
            acc[dateKey] = {
              marked: true,
              imageUrls: [item.imageUrl]
            };
          }
          
          return acc;
        }, {});
        setMarkedDates(result);
      } catch(error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getReadEvents();
    }, []);

    const renderArrow = (direction) => {
      if (direction === 'left') {
        return (
          <View className="bg-primary ml-[-15px] items-center justify-center w-[42px] h-[43px] rounded-[12px]">
            <Text className="text-white font-cygrebold font-bold text-lg">{'<'}</Text>
          </View>
        );
      } 

      return (
        <View className="bg-primary mr-[-15px] items-center justify-center w-[42px] h-[43px] rounded-[12px]">
          <Text className="text-white font-cygrebold font-bold text-lg">{'>'}</Text>
        </View>
      );
    };

    const theme = {
      dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    }

    const renderCalendarWithSelectableDate = () => {
        return (
        <Fragment>
            <Calendar
              markingType={'custom'} 
              theme={theme}
                enableSwipeMonths
                headerStyle={styles.headerStyle}
                renderArrow={renderArrow}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                style={styles.calendar}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                dayComponent={DayComponent}
            />
        </Fragment>
        );
    };


    return <SafeAreaView className="flex-1 h-full bg-[#F7F7F7]">
        <View className="max-h-[40px] justify-between items-center flex-row h-full mx-5 mb-7">
            <View className="flex-row flex-1">
            <TouchableOpacity
                className="flex-1" onPress={() => router.back()}>
                <Image source={require('../../assets/images/left_arrow.png')} />
            </TouchableOpacity>
            </View>
        </View>

      <View className="justify-start h-full">
        <View className="mx-5 mb-7 flex-[.5] justify-start">
          <Text className="text-black font-cygrebold text-[28px]">Book Calendar</Text>
          <Text className="text-black font-cygresemibold max-w-[75%]">See your finished books and captured emotions when finishing the book here.</Text>
        </View>
        <View className="mx-5 rounded-[10px] justify-center max-h-[2000px]">
            {renderCalendarWithSelectableDate()}
        </View>
      </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 20,
    borderColor: '#8A8A8A',
    borderWidth: 1
  },
  headerStyle: {
    position: 'absolute',
    top: -100,
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    tintColor: "transparent",
    width: "100%",
    paddingHorizontal: -100,

  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16
  },
  disabledText: {
    color: 'grey'
  },
  defaultText: {
    color: 'purple'
  },
  customDay: {
    textAlign: 'center'
  }
});



export default BookCalendar;