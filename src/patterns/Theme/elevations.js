import Colors from './colors';

export default {
  defaultElevation: {
    borderColor: Colors.borderColor,
    borderRadius: 15,
    borderWidth: 1,
    elevation: 4,
    shadowColor: Colors.blackRussian,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  openCardElevation: {
    borderColor: Colors.borderColor,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderWidth: 0,
    elevation: 2,
    shadowColor: Colors.blackRussian,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1
  },
  buttonElevation: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20
  }
};
