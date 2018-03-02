import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
import NavBar from '../component/NavBar'
import Counter from '../../components/Counter';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
import *as counterAction from '../../actions/counterAction';
import *as loginAction from '../../actions/loginAction';// 导入action方法
import LocalImg from '../images'
import px2dp from '../util'
import storageSave from '../../storage/Savadata.js'
import storageReader from '../../storage/Readerdata.js'

let radio = 1
const { width, height } = Dimensions.get('window')
const isIOS = Platform.OS == "ios"
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
  ]
})

class MainPage extends Component {
  // var smartUserId = storage.cache.login.rawData.name;
  // var token = storage.cache.login.rawData.token;
  // this.setState({ smartUserId: smartUserId, token: token });
  // console.log(this.state);
  constructor(props) {
      var smartUserId = storage.cache.login.rawData.name;
      var token = storage.cache.login.rawData.token;
      super(props)
      this.state = {
          name: props.user.name || "佘山",
          phone: props.user.phone || "1892379837987",
          smartUserId: smartUserId,
          token:token
      }
      console.log(this.state)
  }

  static navigationOptions = {
    title: '个人中心',
  };
  
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
      radio = 0.8
    } else {
      radio = 1
    }
    console.log(storage)
    // var smartUserId = storage.cache.login.rawData.name;
    // var token = storage.cache.login.rawData.token;
    // this.setState({smartUserId:smartUserId,token:token});
    // console.log(this.state);
    // let obj={
    //   key:"login",
    //   name:"12313",
    //   token:"wrwerwer",
    //   callback:(msg)=>{ console.log(msg) }
    // }
    // storageSave(obj)
    // console.log(storage)
    // console.log(storageReader(obj))
  }
  goAboutUs(){
      const { navigate } = this.props.navigation;
      navigate('AboutUs');
    }
  goMyCustomer(){
      const { navigate } = this.props.navigation;
      navigate('MyCustomer');
  }
  goMyCollect(){
      var opt = {
        smartUserId:this.state.smartUserId,
        token:this.state.token
      }
      const { navigate } = this.props.navigation;
      navigate('MyCollect',opt);
  }
  goScanningTwoCode(){
      const { navigate } = this.props.navigation;
      navigate('ScanningTwoCode');
  }
  goSetting(){
    const {navigate} = this.props.navigation;
    navigate("Setting");
  }
  Form() {
    const {navigate} = this.props.navigation;
    navigate("FormList");
  }
  goInbound(){
    const {navigate} = this.props.navigation;
    navigate("Inbound");
  }
  goOutbound(){
     const {navigate} = this.props.navigation;
    navigate("Outbound");   
  }
  _alert(){
    Alert("sdsadsad")
  }
  _cellFun(name){
    switch(name){
      case "我的客户":
        this.goMyCustomer();
        console.log(name)
        break;
      case "我的订单":
        console.log(name)
        break;
      case "我的收藏":
        this.goMyCollect();
        console.log(name)
        break;
      case "扫描二维码":
        this.goScanningTwoCode();
        console.log(name)
        break;
      case "关于KIC·赫曼德":
        this.goAboutUs();
        // console.log(name)
        break;
      case "构件入场":
        this.goInbound();
        // console.log(name)
        break;
      case "构件出场":
        this.goOutbound();
        // console.log(name)
        break;
    }
  }
  _cells(){
    let _this = this;
    // const options = [{"icon":"user-o","name":"我的客户"},{"icon":"bars","name":"我的订单"},{"icon":"star-o","name":"我的收藏"},{"icon":"info-circle","name":"关于KIC·德国厨房"}]
    // const options = [{"icon":"heart","name":"我的收藏"},{"icon":"info-circle","name":"关于KIC·赫曼德"}]
    // const options = [{"icon":"indent","name":"构件入场"},{"icon":"outdent","name":"构件出场"},{"icon":"info-circle","name":"扫描二维码"},{"icon":"info-circle","name":"关于KIC·赫曼德"}]
    const options = [{"icon":"indent","name":"构件入场","color":"green"},{"icon":"outdent","name":"构件出场","color":"blue"}]
    return(
        <View>
           {options.map((item,i)=>{
              let render = (
                <View style={[styles.cellItem,{height: px2dp(70)*radio,paddingHorizontal: px2dp(20)*radio,}]}>
                  <FontAwesomeIcon name={item.icon} size={px2dp(30)*radio} color={item.color} />
                  <Text style={[styles.cellName,{marginHorizontal: px2dp(16)*radio}]}>{item.name}</Text>
                  <FontAwesomeIcon name={"angle-right"} style={{position: 'absolute',right: px2dp(20)*radio}} size={px2dp(30)*radio} color="rgba(0,0,0,0.4)" />
                </View>
              )
              return (
                isIOS?(
                  <TouchableOpacity key={i} onPress={() => {_this._cellFun(item.name)}}>{render}</TouchableOpacity>
                ):(
                  <TouchableOpacity key={i} onPress={() => {_this._cellFun(item.name)}}>{render}</TouchableOpacity>
                )
              )
            })
         }
        </View>
      )
  }
  render() {
    console.log(__IOS__)
    const { user } = this.props.navigation;
    const { count, incrementFn, decrementFn,loginOut } = this.props;
    return(
      <View style={styles.container}>
        <NavBar
          title="永茂住工"
          rightIcon="ios-settings-outline"
          rightPress={this.goSetting.bind(this)}
          // leftPress={this.back.bind(this)}ios-arrow-back
        />
        {/*<TouchableOpacity onPress={this.Form.bind(this)}>*/}
          <View style={[styles.user,{height:px2dp(100)*radio}]}>
            <View style={styles.headImg}>
              <Image
                style={{width: px2dp(50)*radio,height: px2dp(50)*radio}}
                source={LocalImg['ym']}
              />
              
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.userItem}>{this.state.name}</Text>
             {/* <Text style={styles.userItem}>{this.state.phone}</Text>*/}
            </View>
          </View>
        {/*</TouchableOpacity>*/}
        <View style={styles.cellStyles}>
           {this._cells()}
        </View>
       

{/*        <Counter incrementFn={incrementFn} decrementFn={decrementFn} counter={count}>
        </Counter>
        <TouchableOpacity onPress={this.Form.bind(this)} style={{marginTop: 50}}>
          <View>
            <Text>进入Form
            </Text>
          </View>
        </TouchableOpacity>*/}
        {/*<TouchableOpacity onPress={this.logout.bind(this)} style={{marginTop: 50}}>
          <View>
            <Text>退出登录
            </Text>
          </View>
        </TouchableOpacity>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    // borderBottomWidth: 0.5,
    // borderColor: 'rgba(0,0,0,0.05)',
  },
  user:{
    flexDirection: 'row',
    paddingHorizontal: px2dp(20),
    alignItems:'center',
    backgroundColor: '#038de1',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#038de1',
  },
  headImg:{
    marginRight: px2dp(10)
  },
  userItem:{
    fontSize: px2dp(16),
    margin:px2dp(2),
    color:'#ffffff',
  },
  cellStyles:{
    // borderTopWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'rgba(0,0,0,0.15)',
  },
  cellItem:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // borderBottomWidth: 1,
    // borderStyle: 'dotted',
    // borderStyle: 'dashed', 
    marginVertical: px2dp(1),
    // borderColor: 'rgba(0,0,0,0.1)',
  },
  cellName:{
    color:'rgba(0,0,0,0.7)',
    fontSize: px2dp(18),
  }
})

export default connect(
  (state) => ({
    count: state.counter.count,
  }),
  (dispatch) => ({
    // incrementFn: () => dispatch(counterAction.increment()),
    // decrementFn: () => dispatch(counterAction.decrement()),
    // loginOut: () => dispatch(loginAction.loginOut()),
  })
)(MainPage)
