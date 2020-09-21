import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen';
import BookDonateScreen from '../screens/BookDonateScreen';

export const AppStackNavigator = createStackNavigator({
    BookDonateList: { screen: BookDonateScreen },
    RecieverDetails: { screen: RecieverDetailsScreen },
},
    {
        initialRouteName: 'BookDonateList'
    }
)