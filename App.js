import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MainNavigator } from './src/Routes';
import { createAppContainer } from 'react-navigation';
import CardScan from './src/components/CardScan';
import Home from './src/components/Home';
import reducer from './src/reducers';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const AppContainer = createAppContainer(MainNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    console.log('oi eu sou o goku');

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
