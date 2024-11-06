import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Svg, G, Path, Rect, ClipPath, Defs } from 'react-native-svg'
import { MaterialIcons } from '@expo/vector-icons';
import { images } from '../../constants'

const Home = () => {


  return <SafeAreaView className="bg-primary" style={{flex: 1}}>
      <ScrollView>
        <View className="bg-[#FFFFFF] mx-4 my-8 flex-row border-[#727272] border-[.5px] rounded-[15px]">
          <View className="flex-row justify-center flex-1 items-center rounded-[14px] border-0 max-w-[108px] h-[95px] bg-[#6592E3]">
            <View>
              <Svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 12 16" id="flame">
                <G id="Octicons" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                  <G id="flame" fill="#fff">
                    <Path id="Shape" d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"></Path>
                  </G>
                </G>
              </Svg>
            </View>
            <Text className="text-[#FFFFFF] font-cygrebold font-extrabold text-[26px] leading-[32px]">12</Text>
          </View>
          <View className="py-2 flex-1">
            <Text className="text-[18px] font-cygresemibold leading-[21.6px] text-center">This Week</Text>
            <View className="flex-row justify-center flex-1 items-center">
              <View className='mr-10 justify-center items-center'>
                  <Text className="text-[#000000] text-[22px] leading-[26.4px] font-cygrebold">60</Text>
                  <Text className="text-[#000000] font-cygreregular text-sm leading-[16.8px]">pages</Text>
              </View>
              <View className='mr-10 items-center'>
                  <Text className="text-[#000000] text-[22px] leading-[26.4px] font-cygrebold">13</Text>
                  <Text className="font-cygreregular text-sm leading-[16.8px]">hours</Text>
              </View>
              <View className="items-center">
                  <Text className="text-[#000000] text-[22px] leading-[26.4px] font-cygrebold">32</Text>
                  <Text className="font-cygreregular text-sm leading-[16.8px]">notes</Text>
              </View>
            </View>
          </View>
        </View>

        <CurrentBook />
        <BookCalendar />
        <PersonalPlan />
        <Categories />

      </ScrollView>
    </SafeAreaView>
}

export default Home



const Categories = () => {
  return <View className="mx-3 mt-10">
    <Text className="font-cygrebold mb-4 font-bold text-[22px] leading-[26.4px] text-[#000000]">Categories You Would Like</Text>
    <ScrollView horizontal>
      <Category icon={'psychology'} title={'Psychology'} containerStyles={'mr-2.5'} />
      <Category icon={'fantasy'} title={'Fantasy'} />
    </ScrollView>
  </View>
}

const Category = ({ icon, title, containerStyles }) => {
  return <View className={`border-[#8A8A8A] flex-row border-[.5px] items-center bg-[#ffffff] rounded-[15px] w-[237px] h-[56px] px-4 ${containerStyles}`}>
    <View className="mr-4 bg-[#1C1C1C] rounded-full w-[38px] h-[38px] items-center justify-center">
      { icon === 'psychology' ? <PsychologyIcon /> : <FantasyIcon /> }
    </View>
    <Text className="text-[#1C1C1C] text-[18px] font-cygrebold leading-[21.6px]">{title}</Text>
  </View>
}

const PsychologyIcon = () => {
  return <TouchableOpacity>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_619_3468)">
        <Path d="M23.3409 13.345L16.5559 20.754C14.6619 22.822 11.9859 24 9.18193 24H4.00293C1.79393 24 0.00292969 22.209 0.00292969 20V16C0.00292969 13.791 1.79393 12 4.00293 12H11.7899C13.1639 12 14.2499 13.26 13.9539 14.685C13.7609 15.611 12.9499 16.283 12.0139 16.417L7.85193 17C7.30493 17.078 6.92493 17.585 7.00393 18.131C7.08193 18.678 7.58893 19.057 8.13493 18.979L12.3869 18.383C14.4489 18.089 16.0039 16.296 16.0039 14.213C16.0039 13.994 15.9719 13.784 15.9389 13.575L19.4799 9.838C19.9349 9.338 20.5769 9.035 21.2739 9.003C21.9659 8.969 22.6369 9.212 23.1519 9.681C24.2039 10.639 24.2899 12.282 23.3409 13.345ZM5.24993 9C5.96193 9 6.59093 8.666 6.99993 8.149V9C6.99993 9.553 7.44693 10 7.99993 10C8.55293 10 8.99993 9.553 8.99993 9V7H12.4999C13.8809 7 14.9999 5.881 14.9999 4.5C14.9999 3.305 14.1599 2.309 13.0399 2.062C12.5869 1.421 11.8439 1 10.9999 1C10.7449 1 10.5029 1.049 10.2709 1.121C9.90893 0.457 9.21293 0 8.40393 0C7.63693 0 6.96993 0.408 6.59293 1.016C5.14893 1.099 3.99993 2.285 3.99993 3.75C3.99993 4.112 4.07393 4.455 4.20093 4.771C3.48993 5.149 2.99993 5.889 2.99993 6.75C2.99993 7.993 4.00693 9 5.24993 9Z" fill="#FEFEFC"/>
      </G>
      <Defs>
        <ClipPath id="clip0_619_3468">
          <Rect width="24" height="24" fill="#fff"/>
        </ClipPath>
      </Defs>
    </Svg>
  </TouchableOpacity>
}

const FantasyIcon = () => {
  return <TouchableOpacity>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_619_3470)">
        <Path d="M13.46 13.7849C14.18 13.9909 14.18 15.0099 13.46 15.2159L12.492 15.4929L12.215 16.4609C12.009 17.1809 10.99 17.1809 10.784 16.4609L10.507 15.4929L9.539 15.2159C8.819 15.0099 8.819 13.9909 9.539 13.7849L10.507 13.5079L10.784 12.5399C10.99 11.8209 12.009 11.8209 12.215 12.5399L12.492 13.5079L13.46 13.7849ZM0.54 7.21491L1.508 7.49191L1.785 8.45991C1.991 9.17991 3.01 9.17991 3.216 8.45991L3.493 7.49191L4.461 7.21491C5.181 7.00891 5.181 5.98991 4.461 5.78391L3.493 5.50691L3.216 4.53891C3.01 3.81991 1.991 3.81991 1.785 4.53891L1.508 5.50691L0.54 5.78391C-0.18 5.98991 -0.18 7.00891 0.54 7.21491ZM19.54 4.21491L20.508 4.49191L20.785 5.45991C20.991 6.17991 22.01 6.17991 22.216 5.45991L22.493 4.49191L23.461 4.21491C24.181 4.00891 24.181 2.98991 23.461 2.78391L22.493 2.50691L22.216 1.53891C22.01 0.819913 20.991 0.819913 20.785 1.53891L20.508 2.50691L19.54 2.78391C18.82 2.98991 18.82 4.00891 19.54 4.21491ZM6.652 7.76691C6.836 8.05691 7.182 8.20091 7.517 8.12691L9.958 7.54091L11.454 9.65191C11.654 9.93591 12.012 10.0629 12.347 9.96791C12.522 9.91891 12.67 9.81491 12.775 9.67691C12.871 9.55091 12.931 9.39691 12.941 9.23091L13.045 7.56291L22.447 13.8309C22.617 13.9439 22.81 13.9989 23.001 13.9989C23.324 13.9989 23.641 13.8429 23.834 13.5539C24.14 13.0939 24.016 12.4729 23.557 12.1669L14.445 6.09191L15.644 5.66591C15.971 5.54891 16.189 5.23891 16.189 4.89091C16.188 4.54291 15.966 4.23391 15.637 4.12091L13.211 3.27691L13.132 0.779913C13.116 0.435913 12.886 0.138913 12.558 0.0369127C12.23 -0.0650873 11.872 0.0489127 11.663 0.321913L10.172 2.27491L7.705 1.48591C7.378 1.38591 7.023 1.50091 6.816 1.77191C6.609 2.04391 6.592 2.41591 6.774 2.70491L8.186 4.87691L6.695 6.82991C6.487 7.10291 6.471 7.47691 6.655 7.76591L6.652 7.76691ZM22.001 18.9989H16.89C14.112 18.9989 12.648 20.3329 11.946 21.7469C11.244 20.3329 9.78 18.9989 7.002 18.9989H2C0.895 18.9989 0 19.8939 0 20.9989V22.9989C0 23.5509 0.448 23.9989 1 23.9989H23C23.552 23.9989 24 23.5509 24 22.9989V20.9989C24 19.8939 23.106 18.9989 22.001 18.9989Z" fill="#FEFEFC"/>
      </G>
      <Defs>
        <ClipPath id="clip0_619_3470">
          <Rect width="24" height="24" fill="#fff"/>
        </ClipPath>
      </Defs>
    </Svg>
  </TouchableOpacity>
}

const TimerIcon = () => {
  return <TouchableOpacity>
      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M4.95 1.65098L3.99075 0C2.439 0.989844 1.08271 2.30373 0 3.86597L1.49507 4.95C2.43693 3.61496 3.61079 2.49407 4.95 1.65098Z" fill="#fff"/>
        <Path d="M20.3388 4.95L22 3.86597C20.797 2.30373 19.29 0.989844 17.5658 0L16.5 1.65098C17.988 2.49407 19.2923 3.61496 20.3388 4.95Z" fill="#fff"/>
        <Path d="M11.6485 1.87984V0H9.79872V1.87984C7.90666 2.04739 6.09999 2.73761 4.58407 3.87205C3.06816 5.00649 1.90382 6.53964 1.22342 8.29721C0.543011 10.0548 0.373834 11.9663 0.735117 13.8144C1.0964 15.6625 1.97365 17.3731 3.26714 18.7517L1.48395 20.6929L2.85279 21.9266L4.64153 19.9808C6.3935 21.2911 8.52866 22 10.7236 22C12.9186 22 15.0537 21.2911 16.8057 19.9808L18.5944 21.9294L19.9633 20.6957L18.1801 18.7544C19.4744 17.3759 20.3524 15.6651 20.7141 13.8165C21.0759 11.968 20.9069 10.056 20.2264 8.29793C19.5459 6.53986 18.3812 5.00632 16.8648 3.87172C15.3484 2.73711 13.5411 2.04699 11.6485 1.87984ZM12.8444 14.3962L9.79872 11.378V6.41585H11.6485V10.6191L14.1522 13.1002L12.8444 14.3962Z" fill="white"/>
      </Svg>
  </TouchableOpacity>
};

const NoteIcon = () => {
  return <TouchableOpacity>
      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clip-path="url(#clip0_391_8647)">
          <Path d="M17.4167 0H4.58333C2.05608 0 0 2.05608 0 4.58333V17.4167C0 19.9439 2.05608 22 4.58333 22H14.2221C14.3715 22 14.5191 21.9881 14.6667 21.978V17.4167C14.6667 15.9005 15.9005 14.6667 17.4167 14.6667H21.978C21.9881 14.5191 22 14.3715 22 14.2221V4.58333C22 2.05608 19.9439 0 17.4167 0ZM14.6667 11.9167H11.9167V14.6667C11.9167 15.1736 11.506 15.5833 11 15.5833C10.494 15.5833 10.0833 15.1736 10.0833 14.6667V11.9167H7.33333C6.82733 11.9167 6.41667 11.5069 6.41667 11C6.41667 10.4931 6.82733 10.0833 7.33333 10.0833H10.0833V7.33333C10.0833 6.82642 10.494 6.41667 11 6.41667C11.506 6.41667 11.9167 6.82642 11.9167 7.33333V10.0833H14.6667C15.1727 10.0833 15.5833 10.4931 15.5833 11C15.5833 11.5069 15.1727 11.9167 14.6667 11.9167ZM17.4167 16.5H21.5783C21.2603 17.3369 20.7717 18.1078 20.1199 18.7596L18.7596 20.1208C18.1069 20.7726 17.3369 21.2612 16.5 21.5793V17.4176C16.5 16.9125 16.9107 16.5 17.4167 16.5Z" fill="white"/>
        </G>
        <Defs>
        <ClipPath id="clip0_391_8647">
          <Rect width="22" height="22" fill="#fff"/>
        </ClipPath>
        </Defs>
      </Svg>
    </TouchableOpacity>
}

const QuoteIcon = () => {
  return <TouchableOpacity>
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_391_8644)">
        <Path d="M7 3.5H3.5C2.57174 3.5 1.6815 3.86875 1.02513 4.52513C0.368749 5.1815 0 6.07174 0 7L0 10.5C0 10.9641 0.184374 11.4092 0.512563 11.7374C0.840752 12.0656 1.28587 12.25 1.75 12.25H6.92125C6.71364 13.472 6.08079 14.5812 5.13453 15.3818C4.18826 16.1824 2.98948 16.6227 1.75 16.625C1.51794 16.625 1.29538 16.7172 1.13128 16.8813C0.967187 17.0454 0.875 17.2679 0.875 17.5C0.875 17.7321 0.967187 17.9546 1.13128 18.1187C1.29538 18.2828 1.51794 18.375 1.75 18.375C3.60588 18.3729 5.38514 17.6347 6.69745 16.3224C8.00975 15.0101 8.74792 13.2309 8.75 11.375V5.25C8.75 4.78587 8.56563 4.34075 8.23744 4.01256C7.90925 3.68437 7.46413 3.5 7 3.5Z" fill="white"/>
        <Path d="M18.3369 3.5H14.8369C13.9087 3.5 13.0184 3.86875 12.362 4.52513C11.7057 5.1815 11.3369 6.07174 11.3369 7V10.5C11.3369 10.9641 11.5213 11.4092 11.8495 11.7374C12.1777 12.0656 12.6228 12.25 13.0869 12.25H18.2582C18.0506 13.472 17.4177 14.5812 16.4714 15.3818C15.5252 16.1824 14.3264 16.6227 13.0869 16.625C12.8548 16.625 12.6323 16.7172 12.4682 16.8813C12.3041 17.0454 12.2119 17.2679 12.2119 17.5C12.2119 17.7321 12.3041 17.9546 12.4682 18.1187C12.6323 18.2828 12.8548 18.375 13.0869 18.375C14.9428 18.3729 16.7221 17.6347 18.0344 16.3224C19.3467 15.0101 20.0848 13.2309 20.0869 11.375V5.25C20.0869 4.78587 19.9025 4.34075 19.5744 4.01256C19.2462 3.68437 18.801 3.5 18.3369 3.5Z" fill="white"/>
      </G>
      <Defs>
      <ClipPath id="clip0_391_8644">
        <Rect width="21" height="21" fill="white"/>
      </ClipPath>
      </Defs>
    </Svg>
  </TouchableOpacity> 
}

const BookCalendar = () => {

  return <View className="mx-3 mt-5 border-[.5px] p-3 border-[#727272] items-center justify-between flex-row rounded-[15px] bg-[#ffffff]">
    <View className="flex-1">
      <Text className="text-[28px] leading-[33.6px] font-cygrebold mb-6">Book Calendar</Text>
      <View className="flex-row">
        <TouchableOpacity className="rounded-[20px] mr-1.5 bg-[#E6E6E6] items-center justify-center h-[33px] max-w-[88px] w-full">
          <Text className="text-[#000000] text-sm leading-[16.8px] text-center font-cygreregular">Memories</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-[20px] mr-1.5 bg-[#E6E6E6] h-[33px] items-center justify-center max-w-[110px] w-full">
          <Text className="text-[#000000] text-sm leading-[16.8px] text-center font-cygreregular">Monthly View</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Image
      source={images.welcomeSm}
      resizeMode='cover'
      width={103}
      height={100} />
  </View>;
}
const CurrentBook = () => {
  return <ScrollView
    horizontal={true}
    contentContainerStyle={{height: 270 }}
    className="mx-4"
    showsHorizontalScrollIndicator={false}
  >
    <View className="rounded-[15px] mr-4 flex-row bg-[#ffffff] justify-between max-w-[320px] w-full max-h-[220px] h-full mb-5 border-[.5px] border-[#8A8A8A] p-3">
      <Image source={images.homeBookCover} width={111} height={194} className="rounded-[6px] max-w-[111px] max-h-[194px] mr-[10px]" />
      <View className="bg-[#1C1C1C] rounded-[6px] max-h-[194px] h-full">
        <View className="px-3 py-4 flex-row justify-between w-[171px]">
          <TouchableOpacity className="rounded-full bg-[#8A8A8A] items-center justify-center h-[45px] w-[42px]">
            <Text className="text-[#FFFFFF] text-[31px] font-semibold leading-[37.5px]">-</Text>
          </TouchableOpacity>

          <TouchableOpacity className="rounded-full bg-[#6592E3] items-center justify-center h-[45px] w-[42px]">
            <Text className="text-[#FFFFFF] text-[31px] font-semibold leading-[37.5px]">+</Text>
          </TouchableOpacity>
        </View>
        <View className="items-center mb-6">
          <Text className="text-[34px] leading-[40px] font-bold text-[#fff]">40</Text>
          <Text className="text-sm leading-[16px] font-medium text-[#fff]">of 430</Text>
        </View>
        <View className="flex-row justify-center">
          <TimerIcon />
          <View className="w-[1px] h-[25px] bg-[#fff] mx-4"></View>
          <NoteIcon />
          <View className="w-[1px] h-[25px] bg-[#fff] mx-4"></View>
          <QuoteIcon />
        </View>
      </View>
    </View>

    <View className="bg-[#1C1C1C] rounded-[15px] max-h-[220px] h-full w-[320px] px-5 py-3">
      <Text className="text-[#fff] text-[34px] leading-[40px] font-cygrebold font-bold">
        Add a book
      </Text>
      <Text className="text-[#fff] text-sm leading-[16px] font-cygreregular font-light">Is there a book you are reading?</Text>
      <View className="flex-row mt-6">
        <TouchableOpacity className="bg-[#6592E3] h-[44px] justify-center items-center max-w-[126px] w-full flex-row flex-1 rounded-[25px] ">
          <MaterialIcons name='add' color='#fff' size={33} />
          <Text className="text-[18px] text-[#fff] font-cygrebold leading-[21px] font-bold">Add</Text>
        </TouchableOpacity>
        <Image source={images.magnifier} width={132} height={119} />
      </View>
    </View>
  </ScrollView>;
}

const PersonalPlan = () => {
  return <View className="mt-5 mx-3 flex-row bg-[#1C1C1C] items-center rounded-[15px] max-h-[114px] h-full px-5 justify-center">
    <Image source={images.personalPlan} width={126} height={69} className='mr-6' />
    <Text className="text-[#FFFFFF] font-cygrebold text-[22px] leading-[21px] font-bold max-w-[145px]">
      Your Personal Reading Plan
    </Text>
  </View>;
}

