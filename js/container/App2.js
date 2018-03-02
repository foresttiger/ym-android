import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
import FormList from '../pages/Form'
import Register from '../pages/Register'

const App = StackNavigator({
  Login: { screen: LoginPage },
  Main: { screen: MainPage},
  FormList: { screen: FormList},
  Register: { screen: Register}
});

export default App
