/**
 * AOP的应用实例
 */


// 无模式实现
var showLogin = function(){
	console.log('打开登录浮层')
	log(this.getAttribute('tag'))
}

var log = function(tag){
	console.log('上报标签为：' + tag)
	// (new Image).src = 'http://xxx.com/report?tag=' + tag;	//真正的上报代码略
}

document.getElementById('button').onclick = showLogin

// AOP装饰函数实现
Function.prototype.after = function(afterFn){
	var __self = this
	return function(){
		var ret = __self.apply(this, arguments)
		afterFn.apply(this, arguments)
		return ret
	}
}

var showLogin = function(){
	console.log('打开登录浮层')
}

var log = function(){
	console.log('上报标签为：' + this.getAttribute('tag'))
}

showLogin = showLogin.after(log)	// 打开浮层后上报数据

document.getElementById('button').onclick = showLogin