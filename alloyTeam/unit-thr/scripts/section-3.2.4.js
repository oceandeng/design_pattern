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


Function.prototype.uncurrying = function(){
	var self = this
	return function(){
		var obj = Array.prototype.shift.call(arguments)
		return self.apply(obj, arguments)
	}
}

var push = Array.prototype.push.uncurrying()

(function(){
	push(arguments, 4)
	console.log(arguments)
})()