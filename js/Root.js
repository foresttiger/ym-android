import React, { Component } from 'react';
import {AppRegistry,Platform} from 'react-native'
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-splash-screen';

import App from './container/App';

const store = configureStore();
const isIOS = Platform.OS == "ios"

global.__ANDROID__ = !isIOS;
global.__IOS__ = isIOS;  
global.__PAD__ = false;
global.__APP__ = true;

export default class myApp extends Component {
  componentDidMount() {
        SplashScreen.hide();
  }
	componentWillMount() {
		/*锁定只允许横屏*/
	    // Orientation.lockToLandscape();
	    /*锁定只允许竖屏*/
	    Orientation.lockToPortrait();
      if (__PAD__) {
         Orientation.lockToLandscape();
      }
      if(__APP__){
         Orientation.lockToPortrait();
      }
      console.log(__ANDROID__)
      console.log(__IOS__)
	}
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}
AppRegistry.registerComponent('myApp', () => myApp);
