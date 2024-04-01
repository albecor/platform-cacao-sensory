import React from 'react';
import { bool, func, number, string, object, oneOfType, shape } from 'prop-types';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Text
} from 'react-native';
import AppBar from '../../atoms/AppBar';
import BSButton from '../../atoms/Button';
import Close from '../../atoms/Icon/Close';
import stylesheet from './ModalForm.styles';

const ModalForm = ({
  children,
  type,
  bgStyle,
  bgImageStyle,
  ...props
}) => (
  <Modal {...props}>
    <View style={styles.formContainer}>
      {children}
    </View>
  </Modal>
);
ModalForm.propTypes = {
  type: number,
  bgStyle: object,
  bgImageStyle: object
};

ModalForm.Header = ({ handleDismiss, handleSubmit, rightButton, rightButtonLabel = 'SAVE', type = 'default', submitting = false }) => (
  <AppBar hasSafeAreaTop transparent type={type}>
    <AppBar.Content>
      <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
        <Close variant='lightBackground' />
      </TouchableOpacity>
    </AppBar.Content>
    <AppBar.Content>
      {rightButton && (
        <BSButton onPress={handleSubmit} variant='unstyled' isDisabled={submitting}>
          <Text style={styles.submitButtonTop}>{rightButtonLabel}</Text>
        </BSButton>
      )}
    </AppBar.Content>
  </AppBar>
);
ModalForm.Header.propTypes = {
  handleDismiss: func.isRequired,
  handleSubmit: func,
  rightButton: bool,
  rightButtonLabel: string,
  type: string,
  submitting: bool
};

ModalForm.Body = ({ children, customStyleBody, requiredText = '* Required field' }) => (
  <View style={[styles.bodyContainer, customStyleBody]}>
    {requiredText &&
      <View style={styles.requiredContainer}>
        <Text style={styles.requiredText}>{requiredText}</Text>
      </View>}
    <View style={styles.inputContainer}>
      {children}
    </View>
  </View>
);

ModalForm.Body.propTypes = {
  requiredText: oneOfType([string, bool]),
  customStyleBody: shape({})
};

ModalForm.Submit = ({ handleSubmit, hasView, label, submitLabel, submitting = false }) => {
  const btnStyles = submitting
    ? [styles.submitButton, styles.submitButtonSubmitting]
    : styles.submitButton;
  return (
    <View style={hasView && styles.submitView}>
      <Pressable
        accessible
        accessibilityLabel={submitLabel}
        accessibilityRole='button'
        style={btnStyles}
        onPress={handleSubmit}
        testID='BottomSaveButton'
        disabled={submitting}
      >
        <Text style={styles.submitButtonText}>{label}</Text>
      </Pressable>
    </View>
  );
};
ModalForm.Submit.defaultProps = {
  hasView: true
};
ModalForm.Submit.propTypes = {
  handleSubmit: func.isRequired,
  hasView: bool,
  label: string,
  submitLabel: string,
  submitting: bool
};

const styles = StyleSheet.create(stylesheet);

export default ModalForm;
