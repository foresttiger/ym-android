/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import NavBar from '../component/NavBar'
import TakeOut from './TakeOut'
import Breakfast from './Breakfast'
import TabViewBar from '../component/TabViewBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'

export default class ProductList extends Component {
  constructor(props){
      super(props)
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#ffffff"}}>
        <Text></Text>
      </View>
    )
  }
}
