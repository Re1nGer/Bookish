import { Image, View, Text, Platform } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants';


const TabIcon = ({ icon, color, name, focused }) => {
    return <View className='items-center justify-center gap-2'>
            <View className={`rounded-full transition-colors  ${focused ? 'bg-[#6592E3] p-3' : ''}`}>
                <Image
                    source={icon}
                    resizeMode='contain'
                    tintColor={color}
                    className="w-5 h-[22px]"
                />
            </View>
            { !focused && (
                <Text
                    className={'text-[12px] font-cygreregular'}
                    style={{color: color}}> {name}
                </Text>
            )}
        </View>
}

const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{ 
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#F9F9F9',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle:
                {
                    backgroundColor: '#0D0C0CD6', 
                    borderRadius: 44,
                    borderTopWidth: 1,
                    width: '95%',
                    margin: 'auto',
                    marginBottom: 20,
                    borderTopColor: '#232533',
                    height: Platform.select({
                        ios: 88, 
                        android: 79,
                    }),
                    paddingBottom: Platform.select({
                        ios: 28, 
                        android: 8,
                    }),
                    paddingBottom: Platform.select({
                        ios: 0,
                        android: 4,
                    }),
                }
            }}>

            <Tabs.Screen
                name='home'
                options={{ title: "", headerShown: false, 
                    tabBarIcon: ({color, focused}) =>
                     <TabIcon
                        icon={icons.home}
                        color={color}
                        focused={focused}
                        name="Home"
                    />
                 }}
            ></Tabs.Screen>
            <Tabs.Screen
                name='library'
                options={{ title: "Library", headerShown: false,
                    tabBarIcon: ({color, focused}) =>
                     <TabIcon
                        icon={icons.book}
                        color={color}
                        focused={focused}
                        name="Library"
                    />
                 }}
            ></Tabs.Screen>
            <Tabs.Screen
                name='repetition'
                options={{ title: "Repetition", headerShown: false,
                    tabBarIcon: ({color, focused}) =>
                     <TabIcon
                        icon={icons.repetition}
                        color={color}
                        focused={focused}
                        name="Repetition"
                    />
                 }}
            ></Tabs.Screen>
            <Tabs.Screen
                name='stats'
                options={{ title: "Stats", headerShown: false,
                    tabBarIcon: ({color, focused}) =>
                     <TabIcon
                        icon={icons.stats}
                        color={color}
                        focused={focused}
                        name="Stats"
                    />
                 }}
            ></Tabs.Screen>
            <Tabs.Screen
                name='profile'
                options={{ title: "Profile", headerShown: false,
                    tabBarIcon: ({color, focused}) =>
                     <TabIcon
                        icon={icons.profile}
                        color={color}
                        focused={focused}
                        name="Profile"
                    />
                 }}
            ></Tabs.Screen>
        </Tabs>
    </>
  )
}

export default TabsLayout