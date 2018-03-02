import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  timer,
  Alert,
  Platform,
  StatusBar,
  Animated,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import Orientation from 'react-native-orientation';
import {TextInputLayout} from 'rn-textinputlayout';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
// import LoadingModel from '../component/loadingModel'
import px2dp from '../util'
import LocalImg from '../images'
import *as loginAction from '../../actions/loginAction';// 导入action方法
import MainPage from './MainPage';
import {toastShort} from '../util/ToastUtil.js';
import Icon from 'react-native-vector-icons/Ionicons'
import DataEncrypt from '../component/DataEncrypt'
import ScanningTwoCode from '../component/scanningTwoCode'



const isIOS = Platform.OS == "ios"
const {width,height}  = Dimensions.get("window");
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^1[34578]\d{9}$/;
const PHONE_CODE_REGEX = /^\d{6}$/;
const USRNAME_REGEX = /^[A-Za-z0-9]{4,40}$/;
const PWD_REGEX=/^[A-Za-z0-9]{6,20}$/;
let isLANDSCAPE=false;
let codeTime =60;
// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'LoginPage'})
//   ]
// })
//PORTRAIT 竖屏  LANDSCAPE：横屏
class Outbound extends Component {
  constructor(props) {  
      super(props); 
      console.log(props); 
      this.state = {  
          username: '',  
          password: '',
          initial:'PORTRAIT',
          loginBack:'loginBack',
          animating: true,
          timerCount:codeTime,
          timerTitle:'获取验证码',
          loginBtn:'立 即 出 库',
          RestigerTimer:2,
          componentScannTitle:"扫描二维码",
          localScannTitle:"扫描二维码",
          carScannTitle:"扫描二维码",
          componentshadowColor:"#038de1",
          loacalhadowColor:"#038de1",
          carshadowColor:"#038de1"
      };  
  } 
  static navigationOptions = {
    title: '构件出库',
    headerStyle:{
      backgroundColor: '#038de1'
    },
    headerBackTitleStyle:{
      color:'#ffffff'
    },
    headerTintColor:'#ffffff'
  };
  //   //页面将要离开的是时候发送通知
  // componentWillUnmount(){
  //   DeviceEventEmitter.emit('ChangeUI', {color:'red',text:'通知'});
  // }
  componentDidMount() {
    //注意addListener的key和emit的key保持一致
    // this.msgListener = DeviceEventEmitter.addListener('Msg', (listenerMsg) => {
    //     this.setState({
    //         listenerMsg: listenerMsg,
    //     })
    // });
    // storage.load({
    //     key: "componentsMs",
    // }).then(read => {
    //  console.log(read)
    //  var data = read
    //  // console.log(data.proName);
    //  var it = data.proName+data.buildingInfo+data.componentName;
    //  this.setState({"componentScannTitle":"已扫描","componentsMs":it});
    //      // this.setState({ login: true,user:{name:read.name} });
    // }).catch(err => {
    //  console.warn(err.message);
    // })
    // storage.load({
    //     key: "local",
    // }).then(read => {
    //  console.log(read)
    //  this.setState({"localScannTitle":"已扫描"});

    //      // this.setState({ login: true,user:{name:read.name} });
    // }).catch(err => {
    //  console.warn(err.message);
    // })
    storage.load({
        key: "login",
    }).then(read => {
        this.setState({ "token": read.token });
        // console.log(read)
    }).catch(err => {
        // console.warn(err.message);
    })
    DeviceEventEmitter.addListener('ChangeUI', (dic) => {
            console.log(dic)
            switch (dic.type) {
                case "componentsMs":
                    if (!dic.componentsMs.proName) {
                        Alert.alert('提示', '扫描失败！重新扫描！', [{ text: "确认" }]);
                    } else {
                        var it = dic.componentsMs.proName + dic.componentsMs.buildingInfo + dic.componentsMs.componentName;
                        this.setState({ "componentScannTitle": "重新扫描", "componentsMs": it, "componentshadowColor": "rgba(0,0,0,0.5)", "id": dic.componentsMs.id, "proName": dic.componentsMs.proName, "buildingInfo": dic.componentsMs.buildingInfo, "componentName": dic.componentsMs.componentName });
                    }
                    break;
                case "local":
                    if (!dic.localMs.location) {
                        Alert.alert('提示', '扫描失败！重新扫描！', [{ text: "确认" }]);
                    } else {
                        var it = dic.localMs.location;
                        this.setState({ "localScannTitle": "重新扫描", "location": it, "loacalhadowColor": "rgba(0,0,0,0.5)" });
                    }
                    break;
                case "outcar":
                    if (!dic.carMs.outboundCars) {
                        Alert.alert('提示', '扫描失败！重新扫描！', [{ text: "确认" }]);
                    } else {
                        var it = dic.carMs.outboundCars;
                        this.setState({ "carScannTitle": "重新扫描", "outboundCars": it, "carshadowColor": "rgba(0,0,0,0.5)" });
                    }
                    break;
                // case "incar":
                //   break;
                default:
                    Alert.alert('提示', '扫描失败！重新扫描！', [{ text: "确认" }]);
                    break;
            }
    });

}

  componentWillReceiveProps(nextProps, nextState) {
    // console.log(nextProps)
    // // console.log(this.props.visible)
    // // 登录完成,切成功登录
    // if (nextProps.status === '登陆成功' && nextProps.isSuccess) { 
    //   console.log(this.props)
    //   this.props.callback(true);
    //   this.props.navigation.goBack();
    //   return false;
    // }else{
    //   if (nextProps.message) {
    //     toastShort(nextProps.message);
    //   }
    //   var modelView = [];
    //   var data = {
    //       type: 'modelview',
    //       name: "正在登录...",
    //       visibleModal: false
    //   }
    //   modelView.push( <LoadingModel key={0}  data={data}/>);
    //   this.setState({"ModelView":modelView});
    //   return true;
    // }
    // // console.log(this.props.visible)
    // return true;
  }
  getRegister() {
      // if (this.state.loginBtn == "正在注册..." || this.state.loginBtn == "注册成功") { return };
      // this.setState({
      //     loginBtn: '正在注册...'
      // })
      var id = this.state.id;
      var proName = this.state.proName;
      var componentName = this.state.componentName;
      var buildingInfo = this.state.buildingInfo;
      var token = this.state.token;
      var location = this.state.location;
      var outboundCars = this.state.outboundCars;
      if (id == undefined) {
          toastShort('请扫描构件上的二维码！');
          return;
      } 
      if (location == undefined) {
          toastShort('请扫描区域上的二维码！');
          return;
      }
      if (outboundCars == undefined) {
          toastShort('请输入车上的二维码！');
          return;
        }
      this.setState({
          loginBtn: '正在出场...'
      })
      var _this = this;
      // serviceName=mobileUserSendSms&mobilePhoneId=15312154603
      var selectObj = {
          id: id,
          token: token,
          location: location,
          outboundCars: outboundCars,
          status:"outbound"
      };
      var formData = "";
      for (let k in selectObj) {
          formData += k + '=' + selectObj[k] + '&'
      }
      formData = JSON.stringify(selectObj);
      // formData = formData.substr(0, formData.length - 1);
      let result = fetch('http://rainingjoy.xin:9112/saveOrUpdateComponent', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: formData
          }).then((response) => response.text())
          .then((responseData) => { // 上面的转好的json
            // console.log(responseDatas)
            var responseDatas = JSON.parse(responseData)
            console.log(JSON.parse(responseData))
              // console.log(DataEncrypt(responseData).result)
              // var responseDatas = DataEncrypt(responseData).result
              return responseDatas
          })
          .then((res) => {
              switch (res.status) {
                  case 200:
                      Alert.alert('提示','出库成功！',
                        [{text:"确认", onPress:_this.back.bind(this)}]
                      );
                      // toastShort("出库成功！");
                      // _this.back();
                      break;

                  default:
                      Alert.alert('提示',res.message,
                        [{text:"确认"}]
                      );
                      // toastShort("出库失败！");
                      _this.setState({
                          loginBtn: '重 新 出 库'
                      })
                      break;

              }
              // dispatch(loginSuccess(true, user));
          }).catch((e) => {
               Alert.alert('提示','出库失败！',
                  [{text:"确认"}]
               );
              _this.setState({
                          loginBtn: '重 新 出 库'
              })
          })
  }
  back(){
    this.props.navigation.goBack();
  }
  scanningQRcode(i) {
      // this.props.navigation.goBack();
      var opt = {
          type: i
      }
      const { navigate } = this.props.navigation;
      navigate('ScanningTwoCode', opt);
  }
  showOrHide() {
    if (this.state.animating) {
      this.setState({
        animating: false
      });
    } else {
      this.setState({
        animating: true
      });
    }
  } 
  _renderModal(data){
    var modelView = [];
    var i =Math.floor(this.state.key) + 1;
    modelView.push( <ScanningTwoCode key={i}  data={data}/>);
    this.setState({"ModelView":modelView,"key":i});
  } 
 render() { 
  let ModelView = this.state.ModelView;
  let _width = isLANDSCAPE?width*0.3:width*0.5;
  let _loginBack = this.state.loginBack;
  const { login } = this.props; 
  return(
    <View style={styles.container}>

    	<View style={styles.line}>
    		<Text style={styles.layout}>构件信息:{this.state.componentsMs}</Text>
        <TouchableOpacity style={{marginTop: 10}}  onPress={()=>this.scanningQRcode("componentsMs")} >
            <View style={[styles.qurodeBtn,{width:_width,backgroundColor: this.state.componentshadowColor}]}>
                <Text style={{color:"#ffffff",fontSize:px2dp(16)}}>{this.state.componentScannTitle}</Text>
            </View>
        </TouchableOpacity>
    	</View>
    	<View style={styles.line}>
    		<Text style={styles.layout}>放置区域:{this.state.location}</Text>
        <TouchableOpacity style={{marginTop: 10}}  onPress={()=>this.scanningQRcode("local")} >
            <View style={[styles.qurodeBtn,{width:_width,backgroundColor: this.state.loacalhadowColor}]}>
                <Text style={{color:"#ffffff",fontSize:px2dp(16)}}>{this.state.localScannTitle}</Text>
            </View>
        </TouchableOpacity>
    	</View>
    	<View style={styles.line}>
    		<Text style={styles.layout}>车辆信息:{this.state.outboundCars}</Text>
        <TouchableOpacity style={{marginTop: 10}}  onPress={()=>this.scanningQRcode("outcar")} >
            <View style={[styles.qurodeBtn,{width:_width,backgroundColor:this.state.carshadowColor}]}>
                <Text style={{color:"#ffffff",fontSize:px2dp(16)}}>{this.state.carScannTitle}</Text>
            </View>
        </TouchableOpacity>
    	</View>
        <TouchableOpacity style={{marginTop: 10}} onPress={()=>this.getRegister()} >
            <View style={[styles.loginBtn,{width:_width}]}>
                <Text style={{color:"#ffffff",fontSize:px2dp(23)}}>{this.state.loginBtn}</Text>
            </View>
        </TouchableOpacity>
         {ModelView}
    </View>
)}} 

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#ffffff'
    },
    layout:{
    	fontSize: px2dp(18),
    	fontWeight: '500', 
    	marginRight: px2dp(10),
      color:"#000000"
    },
    qurodeBtn: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center', 
        borderWidth: 1,
        marginTop: 6,
        padding: 5,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#038de1',
        borderColor: '#038de1',
    },
    loginBtn: {
    	width: 120,
        alignItems: 'center',
        justifyContent: 'center', 
        borderWidth: 1,
        marginTop: 20,
        padding: 5,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#c0a354',
        borderColor: '#c0a354',
    },
    logo: {
        width: 100,
        height: 100,
    },
    loginBack:{
        position: 'absolute',
        top:0,
        left: 0,
        width: width,
        height: height,
        zIndex: -1,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFF'
    },
    btn: { 
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3333FF',
        height: 40,
        borderRadius: 5,
        marginTop: 10
    },
    line:{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: px2dp(20)
    },
    headerStyle:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center', 
      width: width,
      position: 'absolute',
      top: px2dp(10),
      left: px2dp(6),
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: px2dp(5),
      backgroundColor: 'rgba(0,0,0,0.01)',
      zIndex: 99,
    },
    getQrcode:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: px2dp(6),
      borderRadius: 5,
    }
});

export default connect(
  (state) => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
    message:state.loginIn.message,
    visible:state.loginIn.visible

  }),
  (dispatch) => ({
    // login: (obj) => dispatch(loginAction.login(obj)),
    // loginOut: () => dispatch(loginAction.loginOut())
  })
)(Outbound)
