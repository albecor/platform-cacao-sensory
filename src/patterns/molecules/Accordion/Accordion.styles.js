import Cards from '../../Theme/cards';
import Colors from '../../Theme/colors';
import Elevations from '../../Theme/elevations';
import Fonts from '../../Theme/fonts';

export default {
  cardContainer: {
    marginHorizontal: '2%',
    marginTop: 10,
    paddingTop: 10
  },
  cardContainerOpen: {
    ...Elevations.defaultElevation,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 7,
    overflow: 'hidden'
  },
  cardContainerClose: {
    ...Cards.defaultCard,
    paddingTop: 4,
    paddingBottom: 12,
    position: 'relative',
    bottom: 8,
    height: 92
  },
  helpContainerClose: {
    ...Cards.defaultCard,
    paddingTop: 4,
    paddingBottom: 12,
    position: 'relative',
    bottom: 8,
    height: 70
  },
  helpBody: {
    paddingTop: 0,
    marginTop: 0
  },
  bodyText: {
    color: Colors.blackRussian,
    fontFamily: Fonts.GothamBook,
    fontSize: 13,
    fontWeight: '300',
    letterSpacing: 0.3,
    lineHeight: 19,
    marginVertical: 5
  },
  lastCard: {
    marginBottom: 190
  }
};
