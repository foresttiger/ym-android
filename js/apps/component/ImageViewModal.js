import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal
} from 'react-native';
import LocalImg from '../images'
import LocalDesignImg from '../data/homeDesignImage'

import ImageViewer from 'react-native-image-zoom-viewer';
export default class ImageViewers extends Component{
	constructor(props){
      super(props)
      console.log(props)
      this.state = {
        images: props.navigation.state.params.dataStr,
        imageIndex: props.navigation.state.params.index,
      }
      console.log(this.state.images)

  	}
  	_renderImgs(){
  		// const images = this.state.images;
  		return(
  				<ImageViewer 
                    defaultSource={LocalImg['back']}
                	  imageUrls={images} // 照片路径
                    enableImageZoom={true} // 是否开启手势缩放
                    index={this.state.imageIndex} // 初始显示第几张
                    // failImageSource={aaa} // 加载失败图片
                    onChange={(index) => {}} // 图片切换时触发
                    onClick={() => { // 图片单击事件
                        this.props.navigation.goBack();
                    }}
                />
  			)
  	}
    render() {
    	// const images = this.state.images;
    	console.log(images)
        return (
            <Modal visible={true} transparent={true}>
                {this._renderImgs()}
            </Modal>
        )
    }
}