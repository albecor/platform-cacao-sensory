import { Colors, Elevations, Fonts, Forms } from '../../Theme';

export default {
  closeButton: {
    paddingLeft: 15
  },
  formContainer: {
    backgroundColor: Colors.backgroundColor,
    height: '100%',
    width: '100%',
    flex: 1
  },
  bodyContainer: {
    marginBottom: 15,
    marginHorizontal: '5%',
    paddingTop: 10,
    marginTop: 25
  },
  inputContainer: {
    marginBottom: 16,
    paddingHorizontal: 16
  },
  requiredContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginRight: 14,
    marginTop: 5
  },
  requiredText: {
    color: Colors.darkPink,
    fontFamily: Fonts.GothamBook,
    fontSize: 12,
    lineHeight: 13
  },
  submitView: {
    paddingBottom: 240
  },
  submitButton: {
    ...Forms.defaultPrimaryButton,
    ...Elevations.buttonElevation,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButtonSubmitting: {
    opacity: 0.5
  },
  submitButtonText: {
    ...Forms.defaultPrimaryButtonText,
    textAlign: 'center'
  },
  submitButtonTop: {
    color: Colors.baseColor.greenPrimary,
    fontFamily: Fonts.GothamMedium,
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 16
  }
};
