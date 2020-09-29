import React from 'react'
import { View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import SideBar from './SideBar';
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/MyDonationScreen';
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppTabNavigator
  },
  MyDonations: {
    screen: MyDonationScreen
  },

  Setting: {
    screen: SettingScreen
  },
  Receiver:{ screen : RecieverDetailsScreen}
},
  {
    contentComponent: SideBar
  },
  {
    initialRouteName: 'Home'
  })