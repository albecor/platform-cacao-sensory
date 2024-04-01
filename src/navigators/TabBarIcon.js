import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../patterns/Theme';

const icons = focused => ({
  history: (
    <MaterialIcons
      name='storage'
      size={focused ? 40 : 30}
      color={focused ? Colors.baseColor.redPrimary : Colors.baseColor.redSecondary}
    />
  ),
  home: (
    <MaterialIcons
      name='home'
      size={focused ? 40 : 30}
      color={focused ? Colors.baseColor.redPrimary : Colors.baseColor.redSecondary}
    />
  ),
  profile: (
    <MaterialIcons
      name='person'
      size={focused ? 40 : 30}
      color={focused ? Colors.baseColor.redPrimary : Colors.baseColor.redSecondary}
    />
  )
});

const TabBarIcon = ({ focused, icon, styles }) => (
  <View style={styles}>
    {icons(focused)[icon]}
  </View>
);

TabBarIcon.propTypes = {
  focused: PropTypes.bool,
  icon: PropTypes.string,
  styles: PropTypes.object
};

export default TabBarIcon;
