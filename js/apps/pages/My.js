/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  AlertIOS,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux';
import *as loginAction from '../../actions/loginAction';// 导入action方法

import LocalImg from '../images'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import Setting from './Setting'
import UserProfile from './UserProfile'
import Address from './Address'
import px2dp from '../util'
import Login from './LoginPage.js'
import MainPage from './MainPage.js'


import Icon from 'react-native-vector-icons/Ionicons'
let {width, height} = Dimensions.get('window')

class My extends Component {
  constructor(props){
      super(props)
      this.state = {
        login:false,
        loginData:{}
      }
  }
  static navigationOptions = {
    title: '控制台',
  };
  _loginOut(){
     const { loginOut } = this.props;
      loginOut()
      this.setState({
        login:false
      })
  }
  componentWillMount() {
    console.log(this.props)
    storage.load({
        key: "login",
    }).then(read => {
         this.setState({ login: true,user:{name:read.name} });
    }).catch(err => {
        console.log(err)
        // 如果没有找到数据且没有sync方法，
        // 或者有其他异常，则在catch中返回
        // console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    })
  }
  _render(){
    console.log(11)
    let obj = {
        callback:(msg)=>{ this.setState({
          login:msg
        })}
      }
    let isLogin = this.state.login;
    if (isLogin) {
      return (
            <View  style={{flex:1}}>
                <MainPage {...this.props} {...this.state} {...obj}/>
            </View>
          )
    }else{
      return (
            <View style={{flex:1}}>
              <Login {...this.props} {...obj} />
            </View>
          )
    }
  }
  _goLogin(){

  }
  _goMy(){

  }
  render(){
    return (
     <View style={{flex:1}}>
      {this._render()}
     </View>
    )
  }
}
const styles = StyleSheet.create({
  scrollView: {
    marginBottom: px2dp(46),
    backgroundColor: "#038de1"
  },
  userHead: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#038de1"
  },
  numbers: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 74
  },
  numItem: {
    flex: 1,
    height: 74,
    justifyContent: "center",
    alignItems: "center"
  }
})
export default connect(
  (state) => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
  }),
  (dispatch) => ({
    loginOut: () => dispatch(loginAction.loginOut())
  })
)(My)
