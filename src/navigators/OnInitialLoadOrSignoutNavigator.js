import { TabNavigator, TabBarTop } from 'react-navigation'; //IF NOT react-navigation 1.0-beta9, omit 'TabBarTop'
import AuthScreen from '../screens/AuthScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainFlowTabNavigator from './MainFlowTabNavigator';
import AddOrEditNavigator from './AddOrEditNavigator';
import AddBudgetModalNavigator from './AddBudgetModalNavigator';

import { OS } from '../styles';

// JANKY WORKAROUND FOR NOT SHOWING IN ANDROID
import React from 'react';
import { View } from 'react-native';

const secondaryNavOptions = {
	  navigationOptions: {
  	tabBarVisible: false
  },
  lazy: true
};

if(OS === 'android'){
	secondaryNavOptions.tabBarComponent =  props => <View collapsable={false}><TabBarTop {...props} /></View> //only needed for react-navigtion 1.0-beta9
}

const OnInitialLoadOrSignoutNavigator = TabNavigator({
	welcome: { screen: WelcomeScreen },
	auth: { screen: AuthScreen },
	main: { screen: MainFlowTabNavigator },
	AddTip: { screen: AddOrEditNavigator },
	AddBudgetScreen: { screen: AddBudgetModalNavigator }
}, secondaryNavOptions);

export default OnInitialLoadOrSignoutNavigator;