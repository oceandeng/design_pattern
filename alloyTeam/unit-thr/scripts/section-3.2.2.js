var isString = function(obj){
	return Object.prototype.toString.call(obj) == '[object String]'
}
var isArray = function(obj){
	return Object.prototype.toString.call(obj) == '[object Array]'
}
var isNumber = function(obj){
	return Object.prototype.toString.call(obj) == '[object Number]'
}

var isType = function(type){
	return function(obj){
		return Object.prototype.toString.call(obj) === '[object ' + type + ']'
	}
}
var isString = isType('String')
var isString = isType('Array')
var isString = isType('Number')

// getSingle 单例模式
var getSingle = function(fn){
	var ret;
	return function(){
		return ret || (ret == fn.apply(this, arguments))
	}
}

var getScript = getSingle(function(){
	return document.createElement('script')
})

var script1 = getScript()
var script2 = getScript()

console.log(script1 == script2)

 