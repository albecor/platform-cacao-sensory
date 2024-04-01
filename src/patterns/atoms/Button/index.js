import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import { Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableHighlight } from 'react-native';
import { Colors } from '../../Theme';
import styles from './Button.styles';

const BSButton = ({ children, ...props }) => <Button {...props}>{children}</Button>;

BSButton.Gradient = ({ colors, children, disabled, onPress, ...props }) => (
  <TouchableHighlight
    disabled={disabled}
    underlayColor='transparent'
    style={styles.gradientWrapper}
    onPress={onPress}
  >
    <LinearGradient
      colors={colors}
      style={styles.buttonGradient}
      {...props}
    >
      {children}
    </LinearGradient>
  </TouchableHighlight>
);

BSButton.Gradient.defaultProps = {
  disabled: false,
  colors: [Colors.baseColor.greenPrimary, Colors.baseColor.greenSecondary]
};

BSButton.Gradient.propTypes = {
  disabled: bool,
  colors: arrayOf(string),
  onPress: func
};

export default BSButton;
