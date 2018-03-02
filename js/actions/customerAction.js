import * as types from '../constants/customerTypes';

export function addCustomer(obj) {
    return dispatch => {
        // var selectObj = {
        //     customerId: obj.customerId,
        // };
        // var formData = "";
        // for (let k in selectObj) {
        //     formData += k + '=' + selectObj[k] + '&'
        // }
        // formData = formData.substr(0, formData.length - 1);
        // let result = fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
        //         method: 'POST',
        //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //         body: formData
        //     }).then((response) => response.text())
        //     .then((responseData) => { // 上面的转好的json
        //         var responseDatas = DataEncrypt(responseData).result
        //         return responseDatas
        //     })
        //     .then((res) => {
        //         // dispatch(loginSuccess(true, user));
        //     }).catch((e) => {
        //         dispatch(loginError(false));
        //     })
        dispatch(AddCustomer(obj));
    }

}

export function delCustomer(obj) {
    return dispatch => {
        // var selectObj = {
        //     customerId: obj.customerId,
        // };
        // var formData = "";
        // for (let k in selectObj) {
        //     formData += k + '=' + selectObj[k] + '&'
        // }
        // formData = formData.substr(0, formData.length - 1);
        // let result = fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
        //         method: 'POST',
        //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //         body: formData
        //     }).then((response) => response.text())
        //     .then((responseData) => { // 上面的转好的json
        //         var responseDatas = DataEncrypt(responseData).result
        //         return responseDatas
        //     })
        //     .then((res) => {
        //         // dispatch(loginSuccess(true, user));
        //     }).catch((e) => {
        //         dispatch(loginError(false));
        //     })
        dispatch(DelCustomer());
    }

}

function AddCustomer(obj) {
    return {
        type: types.DELCUSTOMER,
        obj: AddCustomer
    }
}

function DelCustomer() {
    return {
        type: types.DELCUSTOMER
    }
}