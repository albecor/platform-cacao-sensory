import React, {useEffect, useCallback} from 'react';
import { NativeBaseProvider } from 'native-base';
import { AppContextProvider } from './context';
import loadResourcesAsync from './config/Resources';
import Authorization from './utils/Authorization';
import Notification from './utils/Notification';
import * as SplashScreen from 'expo-splash-screen';
import {View} from "react-native";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadResourcesAsync();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <AppContextProvider>
        <NativeBaseProvider>
          <View style={{flex: 1}} onLayout={onLayoutRootView}>
            <Notification />
            <Authorization />
          </View>
        </NativeBaseProvider>
    </AppContextProvider>
  );
}

export default App;
