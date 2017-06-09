/**
 * 自定义事件
 */
var salesOffices = {}	// 定义售楼处

salesOffices.clientList = {}	// 缓存列表，存放订阅者的回调函数

salesOffices.listen = function(key, fn){		// 增加订阅者
	if(!this.clientList[key]){		// 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
		this.clientList[key] = []
	}
	this.clientList[key].push(fn)
}

salesOffices.trigger = function(){		// 发布消息
	var key = Array.prototype.shift.call(arguments),
		fns = this.clientList[key]

	if(!fns || fns.length === 0){		// 如果没有订阅该消息，则返回
		return false
	}

	for(var i = 0, fn; fn = fns[i++];){
		fn.apply(this, arguments)		// (2) // arguments 是发布消息时附送的参数
	}
}

salesOffices.listen('squareMeter88', function(price){
	console.log('价格=' + price)
})

salesOffices.listen('squareMeter100', function(price){
	console.log('价格=' + price)
})


salesOffices.trigger('squareMeter88', 88)
salesOffices.trigger('squareMeter100', 110)