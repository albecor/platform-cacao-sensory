import React from 'react';
import Styles from './Footer.styles';
import { Button, VStack } from 'native-base';
import { Colors } from '../../Theme';
import { func, shape, string } from 'prop-types';
import { StyleSheet } from 'react-native';

const Footer = ({ btnPrimary, btnPrimaryProps, btnPrimaryText, btnSecondary, btnSecondaryText }) => {
  const styles = StyleSheet.create(Styles({ hasTwoButton: !!(btnPrimaryText && btnSecondaryText) }));
  return (
    <VStack
      alignItems='center'
      bg={Colors.white}
      borderTopRadius={20}
      safeAreaBottom
      shadow={6}
      space={2}
      style={styles.container}
    >
      {
        btnPrimaryText && (
          <Button
            style={[styles.button, styles.buttonPrimary]}
            onPress={btnPrimary}
            variant='unstyled'
            _text={styles.buttonPrimaryLabel}
            {...btnPrimaryProps}
          >
            {btnPrimaryText}
          </Button>
        )
      }
      {
        btnSecondaryText && (
          <Button
            style={[styles.button, styles.buttonSecondary]}
            _text={styles.buttonSecondaryLabel}
            onPress={btnSecondary}
            variant='unstyled'
          >
            {btnSecondaryText}
          </Button>
        )
      }
    </VStack>
  );
};

Footer.defaultProps = {
  btnSecondary: null,
  btnSecondaryText: null,
  btnPrimaryProps: null
};
Footer.propTypes = {
  btnPrimary: func,
  btnPrimaryProps: shape({}),
  btnPrimaryText: string,
  btnSecondary: func,
  btnSecondaryText: string
};

export default Footer;
