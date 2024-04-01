import {
  FormControl,
  Icon,
  Input as InputNB,
  TextArea,
  WarningOutlineIcon
} from 'native-base';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { array, bool, oneOfType, shape, string } from 'prop-types';
import Styles from './Input.styles.js';

const Input = () => <></>;

Input.Email = ({ setRef, error, ...props }) => (
  <InputNB
    {...props}
    variant='underlined'
    ref={setRef}
    style={[styles.input, error && styles.borderFieldError]}
    keyboardType='email-address'
    autoCapitalize='none'
    autoCompleteType='email'
  />
);
Input.Email.defaultProps = {
  error: false
};

Input.Email.propTypes = {
  setRef: shape({}),
  error: bool
};

Input.Password = ({ ...props }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visible, setVisible] = useState(false);
  return (
    <InputNB
      {...props}
      variant='unstyled'
      style={styles.input}
      InputRightElement={
        <Pressable onPress={() => setVisible(prevState => !prevState)}>
          <Icon
            as={<MaterialIcons name={visible ? 'visibility-off' : 'visibility'} />}
            size={5}
            mr='2'
            color='muted.400'
          />
        </Pressable>
      }
      secureTextEntry={!visible}
    />
  );
};

Input.TextInput = ({ setRef, style, error, ...props }) => (
  <InputNB
    {...props}
    variant='underlined'
    ref={setRef}
    style={[styles.input, style, error && styles.borderFieldError]}
  />
);
Input.TextInput.defaultProps = {
  error: false
};
Input.TextInput.propTypes = {
  setRef: shape({}),
  style: oneOfType([array, shape({})]),
  error: bool
};

Input.Area = ({ style, error, placeholder, ...props }) => (
  <TextArea
    {...props}
    h={20}
    placeholder={placeholder}
    style={[styles.input, style, error && styles.borderFieldError]}
  />
);
Input.Area.defaultProps = {
  error: false,
  placeholder: ''
};
Input.Area.propTypes = {
  style: oneOfType([array, shape({})]),
  error: bool,
  placeholder: string
};

Input.Label = ({ children, style }) => (
  <FormControl.Label
    _text={{ ...styles.label, ...style }}
  >
    {children}
  </FormControl.Label>
);
Input.Label.defaultProps = {
  style: {}
};
Input.Label.propTypes = {
  style: shape({})
};

Input.Hint = ({ children, style }) => (
  <FormControl.HelperText _text={{ ...styles.hint, ...style }}>
    {children}
  </FormControl.HelperText>
);

Input.HintError = ({ children, style }) => (
  <FormControl.ErrorMessage
    leftIcon={<WarningOutlineIcon size='xs' />}
    _text={{ style }}
  >
    {children}
  </FormControl.ErrorMessage>
);

Input.HintError.propTypes = {
  style: shape({})
};

Input.Hint.propTypes = {
  style: shape({})
};

Input.TextInput.propTypes = {
  style: oneOfType([shape({}), array]),
  error: bool
};

const styles = StyleSheet.create(Styles);

export default Input;
