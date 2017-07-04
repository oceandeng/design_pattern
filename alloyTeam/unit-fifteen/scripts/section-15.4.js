/**
 *  装饰函数
 */

/************** 无模式 ****************/
var a = function(){
	alert(1)
}

var a = function(){
	alert(1)
	alert(2)
}

/************ 引入装饰模式 **************/
var a = function(){
	alert(1)
}

var _a = a

a = function(){
	_a()
	alert(2)
}

a()

/************ 装饰模式 实际应用 **************/
window.onload = function(){
	alert(1)
}
var _onload = window.onload || function(){}

window.onload = function(){
	_onload()
	alert(2)
}

/************ 装饰模式 this 被劫持问题 **************/
var _getElementById = document.getElementById

document.getElementById = function(id){
	alert(1)
	return _getElementById(id)
}

var button = document.getElementById('button')
// 报错 Uncaught TypeError: Illegal invocation

// 改造后
var _getElementById = document.getElementById

document.getElementById = function(){
	alert(1)
	return _getElementById.apply(document, arguments)
}

var button = document.getElementById('button')