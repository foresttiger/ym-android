import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
// import Toast from 'react-native-simple-toast';
import {toastShort} from '../util/ToastUtil.js';
import {QRScannerView} from 'ac-qrcode';
import Camera from 'react-native-camera';

// import {ImageButton, TitleBar} from "../../components/";

import {Constants, Images, Colors} from "../resource/";

export default class ScanningTwoCode extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            codeMs: undefined,
        };
    }
    render() {
        return (
            <QRScannerView
                // bottomMenuStyle={{height: 100, backgroundColor: Colors.black_393A3F, opacity: 1}}
                hintTextPosition={120}
                // hintTextStyle={{fontSize: 20}}
                maskColor={Colors.black_0000004D}
                borderWidth={0}
                iscorneroffset={false}
                cornerOffsetSize={0}
                scanBarAnimateTime={3000}
                onScanResultReceived={this.barcodeReceived.bind(this)}

                renderTopBarView={() => {
                    return (
                         <View></View>

                    )
                }}
                renderBottomMenuView={() => {
                    return (
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}><Text>{this.state.codeMs}</Text></View>
                    )
                }}
            />
        )
    }
    back(opt) {
        const { navigate } = this.props.navigation;
        navigate('Inbound', opt);
    }
    barcodeReceived(e) {
        this.camera.stopCapture();
        console.log(e)
        // var data = JSON.parse(e.data);
        var option=e.data;
        this.setState({ codeMs: option});
        // this.back(option);
        // toastShort('Type: ' + e.type + '\nData: ' + e.data);
    }
}
const styles = StyleSheet.create({
    image_bottom_menu: {
        height: 46,
        width: 46,
        resizeMode:'contain'
    },
    view_bottom_menu_item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:16,
    },
    text_bottom_menu_item: {
        color: "#000000",
        marginTop: 8
    }
});