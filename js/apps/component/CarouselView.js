/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    Image,
    Platform,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const {width} = Dimensions.get('window');
// 全局的变量
var cols = 1;
var cellW = width;
var cellH = width*0.5;
// var vMargin = (width - cellW * cols) / (cols + 1);
// 引入外部的json数据
import TopMenu from './TopMenu.json';
import LocalImg from '../images'
import px2dp from '../util'

export default class CarouselView extends Component {
    constructor(props){
      super(props)
      var ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
      this.state={
          activePage: 0,
          dataArr: TopMenu,
          dataSource: ds.cloneWithRows(TopMenu)
      }
    }
    // 当一帧滚动结束的时候调用
    onScrollAnimationEnd(e){
        // 求出当前的页码
        var currentPage = Math.floor(e.nativeEvent.contentOffset.x / width);

        // 更新状态机
         // this.state.activePage = currentPage
        this.setState({
            activePage: currentPage
        });

    }
// LocalImg['banner'+(i+n)
    // scrollView内部的组件
    renderScrollItem(){
        // 返回组件数组
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                removeClippedSubviews={false}
                contentContainerStyle={styles.contentViewStyle}
                scrollEnabled={false}
            />
        )
    }


    // 页码(指示器)
    renderIndicator(){
        let dotW = (Platform.OS == "ios")?px2dp(7):px2dp(8);
        // 指示器数组
        var indicatorArr = [];
        // 遍历创建组件
        for(var i=0; i<3; i++){
            // 设置圆点的样式
            style = (i === this.state.activePage) ? {backgroundColor:'#038de1'} :  {backgroundColor:'#ffffff'}

            indicatorArr.push(
                 <View key={i} style={[{width: dotW, height: dotW, borderRadius: dotW,margin: px2dp(2),marginBottom: px2dp(5)},style]}/>
            );
        }
        // 返回数组
        return indicatorArr;
    }
    // 具体的cell
    renderRow(rowdata){
        console.log(rowdata.image)
        return(
          // <TouchableOpacity onPress={()=>{alert('0')}}>
           
                <Image source={LocalImg[rowdata.image]} style={{width:width, height:width*0.5}}/>
           
          // </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                {/*内容部分*/}
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd = {this.onScrollAnimationEnd.bind(this)}
                >
                    {this.renderScrollItem()}
                </ScrollView>
                {/*页码部分*/}
                <View style={styles.indicatorViewStyle}>
                    {this.renderIndicator()}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
       backgroundColor:'white',
    },
    indicatorViewStyle:{
        position: 'absolute',
        bottom: 0,
        width: width,
        left: 0.5*width,
        marginLeft: -0.5*width,
       // 改变主轴的方向
        flexDirection:'row',
       // 水平居中
        justifyContent:'center',
        backgroundColor: 'transparent'
    },
    contentViewStyle:{
        justifyContent:'center',
        alignItems: 'center',
        // 设置主轴的方向
        flexDirection: 'row',
        height: width*0.5,
    },

});