/*eslint max-len: ["error", {"code": 300}]*/
import React, { Component } from 'react';
import { View, Text, StatusBar, YellowBox, Alert, Platform } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import Router2 from './Router2';
import reducers from './reducers';
import './utils/Global';
import {HeaderHeightContext} from '@react-navigation/stack';


class App extends Component {

  componentDidMount() {
    console.disableYellowBox = true;
    YellowBox.ignoreWarnings([
      'Animated: `useNativeDriver` was not specified.',
    ]);

    this.contextType = HeaderHeightContext;
    const {headerHeight} = this.context;
    // global.headerHeight = headerHeight;
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={global.color_ltgray} barStyle="dark-content" />
        {
          Platform.OS === 'ios' ?
          <Router /> :
          <Router />
        }
      </Provider>
    );
  }
}

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default App;
