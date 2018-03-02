import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
import NavBar from '../component/NavBar'
import Counter from '../../components/Counter';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
import *as customerAction from '../../actions/customerAction';// 导入action方法
import LocalImg from '../images'
import px2dp from '../util'


let radio = 1
const { width, height } = Dimensions.get('window')
const isIOS = Platform.OS == "ios"
const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'MyTab'})
  ]
})
const data = [{
    name: '张三',
    phone: "10000000000",
    address: "上海市黄浦区金陵大厦17楼"
}, {
    name: '张三',
    phone: "10000000000",
    address: "上海市黄浦区金陵大上海市黄浦区金陵大厦17楼厦17楼"
}, {
    name: '张三',
    phone: "10000000000",
    address: "上海市黄浦区金陵大厦17楼"
}]
let ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
class MyCustomer extends Component {

  constructor(props){
      var ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
      super(props)

      this.state = {
        dataSource:ds.cloneWithRows(data),
        rows: data,
        customerId:"sdasds"
      }
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
      title: '我的客户',
      headerStyle: {
          backgroundColor: '#038de1'
      },
      headerBackTitleStyle: {
          color: '#ffffff'
      },
      headerTintColor: '#ffffff',
      headerRight: (
            <Text  onPress={navigation.state.params&&navigation.state.params.navigatePress.bind(this)} style={{marginRight:px2dp(12), width:30, textAlign:"center"}} >  
                <Icon name='md-add' size={px2dp(20)} color='#ffffff' /> 
            </Text>  
        )
  }); 
   componentDidMount(){  
      //在static中使用this方法  
      this.props.navigation.setParams({ navigatePress:this._addAdress })  
  }  
  _deleteRow(rowdata, sectionID, rowID) {
    const { delCustomer } = this.props;
    let obj = {
        customerId: sectionID,
    }
    delCustomer(obj)
    this.state.rows.splice(rowID, 1)
    this.setState({
      dataSource: ds.cloneWithRows( this.state.rows ),
    })
  }
  _addAdress = () => {
    const { navigate } = this.props.navigation;
    navigate('AddCustomer');
  }
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
      radio = 0.8
    } else {
      radio = 1
    }
  }
   // 具体的cell
  renderRow(rowdata, sectionID, rowID){
    return(
        <View style={styles.cellStyles}>
            <Text style={styles.name}>{rowdata.name}</Text>
            <View style={styles.content}>
              <Text style={styles.phone}>{rowdata.phone}</Text>
              <Text style={styles.address}>{rowdata.address}</Text>
            </View>
            <TouchableOpacity style={styles.del} onPress={()=>{this._deleteRow(rowdata, sectionID, rowID)}}>
                <FontAwesomeIcon name={"trash-o"} size={px2dp(20)} color="rgba(0,0,0,0.4)" />
            </TouchableOpacity>
        </View>
      )
  }
  _render(){
    return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                contentContainerStyle={styles.contentViewStyle}
                scrollEnabled={false}
            />
      )
  }
  render() {
    const { user } = this.props.navigation;
    const { count, incrementFn, decrementFn,loginOut } = this.props;
    return(
      <View style={styles.container}>
	      {this._render()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        borderBottomWidth: 1,
        borderColor: '#cccccc',
    },
    contentViewStyle: {
        flex:1,
        // 设置主轴的方向
        // flexDirection: 'row',
    },
    cellStyles: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: px2dp(60),
        marginVertical: 1,
        // borderTopWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'rgba(0,0,0,0.15)',
    },
    content:{
        width: width*0.70,
        marginRight: width*0.05
    },
    name:{
         width: width*0.15,
         textAlign:  'center',
         alignItems: 'center',
    },
    del:{
        width: width*0.1,
    }

})

export default connect(
  (state) => ({
    customerId: state.customerDo.customerId,
    status:state.customerDo.status
  }),
  (dispatch) => ({
    delCustomer: (obj) => dispatch(customerAction.delCustomer(obj)),
  })
)(MyCustomer)
