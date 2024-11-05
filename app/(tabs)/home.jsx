import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Svg, G, Path, Rect, ClipPath, Defs } from 'react-native-svg'
import { MaterialIcons } from '@expo/vector-icons';
import { images } from '../../constants'

const Home = () => {


  return <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="bg-[#FFFFFF] mx-4 mt-9 mb-8 flex-row border-[#727272] border-[.5px] rounded-[15px]">
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

        <ScrollView horizontal={true} className="mx-4">
          <View className="rounded-[15px] mr-4 flex-row bg-[#ffffff] justify-between max-w-[320px] w-full border-[.5px] border-[#8A8A8A] p-3">
            <Image source={images.homeBookCover} width={111} height={194} className="rounded-[6px] max-w-[111px] max-h-[194px] mr-[10px]" />
            <View className="bg-[#1C1C1C] rounded-[6px]">
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

          <View className="bg-[#1C1C1C] rounded-[15px] w-[320px] px-5 py-3">
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

        </ScrollView>

      </ScrollView>
    </SafeAreaView>
}

export default Home



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