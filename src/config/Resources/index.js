import { loadAsync } from 'expo-font';

const Fontlist = {
  Roboto: require('../../assets/fonts/Roboto.ttf'),
  Roboto_medium: require('../../assets/fonts/Roboto_medium.ttf'),
  'Gotham-Book': require('../../assets/fonts/Gotham-Book.ttf'),
  'Gotham-Medium': require('../../assets/fonts/Gotham-Medium.ttf'),
  'Gotham-Bold': require('../../assets/fonts/Gotham-Bold.ttf'),
  'Gotham-Black': require('../../assets/fonts/Gotham-Black.ttf'),
};

const loadResourcesAsync = async () => loadAsync(Fontlist);
export default loadResourcesAsync;
