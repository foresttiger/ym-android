import React, { Component } from "react";
// import {Text, View, StyleSheet} from "react-native";
import { StyleSheet, View, StatusBar, TouchableOpacity, Image, Text, Vibration, DeviceEventEmitter,Alert } from 'react-native';

// import Toast from 'react-native-simple-toast';
import { toastShort } from '../util/ToastUtil.js';
import { QRScannerView } from 'ac-qrcode';
import Camera from 'react-native-camera';

// import {ImageButton, TitleBar} from "../../components/";

import { Constants, Images, Colors } from "../resource/";

export default class ScanningTwoCode extends Component {
    initData() {
        isFirstIn = true;
    }
    constructor(props) {
        super(props);
        console.log(props.navigation.state.params.type)

        this.initData();

        this.camera = null;

        this.state = {
            scanningType: props.navigation.state.params.type,
            camera: {
                aspect: Camera.constants.Aspect.sretch,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isRecording: false,
        };

        this.takePicture = this.takePicture.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.switchType = this.switchType.bind(this);
        this.switchFlash = this.switchFlash.bind(this);
    }
    static navigationOptions = {
        title: '扫码二维码',
        headerStyle: {
            backgroundColor: '#038de1'
        },
        headerBackTitleStyle: {
            color: '#ffffff'
        },
        headerTintColor: '#ffffff'
    };
    //页面将要离开的是时候发送通知
    componentWillUnmount() {
        switch (this.state.scanningType) {
            case "componentsMs":
                DeviceEventEmitter.emit('ChangeUI', { type:this.state.scanningType, componentsMs: this.state.componentsMs });
                break;
            case "local":
                DeviceEventEmitter.emit('ChangeUI', { type:this.state.scanningType, localMs: this.state.local });
                break;
            case "incar":
                DeviceEventEmitter.emit('ChangeUI', { type:this.state.scanningType, carMs: this.state.car });
                break;
            case "outcar":
                DeviceEventEmitter.emit('ChangeUI', { type:this.state.scanningType, carMs: this.state.car });
                break;
            case "error":
                 DeviceEventEmitter.emit('ChangeUI', { type:this.state.scanningType, carMs: this.state.error });
                break;
        }
        // DeviceEventEmitter.emit('ChangeUI', { color: 'red', text: '通知' });
    }
    takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => console.log(data))
                .catch(err => console.error(err));
        }
    }

    startRecording() {
        if (this.camera) {
            this.camera.capture({ mode: Camera.constants.CaptureMode.video })
                .then((data) => console.log(data))
                .catch(err => console.error(err));
            this.setState({
                isRecording: true
            });
        }
    }

    stopRecording() {
        if (this.camera) {
            this.camera.stopCapture();
            this.setState({
                isRecording: false
            });
        }
    }

    switchType() {
        let newType;
        const { back, front } = Camera.constants.Type;

        if (this.state.camera.type === back) {
            newType = front;
        } else if (this.state.camera.type === front) {
            newType = back;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                type: newType,
            },
        });
    }
    switchFlash() {
        let newFlashMode;
        const { auto, on, off } = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            newFlashMode = on;
        } else if (this.state.camera.flashMode === on) {
            newFlashMode = off;
        } else if (this.state.camera.flashMode === off) {
            newFlashMode = auto;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                flashMode: newFlashMode,
            },
        });
    }
    back() {
        this.props.navigation.goBack();
    }
    onBarCodeRead(e) {
        console.log(e.data);
        if (isFirstIn) {
            // alert(e.data);
            Vibration.vibrate();
            isFirstIn = false;
            // console.log(StringUtil.object2Json(this.props));
            // console.log(e.data)
            var isJson = false;
            if (typeof e.data == 'string') {
                try {
                    var obj=JSON.parse(e.data);
                    if(typeof obj == 'object' && obj ){
                        isJson = true;
                        // return true;
                    }else{

                        // return isJson;
                    }

                } catch(e) {
                    isJson = false;
                    console.log(e);
                    // return isJson;
                }
            }
            if (isJson) {
                var datas = JSON.parse(e.data);

                switch (this.state.scanningType) {
                    case "componentsMs":
                        this.setState({ componentsMs: datas});
                        break;
                    case "local":
                        this.setState({ local: datas});
                        break;
                    case "incar":
                        this.setState({ car: datas});
                        break;
                    case "outcar":
                        this.setState({ car: datas});
                        break;
                    default:
                        this.setState({ scanningType:"error",error: "扫描二维码失败！"});
                        break;

                }
            }else{
                this.setState({ scanningType:"error",error: "扫描二维码失败！"});
            }

            console.log(datas)
            // toastShort('Type: ' + e.type + '\nData: ' + e.data);
            const { navigate } = this.props.navigation;
            // this.props.callback(true);

            // storage.save({
            //     key: this.state.scanningType, // 注意:请不要在key中使用_下划线符号!
            //     data: datas,
            //     expires: 1000 * 3600
            // });
            // navigate('Inbound', e.data);
            this.props.navigation.goBack();
        } else {

        }

    }
    render() {
        return ( 
            <View style = { styles.container }>
             <Camera ref = {
                    (cam) => {
                    this.camera = cam;
                    }
                }
                style = { styles.preview } 
                aspect = { this.state.camera.aspect } 
                captureTarget = { this.state.camera.captureTarget } 
                type = { this.state.camera.type } 
                flashMode = { this.state.camera.flashMode } 
                defaultTouchToFocus mirrorImage = { false } 
                onBarCodeRead = { this.onBarCodeRead.bind(this) } >
                <Text style = { styles.centerBox }/> 
                </Camera> 
                <View style={styles.tipView}>
                    <Text style={styles.tips}>将二维码放入框内，即可自动扫描</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    centerBox: {
        position: 'absolute',
        top: 200,
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#29B6F6',
        backgroundColor: 'rgba(0,0,0,0.0)',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    },
    tipView:{
        width:'100%',
        display:'flex',
        position:'absolute',
        bottom:'30%',
        justifyContent:'center',
        alignItems:'center',


    },
    tips:{
        // width
        // position:'absolute',
        // bottom:50,
        // justifyContent:'center',
        // alignItems:'center',
        height:40,
        lineHeight:40,
        fontSize:18,
        backgroundColor:'rgba(255,255,255,0)',
        textAlign:"center",
        color:'#FFFFFF'
    }
});