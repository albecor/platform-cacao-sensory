import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import History from '../pages/History';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import styles from './Navigation.styles';
import TabBarIcon from './TabBarIcon';

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'Historial', icon: 'history', Component: History },
  { name: 'Inicio', icon: 'home', Component: Home },
  { name: 'Perfil', icon: 'profile', Component: Profile }
];

const HomeStackNavigator = () => (
  <Tab.Navigator
    initialRouteName='Inicio'
    tabBarOptions={{
      showIcon: true,
      style: styles.tabsContainer,
      showLabel: false
    }}
  >
    {screens.map(({ Component, icon, name }, key) => (
      <Tab.Screen
        key={key}
        name={name}
        component={Component}
        options={() => ({
          tabBarIcon: props => (
            <TabBarIcon
              {...props}
              icon={icon}
              styles={styles.activeTab}
            />
          )
        })}
      />
    ))}
  </Tab.Navigator>
);

export default HomeStackNavigator;
