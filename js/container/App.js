/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @Zheng
 */

import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import React from 'react';
import Toast from 'react-native-root-toast';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import * as WeChat from 'react-native-wechat';
import fs from 'react-native-fs';
let resolveAssetSource = require('resolveAssetSource');

import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage,
    Platform
} from 'react-native';
import '../storage/Utilstorage.js'
//首页
import Home from '../apps/pages/Home.js';
// // 灵感库
import Discover from '../apps/pages/Discover.js';
// //云设计
import OnLineYun from '../apps/pages/OnLineYun.js';
// //我的
// import My from '../apps/pages/Developing.js';
import My from '../apps/pages/My.js';
//登录
import LoginPage from '../apps/pages/LoginPage.js'
//主页面
import MainPage from '../apps/pages/MainPage'
//表单
import FormList from '../apps/pages/Form'
//注册
import Register from '../apps/pages/Register'
//忘记密码
import ForgetPWD from '../apps/pages/ForgetPWD'
//关于我们
import AboutUsPage from '../apps/pages/AboutUs'
//设置
import Setting from '../apps/pages/Setting'
//我的客户
import MyCustomer from '../apps/pages/MyCustomer'
//增加地址
import Address from '../apps/pages/Address'
import EditAddress from '../apps/pages/EditAddress'
import AddCustomer from '../apps/pages/AddCustomer'

//我的收藏
import MyCollect from '../apps/pages/MyCollect'
//入库
import Inbound from '../apps/pages/Inbound.js'
//出库
import Outbound from '../apps/pages/Outbound.js'
//扫描二维码
import ScanningTwoCode from '../apps/component/scanningTwoCode.js'
// import OnLineYun from './Test1.js';
// import Test1 from './Test1.js';
// import Test2 from './Test2.js';
// import Test3 from './Test3.js';
// import Detail1 from './Detail1.js';
// import Detail2 from './Detail2.js';
//样板间详情页
import PrototypeRoomDetails from '../apps/component/prototypeRoomDetails.js'
//主页设计列表页
import DesignDetailsView from '../apps/component/designDetailsView.js'
//主页设计详情页
import DesignListsView from '../apps/component/designListsView.js'
//设计图片全屏预览
import ImageViewer from '../apps/component/ImageViewModal.js'
//VR全屏预览
import VRDetails from '../apps/component/VRDetails.js'
// 分享
import shareOthers from '../apps/component/share.js'



const ShiTuIcon = require('../resources/ShiTu.png');
const GankIcon = require('../resources/Gank.png');
const MainIcon = require('../resources/Main.png');
const Home_off = require('../resources/home_off.png');
const Discover_off = require('../resources/discover_off.png');
const Onlineyun_off = require('../resources/onlineyun_off.png');
const My_off = require('../resources/my_off.png');
const Home_on = require('../resources/home_on.png');
const Discover_on = require('../resources/discover_on.png');
const Onlineyun_on = require('../resources/onlineyun_on.png');
const My_on = require('../resources/my_on.png');


const isIos = Platform.OS == "ios"
/**
 * 1、Test1是通过普通的属性创建的Tabbar和导航
 * 2、Test2是在页面中通过属性创建Tabbar和导航
 * 3、Test3是通过封装navigationOptions实现Tabbar和导航的
 */



const MyTab = TabNavigator({
    // My: {
    //     screen: My,
    //     // screen:LoginPage,
    //     navigationOptions: ({ navigation, screenProps }) => ({
    //         header: null,
    //         tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
    //         tabBarIcon: (({ tintColor, focused }) => {
    //             return ( <
    //                 Image source = {!focused ? My_off : My_on } style = {
    //                     [{ height: 20, width: 20 }, { tintColor: tintColor }]
    //                 }
    //                 />
    //             )
    //         }), // 设置标签栏的图标。需要单独设置。
    //         tabBarLabel: '我的', // 设置标签栏的title。推荐这个方式。
    //     })
    //     // navigationOptions: ()=> TabOptions('我的',My_off,My_on,'我的'),
    // },
    // Discover: {
    //     screen: Discover,
    //     navigationOptions: ({ navigation, screenProps }) => ({
    //         header: null,
    //         tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
    //         tabBarIcon: (({ tintColor, focused }) => {
    //             return ( <
    //                 Image source = {!focused ? Discover_off : Discover_on } style = {
    //                     [{ height: 20, width: 20 }, { tintColor: tintColor }]
    //                 }
    //                 />
    //             )
    //         }), // 设置标签栏的图标。需要单独设置。
    //         tabBarLabel: '灵感库', // 设置标签栏的title。推荐这个方式。
    //     })
    //     // navigationOptions: ()=> TabOptions('我的',MainIcon,MainIcon,'我的'),
    // },
    // Home: {
    //     screen: Home,
    //     navigationOptions: ({ navigation, screenProps }) => ({
    //         header: null,
    //         tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
    //         tabBarIcon: (({ tintColor, focused }) => {
    //             return ( <
    //                 Image source = {!focused ? Home_off : Home_on } style = {
    //                     [{ height: 20, width: 20 }, { tintColor: tintColor }]
    //                 }
    //                 />
    //             )
    //         }), // 设置标签栏的图标。需要单独设置。
    //         tabBarLabel: '首页', // 设置标签栏的title。推荐这个方式。
    //     })
    // },
    // Discover: {
    //     screen: Discover,
    //     navigationOptions: ({ navigation, screenProps }) => ({
    //         header: null,
    //         tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
    //         tabBarIcon: (({ tintColor, focused }) => {
    //             return ( <
    //                 Image source = {!focused ? Discover_off : Discover_on } style = {
    //                     [{ height: 20, width: 20 }, { tintColor: tintColor }]
    //                 }
    //                 />
    //             )
    //         }), // 设置标签栏的图标。需要单独设置。
    //         tabBarLabel: '灵感库', // 设置标签栏的title。推荐这个方式。
    //     })
    //     // navigationOptions: ()=> TabOptions('我的',MainIcon,MainIcon,'我的'),
    // },
    // OnLineYun:{
    //     screen:OnLineYun,
    //     navigationOptions:({navigation,screenProps}) => ({
    //         header:null,
    //         tabBarVisible:true, // 是否隐藏标签栏。默认不隐藏(true)
    //         tabBarIcon: (({tintColor,focused}) => {
    //             return(
    //                 <Image
    //                     source={!focused ? Onlineyun_off : Onlineyun_on}
    //                     style={[{height:20,width:20 }, {tintColor: tintColor}]}
    //                 />
    //             )
    //         }), // 设置标签栏的图标。需要单独设置。
    //         tabBarLabel:'云设计', // 设置标签栏的title。推荐这个方式。
    //      })
    //     // navigationOptions: ()=> TabOptions('云设计',Onlineyun_off,Onlineyun_on,'云设计'),
    // },
    My: {
        screen: My,
        // screen:LoginPage,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null,
            tabBarVisible: false, // 是否隐藏标签栏。默认不隐藏(true)
            tabBarIcon: (({ tintColor, focused }) => {
                return ( <
                    Image source = {!focused ? My_off : My_on } style = {
                        [{ height: 20, width: 20 }, { tintColor: tintColor }]
                    }
                    />
                )
            }), // 设置标签栏的图标。需要单独设置。
            tabBarLabel: '我的', // 设置标签栏的title。推荐这个方式。
        })
        // navigationOptions: ()=> TabOptions('我的',My_off,My_on,'我的'),
    }
}, {
    tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled: false, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName: '', // 设置默认的页面组件
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        // iOS属性
        // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
        activeTintColor: '#038de1', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor: '#454545', // label和icon的前景色 不活跃状态下(未选中)。

        activeBackgroundColor: '#ffffff', //label和icon的背景色 活跃状态下（选中） 。
        inactiveBackgroundColor: '#ffffff', // label和icon的背景色 不活跃状态下（未选中）。

        showLabel: true, // 是否显示label，默认开启。
        // style:{}, // tabbar的样式。
        // labelStyle:{}, //label的样式。

        // 安卓属性

        // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
        // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
        showIcon: true, // 是否显示图标，默认关闭。
        // showLabel:true, //是否显示label，默认开启。
        style: { backgroundColor: '#ffffff' }, // tabbar的样式。
        // labelStyle:{}, // label的样式。
        upperCaseLabel: false, // 是否使标签大写，默认为true。
        // pressColor:'', // material涟漪效果的颜色（安卓版本需要大于5.0）。
        // pressOpacity:'', // 按压标签的透明度变化（安卓版本需要小于5.0）。
        scrollEnabled: false, // 是否启用可滚动选项卡。
        tabStyle: { alignItems: 'center', justifyContent: 'center', height: 50 }, // tab的样式。
        indicatorStyle: { height: 0 }, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
        labelStyle: { margin: 0, fontSize: 10, paddingBottom: isIos ? 5 : 0 }, // label的样式。
        iconStyle: { marginTop: 0 }, // 图标的样式。
    }

});



// 初始化StackNavigator
const MyNav = StackNavigator({
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    //第一个为初始页面
    MyTab: {
        screen: MyTab,
    },
    Home: { screen: MyTab, path: 'app/Home' },
    Discover: { screen: MyTab, path: 'app/Discover' },
    My: { screen: MyTab, path: 'app/My' },
    // 将需要跳转的页面注册在这里，全局才可以跳转
    // Detail1:{
    //     screen:Detail1
    // },
    // Detail2:{
    //     screen:Detail2,
    // },    
    PrototypeRoomDetails: {
        screen: PrototypeRoomDetails,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null,
            data: screenProps,
        })
    },
    DesignListsView: {
        screen: DesignListsView,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null,
        })
    },
    DesignDetailsView: {
        screen: DesignDetailsView,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null,
        })
    },
    ImageViewer: {
        screen: ImageViewer,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null,
        })
    },
    VRDetails: {
        screen: VRDetails,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null,
        })
    },
    // My: {
    //     screen: My,
    //     navigationOptions: ({ navigation, screenProps }) => ({
    //         header: null,
    //         tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
    //         tabBarIcon: (({ tintColor, focused }) => {
    //             return ( <
    //                 Image source = {!focused ? My_off : My_on } style = {
    //                     [{ height: 20, width: 20 }, { tintColor: tintColor }] }
    //                 />
    //             )
    //         }), // 设置标签栏的图标。需要单独设置。
    //         tabBarLabel: '我的', // 设置标签栏的title。推荐这个方式。
    //     })
    // },
    AboutUs: {
        screen: AboutUsPage
    },
    MyCustomer: {
        screen: MyCustomer,
        navigationOptions: ({ navigation, screenProps }) => ({
            title: "我的客户",
        })
    },
    Setting: {
        screen: Setting,
        navigationOptions: ({ navigation, screenProps }) => ({
            title: '设置',
        })
    },
    Login: { screen: LoginPage},
    Main: {
        screen: MainPage,
        navigationOptions: ({ navigation, screenProps }) => ({
            title: "我的",
        })
    },
    FormList: { screen: FormList },
    Register: { 
        screen: Register,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null,
            data: screenProps,
        })
    },
    ForgetPWD:{
        screen: ForgetPWD,
        navigationOptions: ({ navigation, screenProps }) => ({
            title: "忘记密码",
        })
    },
    Address: { screen: Address },
    EditAddress: { screen: EditAddress },
    AddCustomer:{ screen: AddCustomer },
    ScanningTwoCode:{ screen: ScanningTwoCode },
    MyCollect:{
        screen: MyCollect,
        navigationOptions: ({ navigation, screenProps }) => ({
            title: "我的收藏",
        })
    },
    Inbound:{
        screen: Inbound,
    },
    Outbound:{
        screen: Outbound
    }
}, {

});

const TabOptions = (tabBarTitle, normalImage, selectedImage, navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({ tintColor, focused }) => {
        return ( <
            Image source = {!focused ? normalImage : selectedImage } style = {
                [{ height: 20, width: 20 }, { tintColor: tintColor }]
            }
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = { fontSize: 16, color: 'white', alignSelf: 'center' };
    // header的style
    const headerStyle = { backgroundColor: '#4ECBFC' };
    const tabBarVisible = true;
    // const header = null;
    return { tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle, tabBarVisible };
};

export default MyNav;