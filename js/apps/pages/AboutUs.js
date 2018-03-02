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


let radio = 1
const { width, height } = Dimensions.get('window')
const isIOS = Platform.OS == "ios"
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'MyTab'})
  ]
})

class AboutUs extends Component {

  constructor(props){
      super(props)
      this.state = {
        name: "佘山",
        phone: "1892379837987",
      }
  }
  static navigationOptions = {
    title: '关于 KIC·赫曼德',
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
      radio = 1
    } else {
      radio = 0.55
    }
  }

     goAboutUs(){
      const { navigate } = this.props.navigation;
      navigate('FormList');
    }
  logout() {
    const { loginOut } = this.props;
    loginOut();
    // this.props.navigation.goBack();
    this.props.navigation.dispatch(resetAction)
  }
  render() {
    const { user } = this.props.navigation;
    const { count, incrementFn, decrementFn,loginOut } = this.props;
    return(
      <View style={styles.container}>
        <Image
          style={{width: px2dp(60),height: px2dp(60),marginBottom: px2dp(5),marginTop: -px2dp(150)}}
          source={LocalImg["usr"]}
        />
        <Text style={{marginBottom: px2dp(20),fontSize: px2dp(12)}}>版本信息：2.0.0</Text>
        <View style={{width:0.9*width*radio}}> 
          <Text style={styles.textStyle}>赫曼德·3D云设计——极简超快的家装VR设计工具，酷炫专业的设计促单神器。</Text>
          <Text style={[styles.textStyle,{marginBottom: px2dp(20)}]}>云渲染720°全景漫游，VR沉浸式体验。</Text>
          <Text style={styles.textStyle}>操作简单——无需安装，在线设计，海量图库，一键导入。</Text>
          <Text style={styles.textStyle}>功能强大——快速设计，实时预览，预见未来的家。</Text>
          <Text style={styles.textStyle}>效果惊艳——顶级渲染引擎，秒出效果图，超炫效果，VR全景虚拟体验。</Text>
          <Text style={styles.textStyle}>专业智能——参数化设计，动态展示，风格引擎一键替换。</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle:{
    // width:0.9*width,
    fontSize: px2dp(12),
    marginVertical: px2dp(3)
  }
})

export default connect(
  (state) => ({
    count: state.counter.count,
  }),
  (dispatch) => ({
    loginOut: () => dispatch(loginAction.loginOut()),
  })
)(AboutUs)
