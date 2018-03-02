/**
 * @author Zheng
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Image,
  Vibration,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ListView,
  Platform,
} from 'react-native'
let {width, height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import selectData from '../data/selectJson.json'

import px2dp from '../util'
import {toastShort} from '../util/ToastUtil.js';
// import {QRScannerView} from 'ac-qrcode';
import Camera from 'react-native-camera';



const _width = width * 0.25;
export default class ModalView extends Component {
  initData() {
      var isFirstIn = true;
  }
  constructor(props){
      // let ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
      super(props)
      console.log(props)
          let datas = props.data;
          this.initData();
          this.camera = null;

          this.state = {
            "type":datas.type,
            "name":datas.name,
            "defaultSelect":datas.defaultSelect,
            "animationIn":datas.animationIn ,
            "animationOut":datas.animationOut ,
            "visibleModal":true,
            "func":props.func,
            camera: {
                aspect: Camera.constants.Aspect.sretch,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isRecording: false,
            // "dataSource": ds.cloneWithRows(datas.dataJson)
          } 
         this.takePicture = this.takePicture.bind(this);
         this.startRecording = this.startRecording.bind(this);
         this.stopRecording = this.stopRecording.bind(this);
         this.switchType = this.switchType.bind(this);
         this.switchFlash = this.switchFlash.bind(this);       
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
   // back(opt) {
   //     const { navigate } = this.props.navigation;
   //     navigate('Inbound', opt);
   // }
   onBarCodeRead(e) {
       console.log(e.data);
       if (isFirstIn) {
           // alert(e.data);
           Vibration.vibrate();
           isFirstIn = false;
           // console.log(StringUtil.object2Json(this.props));
           console.log(e.data)
           toastShort('Type: ' + e.type + '\nData: ' + e.data);
           const { navigate } = this.props.navigation;
           this.props.callback(true);
           navigate('Inbound', e.data);
           // Actions.pop({ refresh: ({ 'mScanedQRCode': e.data }) });
       } else {

       }

   }
  close(){
    this.setState({ visibleModal: false })
   // 具体的cell
  }
  render(){
    return (
      <View>
        <Modal
          animationInTiming={700}
          animationOutTiming={500}
          backdropTransitionInTiming={700}
          backdropTransitionOutTiming={500}
          style={styles.modelViewStyle}
          isVisible={this.state.visibleModal == true}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          backdropOpacity={0.1}
          animationType={'none'}
          >
          <View style={styles.modalContent}>
            <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    defaultTouchToFocus
                    mirrorImage={false}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                >
                    <Text style={styles.centerBox}/>
                </Camera>

          </View>
        </Modal>
    </View>
    )
  }
}


const styles = StyleSheet.create({
    modelViewStyle:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
        width: px2dp(100),
        height: px2dp(100),
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: '#cccccc',
        justifyContent: 'center',
      	alignItems: 'center',
	},
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
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
    }

})
