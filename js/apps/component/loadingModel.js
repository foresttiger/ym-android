/**
 * @author Zheng
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ListView,
  Platform,
  ActivityIndicator,
} from 'react-native'
let {width, height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import px2dp from '../util'

const _width = width * 0.25;
export default class tipModel extends Component {
  constructor(props){
      let ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
      super(props)
      console.log(props)
          let datas = props.data;
          this.state = {
            "type":datas.type,
            "name":datas.name,
            "defaultSelect":datas.defaultSelect,
            // "animationIn":datas.animationIn ,
            // "animationOut":datas.animationOut ,
            "visibleModal":datas.visibleModal ,
            "color":datas.color,
          }        
  }
  close(){
    this.setState({ visibleModal: false })
   // 具体的cell
  }
  render(){
    return (
      <View>
        <Modal
          animationInTiming={700}
          animationOutTiming={500}
          backdropTransitionInTiming={700}
          backdropTransitionOutTiming={500}
          style={styles.modelViewStyle}
          isVisible={this.state.visibleModal == true}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          backdropOpacity={0.1}
          animationType={'none'}
          // animated={'false'}
          // onBackdropPress={this.close.bind(this)}
          >
          <View style={styles.modalContent}>
          	<ActivityIndicator
	          animating={this.state.visibleModal}
	          size="large"
	          color='#ffffff'
	          />
            <Text style={{color:this.state.color||"#ffffff",fontSize: px2dp(14)}}>{this.state.name}</Text>
          </View>
        </Modal>
    </View>
    )
  }
}


const styles = StyleSheet.create({
    modelViewStyle:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
        width: px2dp(100),
        height: px2dp(100),
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: '#cccccc',
        justifyContent: 'center',
      	alignItems: 'center',
	}
})
