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
} from 'react-native'
let {width, height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import selectData from '../data/selectJson.json'

import px2dp from '../util'

const _width = width * 0.25;
export default class ModalView extends Component {
  constructor(props){
      let ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
      super(props)
      console.log(props)
          let datas = props.data;
          this.state = {
            "type":datas.type,
            "name":datas.name,
            "defaultSelect":datas.defaultSelect,
            "animationIn":datas.animationIn ,
            "animationOut":datas.animationOut ,
            "visibleModal":datas.visibleModal ,
            "func":props.func,
            "dataSource": ds.cloneWithRows(datas.dataJson)
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
          animationIn={this.state.animationIn}
          animationOut={this.state.animationOut}
          backdropOpacity={0.1}
          onBackdropPress={this.close.bind(this)}
          >
          <View style={styles.modalContent}>
            <View style={styles.titleStyle}>
                <Text style={{fontSize: px2dp(12)}}>{this.state.name}</Text>
            </View>
            <ListView
                dataSource={this.state.dataSource}
                // renderRow={this.renderRow}
                renderRow={this.renderRow.bind(this)}
                contentContainerStyle={styles.contentViewStyle}
                scrollEnabled={false}
            />
            <TouchableOpacity onPress={this.close.bind(this)}>
              <View style={styles.button}>
                <Text style={{color:"#ffffff",fontSize: px2dp(12)}}>close</Text>
              </View>
            </TouchableOpacity>

          </View>
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
    },
    titleStyle:{
      width: _width,
      height: px2dp(40),
      borderBottomWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Platform.OS == "ios"?0:20,
    },
    valStyle:{
      // alignItems: 'center',
      // width: width,
      // justifyContent: 'center',
      color:"#000000",
      fontSize:px2dp(10) 
    },
    button:{
        backgroundColor: '#038de1',
        padding: 6,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        width: _width,
        height: height,
        backgroundColor: 'white',
        borderColor: '#cccccc',
    },
    bottomModal: {
        justifyContent: 'flex-start',
        margin: 0,
    },
    contentViewStyle: {
        // 设置主轴的方向
        // flexDirection: 'row',
        // 多个cell在同一行显示
        // flexWrap: 'wrap',
        // 宽度
        width: _width,
        backgroundColor: '#ffffff',
    },

    cellStyle: {
        // backgroundColor:'red',
        width: _width,
        height: px2dp(30),
        // 水平居中和垂直居中
        justifyContent: 'center',
        alignItems: 'center',
    },
})
