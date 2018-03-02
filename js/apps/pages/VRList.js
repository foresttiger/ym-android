/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  AlertIOS,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  NetInfo
  // Image
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Image from 'react-native-image-progress'
// import * as Progress from 'react-native-progress'
import Progress from 'react-native-progress'
import Orientation from 'react-native-orientation';

import LocalImg from '../images'
import px2dp from '../util'
import DataEncrypt from '../component/DataEncrypt'
import VRDetails from '../component/VRDetails';
import ErrorPage from '../component/errorPage'

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const isAndroid = Platform.OS != "ios"
const { width, height } = Dimensions.get('window')
const ImgWidth = width * 0.5 - px2dp(10);
const ImgHeight = ImgWidth * 0.8;
let isLANDSCAPE=false;

//列表组件
class Item extends Component {
  constructor(props){
      super(props)
      this.state={
        jobId: props.data.jobId,
        name:props.data.name,
        panoramaUrl:props.data.panoramaUrl,
        isCollect:props.data.isCollect,
        login:props.data.login,
        smartUserId:props.data.smartUserId,
        accessToken:props.data.accessToken

      }     
  }
  goVrDetails(key,obj){
    const {navigate} = this.props.data.nav.navigation;
    navigate("VRDetails",obj);
  }
  render(){
    const { jobId,name,panoramaUrl,isCollect,login,smartUserId,accessToken } = this.props.data
    let obj = {
      name:name,
      jobId:jobId,
      panoramaUrl:panoramaUrl,
      isCollect:isCollect,
      login:login,
      smartUserId:smartUserId,
      accessToken:accessToken
    }
    // console.log(jobId)
    let render = (
      <View style={[styles.itemsStyle,{marginLeft:isLANDSCAPE?px2dp(20)/ 3:0}]}>
          <Image
            defaultSource={LocalImg['back']}
            indicator={Progress}
            style={{width:ImgWidth,height: ImgHeight,position: 'relative',zIndex: 98 }}

            source={{uri:"http://pic7.nn-home.com/filesystem/design/"+ jobId +"/modelroom_thumb.jpg"}}
          /> 
          <View style={[styles.vricon,{width: ImgWidth,height: ImgHeight,backgroundColor: 'rgba(0,0,0,0.3)'}]}> 
              <Image
                source={LocalImg['VRIcon']}
                style={{width:px2dp(50),height: px2dp(50)}}
                />
            </View>          
      </View>
    )
    return (
      Platform.OS === 'ios'?(
        <TouchableOpacity style={{marginTop: 10}} onPress={() =>{this.goVrDetails("VRDetails",obj)}}>{render}</TouchableOpacity>
      ):(
        <View style={{marginTop: 10}}><TouchableOpacity style={{marginTop: 10}} onPress={() =>{this.goVrDetails("VRDetails",obj)}}>{render}</TouchableOpacity></View>
      )
    )
  }
}
// 样板间列表
export default class VRList extends Component {
  constructor(props){
      super(props)
      this.state = {
        data: [],
        viewIndex:0,
        isRefreshing: false,
        loader:false,
        viewSize:30,
        login:false,
        smartUserId:undefined,
        accessToken:undefined

      }
  }
  _loadData(index,stateData,obj){
    var _this = this;
    var selectObj = obj || {
            serviceName: "getProductDesignList",
            productStoreId:"STORE_10000",
            designType:"EXCELLENT_DESIGN",
            panoramaUrl:"true",
            productRemoved:"N"
        };
    if (this.state.login) {
       Object.assign(selectObj,{"smartUserId":this.state.smartUserId})
    }
    // if (true) {}
    var formData = "";
    for (let k in selectObj) {
        formData +=k +'='+ selectObj[k] +'&'
    } 
    formData = formData.substr(0, formData.length - 1);
    // fetch('http://192.168.1.115:8080/control/mobileCommonServiceEncryptData', {
    fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
            method: 'POST',
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body: formData
        }).then((response) => response.text())
          .then((responseData) => { // 上面的转好的json
            // console.log(DataEncrypt(responseData))
            let _obj = {
               data: DataEncrypt(responseData).records,
               isRefreshing: false,
               viewIndex:index,
               // isCollect:(datas.isCollect != "false")
            }
            // console.log(_obj);
            if (stateData) {Object.assign(_obj, stateData)}
            _this.setState(_obj)
          })
          .catch((error)=> {
              // console.log(error)
          })
  }
  _onRefresh(){
    var viewIndex = this.state.viewIndex;
    this._loadData(viewIndex)
    this.setState({isRefreshing: true});
  }
  componentWillMount() {
      const initial = Orientation.getInitialOrientation();
      if (initial === 'PORTRAIT') {
          // do something
          this.setState({
              initial: "PORTRAIT",
              loginBack: "loginBack"
          })
          isLANDSCAPE = false
          ImgWidth = width;
          ImgHeight = ImgWidth * 0.8
      } else {
          isLANDSCAPE = true
          this.setState({
              initial: "LANDSCAPE",
              loginBack: "loginBackPad"
          })
      }
      console.log(this.props)
      storage.load({
          key: "login",
      }).then(read => {
          this.setState({ login: true, smartUserId: read.name, accessToken: read.token });
          this._loadData(0)
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
          this._loadData(0)
      })
  } 
  componentDidMount() {
      var _this = this;
      // this._loadData(0)
      NetInfo.isConnected.fetch().done((isConnected) => {
          console.log('First, is ' + (isConnected ? 'online' : 'offline'));
          if (isAndroid) {
            if (!isConnected) {

               _this.setState({"loader":false})
                // NetWork = false;
                _this._renderMiddle(false)
                //AlertIOS.alert("网络错误", "网络连接失败，请连接网络后重试！");

            }else{
              _this.setState({"loader":true})
               // _this._renderMiddle(true)
            }
          }
      });

      function handleFirstConnectivityChange(isConnected) {
          let NetWork = true;
          console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
          if (!isConnected) {
             _this.setState({"loader":false})
              // NetWork = false;
              // _this._renderMiddle(false)
              //AlertIOS.alert("网络错误", "网络连接失败，请连接网络后重试！");

          }else{
            _this.setState({"loader":true})
             // _this._renderMiddle(true)
          }
          NetInfo.isConnected.removeEventListener(
              'change',
              handleFirstConnectivityChange
          );
          // return NetWork;
      }
      NetInfo.isConnected.addEventListener(
          'change',
          handleFirstConnectivityChange
      );
  }
   _renderMiddle(){
    let isloader = this.state.loader;
    if (isloader) {
       return (
        <View style={{flex:1}}>
          {this._render()}
        </View>
      )
     }else{
      return (
        <View style={{flex:1,backgroundColor: '#ffffff'}}>
          {this._networkErro()}
        </View>
      )
     }
  }
  _render(){
    let _this = this;
    let _scrollView = undefined;
    let ModelView = this.state.ModelView;

    return (
      <View style={{flex:1,borderTopWidth: 1,borderTopColor: '#f9f9f9'}}>
        <ScrollView
          style={{backgroundColor: "#f3f3f3"}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#bbb"
              title="数据加载中..."
              titleColor="#000000"
              progressViewOffset={30}
              colors={['#0000ff','#ff0000', '#00ff00', ]}
              progressBackgroundColor="#038de1"
            />
          }
        >
          <View style={styles.scrollViewStyle}>
            {
              // var obj = {
              //     "jobId": item.productId,
              //     "panoramaUrl": item.panoramaUrl,
              //     "name": item.productName,
              //     "nav": _this.props.props,
              //     isCollect: (item.isCollect != "false"),
              //     login: _this.state.login,
              //     smartUserId:_this.state.smartUserId,
              //     accessToken:_this.state.accessToken
              // }
              this.state.data.map((item, i) => {
                var obj = {
                  "jobId": item.productId,
                  "panoramaUrl": item.panoramaUrl,
                  "name": item.productName,
                  "nav": _this.props.props,
                  isCollect: (item.isCollect != "false"),
                  login: _this.state.login,
                  smartUserId:_this.state.smartUserId,
                  accessToken:_this.state.accessToken
              }
                return <Item key={i} data={obj} />
              })
            }
          </View>
         </ScrollView>
        {ModelView}
      </View>
    )
  }
  _onreload() {
      var _this = this;
      this._loadData(0)
      NetInfo.isConnected.fetch().done((isConnected) => {
          console.log('First, is ' + (isConnected ? 'online' : 'offline'));
          if (!isConnected) {

             _this.setState({"loader":false})
              // NetWork = false;
              _this._renderMiddle(false)
              //AlertIOS.alert("网络错误", "网络连接失败，请连接网络后重试！");

          }else{
            _this.setState({"loader":true})
             // _this._renderMiddle(true)
          }
      });

      function handleFirstConnectivityChange(isConnected) {
          let NetWork = true;
          console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
          if (!isConnected) {
              _this.setState({ "loader": false })
              // NetWork = false;
              _this._renderMiddle(false)
              //AlertIOS.alert("网络错误", "网络连接失败，请连接网络后重试！");

          } else {
              _this.setState({ "loader": true })
              // _this._renderMiddle(true)
          }
          NetInfo.isConnected.removeEventListener(
              'change',
              handleFirstConnectivityChange
          );
          // return NetWork;
      }
      NetInfo.isConnected.addEventListener(
          'change',
          handleFirstConnectivityChange
      );
  }
  _networkErro(){
    return(
        <View style={{flex:1}}>
          <ErrorPage fun={this._onreload.bind(this)}  />
        </View>
      )
  }
  render(){
    // NetWorksTools();
    return (
        <View style={{flex:1}}>
          {this._renderMiddle()}
        </View>
      )
  } 
}

const styles = StyleSheet.create({
    scrollViewStyle: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    itemsStyle: {
        position: 'relative',
        marginLeft: px2dp(20) / 3,
    },
    itemsTextStyle: {
        width: ImgWidth,
        color: "#454545",
        paddingTop: px2dp(5),
        paddingLeft: px2dp(5),
        paddingBottom: px2dp(5)
    },
    item: {
        flexDirection: "row",
        paddingLeft: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingTop: 16
    },
    logo: {
        width: 35,
        height: 35,
        marginRight: 8,
        resizeMode: "cover",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f5f5f5"
    },
    info: {
        paddingRight: 16,
        flex: 1
    },
    selectViewStyle: {
        backgroundColor: '#ffffff',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: px2dp(20),
    },
    selectItems: {
        flexDirection: 'row',
        marginRight: px2dp(20),
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        width: width * 0.3,
        height: height,
        backgroundColor: 'white',
        borderColor: '#cccccc',
    },
    bottomModal: {
        justifyContent: 'flex-start',
        margin: 0,
    },
    vricon:{
      position: 'absolute',
      top: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99,
      backgroundColor: 'rgba(0,0,0,0.08)'
      // backgroundColor: '#000000'
    }
})
