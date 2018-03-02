/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @Zheng
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './frame/App.js';
// import App from './reactnav/App.js';

export default class ReactNavigationDemo extends Component {
  render() {
    return (
     <App />
    );
  }
}

AppRegistry.registerComponent('myApp', () => ReactNavigationDemo);
