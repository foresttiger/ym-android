'use strict';

import * as types from '../constants/loginTypes';
import DataEncrypt from '../apps/component/DataEncrypt'
import storageSave from '../storage/Savadata.js'

// 模拟用户信息
let user = {
    name: 'zhangsan',
    age: 24,
}

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function login(obj) {
    return dispatch => {
        dispatch(isLogining());
        var _this = this;
        var selectObj = {
            type: "mobile",
            phone: obj.name,
            password: obj.pwd
        };
        // var formData = "";
        // for (let k in selectObj) {
        //     formData += k + '=' + selectObj[k] + '&'
        // }
        // formData = formData.substr(0, formData.length - 1);
        var formData = JSON.stringify(selectObj);
        let result = fetch('http://rainingjoy.xin:9112/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: formData
            }).then((response) => response.text())
            .then((responseData) => { // 上面的转好的json
                var responseDatas = JSON.parse(responseData)
                return responseDatas
            })
            .then((res) => {
                console.log(res)
                switch (res.status) {
                    case 200:
                        Object.assign(obj, { key: "login",token:res.token })
                        console.log(obj)
                        storageSave(obj)
                        dispatch(loginSuccess(true, obj));
                        break;
                    default:
                        dispatch(loginError(false,res.message));
                        break;
                }
                // dispatch(loginSuccess(true, user));
            }).catch((e) => {
                dispatch(loginError(false));
            })
    }
    // return dispatch => {
    //     dispatch(isLogining());
    //     // 模拟用户登录
    //     let result = fetch('https://www.baidu.com/')
    //         .then((res) => {
    //             dispatch(loginSuccess(true, user));
    //         }).catch((e) => {
    //             console.log(e)
    //             dispatch(loginError(false));
    //         })
    // }
}
export function loginOut() {
    console.log('退出登录方法');
    return dispatch => {
        dispatch(LoginOut());
    }
}

function LoginOut() {
    storage.remove({
        key: 'login'
    });
    return {
        type: types.LOGIN_OUT
    }
}

function isLogining() {
    return {
        type: types.LOGIN_IN_DOING
    }
}

function loginSuccess(isSuccess, objects) {
    console.log('success');
    return {
        type: types.LOGIN_IN_DONE,
        user: objects,
    }
}

function loginError(isSuccess,message) {
    console.log('error');
    return {
        type: types.LOGIN_IN_ERROR,
        message:message
    }
}