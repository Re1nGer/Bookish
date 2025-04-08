import React, {useState, Fragment, useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const INITIAL_DATE = '2024-11-06';

const getRandom = () => {

}

const DayComponent = (props) => {
    //console.log(props)
    return (
      <View>
        <Text>
          {props.date.day}
        </Text>
        <Image
          className="z-50"
          souce={images.book1}
        />
      </View>
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

    const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

    const getDate = (count) => {
        const date = new Date(INITIAL_DATE);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
    };

    const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
    }, []);

    const marked = useMemo(() => {
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
    }, [selected]);

    const renderCalendarWithSelectableDate = () => {
        return (
        <Fragment>
            <Calendar
                enableSwipeMonths
                current={INITIAL_DATE}
                style={styles.calendar}
                onDayPress={onDayPress}
                markedDates={marked}
                dayComponent={DayComponent}
                //customHeader={Header}
            />
        </Fragment>
        );
    };

    return <SafeAreaView className="flex-1 bg-[#F7F7F7]">
      <View className="justify-center flex-1">
        <View className="mx-5 border rounded-[10px] border-[#8A8A8A]">
            {renderCalendarWithSelectableDate()}
        </View>
      </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 20
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
    height: 250,
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