import { Fonts, Forms } from '../../Theme';

export default {
  input: {
    ...Forms.defaultBorderField,
    ...Forms.defaultField,
    backgroundColor: 'transparent',
    marginTop: 0,
    paddingHorizontal: 10,
    width: '100%'
  },
  label: {
    ...Forms.defaultLabel,
    alignSelf: 'flex-start',
    margin: 0
  },
  hint: {
    alignSelf: 'flex-start',
    fontFamily: Fonts.GothamBook,
    fontSize: 12,
    letterSpacing: 0.4,
    lineHeight: 16,
    marginBottom: 8
  }
};
