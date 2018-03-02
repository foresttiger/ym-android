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

export default class ErrorPage extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
        <View style={styles.errorStyle}>
          <Image
            style={{width:width,height: px2dp(150),resizeMode: 'contain'}}
            source={LocalImg['error']}
          />
          <Text style={styles.errorTipStyle}>
            网络请求失败，请检查您的网络设置。
          </Text>
          
          <TouchableOpacity onPress={()=>{this.props.fun()}}>
            <Text style={styles.reloadBtnStyle}>重新加载</Text>
          </TouchableOpacity>
        </View>
      )
  }
}
const styles = StyleSheet.create({
  errorStyle:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderTopColor: '#f9f9f9'
  },
  errorTipStyle:{
    fontSize: px2dp(12),
    marginBottom: px2dp(10),
    marginTop: px2dp(3),
    color: 'rgba(0,0,0,0.4)'
  },
  reloadBtnStyle:{
    paddingTop: px2dp(5),
    paddingBottom: px2dp(5),
    paddingLeft: px2dp(8),
    paddingRight: px2dp(8),
    color: 'rgba(0,0,0,0.7)',
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.7)'
  }
});
