import 'react-native-gesture-handler';
import 'setimmediate'; // related to some fix on web for reanimated, check: https://github.com/software-mansion/react-native-reanimated/issues/4140

import { registerRootComponent } from 'expo';
import { enableFreeze } from 'react-native-screens';

import Root from './src/root';
enableFreeze();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
