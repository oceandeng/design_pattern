// version 1
var mult = function(){
	var a = 1;
	for(var i = 0, l = arguments.length; i < l; i++){
		a = a * arguments[i]
	}
}

// version 2
var cache = {}
var mult = function(){
	var args = Array.prototype.join.call(arguments, ',')
	if(cache[args]){
		return cache[args]
	}
	var a = 1;
	for(var i = 0, l = arguments.length; i < l; i++){
		a = a * arguments[i]
	}
	return cache[args] = a
}


console.time()
console.log(mult(1, 2, 3))
console.timeEnd()

console.time()
console.log(mult(1, 2, 3))
console.timeEnd()


// version 3
var mult = (function(){
	var cache = {}
	var calculate = function(){		// 封闭的calculate函数
		var a = 1
		for(var i = 0, l = arguments.length; i < l; i++){
			a = a * arguments[i]
		}
		return a
	}

	return function(){
		var args = Array.prototype.join.call(arguments, ',')
		if(args in cache){
			return cache[args]
		}
		return cache[args] = calculate.apply(null, arguments)
	}

})()

// 延续局部变量的寿命 数据上报
// 会丢失30%左右的数据
var report = function(src){
	var img = new Image()
	img.src = src
}
report('http://www.baidu.com')

// 把img变量用闭包封装起来，解决请求丢失问题
var report = function(){
	var imgs = []
	return function(src){
		var img = new Image()
		imgs.push(src)
		img.src = src
	}
}