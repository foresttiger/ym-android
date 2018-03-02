'use strict';

import { Dimensions, NetInfo, AlertIOS } from 'react-native'

export default function NetWorksTools() {
    let isNetWork = true;

    NetInfo.isConnected.fetch().done((isConnected) => {
        console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    });

    function handleFirstConnectivityChange(isConnected) {
    	let NetWork = true;
        console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
        if (!isConnected) {
        	NetWork = false;
            AlertIOS.alert("网络错误", "网络连接失败，请连接网络后重试！");
            
        }
        NetInfo.isConnected.removeEventListener(
            'change',
            handleFirstConnectivityChange
        );
        return NetWork;
    }
   NetInfo.isConnected.addEventListener(
        'change',
        handleFirstConnectivityChange
    );
}