import { useNavigation } from '@react-navigation/native';
import { bool, func, string } from 'prop-types';
import React from 'react';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  StatusBar
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../Theme';
import BSText from '../Text';

const AppBar = ({ children, hasSafeAreaTop }) => (
  <Box>
    <StatusBar backgroundColor={Colors.backgroundColor} barStyle='light-content' />
    {hasSafeAreaTop && <Box safeAreaTop backgroundColor={Colors.backgroundColor} />}
    <HStack
      borderBottomColor='red.500'
      borderBottomWidth={1}
      bg={Colors.backgroundColor}
      px='1'
      py='1'
      justifyContent='space-between'
      alignItems='center'
    >
      {children}
    </HStack>
  </Box>
);
AppBar.defaultProps = {
  hasSafeAreaTop: false
};
AppBar.propTypes = {
  hasSafeAreaTop: bool
};

AppBar.Title = ({ title }) => (
  <HStack alignItems='center'>
    <Heading textAlign='center'>
      <BSText.Title text={title} />
    </Heading>
  </HStack>
);
AppBar.Title.propTypes = { title: string };

AppBar.Content = ({ children, ...args }) => (
  <HStack alignItems='center' {...args}>
    {children}
  </HStack>
);

AppBar.Back = ({ onPress, route }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigation = useNavigation();
  return (
    <HStack space='1' alignItems='center'>
      <IconButton
        _pressed={{
          bg: 'transparent'
        }}
        onPress={() => onPress ? onPress() : navigation.navigate(route)}
        icon={<Ionicons name='chevron-back' size={24} color='black' />}
      />
    </HStack>
  );
};
AppBar.Back.defaultProps = {
  onPress: null
};
AppBar.Back.propTypes = {
  onPress: func,
  route: string
};

export default AppBar;
