import { StyleSheet } from 'react-native';
import { Colors, Elevations, Borders, Forms } from '../../patterns/Theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'
  },
  form: {
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '90%',
    minHeight: 290,
    marginBottom: 16,
    backgroundColor: Colors.white,
    borderRadius: Borders.borderRadiusSmall,
    ...Elevations.defaultElevation
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    alignSelf: 'center'
  },
  inputGroup: {
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    width: '90%',
    maxWidth: 310,
    marginBottom: 12,
    minHeight: 70
  },
  loginLinks: {
    width: '85%',
    marginVertical: 24,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  description: {
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 6.2
  },
  modalText: {
    ...Forms.defaultModalText
  }
});
