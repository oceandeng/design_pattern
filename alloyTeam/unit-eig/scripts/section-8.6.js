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

/**
 * 测试代码
 */
var salesOffices = {}
installEvent(salesOffices)

// salesOffices.listen('squareMeter88', function(price){		// 小明订阅消息
// 	console.log('价格=' + price)
// })
// salesOffices.listen('squareMeter100', function(price){		// 小红订阅消息
// 	console.log('价格=' +  price)
// })

// salesOffices.trigger('squareMeter88', 20000000)
// salesOffices.trigger('squareMeter100', 30000000)

var fn1, fn2;

// 删除
salesOffices.listen('squareMeter88', fn1 = function(price){
	console.log('价格=' +  price)
})
salesOffices.listen('squareMeter88', fn2 = function(price){
	console.log('价格=' +  price)
})

salesOffices.remove('squareMeter88', fn1)
salesOffices.trigger('squareMeter88', 220000000)