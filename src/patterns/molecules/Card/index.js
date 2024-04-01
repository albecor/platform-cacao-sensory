import React from 'react';
import { Center } from 'native-base';
import { func, shape, string } from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BSText from '../../atoms/Text';
import Colors from '../../Theme/colors';
import Styles from './card.styles';

const styles = StyleSheet.create(Styles);

const Card = ({ children, customStyles, onPress, size, text, title }) => (
  <Center w={size.w} h={size.h}>
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onPress && onPress()}
      style={[styles.cardContainer, customStyles]}
    >
      <View style={styles.cardContainerItems}>
        <BSText.Title
          color={Colors.baseColor.redPrimary}
          marginBottom={0}
          ml={2}
          mt={2}
          text={title}
        />
        {text && (
          <BSText.Description
            color={Colors.baseColor.redSecondary}
            marginBottom={0}
            ml={2}
            mt={2}
            text={text}
          />
        )}
        {children}
      </View>
    </TouchableOpacity>
  </Center>
);

Card.defaultProps = {
  customStyles: null,
  onPress: null,
  size: { w: '100%', h: '60' },
  text: null,
  title: ''
};

Card.propTypes = {
  customStyles: shape({}),
  size: shape({}),
  onPress: func,
  text: string,
  title: string
};

export default Card;
