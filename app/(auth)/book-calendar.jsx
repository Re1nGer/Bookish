import React, {useState, Fragment, useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import {Calendar, CalendarUtils, LocaleConfig} from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const INITIAL_DATE = '2025-04-08';

const today = new Date().getDay()


const DayComponent = ({ date, state, marking, onPress }) => {
    //console.log(props)

    const isSelected = state === 'today';
    //array of read books at the day

    return (
      <TouchableOpacity onPress={() => onPress(date)} className='relative h-[80px]'>
        <View className={isSelected ? "w-[30px] h-[30px] rounded-full bg-black justify-center": ""}>
          <Text className={`text-center ${isSelected ? 'text-white' : ''}`}>
            {date.day}
          </Text>
        </View>
{/*         <Image
          className="max-w-[37px] max-h-[53px]"
          height={53}
          width={37}
          source={images.book1}
          resizeMode='cover'
        /> */}
      </TouchableOpacity>
    )
}

const Header = (props) => {
    console.log(props)
    return (
      <View className="absolute -top-4">
        <Text>
          {"some content"}
        </Text>
      </View>
    )
}


const BookCalendar = () => {
    const [selected, setSelected] = useState(INITIAL_DATE);
    const [markedDates, setMarkedDates] = useState({});

    const getDate = (count) => {
        const date = new Date(INITIAL_DATE);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
    };

    const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
    }, []);

    const handleDayPress = (day) => {
      setSelected(day.dateString);
      setMarkedDates({
        [day.dateString]: {
          selected: true,
          selectedColor: '#5E60CE',
        }
      });
    };

    const renderArrow = (direction) => {
      if (direction === 'left') {
        return (
          <TouchableOpacity style={styles.arrowContainer}>
            <Text style={styles.arrowText}>{'<'}</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={styles.arrowContainer}>
            <Text style={styles.arrowText}>{'>'}</Text>
          </TouchableOpacity>
        );
      }
    };

/*     const marked = useMemo(() => {
        return {
        [getDate(-1)]: {
            dotColor: 'red',
            marked: true
        },
        [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
            selectedTextColor: 'red'
        }
        };
    }, [selected]); */

    const theme = {
      dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    }

    const renderCalendarWithSelectableDate = () => {
        return (
        <Fragment>
            <Calendar
              theme={theme}
                enableSwipeMonths
                renderArrow={renderArrow}
                //current={INITIAL_DATE}
                style={styles.calendar}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                dayComponent={DayComponent}
            />
        </Fragment>
        );
    };


    return <SafeAreaView className="flex-1 h-full bg-[#F7F7F7]">
      <View className="justify-center h-full">
        <View className="mx-5 border rounded-[10px] border-[#8A8A8A]">
            {renderCalendarWithSelectableDate()}
        </View>
      </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 20,
    //height: '80%'
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center'
  },
  switchText: {
    margin: 10,
    fontSize: 16
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  },
  disabledText: {
    color: 'grey'
  },
  defaultText: {
    color: 'purple'
  },
  customCalendar: {
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  customDay: {
    textAlign: 'center'
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2'
  }
});



export default BookCalendar;