import Colors from './colors';
import Fonts from './fonts';

export default {
  defaultBorderField: {
    borderColor: Colors.whisper,
    borderBottomWidth: 2
  },
  defaultBorderFieldError: {
    borderColor: Colors.appColorScheme.error
  },
  defaultField: {
    marginTop: 9,
    color: Colors.formColorScheme.inputText,
    fontFamily: Fonts.GothamBook,
    fontSize: 14
  },
  defaultFieldsetTitle: {
    color: Colors.blackRussian,
    fontFamily: Fonts.GothamBook,
    fontSize: 15,
    letterSpacing: 0.47,
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 5
  },
  defaultLabel: {
    color: Colors.formColorScheme.labelText,
    fontFamily: Fonts.GothamBook,
    fontSize: 13,
    letterSpacing: 0.3,
    lineHeight: 24
  },
  defaultTitleField: {
    color: Colors.whisper,
    fontFamily: Fonts.GothamBook,
    fontSize: 12,
    lineHeight: 16,
    paddingLeft: 10
  },
  defaultPrimaryButton: {
    alignSelf: 'center',
    backgroundColor: Colors.shades.green['600'],
    borderRadius: 28,
    height: 47,
    justifyContent: 'center',
    width: '90%'
  },
  defaultPrimaryButtonText: {
    fontFamily: Fonts.RobotoMedium,
    color: Colors.baseColor.light,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.2
  },
  defaultSecondaryButton: {
    alignSelf: 'center',
    borderColor: Colors.shades.orange['300'],
    borderWidth: 1,
    borderRadius: 28,
    height: 47,
    justifyContent: 'center',
    width: '90%'
  },
  defaultSecondaryButtonText: {
    fontFamily: Fonts.RobotoMedium,
    color: Colors.shades.orange['400'],
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.2
  },
  defaultModalText: {
    fontFamily: Fonts.GothamBook,
    fontSize: 17,
    lineHeight: 26,
    letterSpacing: 0.12,
    color: Colors.appColorScheme.onSecondary
  }
};
