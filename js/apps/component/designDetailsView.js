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
  ScrollView,
  // Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import LocalImg from '../images'
import LocalDesignImg from '../data/homeDesignImage'

import px2dp from '../util'
import NavBar from './NavBar'
import Button from './Button'
import Icon from 'react-native-vector-icons/Ionicons'
import Image from 'react-native-image-progress'
import ProgressCircle from 'react-native-progress/Circle';

import ImageViewer from './ImageViewModal'
const { width, height } = Dimensions.get('window')
const imgMargin = px2dp(30) / 3;
//FontAwesome
export default class designDetailsView extends Component {
  constructor(props){
      super(props)
      this.state = {
        title:props.navigation.state.params.name,
        imgs:props.navigation.state.params.dataStr,
        Imgwidth:300,
        Imgheight:300
      }
  }
  back(){
    this.props.navigation.goBack()
  }
  goImageViewer(key,data){
    const {navigate}  = this.props.navigation;
     navigate('ImageViewer',data);
    // let pages = {
    //   "ImageViewer": ImageViewer
    // }
    // if(pages[key]){
    //   this.props.navigator.push({
    //       component: pages[key],
    //       args: {
    //         data
    //       }
    //   })
    // }
  }
  _onLoadEnd(param,uri){
      // console.log(param)
      this.state.isAlreadyLoad = true;
      // console.log(this.state.isAlreadyLoad);
      Image.getSize(uri,(Imgwidth,Imgheight) =>{
        let radio = Imgwidth / Imgheight
        Imgwidth = (width - px2dp(30));
        Imgheight = Imgwidth / radio ;       
        this.setState({Imgwidth,Imgheight});
      });
  }
  _renderImage(){
    var _this = this;
    let imgList = _this.state.imgs;

     return imgList.map((n, i) => {
      // console.log(n)
      let _render = (i) => {
        return (
            <View  style={{alignItems: 'center'}}>
              <Image 
                defaultSource={LocalImg['back']}
                resizeMode = {'contain'}
                style={[styles.imgStyle,{flex: 1,height:__APP__?height * 0.35:height * 0.85}]}
                // style={[styles.imgStyle,{resizeMode:''}]}
                source={LocalDesignImg[n.url]}
                // onLoadEnd = {()=>_this._onLoadEnd('加载结束后，不论成功还是失败，调用此回调函数',n.url)}
              />
            </View>
        )
      }
      let dataObj = {
        dataStr:imgList,
        index:i,
        callback:(msg)=>{
          // console.log(msg) 
        }
      }
      return (
        <View  key={i}>{_render(i)}
          {/*<TouchableOpacity onPress = {()=>{this.goImageViewer("ImageViewer",dataObj)}} >{_render(i)}</TouchableOpacity>*/}
        </View>
      )
    })
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title={this.state.title}
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <View>
            {this._renderImage()}
          </View>
          
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  address: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#fbfbfb",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingVertical: 8
  },
  tag: {
    color: "#fff",
    fontSize: px2dp(12),
    minWidth: px2dp(30),
    textAlign: "center",
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginRight: 5
  },
  ads1List: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5
  },
  imgStyle:{
     width:width - px2dp(10),
     // height:(width - px2dp(10))*3 /4,
     marginTop: px2dp(5),
    // marginBottom: px2dp(10)
  }
})
