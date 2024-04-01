import { Colors, Elevations, Fonts } from '../../Theme';

export default {
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    minHeight: 60,
    width: '90%',
    backgroundColor: Colors.white,
    marginBottom: 20,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10,
    ...Elevations.defaultElevation
  },
  cardContainerItems: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 10,
    paddingBottom: 15
  },
  cardContainerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexWrap: 'wrap'
  },
  cardContainerActionsItem: {
    flexDirection: 'row',
    marginTop: 6
  },
  linkText: {
    textTransform: 'uppercase',
    fontSize: 11,
    lineHeight: 12,
    letterSpacing: 0.17,
    fontFamily: Fonts.GothamMedium
  },
  wrapperLinkText: {
    marginLeft: 2,
    paddingTop: 1,
    marginRight: 3,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.baseColor.greenPrimary,
    height: 20
  }
};
