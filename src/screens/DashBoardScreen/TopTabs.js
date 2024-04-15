import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ScheduleList from "../OtherScreen/ScheduleList";
import RecommendedList from "../OtherScreen/RecommendedList";
import MySportList from "../OtherScreen/MySportList";
import OtherGamesList from "../OtherScreen/OtherGamesList";
import { black, offWhite, primary } from '../../constants/Color';
import { FontSize, MEDIUM } from '../../constants/Fonts';
const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
     <Tab.Navigator
            initialRouteName={`Schedule`}
            screenOptions={({ route }) => ({
              tabBarItemStyle: {
                width: 'auto',
              },
              tabBarActiveTintColor: primary,
              tabBarInactiveTintColor: black,
              tabBarScrollEnabled: true,
              tabBarLabelStyle: [
                {
                  color: black,
                  fontFamily : MEDIUM,
                  fontSize : FontSize.FS_14,
                  textTransform: 'capitalize',
                },
              ],
              tabBarIndicatorStyle: {
                backgroundColor:primary,
                flex: 1,
              },
              tabBarStyle: {
                width: 'auto',
                backgroundColor:  offWhite,
              },
            })}
          >
            <Tab.Screen name="Schedule" component={ScheduleList} />
            <Tab.Screen name="Recommended" component={RecommendedList} />
            <Tab.Screen name="MySports" component={MySportList} />
            <Tab.Screen name="OtherSports" component={OtherGamesList} />
          </Tab.Navigator> 
  )
}

export default TopTabs