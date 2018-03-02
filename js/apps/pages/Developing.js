'use strict';

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native'

import LocalImg from '../images'
import px2dp from '../util'
const { width, height } = Dimensions.get('window')

export default class Developing extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
        <View style={styles.errorStyle}>
          <Image
            style={{width:width,height: px2dp(150),resizeMode: 'contain'}}
            source={LocalImg['develop']}
          />
        </View>
      )
  }
}
const styles = StyleSheet.create({
  errorStyle:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(241,241,241)',
    borderTopWidth: 2,
    borderTopColor: '#f9f9f9'
  }
});
