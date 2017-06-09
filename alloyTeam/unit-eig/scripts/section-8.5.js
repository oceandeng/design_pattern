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
debugger
salesOffices.listen('squareMeter88', function(price){		// 小明订阅消息
	console.log('价格=' + price)
})
salesOffices.listen('squareMeter100', function(price){		// 小红订阅消息
	console.log('价格=' +  price)
})

salesOffices.trigger('squareMeter88', 20000000)
salesOffices.trigger('squareMeter100', 30000000)