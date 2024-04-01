import React, { useCallback } from 'react';
import { arrayOf, bool, element, func, oneOfType, shape, string } from 'prop-types';
import {
  ActivityIndicator,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NOTIFY_ERROR, NOTIFY_WARNING } from '../../../context/types';
import Close from '../../atoms/Icon/Close';
import { Colors } from '../../Theme';
import Icon from '../../atoms/Icon';
import BSText from '../../atoms/Text';

import stylesheet from './Modal.styles';
import { VStack } from 'native-base';

const propTypes = {
  actions: arrayOf(
    shape({
      label: string,
      testId: string,
      onPress: func
    })
  ),
  children: element,
  closeButton: bool,
  handleDismiss: func,
  label: string,
  labelHint: string,
  message: string,
  onPress: func,
  variant: string,
  visible: bool
};

const defaultProps = {
  closeButton: true,
  transparent: true
};

const ModalSkeleton = ({
  children,
  customStyles,
  ...props
}) => (
  <RNModal transparent {...props}>
    <View style={styles.backdrop}>
      <View style={[styles.modalView, customStyles]}>
        {children}
      </View>
    </View>
  </RNModal>
);
ModalSkeleton.propTypes = {
  customStyles: shape({})
};

const Modal = ({
  actions,
  children,
  closeButton,
  handleDismiss,
  message,
  ...props
}) => {
  const Action = ({
    label,
    onPress,
    variant
  }) => {
    const actionButtonStyle = {
      ...styles.button,
      ...styles[variant]
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={actions.length > 1 ? actionButtonStyle : { ...actionButtonStyle, ...styles.singleButton }}
      >
        <Text
          style={{ ...styles.buttonLabel, ...styles[`${variant}Label`] }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const Actions = useCallback(() => {
    return (
      <View style={actions.length > 1 ? styles.actions : [styles.actions, styles.actionsSingle]}>
        {actions.map(({
          label,
          onPress
        }, index) => (
          <Action
            key={index === 0 ? 'primary' : 'secondary'}
            label={label}
            onPress={onPress}
            variant={index === 0 ? 'primaryAction' : 'secondaryAction'}
          />
        ))}
      </View>
    );
  }, [actions]);

  const DismissButton = useCallback(() => (
    <TouchableOpacity
      onPress={handleDismiss}
      style={styles.closeButton}
    >
      <Close variant='lightBackground' />
    </TouchableOpacity>
  ), [handleDismiss]);

  return (
    <ModalSkeleton {...props}>
      {closeButton && <DismissButton />}
      <View style={styles.containerSkeleton}>
        {
          children ||
          (!!message && (
            <Text style={styles.message}>{message}</Text>
          ))
        }
        {actions.length && <Actions />}
      </View>
    </ModalSkeleton>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.Content = ({
  btnText,
  btnSecondText,
  icon,
  message,
  onPress,
  onSecondPress,
  title,
  type,
  ...props
}) => {
  const onRequestClose = () => {
    if (type === NOTIFY_ERROR) {
      return onPress();
    }
    if (type === NOTIFY_WARNING) {
      return onSecondPress();
    }
  };
  return (
    <ModalSkeleton {...props} onRequestClose={onRequestClose}>
      <View style={styles.messageContainer}>
        <View style={{ marginBottom: 30 }}>
          {icon && <Icon icon={icon} />}
        </View>
        <BSText.Title color={Colors.baseColor.redPrimary} text={title} />
        <BSText.Description marginBottom={0} color={Colors.blackRussian} text={message} />
      </View>
      <VStack space={3}>
        <Pressable style={styles.submitButton} onPress={onPress}>
          <Text style={styles.submitButtonText}>
            {btnText}
          </Text>
        </Pressable>
        {btnSecondText && (
          <Pressable style={styles.secondaryButton} onPress={onSecondPress}>
            <Text style={styles.secondaryButtonText}>
              {btnSecondText}
            </Text>
          </Pressable>
        )}
      </VStack>
    </ModalSkeleton>
  );
};

Modal.Content.propTypes = {
  btnText: string,
  btnSecondText: string,
  icon: string,
  message: oneOfType([string, arrayOf(string)]),
  onPress: func,
  onSecondPress: func,
  title: string,
  type: string
};

Modal.Loader = ({ ...props }) => (
  <ModalSkeleton {...props} customStyles={{ height: '20%' }}>
    <View style={styles.messageContainer}>
      <View style={{ marginBottom: 30 }}>
        <ActivityIndicator color={Colors.baseColor.greenPrimary} size='large' />
      </View>
      <BSText.Description marginBottom={0} color={Colors.blackRussian} text='Espere por favor...' />
    </View>
  </ModalSkeleton>
);

const styles = StyleSheet.create(stylesheet);

export default Modal;
