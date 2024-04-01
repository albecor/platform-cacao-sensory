import React from 'react';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider } from 'native-base';
import { AppContextProvider } from './context';
import loadResourcesAsync from './config/Resources';
import Authorization from './utils/Authorization';
import Notification from './utils/Notification';

const renderAppLoading = setLoadingComplete => (
  <AppLoading
    startAsync={loadResourcesAsync}
    onFinish={() => setLoadingComplete(true)}
    onError={console.warn}
  />
);

const RenderApp = () => (
  <AppContextProvider>
    <NativeBaseProvider>
      <Notification />
      <Authorization />
    </NativeBaseProvider>
  </AppContextProvider>
);

const App = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  return (
    <AppContextProvider>
      {!isLoadingComplete ? renderAppLoading(setLoadingComplete) : <RenderApp />}
    </AppContextProvider>
  );
};

export default App;
