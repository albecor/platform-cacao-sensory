import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const FormLayout = ({ children }) => (
  <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    extraHeight={100}
    extraScrollHeight={100}
  >
    {children}
  </KeyboardAwareScrollView>
);

export default FormLayout;
