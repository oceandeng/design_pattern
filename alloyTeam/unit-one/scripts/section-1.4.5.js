function Person(name){
	this.name = name
}

Person.prototype.getName = function(){
	return this.name
}

var a = new Person('sven')

console.log(a.name)			// 'sven'
console.log(a.getName())	// 'sven'
console.log(Object.getPrototypeOf(a) === Person.prototype)	// true


var objectFactory = function(){
	var obj = new Object(),		// 从Object.prototype上克隆一个空的对象
		Constructor = [].shift.call(arguments)		// 取得外部传入的构造器，此例是Person

	obj.__proto__ = Constructor.prototype 			// 指向正确的原型
	var ret = Constructor.apply(obj, arguments)		// 借用外部传入的构造器给obj设置属性

	return typeof ret === 'object' ? ret : obj 		// 确保构造器总是会返回一个对象
}

var a = objectFactory(Person, 'sven')

console.log(a.name)
console.log(a.getName())
console.log(Object.getPrototypeOf(a) === Person.prototype)


var obj = {name: 'sven'}

var A = function(){}
A.prototype = obj

var a = new A()
console.log(a.name)		// sven


var A = function(){}
A.prototype = {name: 'sven'}

var B = function(){}
B.prototype = new A()

var b = new B()
console.log(b.name)		// 'sven'
 

// ECMAScript 6  基于类的语言
class Animal{
	constructor(name){
		this.name = name;
	}

	getName(){
		return this.name
	}
}

class Dog extends Animal{
	constructor(name){
		super(name)
	}
	speak(){
		return "woof"
	}
}

var dog = new Dog('Scamp')
console.log(dog.getName() + ' says ' + dog.speak())





