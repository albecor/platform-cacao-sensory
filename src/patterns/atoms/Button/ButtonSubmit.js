import { bool, func, string } from 'prop-types';
import React from 'react';
import styles from '../Button/Button.styles';
import Loading from '../Loading';
import BSText from '../Text';
import BSButton from './index';

const ButtonSubmit = ({ loading, onPress, text }) => (
  <BSButton.Gradient
    disabled={loading}
    onPress={onPress}
  >{loading
    ? (
      <Loading />
      )
    : (
      <BSText style={styles.btnText} text={text} />
      )}
  </BSButton.Gradient>
);

ButtonSubmit.defaultProps = {
  loading: false,
  text: ''
};
ButtonSubmit.propTypes = {
  loading: bool,
  onPress: func,
  text: string
};

export default ButtonSubmit;
