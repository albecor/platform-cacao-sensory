import { Colors, Fonts } from '../../Theme';

export default function Styles ({ color = Colors.blackRussian, marginBottom = 12 }) {
  return {
    title: {
      color: color,
      fontFamily: Fonts.Roboto,
      fontSize: 17,
      fontWeight: '700',
      marginBottom: marginBottom
    },
    description: {
      fontFamily: Fonts.GothamBook,
      fontSize: 13,
      lineHeight: 20,
      letterSpacing: 0.3,
      color: color,
      marginBottom: marginBottom
    },
    link: {
      color: color,
      fontFamily: Fonts.GothamBook,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25
    }
  };
}
