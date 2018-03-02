'use strict';

export default function storageReader(obj) {
    //load 读取
    storage.load({
        key: obj.key,
    }).then(read => {
        // 如果找到数据，则在then方法中返回
        console.log(read);
        // data = read
       obj.callback(read);
       // fun(read)
       resolve(read)
        // return read;
    }).catch(err => {
        // 如果没有找到数据且没有sync方法，
        // 或者有其他异常，则在catch中返回
        // console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    })
}