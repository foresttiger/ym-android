/**
 * @author Zheng
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ListView,
  Platform,
  TouchableHighlight,
} from 'react-native'

let {width, height} = Dimensions.get('window')
import * as WeChat from 'react-native-wechat';
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import px2dp from '../util'
const _width = width * 0.25;
import {toastShort} from '../util/ToastUtil.js';
import LocalImg from '../images'
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
export default class ShareView extends Component {
  constructor(props){
      // let ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
      super(props)
      WeChat.registerApp('wx6a03d7a84b431aa4');
      	console.log(props)
         let datas = props.data;
          this.state = {
            "key":datas.key,
            "type":datas.type,
            "name":datas.name,
            "title":datas.title,
            "defaultSelect":datas.defaultSelect,
            "animationIn":datas.animationIn ,
            "animationOut":datas.animationOut ,
            "visibleModal":datas.visibleModal ,
            "func":props.func,
            // "dataSource": ds.cloneWithRows(datas.dataJson)
          }        
  }
  close(){
    this.setState({ visibleModal: false })
   // 具体的cell
  }
  _callback(val){
     console.log(1111)
     this.props.data.callback(val)
     this.close();
  }
  renderRow(rowdata){
      let _this = this;
      let selectStyle = {};
      if (rowdata.description == this.state.defaultSelect) {
        selectStyle = {backgroundColor: 'rgba(0,0,0,0.15)'}
      }
      let _style = [styles.cellStyle, selectStyle]
      console.log(rowdata)
        return(
          <TouchableOpacity onPress={_this._callback.bind(_this,rowdata.description)}>
            <View style={_style}>
                <Text style={styles.valStyle}>{rowdata.description}</Text>
            </View>
          </TouchableOpacity>
        );
  }
  _render(){
  	var _this = this;
  	var views = [];
	var	type = this.state.type;
  	switch(type){
  		case "image":
  			var imgURL = 'https://pic.nn-home.com/filesystem/design/'+this.state.name+'/modelroom_thumb.jpg'
  			views.push(
  				<View style={[styles.shareView,{margin:20}]}>
	 				<CustomButton text='微信好友' icon='wechatIcon'
			          onPress={() => {
			                  WeChat.isWXAppInstalled()
			                    .then((isInstalled) => {
			                      if (isInstalled) {
			                        WeChat.shareToSession({
			                          title:this.state.title,
			                          description: '分享自:KIC·赫曼德',
			                          thumbImage: imgURL,
			                          type: 'news',
			                          webpageUrl: imgURL,
			                          icon:"user"
			                        })
			                        .catch((error) => {
			                        	if (error.message = -2) {
			                        		_this.close()
			                        		toastShort("已取消分享！");
			                        	}
			                          // toastShort(error.message);
			                        });
			                      } else {
			                      	_this.close()
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
			                          title:this.state.title,
			                          description: '分享自:KIC·赫曼德',
			                          thumbImage: imgURL,
			                          type: 'news',
			                          webpageUrl: imgURL
			                        })
			                        // WeChat.shareToTimeline({type: 'text', description: '测试微信朋友圈分享文本',icon:"user"})
			                        // WeChat.shareToTimeline({type: 'text', description: '测试微信朋友圈分享文本',icon:"user"})
			                        .catch((error) => {
			                        	if (error.message = -2) {
			                        		_this.close()
			                        		toastShort("已取消分享！");
			                        	}
			                          // toastShort(error.message);
			                        });
			                      } else {
			                      	_this.close()
			                      	toastShort("没有安装微信软件，请您安装微信之后再试")

			                        // ToastShort('没有安装微信软件，请您安装微信之后再试');
			                      }
			                    });
			              }}
			        />

			       </View>
			      )
  			break;
   		case "video":
  			views.push(
  			<View style={[styles.shareView,{margin:20}]}>
 				<CustomButton text='微信好友' icon='wechatIcon'
		          onPress={() => {
		                  WeChat.isWXAppInstalled()
		                    .then((isInstalled) => {
		                      if (isInstalled) {
		                        WeChat.shareToSession({
		                            title:this.state.title + "|720°全景",
                                description: '分享自:KIC·赫曼德',
                                thumbImage: this.state.name,
                                type: 'news',
                                webpageUrl: this.state.name,
                                icon:"user"
		                        })
		                        .catch((error) => {
		                        	if (error.message = -2) {
		                        		_this.close()
		                        		toastShort("已取消分享！");
		                        	}
		                          // toastShort(error.message);
		                        });
		                      } else {
		                      	_this.close()
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
			                          title:this.state.title + "|720°全景",
			                          description: '分享自:KIC·赫曼德',
			                          thumbImage: this.state.name,
			                          type: 'news',
			                          webpageUrl: this.state.name
			                        })
		                        .catch((error) => {
		                        	if (error.message = -2) {
		                        		_this.close()
		                        		toastShort("已取消分享！");
		                        	}
		                          // toastShort(error.message);
		                        });
		                      } else {
		                      	_this.close()
		                      	toastShort("没有安装微信软件，请您安装微信之后再试")

		                        // ToastShort('没有安装微信软件，请您安装微信之后再试');
		                      }
		                    });
		              }}
		        />
  			</View>)
  		break; 		

  	}
    return(
        <View style={{flex:1}}>
       		{views}
        </View>
      )
  }
  render(){
  	console.log(1111);
    return (
      <View key={this.state.key} style={{display: (this.state.visibleModal == true)?'flex':'none'}}>
        <Modal
          animationInTiming={200}
          animationOutTiming={200}
          backdropTransitionInTiming={200}
          backdropTransitionOutTiming={200}
          style={styles.modelViewStyle}
          isVisible={this.state.visibleModal == true}
          animationIn={this.state.animationIn}
          animationOut={this.state.animationOut}
          backdropOpacity={0.1}
          onBackdropPress={this.close.bind(this)}
          >
          {this._render()}
           {/**/}
        </Modal>
    </View>
    )
  }
}


const styles = StyleSheet.create({
    modelViewStyle:{
      marginLeft: 0,
      alignItems: 'flex-start',
      marginBottom: 0,
      marginTop: Platform.OS == "ios"?0:-20,
      height: Platform.OS == "ios"?height - 40:height,
      zIndex: 0,
    },
   shareView:{
  	position: 'absolute',
  	top: '50%',
  	marginTop:-50,
  	left:'50%',
  	marginLeft: -100,
  	// width: '100%',
  	width: 200,
  	height: 100,
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
  	zIndex: -1
  	// backg-roundColor: '#038de1',
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
})
