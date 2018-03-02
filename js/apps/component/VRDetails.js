/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import px2dp from '../util'
import Icon from 'react-native-vector-icons/Ionicons'
import NavBar from './NavBar'
import MyWebView from './MyWebView'
import LocalImg from '../images'
import ShareModal from './shareView'
import {toastShort} from '../util/ToastUtil.js';

export default class VRDetails extends Component {
  constructor(props){
      super(props)
      this.state={
        key:1000000,
      	title:props.navigation.state.params.name,
        jobId:props.navigation.state.params.jobId,
        panoramaUrl:props.navigation.state.params.panoramaUrl,
        login:props.navigation.state.params.login,
        isCollect:props.navigation.state.params.isCollect,
        smartUserId:props.navigation.state.params.smartUserId,
        accessToken:props.navigation.state.params.accessToken
      }
      console.log(props)
      console.log(this.state)
  }
  back(){
  	 this.props.navigation.goBack();
  }
  componentWillMount() {
     var _this = this;
     var selectObj = {
         serviceName: "mobileProductIsCollect",
         smartUserId: this.state.smartUserId,
         accessToken: this.state.accessToken,
         typeId: "DIY_CASE_COLLECT", //方案收藏
         productId: this.state.jobId,
     };
     console.log(selectObj)
     var formData = "";
     for (let k in selectObj) {
         formData += k + '=' + selectObj[k] + '&'
     }
     formData = formData.substr(0, formData.length - 1);
     fetch('http://yun.kic.com.cn/control/mobileQueryServiceEncryptData', {
             method: 'POST',
             headers: { "Content-Type": "application/x-www-form-urlencoded" },
             body: formData
         }).then((response) => response.text())
         .then((responseData) => { // 上面的转好的json
             console.log(responseData);
             if (JSON.parse(responseData).result.status == "success") {
                 if (JSON.parse(responseData).result.isCollect == "true") {
                     _this.setState({ "isCollect": true });
                 } else {
                     _this.setState({ "isCollect": false });
                 }
             } else {
                  _this.setState({ "isCollect": false });
             }
         })
         .catch((error) => {
           _this.setState({ "isCollect": false });
         })
  }
  goShare(type,name,title,key){
    var _this = this;
    var i = Math.floor(this.state.key) + 1;
    let dataObj = {
      // key:i,
      type:type,
      name:name,
      title:title,
      animationIn:"fadeIn",
      animationOut:"fadeOut",
      visibleModal:true,
      key:i,
      callback:(msg)=>{
          // console.log(msg) 
          // _this.prototypeRoomSearch(type,msg,JSONS);
      }
    }
    // var ShareModal = [];
    // ShareModal.push( <ShareModal key={0}  data={dataObj}/>);
    // this.setState({"shareView":ShareModal,"key":0});
    // this.state.data = [];
    this._renderModal(dataObj);
  }
  toCollect() {
     if (!this.state.login) {
         toastShort("您还未登录，请登录后再试！");
         return;
     }
     var _this = this;
     var selectObj = {
         serviceName: "mobileUserSaveCollect",
         smartUserId: this.state.smartUserId,
         accessToken: this.state.accessToken,
         typeId: "DIY_CASE_COLLECT", //方案收藏
         productId: this.state.jobId,
     };
     console.log(selectObj)
     var formData = "";
     for (let k in selectObj) {
         formData += k + '=' + selectObj[k] + '&'
     }
     formData = formData.substr(0, formData.length - 1);
     fetch('http://yun.kic.com.cn/control/mobileQueryServiceEncryptData', {
             method: 'POST',
             headers: { "Content-Type": "application/x-www-form-urlencoded" },
             body: formData
         }).then((response) => response.text())
         .then((responseData) => { // 上面的转好的json
             console.log(responseData);
             if (JSON.parse(responseData).result.status == "success") {
                 if (JSON.parse(responseData).result.operatorType == "add") {
                     _this.setState({ "isCollect": true });
                     toastShort("收藏成功！");
                 } else {
                     _this.setState({ "isCollect": false });
                     toastShort("取消收藏成功！");
                 }
             } else {
                 toastShort("网络错误，请稍后再试！");
             }
         })
         .catch((error) => {
             console.log(error)
             AlertIOS.alert('提示', '网络异常', [{
                 text: '重试',
                 onPress: function() {
                     _this.toCollect()
                 }
             }]);
         })
  }
  _renderModal(data){
    console.log(data)
    var shareModal = [];
    console.log(111)
    var i =data.key;
    shareModal.push(<ShareModal key={i}  data={data}/>);
    this.setState({"shareView":shareModal,"key":i});
    // console.log(this.state.shareView)
  } 
  render(){
    let shareView = this.state.shareView;
    var isCollect = this.state.isCollect?"ios-heart":"md-heart-outline";
    console.log(this.state.panoramaUrl);
    return (
      <View style={{flex: 1, backgroundColor: "#038de1"}}>
      	<NavBar
          title={this.state.title}
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <View style={styles.otherBtns}>
           <TouchableOpacity style={{marginRight:px2dp(10),marginTop:px2dp(10)}}>
             <Icon
              name={isCollect}  //图片名连接,可以到这个S网址搜索:http://ionicons.com/, 使用时:去掉前面的 "icon-" !!!!
              size={30}   //图片大小
              color="#000000"  //图片颜色
              onPress={()=>{this.toCollect()}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight:px2dp(10),marginTop:px2dp(10)}}>
              <Icon
              name="ios-share"   //图片名连接,可以到这个网址搜索:http://ionicons.com/, 使用时:去掉前面的 "icon-" !!!!
              size={30}   //图片大小
              color="#000000"  //图片颜色
              onPress={()=>{this.goShare("video",this.state.panoramaUrl,this.state.title)}}
              />
            </TouchableOpacity>
        </View>
        <MyWebView
          source={{uri: this.state.panoramaUrl}}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
        {shareView}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  webview_style: {
    flex: 1
  },
  backStyle:{
  	width: 80,
  	height: 80,
  	position: 'absolute',
  	top: 100,
  	left: 100,
  	backgroundColor: 'red'
  },
  otherBtns:{
    position: 'absolute',
    top: px2dp(10),
    right: px2dp(10),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    alignContent: 'center' 
  }
})
