import { StyleSheet } from 'react-native';

import { Borders, Colors, Elevations, Fonts, Forms } from '../../Theme';

const { modalColorScheme } = Colors;

const stylesheet = {
  actions: {
    paddingTop: 30,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionsSingle: {
    justifyContent: 'center'
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: modalColorScheme.backdrop,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerSkeleton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  singleButton: {
    flex: 1,
    marginRight: 0
  },
  button: {
    width: '47%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: Borders.borderRadiusLarge,
    borderWidth: 1
  },
  buttonLabel: {
    textAlign: 'center',
    fontFamily: Fonts.GothamMedium,
    fontSize: 14,
    lineHeight: 16
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 15
  },
  message: {
    color: Colors.baseColor.redPrimary,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 17,
    lineHeight: 24
  },
  submitButton: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Forms.defaultPrimaryButton,
    ...Elevations.buttonElevation
  },
  secondaryButton: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Forms.defaultSecondaryButton
  },
  submitButtonText: {
    ...Forms.defaultPrimaryButtonText,
    textAlign: 'center'
  },
  secondaryButtonText: {
    ...Forms.defaultSecondaryButtonText,
    textAlign: 'center'
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 30,
    width: '100%'
  },
  modalView: {
    width: '90%',
    height: '60%',
    maxWidth: 340,
    paddingTop: 40,
    paddingHorizontal: 20,
    borderRadius: Borders.defaultBorderRadius,
    backgroundColor: Colors.white,
    ...Elevations.defaultElevation
  },
  primaryAction: {
    marginRight: 10,
    borderColor: modalColorScheme.primaryActionBorder,
    backgroundColor: modalColorScheme.primaryAction
  },
  primaryActionLabel: {
    color: modalColorScheme.primaryActionText
  },
  secondaryAction: {
    borderColor: modalColorScheme.secondaryAction
  },
  login: {
    marginVertical: 30,
    paddingHorizontal: 10,
    fontFamily: Fonts.GothamMedium,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.5,
    color: Colors.blue
  },
  secondaryActionLabel: {
    color: modalColorScheme.secondaryActionText
  }
};

export default stylesheet;
