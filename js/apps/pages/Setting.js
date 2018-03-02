/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Alert
} from 'react-native'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import UserProfile from './UserProfile'
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
import *as counterAction from '../../actions/counterAction';
import *as loginAction from '../../actions/loginAction';// 导入action方法
//FontAwesome
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'My'})
  ]
})
class Setting extends Component {
  constructor(props){
      super(props)
  }
  static navigationOptions = {
    title: '设置',
    headerStyle:{
      backgroundColor: '#038de1'
    },
    headerBackTitleStyle:{
      color:'#ffffff'
    },
    headerTintColor:'#ffffff', 
  };
  back(){
   this.props.navigation.goBack();
  }

  goProfile(){
    this.props.navigator.push({
        component: UserProfile,
        args: {}
    });
  }
  islogout(){
    let _this = this;
    Alert.alert('退出登录','确定要退出登录吗？',
      [{text:"确认", onPress:_this.logout.bind(this)}]
    );
  }
  logout() {
    const { loginOut } = this.props;
    loginOut();
    this.props.navigation.dispatch(resetAction)
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
{/*        <NavBar
          title="设置"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />*/}

        <ScrollView
          scrollEnabled={false}
        >
         {/* <Item name="账户安全" first={true} onPress={this.goProfile.bind(this)}/>*/}
          <Item name="通用"/>
          {/*<Item name="关于饿了么" first={true}/>*/}
          
        </ScrollView>
        <Item.Button name="退出登录" color={'#038de1'} onPress={this.islogout.bind(this)} first={true}/>
      </View>
    )
  }
}
export default connect(
  (state) => ({
    count: state.counter.count,
  }),
  (dispatch) => ({
    loginOut: () => dispatch(loginAction.loginOut()),
  })
)(Setting)
