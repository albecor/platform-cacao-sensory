import { Platform, Dimensions } from 'react-native';
import { Colors } from '../patterns/Theme';
const windowHeight = Dimensions.get('window').height;
const menuContainer = (windowHeight / 3) / 3;

export default {
  activeTab: {
    position: 'absolute',
    paddingTop: 5,
    paddingHorizontal: 17
  },
  tabsContainer: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    position: 'absolute',
    ...Platform.select({
      ios: {
        height: menuContainer + 10
      },
      android: {
        height: menuContainer - 15
      },
      default: {
        height: menuContainer
      }
    })
  }
};
