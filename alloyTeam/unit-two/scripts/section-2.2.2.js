Function.prototype.bind = function(){
	var self = this,	// 保存原函数
		context = [].shift.call(arguments),		// 需要绑定的this上下文
		args =  [].slice.call(arguments);		// 剩余的参数转成数组

	return function(){
		return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
		// 执行新的函数的时候，会把之前传的context当做新函数体内的this
		// 并且组合两次分别传入的参数，作为新函数的参数
	}

}

var obj = {
	name: 'sven'
}

var func = function(a, b, c, d){
	console.log(this.name)
	console.log([a, b, c, d])
}.bind(obj, 1, 2)

func(3, 4)


// 3. 借用其他对象的方法
var A = function(name){
	this.name = name
}

var B = function(){
	A.apply(this, arguments)
}

B.prototype.getName = function(){
	return this.name
}

var b = new B('sven')
console.log(b.getName())

(function(){
	Array.prototype.push.call(arguments, 3)
	console.log(arguments)	// 输出[1, 2, 3]
})(1, 2)

// Array.prototype.push B8引擎具体实现
function ArrayPush(){
	var n = TO_UINT32(this.length); 	// 被push的对象的length
	var m = %_ArgumentsLength(); 		// push的参数个数
	for(var i = 0; i < m; i++){
		this[i + n] = %_Arguments[i] 	// 复制元素
	}
	this.length = n + m; 				// 修正length的值
	return this.length;
}

var a = {}
Array.prototype.call(a, 'first')
console.log(a.length) 	// 1
console.log(a[0])		// first









