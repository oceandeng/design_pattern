/**
 * 发布-订阅模式的通用实现
 */
var event = {
	clientList: [],
	listen: function(key, fn){
		if(!this.clientList[key]){
			this.clientList[key] = []
		}
		this.clientList[key].push(fn)
	},
	trigger: function(){
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientList[key]

		if(!fns || fns.length === 0){
			return false
		}

		for(var i = 0, fn; fn = fns[i++];){
			fn.apply(this, arguments)
		}
	}
}

event.remove = function(key, fn){
	var fns = this.clientList[key]

	if(!fns) return false	// 如果key对应的消息没有被人订阅，则直接返回
	if(!fn){	// 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
		fns && (fns.length = 0)
	}else{
		for(var l = fns.length - 1; l >= 0; l--){	// 反向遍历订阅的回调函数列表
			var _fn = fns[l]
			if(_fn === fn){
				fns.splice(l, 1)	// 删除订阅者的回调函数
			}
		}
	}
}

/**
 * installEvent
 * 给所有的对象都动态安装发布-订阅功能
 */
var installEvent = function(obj){
	for(var i in event){
		obj[i] = event[i]
	}
}


var login = {}
installEvent(login)

console.log(login)

/**
 * 真实的例子-网站登录
 */
$.ajax('http://api.xxx.com', function(data){	// 登录成功
	login.trigger('loginSucc', data)	// 发布登录成功的消息
})

// 各模块监听登录成功的消息
var header = (function(){		// header模块
	login.listen('loginSucc', function(data){
		header.setAvatar(data.avatar)
	})
	return {
		setAvatar: function(data){
			console.log('设置header模块的头像')
		}
	}
})()

var nav = (function(){		// nav模块
	login.listen('loginSucc', function(data){
		nav.setAvatar(data.avatar)
	})
	return {
		setAvatar: function(avatar){
			console.log('设置nav模块的头像')
		}
	}
})()

var address = (function(){		// address模块
	login.listen('loginSucc', function(obj){
		address.refresh(obj)
	});
	return {
		refresh: function(avatar){
			console.log('刷新收货地址列表')
		}
	}
})