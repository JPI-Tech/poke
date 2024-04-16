import React from 'react';
import store, {persistor} from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// import logger from './src/utils/logger';

LogBox.ignoreAllLogs();

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  locationProvider: 'android',
});

Geolocation.getCurrentPosition(info => console.log(info));
// Geolocation.getCurrentPosition(info => logger.info(info));

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
