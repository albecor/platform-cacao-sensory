import { Dimensions, Platform } from 'react-native';
import { Colors, Elevations, Fonts } from '../../patterns/Theme';

export default {
  container: {
    flex: 1,
    paddingBottom: 80,
    paddingTop: 10
  },
  greetings: {
    fontSize: 20,
    lineHeight: 21,
    color: Colors.shades.oxley[700],
    fontFamily: Fonts.GothamMedium,
    marginTop: -20,
    textAlign: 'center',
    width: '100%'
  },
  imageBackground: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
    ...Platform.select({
      ios: {
        height: 294,
        marginTop: 0
      },
      android: {
        height: 255,
        marginTop: 30
      },
      default: {
        height: 294
      }
    })
  },
  innerContainer: {
    minHeight: Dimensions.get('window').height * 0.8,
    backgroundColor: Colors.bckColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 50,
    marginBottom: -100,
    ...Elevations.defaultElevation
  },
  layout: {
    paddingBottom: 90,
    height: '110%',
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: -140
      },
      android: {
        marginTop: -110
      },
      default: {
        marginTop: -110
      }
    })
  },
  eventCard: {
    minHeight: 120
  },
  scroll: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: -70,
    flex: 1
  }
};
