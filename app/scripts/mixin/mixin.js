var Person = function(firstName, lastName){

	this.firstName = firstName;
	this.lastName = lastName;
	this.gender = 'male';
}

// Person的新实例很容易像如下这样创建
var clark = new Person('Clark', 'Kent');

// 为超人(Superhero)定义一个子类构造函数
var Superhero = function(firstName, lastName, powers){

	// 调用超类的构造函数，然后使用.call()方法进行调用从而进行初始化
	Person.call(this, firstName, lastName);

	// 最后，保存powers,在正常Person里找不到的特性数组
	this.powers = powers;
};

Superhero.prototype = Object.create(Person.prototype);
var superman = new Superhero('Clark', 'Kent', ['flight', 'heat-vision']);
console.log(superman);


var myMixins = {

	moveUp: function(){
		console.log('move up');
	},

	moveDown: function(){
		console.log('move down');
	},

	stop: function(){
		console.log('stop! in the name of love');
	}

};

// carAnimator 构造函数的大体代码
function carAnimator(){
	this.moveLeft = function(){
		console.log('move left');
	}
}

// personAnimator 构造函数的大体代码
function personAnimator(){
	this.moveRandomly = function(){}
}

// 使用Mixin扩展2个构造函数
_.extend(carAnimator.prototype, myMixins);
_.extend(personAnimator.prototype, myMixins);

// 创建carAnimator的新实例
var myAnimator = new carAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();


// 定义简单的Car构造函数
var Car = function(settings){

	this.model = settings.model || 'no model provided';
	this.color = settings.color || 'no color provided';
};

// Mixin
var Mixin = function(){};

Mixin.prototype = {
	
	dirveForward: function(){
		console.log('drive forward');
	},

	dirveBackward: function(){
		console.log('drive backward');
	},

	driveSideways: function(){
		console.log('drive sideways');
	}

};

// 通过一个方法将现有对象扩展到另外一个对象上
function augment(receivingClass, givingClass){

	// 只提供特定的方法
	if(arguments[2]){
		for(var i = 2, len = arguments.length; i < len; i++){
			receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
		}
	}
	// 提供所有方法
	else{
		for(var methodName in givingClass.prototype){
			// 确保接收不包含所处理方法的同名方法
			if(!Object.hasOwnProperty(receivingClass.prototype, methodName)){
				receivingClass.prototype[methodName] = givingClass.prototype[methodName];
			}

			// 另一方式
			// if(!receivingClass.prototype[methodName]){
			// 	receivingClass.prototype[methodName] = givingClass.prototype[methodName];
			// }
		}
	}
}

// 给Car构造函数增加‘driveRorward'和’driveBackward'两个方法
augment(Car, Mixin, 'dirveForward', 'dirveBackward');

// 创建一个新Car
var myCar = new Car({
	model: 'Ford Escort',
	color: 'blue'
});

// 测试确保新增方法可用
myCar.dirveForward();
myCar.dirveBackward();

// 也可以通过不声明特定方法名的形式，将Mixin的所有方法都添加到Car里
augment(Car, Mixin);

var mySportCar = new Car({
	model: 'Porsche',
	color: 'red'
})

mySportCar.driveSideways();