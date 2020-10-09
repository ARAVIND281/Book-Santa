import React from 'react'
import { View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import SideBar from './SideBar';
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppTabNavigator
  },
  MyDonations: {
    screen: MyDonationScreen
  },
  Notification: {
    screen: NotificationScreen
  },
  Setting: {
    screen: SettingScreen
  },
},
  {
    contentComponent: SideBar
  },
  {
    initialRouteName: 'Home'
  })