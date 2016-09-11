// 车辆vehicle构造函数
function vehicle(vehicleType){

	this.vehicleType = vehicleType || 'car';
	this.model = 'default';
	this.license = '00000-000';
}

// 测试基本的vehicle实例
var testInstance = new vehicle('car');
console.log(testInstance);

var truck = new vehicle('truck');
truck.setModel = function(modelName){
	this.model = modelName;
}

truck.setColor = function(color){
	this.color = color;
}

// 测试赋值操作是否正常工作
truck.setModel('CAT');
truck.setColor('blue');

console.log(truck);

// 下面代码，展示vehicle依然是不被改变的
var secondInstance = new vehicle('car');
console.log(secondInstance);


// 被装饰的对象构造函数
function MacBook(){

	this.cost = function(){return 997};
	this.screenSize = function(){return 11.6};
}

// Decorator 1
function Memory(macbook){
	var v = macbook.cost();
	macbook.cost = function(){
		return v + 75;
	}
}

// Decorator 2
function Engraving(macbook){
	var v = macbook.cost();
	macbook.cost = function(){
		return v + 200
	}
}

// Decorator 3
function Insurance(macbook){
	var v = macbook.cost();
	macbook.cost = function(){
		return v + 250;
	}
}

var mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

console.log(mb.cost());
console.log(mb.screenSize());