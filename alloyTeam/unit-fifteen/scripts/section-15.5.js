/**
 * 用AOP装饰函数
 */

Function.prototype.before = function(beforeFn){
	var __self = this; 		// 保存原函数的引用

	return function(){		// 返回包含了原函数和新函数的“代理”函数
		beforeFn.apply(this, arguments)		// 执行新函数，且保证this不被劫持，新函数接受的参数也会被原封不动的传入函数，新函数在原函数之前执行
		return __self.apply(this, arguments)	// 执行原函数并返回原函数的执行结果，并且保证this不被劫持
	}
}

Function.prototype.after = function(afterFn){
	var __self = this

	return function(){
		var ret = __self.apply(this, arguments)
		afterFn.apply(this, arguments)
		return ret
	}
}

document.getElementById = document.getElementById.before(function(){
	alert(1)
})

var button = document.getElementById('button')

console.log(button)


window.onload = function(){
	alert(1)
}

window.onload = (window.onload || function(){}).after(function(){
	alert(2)
}).after(function(){
	alert(3)
}).after(function(){
	alert(4)
})

/********************* 不污染Function.prototype ************************/
var before = function(fn, beforefn){
	return function(){
		beforeFn.apply(this, arguments)
		return fn.apply(this, arguments)
	}
}

var a = before(
	function(){alert(3)},
	function(){alert(2)}
)

a = before(a, function(){alert(1)})

a()