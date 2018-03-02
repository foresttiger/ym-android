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
  ActivityIndicator
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import Orientation from 'react-native-orientation';
import {TextInputLayout} from 'rn-textinputlayout';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
import LoadingModel from '../component/loadingModel'
import px2dp from '../util'
import LocalImg from '../images'
import *as loginAction from '../../actions/loginAction';// 导入action方法
import MainPage from './MainPage';
import {toastShort} from '../util/ToastUtil.js';
import Icon from 'react-native-vector-icons/Ionicons'
import DataEncrypt from '../component/DataEncrypt'

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
//   ]s
// })
//PORTRAIT 竖屏  LANDSCAPE：横屏
class ForgetPWD extends Component {
  constructor(props) {  
      super(props);  
      this.state = {  
          username: '',  
          password: '',
          initial:'PORTRAIT',
          loginBack:'loginBack',
          animating: true,
          timerCount:codeTime,
          timerTitle:'获取验证码',
          fBtn:"立 即 修 改",
          RestigerTimer:2,
      };  
  }
  static navigationOptions = {
    // title: '忘记密码',
    headerStyle:{
      backgroundColor: '#038de1'
    },
    headerBackTitleStyle:{
      color:'#ffffff'
    },
    headerTintColor:'#ffffff'
  }; 
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
      this.setState({
        initial:"PORTRAIT",
        loginBack:"loginBack"
      })
      isLANDSCAPE = false
    } else {
      isLANDSCAPE = true
      this.setState({
        initial:"LANDSCAPE",
        loginBack:"loginBackPad"
      })
    }
  }
  judgePhoneIs(){
    var phone = this.state.phone;
      if (phone === '') {
          toastShort('手机号不能为空...');
          return;
      }else if (!PHONE_REGEX.test(phone)){
          toastShort('请输入可用的手机号...');
          return;
      }
    this.setState({
        timerTitle: '正在获取...'
    })
    var _this = this;
    // serviceName=mobileUserSendSms&mobilePhoneId=15312154603
    var selectObj = {
        serviceName: "mobileUserCheckIsExist",
        smartUserId:phone,
        mobilePhoneId: phone,
    };
    var formData = "";
    for (let k in selectObj) {
        formData += k + '=' + selectObj[k] + '&'
    }
    formData = formData.substr(0, formData.length - 1);
    let result = fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData
        }).then((response) => response.text())
        .then((responseData) => { // 上面的转好的json
          console.log(DataEncrypt(responseData).result)
            var responseDatas = DataEncrypt(responseData).result
            return responseDatas
        })
        .then((res) => {
            switch (res.status) {
                case "success":
                    if (res.isExist == "N") {
                      toastShort("用户不存在！");
                          this.setState({
                              timerTitle: '获取验证码'
                          })
                    }else{
                      _this.getPhoneCode();
                    }
                    break;
                // case "error":
                //     toastShort(res.message);
                //     // toastShort("发送失败！");
                //     break;

            }
            // dispatch(loginSuccess(true, user));
        }).catch((e) => {
          console.log(e);
            // toastShort("发送失败！");
        })
  }
  getPhoneCode() {
    var timer = this.state.timerCount - 1;
    if (timer<58&&timer>0) {
      toastShort("请"+timer+"秒后重试");
    }

    var phone = this.state.phone;
      if (phone === '') {
          toastShort('手机号不能为空...');
          return;
      }else if (!PHONE_REGEX.test(phone)){
          toastShort('请输入可用的手机号...');
          return;
      }
    var _this = this;
    // serviceName=mobileUserSendSms&mobilePhoneId=15312154603
    var selectObj = {
        serviceName: "mobileUserSendSms",
        mobilePhoneId: phone,
    };
    var formData = "";
    for (let k in selectObj) {
        formData += k + '=' + selectObj[k] + '&'
    }
    formData = formData.substr(0, formData.length - 1);
    let result = fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData
        }).then((response) => response.text())
        .then((responseData) => { // 上面的转好的json
          console.log(DataEncrypt(responseData).result)
            var responseDatas = DataEncrypt(responseData).result
            return responseDatas
        })
        .then((res) => {
            switch (res.status) {
                case "success":
                    toastShort("验证码已发送，请查收！");
                    // console.log()
                    _this.phoneCodeTimer()
                    break;
                case "user_send_sms_error":
                      this.setState({
                          timerTitle: '获取验证码'
                      })
                    toastShort(res.message);
                    // toastShort("发送失败！");
                    break;
            }
            // dispatch(loginSuccess(true, user));
        }).catch((e) => {
            toastShort("发送失败！");
        })
  }
  phoneCodeTimer() {
      this.interval = setInterval(() => {
          var timer = this.state.timerCount - 1
          console.log(timer)
          if (timer === 0) {
              this.interval && clearInterval(this.interval);
              this.setState({
                  timerCount: codeTime,
                  timerTitle: '重新获取'
              })
          } else {
              this.setState({
                  timerCount: timer,
                  timerTitle: timer + '秒后重发'
              })
          }
      }, 1000);
  }
  goLogin(){
    this.interval = setInterval(() => {
          var timer = this.state.RestigerTimer - 1
          console.log(timer)
          if (timer === 0) {
              this.interval && clearInterval(this.interval);
              this.setState({
                  RestigerTimer: codeTime,
              })
              this.back()

          } else {
              this.setState({
                  RestigerTimer: timer
              })
          }
      }, 3000);
  }
  getRegister() {
    var phone = this.state.phone;
    var phonecode = this.state.phonecode;
    var password = this.state.password;
    var repassword = this.state.repassword;
      if (phone === '') {
          toastShort('手机号不能为空...');
          return;
      }else if (!PHONE_REGEX.test(phone)){
          toastShort('请输入可用的手机号!');
          return;
      }
      if (repassword !== password) {
          toastShort('两次输入密码不一致!');
          return;
      }else if (!PWD_REGEX.test(password)){
          toastShort('请输入可用的密码');
          return;
      }
      if (phonecode === "") {
          toastShort('请输入短信验证码');
          return;
      }else if (!PHONE_CODE_REGEX.test(phonecode)){
          toastShort('短信验证码输入错误');
          return;
      }
    if (this.state.fBtn == "正在修改..."||this.state.fBtn == "修改成功") {return};
    this.setState({fBtn:"正在修改..."})
    var _this = this;
    // serviceName=mobileUserSendSms&mobilePhoneId=15312154603
    var selectObj = {
        serviceName: "mobileUserForgetPassword",
        mobilePhoneId: phone,
        smartUserId: phone,
        password:password,
        verifyCode:phonecode
    };
    var formData = "";
    for (let k in selectObj) {
        formData += k + '=' + selectObj[k] + '&'
    }
    formData = formData.substr(0, formData.length - 1);
    let result = fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData
        }).then((response) => response.text())
        .then((responseData) => { // 上面的转好的json
          console.log(DataEncrypt(responseData).result)
            var responseDatas = DataEncrypt(responseData).result
            return responseDatas
        })
        .then((res) => {
            switch (res.status) {
                case "success":
                    toastShort("密码成功,即将返回登录！");
                    this.setState({fBtn:"修改成功"})
                    _this.goLogin();
                    break;
                case "user_no_exist":
                    toastShort("用户不存在！");
                    this.setState({fBtn:"立 即 修 改"})
                    break;
                case "error":
                    toastShort("修改失败！");
                    this.setState({fBtn:"立 即 修 改"})
                    break;
                case "user_verify_code_error":
                    toastShort(res.message);
                    this.setState({fBtn:"立 即 修 改"})
                    break;

            }
            // dispatch(loginSuccess(true, user));
        }).catch((e) => {
            toastShort("密码修改失败，请重试！");
        })
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
  back(){
    this.props.navigation.goBack();
  }
  _renderModal(data){
    var modelView = [];
    var i =Math.floor(this.state.key) + 1;
    modelView.push( <LoadingModel key={i}  data={data}/>);
    this.setState({"ModelView":modelView,"key":i});
  } 
 render() { 
  let ModelView = this.state.ModelView;
  let _width = isLANDSCAPE?width*0.4:width*0.8;
  let _loginBack = this.state.loginBack;
  const { login } = this.props; 
  return(
    <View style={styles.container}>
        <StatusBar
          // backgroundColor='#000000'
          translucent={true}
          // hidden={true}
          barStyle={'default'}
          animated={true}      
        />
        {/*<Image source={LocalImg['usr']} style={styles.logo}/>*/}
          <Hideo
            borderColor={'#000000'}
            iconClass={FontAwesomeIcon}
            iconName={'mobile-phone'}
            iconColor={'white'}
            iconSize={px2dp(32)}
            placeholder={"注册时手机号"}
            ref={(phone)=> this.phone = phone}
            onChangeText={(phone) => this.setState({phone})} 
            style={{height:isIOS?40:60,maxHeight: isIOS?40:60,width: _width,marginTop: px2dp(30)}}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#038de1'}
            inputStyle={{ height:60,color: '#464949',fontSize:px2dp(14),borderWidth: 1,borderStyle: 'solid',borderColor: '#038de1',borderLeftWidth: 0 }}
          />
          <View style={{display:"flex",justifyContent: 'center',flexDirection: 'row',alignItems: 'center',height:isIOS?40:60,maxHeight: isIOS?40:60,width: _width,marginTop: px2dp(40)}}>
            <Hideo
              borderColor={'#000000'}
              iconClass={FontAwesomeIcon}
              iconName={'envelope'}
              iconColor={'white'}
              iconSize={px2dp(20)}
              placeholder={"手机验证码"}
              ref={(phonecode)=> this.phonecode = phonecode}
              onChangeText={(phonecode) => this.setState({phonecode})} 
              style={{height:isIOS?40:60,maxHeight: isIOS?40:60,width: _width - px2dp(120)}}
              // this is used as backgroundColor of icon container view.
              iconBackgroundColor={'#038de1'}
              inputStyle={{ height:60,color: '#464949',fontSize:px2dp(14),borderWidth: 1,borderStyle: 'solid',borderColor: '#038de1',borderLeftWidth: 0 }}
            />
            <TouchableOpacity onPress={()=>this.judgePhoneIs()} style={[styles.getPhoneCode,{height:isIOS?45:60,maxHeight: isIOS?45:60,width: px2dp(80),marginTop: px2dp(5),backgroundColor: 'rgba(0,0,0,0.5)'}]}>
              <Text style={{color:'#ffffff',lineHeight: isIOS?45:60}}>{this.state.timerTitle}</Text>
            </TouchableOpacity>
          </View>
          <Hideo
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            style={{height:isIOS?40:60,maxHeight: isIOS?40:60,width: _width,marginTop: px2dp(0)}}
            iconSize={px2dp(25)}
            iconColor={'white'}
            placeholder={"新密码"}
            secureTextEntry={true} 
            ref={(password)=> this.password = password}
            onChangeText={(password) => this.setState({password})} 
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#038de1'}
            inputStyle={{ height:isIOS?40:60,color: '#464949',fontSize:px2dp(14),borderWidth: 1,borderStyle: 'solid',borderColor: '#038de1',borderLeftWidth: 0}}
          />
          <Hideo
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            style={{height:isIOS?40:60,maxHeight: isIOS?40:60,width: _width,marginTop: px2dp(20)}}
            iconSize={px2dp(25)}
            iconColor={'white'}
            placeholder={"再次输入新密码"}
            secureTextEntry={true} 
            ref={(repassword)=> this.repassword = repassword}
            onChangeText={(repassword) => this.setState({repassword})} 
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#038de1'}
            inputStyle={{ height:isIOS?40:60,color: '#464949',fontSize:px2dp(14),borderWidth: 1,borderStyle: 'solid',borderColor: '#038de1',borderLeftWidth: 0}}
          />
        <TouchableOpacity style={{marginTop: 20}} onPress={()=>this.getRegister()} >
            <View style={[styles.loginBtn,{width:_width}]}>
                <Text style={{color:"#ffffff",fontSize: px2dp(16)}}>{this.state.fBtn}</Text>
            </View>
        </TouchableOpacity>
        {/*<Text style={{marginTop: 20}}>状态: {this.props.status}</Text>*/}
        {/*<View style={{height: 100, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{height: 30, fontSize: 20, margin: 10}}>{login.data}</Text>
            <Text style={{height: 30, fontSize: 20, margin: 10}}>{isIOS}</Text>
        </View>*/}
        <View style={styles.loginBack}> 
          <Image source={LocalImg[_loginBack]} style={{width: width,height:height}}/>
        </View>
        {/* 切换显示或隐藏的按钮 */}
        {/*<TouchableOpacity underlayColor="#fff" style={styles.btn} onPress={
          this.showOrHide.bind(this)}>
            <Text style={{color:'#fff', fontSize: 20}}>显示/隐藏</Text>
        </TouchableOpacity>
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="small" />
        <ActivityIndicator
          animating={this.state.animating}
          size="large"
          color='#038de1'
          />*/}
         {ModelView}
    </View>
)}} 

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        // backgroundColor: '#F5FCFF'
    },
    loginBtn: {
        alignItems: 'center',
        justifyContent: 'center', 
        borderWidth: 1,
        marginTop: 20,
        padding: 5,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#038de1',
        borderColor: '#038de1',
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
    input: {
        fontSize: 12,
        width: width * 0.98,
        marginTop: 10,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightblue',
        paddingLeft: 5,
    },
    inputViews:{
      width: width * 0.98,
      paddingBottom: 20,
      alignItems: 'center',
      // backgroundColor: '#ffffff'
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
    textInput: {
        width: width * 0.9,
        fontSize:  px2dp(14),
        height: 40,
        backgroundColor: '#ffffff'
    },
    inputLayout: {
        width: width * 0.9,
        marginTop: 16,
        // marginHorizontal: 36,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    forgerPWD:{
      // color: '#000000'
    },
    reguster:{
      // color: '#000000'
    },
    line:{
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center' 
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
    getPhoneCode:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: px2dp(6),
      // borderRadius: 8,
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
)(ForgetPWD)
