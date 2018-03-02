/**
 * @author Zheng
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  BackAndroid,
  ScrollView,
  StyleSheet,
  Alert,
  AlertIOS,
  RefreshControl,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  // Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Animated,
  NetInfo,
  ToastAndroid
} from 'react-native'
import LocalImg from '../images'
import px2dp from '../util'
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper2'
import AppIntro from 'react-native-app-intro'
import Sarousel from 'react-native-spring-carousel'
import SplashScreen from 'react-native-splash-screen'
import Carousel from 'react-native-carousel'
import Image from 'react-native-image-progress'
import * as Progress from 'react-native-progress'
import Permissions  from 'react-native-permissions'
import Video from 'react-native-video';


import CarouselView from '../component/CarouselView'
import SearchView from '../component/SearchView'
import LbsModal from '../component/LbsModal'
// import ShareDemo from '../component/share'
import Bz from '../component/Bz'
import data from '../data'
import designDetailsView from '../component/designDetailsView'
import designListView from '../component/designListsView'
import storageSave from '../../storage/Savadata.js'
import storageReader from '../../storage/Readerdata.js'

// import NetWorkTool from '../tools/NetWorkTool'




const dismissKeyboard = require('dismissKeyboard')
const isIOS = Platform.OS == "ios"
const isAndroid = Platform.OS != "ios"
const { width, height } = Dimensions.get('window')
const headH = px2dp(isIOS?120:120)
const InputHeight = px2dp(28)

export default class HomePage extends Component {
  constructor(props){
      super(props)
      this.state = {
        location: "上海总部店",
        scrollY: new Animated.Value(0),
        searchView: new Animated.Value(0),
        modalVisible: false,
        searchBtnShow: true,
        listLoading: false,
        isRefreshing: false,
        isShowImages:true,
        isConnected: null,
        connectionInfo: null,
        swiperShow:false,
      }

      this.SEARCH_BOX_Y = px2dp(isIOS?48:43)
      this.SEARCH_FIX_Y = headH-px2dp(isIOS?64:44)
      this.SEARCH_KEY_P = px2dp(58)
      this.SEARCH_DIFF_Y = this.SEARCH_FIX_Y-this.SEARCH_BOX_Y
      this.SEARCH_FIX_DIFF_Y = headH-this.SEARCH_FIX_Y-headH
  }
  static navigationOptions = {
    title: '首页',
  };

  componentDidMount() {
    console.log(storage)
    let obj={
      key:"login",
      name:"12313",
      token:"wrwerwer",
      callback:(msg)=>{ console.log(msg) }
    }
    // storageSave(obj)
    console.log(storage)
    console.log(storageReader(obj))

      // SplashScreen.hide()
      // BackAndroid.addEventListener('hardwareBackPress', function() {
      //     BackAndroid.exitApp(0)
      //     return true
      // })  
      NetInfo.isConnected.fetch().done((isConnected) => {
          console.log('First, is ' + (isConnected ? 'online' : 'offline'));
      });
      function handleFirstConnectivityChange(isConnected) {
          console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
          if (!isConnected&&isIOS) {
            AlertIOS.alert("网络错误", "网络连接失败，请连接网络后重试！");
          }
          NetInfo.isConnected.removeEventListener(
              'change',
              handleFirstConnectivityChange
          );
      }
      NetInfo.isConnected.addEventListener(
          'change',
          handleFirstConnectivityChange
      );
  }
  goDesignDetail(key, data) {
      let pages = {
          "designDetails": designDetailsView
      }
      if (pages[key]) {
          this.props.navigator.push({
              component: pages[key],
              args: { data }
          })
      }
  }
  goDesignList(key, data) {
      // let pages = {
      //     "designList": designListView
      // }
      const { navigate } = this.props.navigation;
      navigate('DesignListsView',data);

      // if (pages[key]) {
      //     this.props.navigator.push({
      //         component: pages[key],
      //         args: { data }
      //         // callback:{
      //         //     callback:(msg)=>{ console.log(msg) }
      //         // }
      //     })
      // }
  }
  _renderHeader(){
    let searchY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [0, 0, this.SEARCH_DIFF_Y, this.SEARCH_DIFF_Y]
    })
    let lbsOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y],
      outputRange: [1, 0]
    })
    let keyOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_KEY_P],
      outputRange: [1, 1, 0]
    })
    return (
      <View style={[styles.header,{paddingTop: __APP__?30:40,paddingBottom:0}]}>
        <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy,alignItems:"flex-start"}]}>
          {/*<Image
            style={{width:310,height: 40}}
            source={LocalImg['logo']}
          />*/}
          <Text style={{width:width,fontSize: px2dp(14),fontWeight:'500',color:'#FFFFFF'}}>赫曼德·德国整体厨房</Text>
          {/*<Text style={styles.mTitle}>KIC-赫曼德·德国整体厨房</Text>*/}
          {/*<TouchableWithoutFeedback onPress={this.openLbs.bind(this)}>
            <View style={styles.lbs}>
              <Icon name="ios-pin" size={px2dp(16)} color="#fff" />
              <Text style={{fontSize: px2dp(14), fontWeight: 'bold', color:"#fff",paddingLeft: 5,paddingRight: 5}}>{this.state.location}</Text>
              <Icon name="md-arrow-dropdown" size={px2dp(14)} color="#fff" />
            </View>
          </TouchableWithoutFeedback>*/}
        </Animated.View>

        {/*<Animated.View style={{
                  marginTop: px2dp(15),
                  transform: [{
                    translateY: searchY
                  }]
                }}>
                  <TouchableWithoutFeedback onPress={()=>{}}>
                    <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
                      <Icon name="ios-search-outline" size={20} color="#666" />
                      <Text onPress={()=>{this.openSearch()}} style={{fontSize: 13, color:"#666", marginLeft: 5}}>{"输入商家，商品名称"}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </Animated.View>*/}
       {/* <Animated.View style={[styles.keywords, {opacity: keyOpaticy}]}>
                 {
                   ['肯德基','烤肉','吉野家','粥','必胜客','一品生煎','星巴克'].map((item, i) => {
                     return (
                       <TouchableWithoutFeedback key={i}>
                         <View style={{marginRight: 12}}>
                           <Text style={{fontSize: px2dp(12), color:"#fff"}}>{item}</Text>
                         </View>
                       </TouchableWithoutFeedback>
                     )
                   })
                 }
               </Animated.View>*/}
      </View>
    )
  }
  _renderFixHeader(){
    let showY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [-9999, -9999, 0, 0]
    })
    // console.log(showY)
    return (
      <Animated.View style={[styles.header, {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom:0,
        height: px2dp(isIOS?50:40),
        paddingTop: px2dp(isIOS?25:10),
        transform: [
          {translateY: showY}
        ]
      }]}>
        <TouchableWithoutFeedback onPress={()=>{}}>
          <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems:"center" }}>
            <Text style={{color:'#ffffff',fontSize: px2dp(14),alignItems:"center"}}>首页</Text>
          </View>
          {/*<View style={{flexDirection: 'row',justifyContent: 'space-around' }}>
                      <View style={[styles.searchBtn, {width:px2dp(310),backgroundColor: "#fff"}]}>
                      <Icon name="ios-search-outline" style={{marginLeft: 10}} size={20} color="#666" />
                      <TextInput underlineColorAndroid="transparent" autoCapitalize={"none"} ref={"name"} style={styles.textInput} placeholder="输入商家，商品名称" placeholderTextColor="#aaa"/>
                    </View>
                    <View style={styles.closeBtn}> 
                        <Text onPress={()=>{this.closeSearch()}} style={{fontSize: 15, color:"#ffffff", marginLeft: 5}}>取消</Text>
                    </View>
                    </View>*/}
          
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }
  openSearch(){
    this._scrollY = this.state.scrollY._value
    const { timing } = Animated
    Animated.parallel(['scrollY', 'searchView'].map(property => {
            return timing(this.state[property], {
            toValue: property=='scrollY'?this.SEARCH_FIX_Y:1,
            duration: 200
        });
    })).start(() => {
      //this.setState({searchBtnShow: false})
    })
    TabView.hideTabBar()
  }
  closeSearch(){
    dismissKeyboard();
    if(this._scrollY>=this.SEARCH_FIX_Y){
      this.state.scrollY.setValue(this._scrollY)
    }else{
      Animated.timing(this.state.scrollY, {
          toValue: this._scrollY,
          duration: 200
      }).start()
    }
    //this.refs["search"].blur()
    Animated.timing(this.state.searchView, {
        toValue: 0,
        duration: 200
    }).start(() => this.setState({searchBtnShow: true}))
    TabView.showTabBar(200)
  }
  openLbs(){
    this.setState({modalVisible: true})
  }
  changeLocation(location){
    this.setState({location})
  }
  _renderTypes(){
    var is = this.state.isShowImages;
    // console.log(is)
    // console.log(11)
    const w = width/4, h = w*.6 + 20
    let renderSwipeView = (types, n) => {
      return (
        <View style={styles.typesView}>
          {
            types.map((item, i) => {
              let render = (
                <View style={[{width: width, height: width * 0.5}, styles.typesItem]}>
                  <Image indicator={Progress.Bar} source={LocalImg['banner'+(i+n)]} style={{width: width, height: width * 0.5}}/>
                  {/*<Text style={{fontSize: px2dp(12), color:"#666"}}>{item}</Text>*/}
                </View>
              )
              return (
                isIOS?(
                  <TouchableHighlight style={{width: width, height: width * 0.5}} key={i} onPress={() => {}}>{render}</TouchableHighlight>
                ):(
                  <TouchableNativeFeedback style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableNativeFeedback>
                )
              )
            })
          }
        </View>
      )
    }
    return (
      <Carousel 
          indicatorText= '•'
          // hideIndicators={false} 
          indicatorColor="#FFFFFF" 
          indicatorSize={30} 
          indicatorSpace={15} 
          inactiveIndicatorColor="#038de1" 
          indicatorOffset={20}
          delay={1000} // Set Animation delay between slides
          animate={false} 
          >
        {renderSwipeView(['土豪推荐'], 0)}  
        {renderSwipeView(['土豪推荐'], 1)}  
        {renderSwipeView(['土豪推荐'], 2)}  
        {renderSwipeView(['土豪推荐'], 3)}  
        
      </Carousel>
      )
    // return (
    //   <Swiper
    //     index = {0}
    //     height={h*2.4}
    //     autoplay={is} 
    //     autoplayTimeout={2}
    //     showsButtons={true}
    //     paginationStyle={{ bottom: 10 }}
    //     prevButton = {<Text style={{fontSize:60, color:'#038de1'}}>‹</Text>}
    //     nextButton = {<Text style={{fontSize:60, color:'#038de1'}}>›</Text>}
    //     showsPagination={true}
    //     dotStyle={{backgroundColor:'#ffffff', width: 8, height: 8}}
    //     activeDotStyle={{backgroundColor:'#038de1', width: 8, height: 8}}>
    //     {renderSwipeView(['土豪推荐'], 0)}
    //     {renderSwipeView(['土豪推荐'], 1)}
    //     {renderSwipeView(['土豪推荐'], 2)}
    //     {renderSwipeView(['土豪推荐'], 3)}
    //   </Swiper>
    // )
  }
  _renderHot(){
    return ["FLUXUS / 轻奢", "SIGNATURE / 奢华", "PREMIUM / 尊享"].map((n, i) => {
      let styl = {
        0: {
          borderBottomWidth: 1,
          borderBottomColor: "#f9f9f9",
          borderRightWidth: 1,
          borderRightColor: "#f9f9f9",
        },
        1: {
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderRightColor: "#f9f9f9",
          borderBottomColor: "#f9f9f9"
        },
        2: {
          borderRightWidth: 1,
          borderRightColor: "#f9f9f9",
        },
        3: {}
      }
      let recomStyle = {};
      let _this = this;
      let _render = (i) => {
        // (i==1)?(recomStyle = {borderLeftWidth: 1, borderLeftColor: "#cccccc",borderRightWidth: 1, borderRightColor: "#cccccc"}):(recomStyle = {});
        // if (i = 1) {
        //   let recomStyle = {borderLeftWidth: 1, borderLeftColor: "#f5f5f5",borderRightWidth: 1, borderRightColor: "#f5f5f5"};
        // }else{
        //   let recomStyle = {};
        // }
        return (
            <View style={[styles.recomWrap],recomStyle}>
              <Text style={{width: width/3 -2, fontSize: px2dp(12), color: "#333", marginBottom:5,textAlign: 'center'}}>{n}</Text>
            </View>
        )
      }
      let dataObj = {
        relay:"home",
        name:n,
        id:"style0"+(i+1),
        callback:(msg)=>{
          _this._renderTypes();
          // _this._renderTypes();
          // console.log(msg) 
        }

      }
      return isIOS?(
        <View key={i} style={[styles.recomItem, styl[i], {backgroundColor: "#ffffff",height: (__PAD__)?80:px2dp(50),}]}>
          <TouchableOpacity style={{flex: 1}} onPress={() => {this.goDesignList("designList",dataObj)}}>{_render(i)}</TouchableOpacity>
        </View>
      ):(
        <View key={i} style={[styles.recomItem, styl[i]]}>
          <TouchableNativeFeedback number={0.8} style={{flex: 1,height: (__PAD__)?80:px2dp(60),}}>{_render(i)}</TouchableNativeFeedback>
        </View>
      )
    })

  }
  _renderQuality(){
    return (
      <View>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={{fontSize: px2dp(14), fontWeight: "bold"}}>店长推荐</Text>
          {/*<TouchableOpacity>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{fontSize: px2dp(12), color: "#aaa", marginRight: 3}}>更多</Text>
              <Icon name="ios-arrow-forward-outline" size={px2dp(13)} color="#bbb" />
            </View>
          </TouchableOpacity>*/}
        </View>
        <View style={{flexDirection: "row", justifyContent:"space-around", alignItems: "center", flexWrap:"wrap", paddingTop: 15}}>
          {
            ["LOTUS","LASER BRILLANT","COMET","LASER SOFT"].map((item, i) => {
                let size = px2dp((width-px2dp(240))/2)
                let layout = (
                  <View style={styles.lTimeList}>
                    <Image source={LocalImg["nice"+i]} style={{height: size / 1.48, width: size, resizeMode: 'cover'}}/>
                    <Text numberOfLines={1} style={{fontSize: px2dp(12), width: size, color: "#333", marginVertical: 10}}>{item}</Text>
                    {/*<Text numberOfLines={1} style={styles.qtag}>{"大牌精选"}</Text>*/}
                  </View>
                )
                let itemObj = {
                  number:i,
                  name:item,
                  productId:"xxx1",
                }                       
                return isIOS?(
                  <View key={i} style={{borderRadius: 2,paddingTop: i>3?30:0,paddingBottom: 10}}><TouchableHighlight onPress={()=>{}}>{layout}</TouchableHighlight></View>
                ):(
                  <View key={i} style={{marginRight: 10,paddingTop: i>3?30:0}}><TouchableNativeFeedback onPress={()=>{this.goDesignDetail("designDetails",itemObj)}}>{layout}</TouchableNativeFeedback></View>
                )
            })
          }
        </View>
      </View>
    )
  }
  _renderVideo(){
    return(
      <View style={{width: width,height:0.5*width}}>
        <Video source={{uri: "http://www.kic.com.cn/video/polina.mp4"}}   // Can be a URL or a local file.
         ref={(ref) => {
           this.player = ref
         }}                                      // Store reference
         rate={1.0}                              // 0 is paused, 1 is normal.
         volume={1.0}                            // 0 is muted, 1 is normal.
         muted={false}                           // Mutes the audio entirely.
         paused={false}                          // Pauses playback entirely.
         resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
         repeat={true}                           // Repeat forever.
         playInBackground={false}                // Audio continues to play when app entering background.
         playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
         ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
         progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
         onLoadStart={this.loadStart}            // Callback when video starts to load
         onLoad={this.setDuration}               // Callback when video loads
         onProgress={this.setTime}               // Callback every ~250ms with currentTime
         onEnd={this.onEnd}                      // Callback when playback finishes
         onError={this.videoError}               // Callback when video cannot be loaded
         onBuffer={this.onBuffer}                // Callback when remote video is buffering
         onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
         style={styles.backgroundVideo} />
      </View>
      )
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 2000)
    this._renderTypes();
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#038de1"}}>

        <ScrollView
          // scrollEnabled={false}
          style={styles.scrollView}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          removeClippedViews={false}
          // scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          //refreshControl = {false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              // colors={['#ddd', '#038de1']}
              tintColor='#ffffff'
              progressBackgroundColor="#038de1"
            />
          }
        >
          <View style={{flex:1,backgroundColor: '#f3f3f3'}}>

          {this._renderHeader()}
          <CarouselView />
         {/* <View style={{flex:1,backgroundColor: "#fff"}}>
               {this._renderTypes()}
                      
          </View>*/}

          <View style={styles.recom}>
              {this._renderHot()}
          </View>
          {/*<View style={styles.card}>
            {this._renderQuality()}
          </View>*/}
          {/*this._renderVideo()*/}
          <Text style={{fontSize:px2dp(12),color:'#000000',backgroundColor: '#ffffff',marginVertical: px2dp(5),paddingVertical: px2dp(10),paddingHorizontal: px2dp(12)}}>精选大图</Text>
            <Image source={LocalImg["home1"]} style={styles.homeImg}/>
            <Image source={LocalImg["home2"]} style={styles.homeImg}/>
            <Image source={LocalImg["home3"]} style={styles.homeImg}/>
            <Image source={LocalImg["home4"]} style={styles.homeImg}/>
            <Image source={LocalImg["home5"]} style={styles.homeImg}/>
            <Image source={LocalImg["home6"]} style={styles.homeImg}/>
            <Image source={LocalImg["home7"]} style={styles.homeImg}/>
            <Image source={LocalImg["home8"]} style={styles.homeImg}/>
            <Image source={LocalImg["home9"]} style={styles.homeImg}/>
            <Image source={LocalImg["home10"]} style={styles.homeImg}/>
            </View>
        </ScrollView>
        {this._renderFixHeader()}
        {/*<ShareDemo />*/}
        {/*<SearchView show={this.state.searchView} scrollY={this.state.scrollY}/>*/}
        
        <LbsModal
          modalVisible={this.state.modalVisible}
          location={this.state.location}
          setLocation={this.changeLocation.bind(this)}
          closeModal={(()=>this.setState({modalVisible: false})).bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#038de1",
    // height: headH,
    paddingBottom: 10,
    paddingTop: isIOS?50:10,
    paddingHorizontal: 16
  },
  typesView: {
    paddingBottom: 10,
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  typesItem: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  lbsWeather: {
    height: InputHeight,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: 'center', 
    // backgroundColor: '#000000',
    justifyContent: "space-between"
  },
  placeholder: {
    height: InputHeight,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    borderRadius: px2dp(14),
    backgroundColor: "#fff",
    alignItems: "center"
  },
  mTitle:{
    height: InputHeight,
    // lineHeight: InputHeight,
    fontSize: px2dp(16),
    color:'#ffffff',
    fontWeight:'bold',
    // backgroundColor: 'red',
    position: 'absolute',
    width: 200,
    textAlign: 'center', 
    left:width*0.5,
    marginLeft:-115,
  },
  lbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  weather: { 
    flexDirection: "row",
    alignItems: "center"
  },
  textInput:{
    flex: 1,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    height: InputHeight,
    borderRadius: px2dp(14),
    backgroundColor: "#fff"
  },
  searchHeadBox: {
    height: InputHeight,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBtn: {
    borderRadius: InputHeight,
    height: InputHeight,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  closeBtn:{
    height: InputHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  keywords: {
    marginTop: px2dp(14),
    flexDirection: "row"
  },
  scrollView: {
    flex:1,
    backgroundColor: '#038de1'
    // marginBottom: px2dp(46)
  },
  recom: {
    flexDirection: "row",
    backgroundColor: "#fff",
    // marginTop: 15,
    marginTop: px2dp(11),
    flexWrap: "wrap"
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  business: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 16
  },
  time: {
    paddingHorizontal: 3,
    backgroundColor: "#333",
    fontSize: px2dp(11),
    color: "#fff",
    marginHorizontal: 3
  },
  recomItem: {
    width: (width-2)/3,
    height: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row"
  },
  recomWrap: {
    width: (width-2)/3,
    flex: 1,
    height: isAndroid?px2dp(40):px2dp(80),
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
  },
  lTimeScrollView: {
  },
  lTimeList: {
    backgroundColor:"#fff",
    alignItems: "center"
  },
  qtag: {
    fontSize: 12,
    borderWidth: 1,
    color: "#00abff",
    borderColor: "#00abff",
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 5,
  },
  gift: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  fixSearch: {
    backgroundColor: "#038de1",
    height: isIOS ? 64 : 42,
    paddingTop: isIOS ? 20 : 0,
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  homeImg: {
      height: width / 1.6,
      width: width,
      resizeMode: 'stretch',
      marginBottom: px2dp(3)
  }
})
