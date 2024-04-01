import Colors from './colors';
import Elevations from './elevations';

export default {
  defaultCard: {
    backgroundColor: Colors.white,
    marginHorizontal: '2%',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 4,
    ...Elevations.defaultElevation
  }
};
