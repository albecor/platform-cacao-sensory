import { Colors, Fonts } from '../../patterns/Theme';

export default {
  avatarContent: {
    padding: 20,
    color: Colors.blackRussian,
    backgroundColor: 'transparent',
    width: '35%'
  },
  avatarPlaceholder: {
    backgroundColor: 'transparent',
    width: 105,
    height: 100
  },
  container: {
    flex: 1
  },
  containerItem: {
    flex: 1,
    width: '100%'
  },
  listItemContainer: {
    flexDirection: 'row'
  },
  listItemText: {
    flex: 1, paddingLeft: 5
  },
  scroll: {
    height: '100%'
  },
  title: {
    fontFamily: Fonts.GothamMedium,
    fontSize: 16,
    lineHeight: 18,
    marginTop: 25,
    marginBottom: 10,
    width: 180
  }
};
