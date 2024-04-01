import { loadAsync } from 'expo-font';

const Fontlist = {
  Roboto: { uri: require('../../assets/fonts/Roboto.ttf') },
  Roboto_medium: { uri: require('../../assets/fonts/Roboto_medium.ttf') },
  'Gotham-Book': { uri: require('../../assets/fonts/Gotham-Book.ttf') },
  'Gotham-Medium': { uri: require('../../assets/fonts/Gotham-Medium.ttf') },
  'Gotham-Bold': { uri: require('../../assets/fonts/Gotham-Bold.ttf') },
  'Gotham-Black': { uri: require('../../assets/fonts/Gotham-Black.ttf') },
};

const loadResourcesAsync = async () => loadAsync(Fontlist);
export default loadResourcesAsync;
