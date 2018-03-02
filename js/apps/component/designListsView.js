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
  Dimensions,
  TouchableOpacity
} from 'react-native'
import LocalImg from '../images'
import LocalDesignImg from '../data/homeDesignImage'
import px2dp from '../util'
import NavBar from './NavBar'
import homeDesignList from '../data/homeDesignDetails.json'
import Lightbox from 'react-native-lightbox'
import designDetailsView from '../component/designDetailsView'
import Image from 'react-native-image-progress'

const { width, height } = Dimensions.get('window')
const imgMargin = px2dp(30) / 3;
const imgWidth = (width - px2dp(30)) /2 ;
const imgHeight = imgWidth * 3/4;
const listContent = undefined

//FontAwesome
export default class designListsView extends Component {
  constructor(props){
      super(props)
      // console.log(props)
      if (props.navigation.state.params.relay == "home") {
        listContent = homeDesignList
      }
      this.state = {
        title:props.navigation.state.params.name,
        id:props.navigation.state.params.id,
        isAlreadyLoad:false,
        Imgwidth:300,
        Imgheight:300,
        uri:'http://facebook.github.io/origami/public/images/blog-hero.jpg?r=1&t='
      }

  }
  back(){
    this.props.navigation.goBack();
    // this.props.navigator.pop();
    // if(this.props.data.callback){
    //      this.props.data.callback('回调')
    //  }
  }
   _onLoadEnd(param,uri){
    // console.log(param)
    if (!this.state.isAlreadyLoad) {
      this.state.isAlreadyLoad = true;
      // console.log(this.state.isAlreadyLoad);
      Image.getSize(uri,(Imgwidth,Imgheight) =>{
        let radio = Imgwidth / Imgheight
        Imgwidth = (width - px2dp(30)) * 0.5
        Imgheight = Imgwidth / radio        
        this.setState({Imgwidth,Imgheight});
      });
    }
  }
  goDesignDetail(key,data){
      const {navigate} = this.props.navigation;
      navigate('DesignDetailsView',data);
  }
  _renderImage(){
    var _this = this;
    let homeList = listContent.filter((items)=>{
      return items.id == _this.state.id
    })[0].design;

     return homeList.map((n, i) => {
      let _render = (i) => {
        return (
              <Image 
                resizeMode = {'cover'}
                style={styles.imgStyle}
                source={LocalDesignImg[n.imgUri]}
                defaultSource={LocalImg['back']}
                // onLoadEnd = {()=>_this._onLoadEnd('加载结束后，不论成功还是失败，调用此回调函数',n.imgUri)}
              />
        )
      }
      let dataObj = {
        name:n.name,
        dataStr:n.child,
        callback:(msg)=>{
          // _this._renderTypes();
          // _this._renderTypes();
          // console.log(msg) 
        }

      }
      return (
        <View  key={i}>
          <TouchableOpacity onPress = {()=>{this.goDesignDetail("designDetails",dataObj)}} >{_render(i)}</TouchableOpacity>
        </View>
      )
    })
  }
  render(){
    // const imageUrl1 ='https://img30.360buyimg.com/popWaterMark/jfs/t5899/68/8433568637/561052/becec082/597b0746N89799c5f.jpg';
    const imageUrl1 = 'http://www.kic.com.cn/uploads/201701/2017012614231101.jpg';
  	// console.log(homeDesignList)
     let dataObj = {
        name:'sfdsfkj'
      }
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title={this.state.title}
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
         <ScrollView>
          <View style={styles.ImgListView}>
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
  ImgListView:{
    flexDirection: 'row',
    alignItems: "flex-start",
    flexWrap: 'wrap',
    // justifyContent:'space-around'
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
  textStyle:{
     fontSize: px2dp(12),
     color:"#454545",
     marginTop: 5,
     paddingRight: 5,
     paddingLeft: 5
  },
  imgStyle:{
     marginTop: px2dp(10),
     marginLeft: imgMargin,
     width:imgWidth,
     height:imgHeight,
    // marginBottom: px2dp(10)
  }
})
