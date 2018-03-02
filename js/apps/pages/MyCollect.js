/**
 * @author Zheng
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
  InteractionManager,
  NetInfo,
  Animated
  // Image
} from 'react-native'

import LocalImg from '../images'
import Icon from 'react-native-vector-icons/Ionicons'
// import Modal from 'react-native-root-modal'
import Modal from 'react-native-modal'
import Image from 'react-native-image-progress'
// import * as Progress from 'react-native-progress'
import Progress from 'react-native-progress'
import Orientation from 'react-native-orientation';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


import px2dp from '../util'
import data from '../data'
import PrototypeRoomData from '../data/prototypeRoom'
import SelectModal from '../component/ModalView'
import DataEncrypt from '../component/DataEncrypt'
import prototypeRoomDetails from '../component/prototypeRoomDetails'
import NetWorksTools from '../tools/NetWorksTools'
import ErrorPage from '../component/errorPage'
import LoadingModel from '../component/loadingModel'

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
        productId: props.data.productId,
        isRefreshing: false,
        name:"",
      }
      // this._loaderDesignDatas();
  }
  _loaderDesignDatas(){
        var _this = this;
        var selectObj = {
                serviceName: "getDesignSystemDesignMeta",
                designId: this.props.data.productId,
            };
        // console.log(selectObj)
        var formData = "";
        for (let k in selectObj) {
            formData +=k +'='+ selectObj[k] +'&'
        } 
        formData = formData.substr(0, formData.length - 1);
        fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
                method: 'POST',
                headers: {"Content-Type":"application/x-www-form-urlencoded"},
                body: formData
            }).then((response) => response.text())
              .then((responseData) => { // 上面的转好的json
                // console.log(DataEncrypt(responseData))
                var responseDatas = DataEncrypt(responseData).entity
                console.log(responseDatas.productName)
                _this.setState({
                  name:responseDatas.productName
                })
              })

  }
  componentDidMount(){
    this._loaderDesignDatas()
  }
  // componentDidUpdate(){
  //   this._loaderDesignDatas();
  // }
  // componentDidMount() {
  //   this._loaderDesignDatas();
  // }
  goDesignDetail(key,obj){
    console.log(11)
    const { navigate } = this.props.data.nav.navigation;
    navigate('PrototypeRoomDetails',obj);
    // var index = this.props.data.nav.navigator.state.presentedIndex +1 ;
    // let pages = {
    //   "prototypeRoomDetails": prototypeRoomDetails
    // }
    // if(pages[key]){
    //   this.props.data.nav.navigator.push({
    //       component: pages[key],
    //       args: {obj}
    //   })
    // }
  }
  render(){
    // this._loaderDesignDatas()
    const { productId } = this.props.data
    let render = (
      <View style={[styles.itemsStyle,{marginLeft:isLANDSCAPE?px2dp(20)/ 3:0}]}>
          <Image
            indicator={Progress}
            defaultSource={LocalImg['back']}
            style={{width:ImgWidth,height: ImgHeight}}
            source={{uri:"http://pic7.nn-home.com/filesystem/design/"+ productId +"/modelroom_thumb.jpg"}}
          />
          <View style={styles.itemsTextView}>
            <Text style={styles.itemCollect}>收藏:100</Text>
            <Text style={styles.itemsTextStyle}>{this.state.name}</Text>
            {/*<Text style={styles.itemsTextStyle}>{this.state.name}</Text>*/}
          </View>
      </View>
    )
    return (
      Platform.OS === 'ios'?(
        <TouchableOpacity style={{marginTop: 10}} onPress={() =>{this.goDesignDetail("prototypeRoomDetails",{"designId":productId})}}>{render}</TouchableOpacity>
      ):(
        <TouchableOpacity style={{marginTop: 10}} onPress={() =>{this.goDesignDetail("prototypeRoomDetails",{"designId":productId})}}>{render}</TouchableOpacity>

        // <View style={{marginTop: 10}}><TouchableNativeFeedback onPress={() => {}}>{render}</TouchableNativeFeedback></View>
      )
    )
  }
}
// 样板间列表
export default class Mycollect extends Component {
  constructor(props){
      super(props)
      console.log(props)
      var options = props.navigation.state.params;
      this.state = {
        data: [],
        smartUserId:options.smartUserId,
        accessToken:options.token,
        viewIndex:1,
        isRefreshing: false,
        visibleModal:null,
        key:0,
        loader:false,
        loadingModal:true,
        BRAND:{
          description:"品牌",
          productFeatureId:""
        },
        DESIGN_STYLE:{
          description:"风格",
          productFeatureId:""
        },
        AREA:{
          description:"面积",
          enumCode:"0#9999"
        },
        // network:network
      }
  }
  static navigationOptions = {
    // title: '关于 KIC·德国厨房',
    headerStyle:{
      backgroundColor: '#038de1'
    },
    headerBackTitleStyle:{
      color:'#ffffff'
    },
    headerTintColor:'#ffffff'
  };
  _loadData(index,stateData,obj){
    var _this = this;
    var selectObj = obj || {
            serviceName: "mobileUserCollectData",
            smartUserId:this.state.smartUserId,
            accessToken:this.state.accessToken,
            viewIndex: index -1,
            viewSize: "30",
            // typeId:"",
            // productMeasureArea: this.state.AREA.enumCode,
            // brandId: this.state.BRAND.productFeatureId,
            // styleId: this.state.DESIGN_STYLE.productFeatureId
        };
        console.log(selectObj)
    // console.log(selectObj)
    var formData = "";
    for (let k in selectObj) {
        formData +=k +'='+ selectObj[k] +'&'
    } 
    formData = formData.substr(0, formData.length - 1);
    // fetch('http://192.168.1.115:8080/control/mobileCommonServiceEncryptData', {
    fetch('http://yun.kic.com.cn/control/mobileQueryServiceEncryptData', {
            method: 'POST',
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body: formData
        }).then((response) => response.text())
          .then((responseData) => { // 上面的转好的json

            console.log(responseData);
            // console.log(DataEncrypt(responseData))
            let _obj = {
               data: JSON.parse(responseData).result.list,
               isRefreshing: false,
               viewIndex:index,
            }
            if (stateData) {Object.assign(_obj, stateData)}
            _this.setState(_obj)
          })
          .catch((error)=> {
              console.log(error)
              // alert('网络异常！');
              // _this.forceUpdate();
              // AlertIOS.alert('提示','网络异常',[
              //         {
              //             text: '重试',
              //             onPress:function(){
              //                _this._loadData(index,stateData,obj)
              //             }
              //         }
              //     ]);
          })
  }

  componentWillMount() {  
    // let isloader = this.state.loader;
    // if (isloader) {
    //    this._loadData(1)
    //    this._InitSearchData();
    //  }
  }
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
      this.setState({
        initial:"PORTRAIT",
        loginBack:"loginBack"
      })
      isLANDSCAPE = false
      ImgWidth = width;
      ImgHeight =  ImgWidth * 0.8
    } else {
      isLANDSCAPE = true
      this.setState({
        initial:"LANDSCAPE",
        loginBack:"loginBackPad"
      })
    }
  }
  componentDidMount() {
      var _this = this;
      // if (isnetwork) {
          this._loadData(1)
          this._InitSearchData();
      // }
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
          console.log(isConnected)
          if (!isConnected) {

             _this.setState({"loader":false})
              // NetWork = false;
              _this._renderMiddle(false)
              //AlertIOS.alert("网络错误", "网络连接失败，请连接网络后重试！");

          }else{
            _this.setState({"loader":true,"loadingModal":false})
            // _this._loadingModel()
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
  _onRefresh(){
    let network = this.state.loader;
    // let network = NetWorksTools();
    if (network) {
      var viewIndex = this.state.viewIndex;
      this._loadData(viewIndex)
      this._InitSearchData();
      this.setState({isRefreshing: true});      
    }else{
        setTimeout(() => {
          this.setState({
            isRefreshing: false
          })
        }, 1500)
    }

  }
  _InitSearchData(){
    var _this = this;
    fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
            method: 'POST',
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body: 'serviceName=getModelRoomSearchItemData'
        }).then((response) => response.text())
          .then((responseData) => { // 上面的转好的json
            // console.log(responseData)
            // console.log(DataEncrypt(responseData))
            let searchData = DataEncrypt(responseData).result
              for (let name in searchData) {
                  if (name == "BRAND"|| name == "DESIGN_STYLE" ) {
                    searchData[name].unshift({description: "全部", productFeatureId: ""})
                  }
              }
            // console.log(searchData)
            _this.setState({
              searchData: searchData,
            })
          })
          .catch((error)=> {
              // console.log(error)
                  // AlertIOS.alert('提示','网络异常',[
                  //     {
                  //         text: '重试',
                  //         onPress:function(){
                  //            _this._InitSearchData()
                  //         }
                  //     }
                  // ]);
          })
  }
  _select(type,name,des){
    var _this = this;
    var dataJSON = this.state.searchData;
    // console.log(dataJSON)
    var JSONS = dataJSON[type];
    let dataObj = {
      type:type,
      name:name,
      defaultSelect:des,
      animationIn:"slideInLeft",
      animationOut:"slideOutLeft",
      visibleModal:true,
      dataJson:JSONS,
      callback:(msg)=>{
          // console.log(msg) 
          _this.prototypeRoomSearch(type,msg,JSONS);
      }
    }
    this.state.data = [];
    this._renderModal(dataObj);
  }
  prototypeRoomSearch(type,data,dataJson){
    // console.log(data)
    // console.log(dataJson)
    let selectObj = {}
    let stateData = undefined;
    let obj = dataJson.filter((item) =>{
      return data == item.description
    })[0];
    // console.log(obj)
    switch(type){
      case "BRAND":
        selectObj = {
            serviceName: "getBestDesignList",
            viewIndex: 1,
            viewSize: "30",
            searchString: "",
            productMeasureArea: this.state.AREA.enumCode,
            brandId: obj.productFeatureId,
            styleId: this.state.DESIGN_STYLE.productFeatureId
        };
        if (data == "全部") {data="品牌"}
        stateData = {          
            BRAND:{
            description:data,
            productFeatureId:obj.productFeatureId
          }
        } 
        break;
      case "DESIGN_STYLE":
        selectObj = {
            serviceName: "getBestDesignList",
            viewIndex: 1,
            viewSize: "30",
            searchString: "",
            productMeasureArea: this.state.AREA.enumCode,
            brandId: this.state.BRAND.productFeatureId,
            styleId: obj.productFeatureId
        };
        if (data == "全部") {data="风格"}
        stateData = {
            DESIGN_STYLE:{
            description:data,
            productFeatureId:obj.productFeatureId
          }
        } 
        break;
      case "AREA":
        selectObj = {
            serviceName: "getBestDesignList",
            viewIndex: 1,
            viewSize: "30",
            searchString: "",
            productMeasureArea: obj.enumCode,
            brandId: this.state.BRAND.productFeatureId,
            styleId: this.state.DESIGN_STYLE.productFeatureId
        };
        stateData = {
            AREA:{
            description:data,
            enumCode:obj.enumCode
          }
        } 
        break;

    }
    // console.log(this.state)
    this._loadData(1,stateData,selectObj)
    console.log(selectObj)
    console.log(stateData)
  }
  _renderModalContent(){
    <View style={styles.modalContent}>
      <Text style={{color:"red"}}>Hello!</Text>
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
    </View>
  }
  _renderButton(text, onPress){
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  };
  _selectedRefresh(id){
    console.log(id)
  }
  _renderModal(data){
    var modelView = [];
    var i =Math.floor(this.state.key) + 1;
    modelView.push( <SelectModal key={i}  data={data} func={this._selectedRefresh.bind(this)}/>);
    this.setState({"ModelView":modelView,"key":i});
  }
  _renderMiddle(){
    let isloader = this.state.loader;
    console.log(isloader)
    if (isloader) {
           // this._loadData(1)
       // this._InitSearchData();
       return (
        <View style={{flex:1}}>
          {this._render()}
        </View>
      )
     }else{
      // this._onRefresh();
      return (
        <View style={{flex:1,backgroundColor: '#ffffff'}}>
          {this._networkErro()}
        </View>
      )
     }
  }
  _onreload() {
      var _this = this;
      this._loadData(1)
      this._InitSearchData();

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
  _render(){
      let dataObj = {
          type: 'modelview',
          name: "正在加载...",
          visibleModal: this.state.loadingModal,
      }
    let _this = this;
    let _scrollView = undefined;
    let ModelView = this.state.ModelView;
    return (
    	<View style={{flex:1,borderTopWidth: 1,borderTopColor: '#f9f9f9'}}>
	      <View style={styles.selectViewStyle}>
          <TouchableOpacity  onPress={()=>{this._select("BRAND","品牌",this.state.BRAND.description)}}>
    	      	<View style={styles.selectItems} >	      	
    		      	<Text>{this.state.BRAND.description}</Text>
    		      	<Icon name="md-arrow-dropdown" size={px2dp(12)} color="#000000" />
    	      	</View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{this._select("DESIGN_STYLE","风格",this.state.DESIGN_STYLE.description)}}>
  	      	<View style={styles.selectItems}>	      	
  		      	<Text>{this.state.DESIGN_STYLE.description}</Text>
  		      	<Icon name="md-arrow-dropdown" size={px2dp(12)} color="#000000" />
  	      	</View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{this._select("AREA","面积",this.state.AREA.description)}}>
  	      	<View style={styles.selectItems}>	      	
  		      	<Text>{this.state.AREA.description}</Text>
  		      	<Icon name="md-arrow-dropdown" size={px2dp(12)} color="#000000" />
  	      	</View>	
          </TouchableOpacity>      	
	      </View>
	      <ScrollView
	        style={{backgroundColor: "#f3f3f3"}}
	        refreshControl={
	          <RefreshControl
	            refreshing={this.state.isRefreshing}
	            onRefresh={this._onRefresh.bind(this)}
	            tintColor="#bbb"
              title="updating..."
              titleColor="#000000"
              progressViewOffset={30}
              colors={['#0000ff','#ff0000', '#00ff00', ]}
              progressBackgroundColor="#038de1"
	          />
	        }
	      >
          <LoadingModel data={dataObj} />
          <View style={styles.scrollViewStyle}>
  	        {
  	          this.state.data.map((item, i) => {
                
  	            return <Item key={i} data={{"productId":item.productId,"nav":_this.props}} />
  	          })
  	        }
          </View>
      	 </ScrollView>

        {ModelView}
        
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
  errorStyle:{ 
    flex:1,

  },
  scrollViewStyle:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'flex-start',
    flexWrap: 'wrap' 
  },
  itemsTextView:{
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      // flexDirection: '', 
      alignItems: 'center',
      // width: ImgWidth - 10,
      // paddingTop: px2dp(5),
      paddingLeft: px2dp(5),
      paddingRight: px2dp(5),
      // paddingBottom: px2dp(5),
      height: 40,
      backgroundColor: '#ffffff'
  },
  itemsTextStyle: {
      // width: 'auto',
      paddingLeft: 12,
      // height: 30,
      color: "#454545",
      // backgroundColor: 'red'
      // paddingTop: px2dp(5),
      // paddingLeft: px2dp(5),
      // paddingBottom: px2dp(5)
  },
  itemCollect:{
    // width: (ImgWidth - 10)/2,
    textAlign:  'right',
    paddingRight: 10,
    color:'rgba(0,0,0,0.5)',
    // width: ImgWidth/2
  },
  itemsStyle:{
    position: 'relative',
    marginLeft: px2dp(20)/ 3,
    backgroundColor: '#ffffff'
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
  selectViewStyle:{
  	backgroundColor: '#ffffff',
  	height: 40,
  	flexDirection: 'row',
  	alignItems: 'center',
  	justifyContent: 'flex-start',
  	paddingLeft: px2dp(20),
    display: 'none'
  },
  selectItems:{
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
    width: width*0.3,
    height:height,
    backgroundColor: 'white',
    borderColor: '#cccccc',
  },
  bottomModal: {
    justifyContent: 'flex-start',
    margin: 0,
  } 
})
