/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import NavBar from '../component/NavBar'
import MyWebView from '../component/MyWebView'
import PrototypeRoom from './PrototypeRoom'
import VRList from './VRList'
// import ProductList from './ProductList'
import TabViewBar from '../component/TabViewBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'

export default class Discover extends Component {
  constructor(props){
      super(props)
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#cccccc"}}>
        <NavBar title="灵感库"/>
      <ScrollableTabView renderTabBar={() => <TabViewBar/>}>
          <PrototypeRoom tabLabel="优秀方案" props={this.props}/>
          {/*<ProductList tabLabel="素材库"/>*/}
          <VRList tabLabel="VR全景" props={this.props}/>
       </ScrollableTabView>
      </View>
    )
  }
}
