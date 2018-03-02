'use strict';

import { Dimensions, Platform } from 'react-native'

const deviceH = Dimensions.get('window').height
const deviceW = Dimensions.get('window').width

const basePx = 375
const radio = deviceH / deviceW
const isAndroid = Platform.OS != "ios"

export default function px2dp(px) {
    if (isAndroid) {
        return px 
    } else {
        return px * 4 / 3
    }
}