import React from 'react';
import {AppRegistry, LogBox, View} from 'react-native';
import {Provider} from 'react-redux';

import styles from './App.styles';

import Router from './src/routes/Router';
import {store} from './src/state/store.ts';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.main}>
        <Router />
      </View>
    </Provider>
  );
};

export default App;

AppRegistry.registerComponent('app', () => App);
