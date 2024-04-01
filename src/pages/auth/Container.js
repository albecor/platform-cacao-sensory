import { bool, func, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import ButtonSubmit from '../../patterns/atoms/Button/ButtonSubmit';
import SafeArea from '../../patterns/atoms/SafeArea';
import BSText from '../../patterns/atoms/Text';
import FormLayout from '../../patterns/molecules/Form';
import { Colors } from '../../patterns/Theme';
import styles from './Auth.styles';

const AuthContainer = ({ btnText, loading, children, onPress, text }) => (
  <SafeArea>
    <FormLayout>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.headerContainer}>
            <BSText.Title
              text={text}
              color={Colors.baseColor.redPrimary}
              fontWeight='bold'
            />
          </View>
          <View>
            {children}
          </View>
        </View>
        <ButtonSubmit
          loading={loading}
          onPress={onPress}
          text={btnText}
        />
      </View>
    </FormLayout>
  </SafeArea>
);

AuthContainer.defaultProps = {
  loading: false,
  text: ''
};
AuthContainer.propTypes = {
  btnText: string,
  loading: bool,
  onPress: func,
  text: string
};

export default AuthContainer;
