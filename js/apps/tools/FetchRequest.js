import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class FetchRequest extends Component {

    //定义接收请求地址，当然也可以添加请求参数
    //parames 尽量是{'key1':'value1'，'key2':'value2'}
    //static request(url,parames,callBackSuccess,callBackError){

    static request(url,loadCallBack,callBackSuccess,callBackError){

        //请求发送中回调,可以加一些loading效果
        loadCallBack();

        fetch(url,{
            method:'POST',//如果为GET方式，则不要添加body，否则会出错    GET/POST
            header:{//请求头
            },
            // body:parames//请求参数
        })
            .then((response) => response.json())//将数据转成json,也可以转成 response.text、response.html
            .then((responseJson) => {//获取转化后的数据responseJson、responseText、responseHtml
                /*return responseJson.movies; */
                //成功回调
                callBackSuccess(JSON.stringify(responseJson));//JSON.stringify()避免出现烦人的[object object]

            }).catch((error) => {
                //失败回调
                callBackError(error);
        });
    }
}