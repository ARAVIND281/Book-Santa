import React from 'react'
import { View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import SideBar from './SideBar';
import SettingScreen from '../screens/SettingScreen'

export const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppTabNavigator
  },
  Setting: { screen: SettingScreen }
},
  {
    contentComponent: SideBar
  },
  {
    initialRouteName: 'Home'
  })