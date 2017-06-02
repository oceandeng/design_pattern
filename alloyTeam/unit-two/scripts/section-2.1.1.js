var obj = {
	a: 1,
	getA: function(){
		console.log(this === obj)
		console.log(this.a)
	}
}

obj.getA()

window.name = 'globalName'

var getName = function(){
	return this.name
}

console.log(getName())		// globalName

window.name = 'globalName'

var myObject = {
	name: 'sven',
	getName: function(){
		return this.name
	}
}

var getName = myObject.getName
console.log(getName())	// globalName


// 3.构造器调用

var MyClass = function(){
	this.name = 'sven'
}

var obj = new MyClass()
console.log(obj.name)	// 'sven'

var MyClass = function(){
	this.name = 'sven'
	return {
		name: 'anne'
	}
}
var obj = new MyClass()
console.log(obj.name) 	// 'anne'

var MyClass = function(){
	this.name = 'sven'
	return 'anne'
}

var obj = new MyClass()
console.log(obj.name)	// 'sven'


// 4. Function.prototype.call 或 Function.prototype.apply 调用
var obj1 = {
	name: 'sven',
	getName: function(){
		return this.name
	}
}

var obj2 = {
	name: 'anne'
}

console.log(obj1.getName()) 	// 'sven'
console.log(obj1.getName.call(obj2)) 	// 'anne'





