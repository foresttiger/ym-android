'use strict';

export default function storageSave(obj) {
	storage.save({
	    key: obj.key,  // 注意:请不要在key中使用_下划线符号!
	    data: { 
	      name: obj.name,
	      userid: obj.smartUserId,
	      token: obj.token,
	      icon:obj.icon
	    },
	    // 如果不指定过期时间，则会使用defaultExpires参数
	    // 如果设为null，则永不过期
	    expires:  14 * 24 * 3600
	  });
}