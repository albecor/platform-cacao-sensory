import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Event from '../pages/Event';
import Process from '../pages/Process';
import HomeStackNavigator from './HomeStackNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName='Home'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name='Home' component={HomeStackNavigator} />
    <Stack.Screen name='Process' component={Process} />
    <Stack.Screen name='Event' component={Event} />
  </Stack.Navigator>
);

export default RootNavigator;
