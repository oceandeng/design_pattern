var monthlyCost = 0

var cost = function(money){
	monthlyCost += money
}

cost(100)
cost(200)
cost(300)

console.log(monthlyCost)

var cost = (function(){
	var args = []

	return function(){
		if(arguments.length == 0){
			var money = 0;
			for(var i = 0, l = args.length; i < l; i++){
				money += args[i]
			}
			return money
		}else{
			[].push.apply(args, arguments)
		}
	}
})()

cost(100)
cost(200)
cost(300)

console.log(cost())


var currying = function(fn){
	var args = []

	return function(){
		if(arguments.length == 0){
			return fn.apply(this, args)
		}else{
			[].push.apply(args, arguments)
			return arguments.callee
		}
	}
}

var cost = (function(){
	var money = 0;

	return function(){
		for(var i = 0, l = arguments.length; i < l; i++){
			money += arguments[i]
		}
		return money
	}
})()

var cost = currying(cost)

cost(100)
cost(200)
cost(300)

console.log(cost())

// Array.prototype.push.uncurring() 执行过程
Function.prototype.uncurrying = function(){
	var self = this 	// self此时是Array.prototype.push
	return function(){
		var obj = Array.prototype.shift.call(arguments)
		// obj是{
		// 	  'length': 1,	
		//	  '0': 1
		// }
		// arguments对象的第一个元素被截去，剩下[2]
		return self.apply(obj, arguments)
		// 相当于Array.prototype.push.apply(obj, 2)
	}
}

// uncurring 的另外一种实现
Function.prototype.uncurring = function(){
	var self = this
	return function(){
		return Function.prototype.call.apply(self, arguments)
	}
}

var push = Array.prototype.push.uncurrying()

(function(){
	push(arguments, 4)
	console.log(arguments)
})(1, 2, 3)


// 
for(var i = 0, fn, ary = ['push', 'shift', 'forEach']; fn = ary[i++];){
	Array[fn] = Array.prototype[fn].uncurrying()
}

var obj = {
	'length': 3,
	'0': 1,
	'1': 2,
	'2': 3
}

Array.push(obj, 4)
console.log(obj.length)

var first = Array.shift(obj)
console.log(first)		// 1
console.log(obj)		// {0: 2, 1: 3, 2: 4, length: 3}

Array.forEach(obj, function(i, n){
	console.log(n)		// 分别输出: 0, 1, 2
})

var call = Function.prototype.call.uncurrying()
var fn = function(name){
	console.log(name)
}
call(fn, window, 'sven')	// 输出：sven

var apply = Function.prototype.apply.uncurrying()
var fn = function(name){
	console.log(this.name)		// 输出：'sven'
	console.log(arguments)		// 输出：[1, 2, 3]
}
apply(fn, {name: 'sven'}, [1, 2, 3])


// 函数节流
var throttle = function(fn, interval){

	var __self = fn,	// 保存需要被延迟执行的函数引用
		timer,			// 定时器
		firstTime;		// 是否是第一次调用

	return function(){
		var args = arguments,
			__me = this;

		if(firstTime){		// 如果是第一次调用，不需要延迟执行
			__self.apply(__me, args)
			return firstTime = false
		}

		// 如果定时器还在，说明前一次延迟执行还没有完成
		if(timer) return false

		// 延迟一段时间执行
		timer = setTimeout(function(){
			clearTimeout(timer)
			timer = null
			__self.apply(__me, args)
		}, interval || 500)
	}
}

window.onresize = throttle(function(){
	console.log(1)
}, 500)

// 分时函数
var ary = []
for(var i = 1; i <= 1000; i++){
	ary.push(i);	// 假设ary装载了1000个好友的数据
}

var renderFriendList = function(data){
	for(var i = 0, l = data.length; i < l; i++){
		var div = document.createElement('div')
		div.innerHTML = i
		document.body.appendChild(div)
	}
}

renderFriendList(ary)


var timeChunk = function(ary, fn, count){
	var obj,
		t;

	var len = ary.length

	var start = function(){
		for(var i = 0; i < Math.min(count || 1, ary.length); i++){
			var obj = ary.shift()
			fn(obj)
		}
	}

	return function(){
		t = setInterval(function(){
			if(ary.length === 0){
				return clearInterval(t)
			}
			start()
		}, 200)
	}
}

var ary = []

for(var i = 1; i <= 1000; i++){
	ary.push(i)
}

var renderFriendList = timeChunk(ary, function(n){
	var div = document.createElement('div')
	div.innerHTML = n;
	document.appendChild(div)
}, 8)

renderFriendList()

// 5. 惰性函数
var addEvent = function(elem, type, handler){
	if(window.addEventListener){
		return elem.addEventListener(type, handler, false)
	}
	if(window.attachEvent){
		return elem.attachEvent('on' + type, handler)
	}
}

var addEvent = (function(){
	if(window.addEventListener){
		return function(elem, type, handler){
			elem.addEventListener(type, handler, false)
		}
	}
	if(window.attachEvent){
		return function(elem, type, handler){
			elem.attachEvent('on' + type, handler)
		}
	}
})()


var addEvent = function(elem, type, handler){
	if(window.addEventListener){
		addEvent = function(elem, type, handler){
			elem.addEventListener(type, handler, false)
		}
	}
	if(window.attachEvent){
		addEvent = function(elem, type, handler){
			elem.attachEvent('on' + type, handler)
		}
	}

	addEvent(elem, type, handler)
}





