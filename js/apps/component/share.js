/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import * as WeChat from 'react-native-wechat';
import {toastShort} from '../util/ToastUtil.js';
import LocalImg from '../images'

// var WeChat=require('react-native-wechat');
//import fs from 'react-native-fs';
class CustomButton extends Component{
/*class CustomButton extends Component {*/
  render() {
  	var icon = this.props.icon
  	console.log(icon);
  	console.log(this.props.icon);
  	console.log(this.props);
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <View style={styles.buttonText}><Image source={LocalImg[icon]} style={styles.imagesIcon}/><Text style={styles.shareTitle}>{this.props.text}</Text></View>
      </TouchableHighlight>
    );
  }
}
export default class RNWeChatDemo extends Component{
  constructor(props) {
      super(props);  
      let datas = props.data;
      this.state = {
        "type":datas.type,
        "name":datas.name,
        "Url":datas.url,
        "func":props.func,
      }
      //应用注册
      WeChat.registerApp('wx6a03d7a84b431aa4');
  }

  render() {
    return (
      <View style={[styles.shareView,{margin:20}]}>
       {/* <Text style={styles.welcome}>
            微信好用
        </Text>*/}
        <CustomButton text='微信好友' icon='wechatIcon'
          onPress={() => {
                  WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                      if (isInstalled) {
                        WeChat.shareToSession({
                        	type: 'imageUrl',
						    title: 'web image',
						    description: 'share web image to time line',
						    mediaTagName: 'email signature',
						    messageAction: undefined,
						    messageExt: undefined,
						    imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'
                        })
                        .catch((error) => {
                        	if (error.message = -2) {
                        		toastShort("已取消分享！");
                        	}
                        	// toastShort(error.message);
                          // ToastShort(error.message);
                        });
                      } else {
                      	toastShort("没有安装微信软件，请您安装微信之后再试")
                        // ToastShort('没有安装微信软件，请您安装微信之后再试');
                      }
                    });
              }}
        />
        <CustomButton text='微信好友' icon='wechatIcon'
          onPress={() => {
                  WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                      if (isInstalled) {
                        WeChat.shareToSession({
                          title:'微信好友测试链接',
                          description: '分享自:安居乐装饰APP',
                          thumbImage: 'http://m.gxajl.com',
                          type: 'news',
                          webpageUrl: 'http://m.gxajl.com',
                          icon:"user"
                        })
                        .catch((error) => {
                        	if (error.message = -2) {
                        		toastShort("已取消分享！");
                        	}
                          // toastShort(error.message);
                        });
                      } else {
                      	toastShort("没有安装微信软件，请您安装微信之后再试")

                        // ToastShort('没有安装微信软件，请您安装微信之后再试');
                      }
                    });
              }}
        />
        <CustomButton text='微信朋友圈' icon='momentsIcon'
          onPress={() => {
                  WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                      if (isInstalled) {
                        WeChat.shareToTimeline({type: 'text', description: '测试微信朋友圈分享文本',icon:"user"})
                        .catch((error) => {
                        	if (error.message = -2) {
                        		toastShort("已取消分享！");
                        	}
                          // toastShort(error.message);
                        });
                      } else {
                      	toastShort("没有安装微信软件，请您安装微信之后再试")

                        // ToastShort('没有安装微信软件，请您安装微信之后再试');
                      }
                    });
              }}
        />
        <CustomButton text='微信朋友圈' icon='momentsIcon'
          onPress={() => {
                  WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                      if (isInstalled) {
                        WeChat.shareToTimeline({
                          title:'微信朋友圈测试链接',
                          description: '分享自:江清清的技术专栏(www.lcode.org)',
                          thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                          type: 'news',
                          webpageUrl: 'http://www.lcode.org',
                          icon:"usr"
                        })
                        .catch((error) => {
                        	if (error.message = -2) {
                        		toastShort("已取消分享！");
                        	}
                          // toastShort(error.message);
                        });
                      } else {
                      	toastShort("没有安装微信软件，请您安装微信之后再试")

                        // ToastShort('没有安装微信软件，请您安装微信之后再试');
                      }
                    });
              }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  shareView:{
  	position: 'absolute',
  	top: '50%',
  	marginTop:-100,
  	left:'50%',
  	marginLeft: -100,
  	// width: '100%',
  	width: 200,
  	height: 200,
  	display: 'flex',
  	flexDirection: 'row',
  	justifyContent: 'flex-start',
  	flexWrap: 'wrap',
  	alignItems : 'center',
  	alignContent:  'center',
  	borderRadius: 8,
  	// borderWidth: 1,
  	// borderColor: '#000000',
  	backgroundColor: 'rgba(255,255,255,0.8)',
  	// backgroundColor: '#038de1',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
  	width: 99,
  	height: 99,
  	// borderWidth: 1,
  	// borderColor: '#cccccc',
  	// lineHeight: 100,
    // margin:10,
    backgroundColor: 'rgba(255,255,255,0)',
    // padding: 15,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderRadius: 8,
  }, 
  imagesIcon: {
  	width: 30,
  	height: 30
  },
  buttonText: {
  	height: 100,
	display: 'flex',
  	// flexDirection: 'row',
  	justifyContent: 'center',
  	// flexWrap: 'wrap',
  	alignItems : 'center',
  	// color:'#f5f5f5'
  },
  shareTitle:{
  	marginTop: 6,
  	color:'#454545'
  }
});
